import createDataContext from './createDataContext';
import INITIAL_STATE from '../data/defaultDevices';

const devicesReducer = (state, action) => {
  switch (action.type) {
    case 'set_socket':
      return { ...state, socket: action.payload }
    case 'set_server_connection':
      return { ...state, server_connection: {status: action.payload, timestamp: new Date().toString()} }
    case 'toggle_device':
      let toggledDevices = state.devices.map(device => {
        if(device.socket === action.payload.socket) {
          return { ...device, isOn: device.isOn?false:true }
        } else {
          return device;
        }
      })
      return { ...state, devices: toggledDevices };
    case 'add_device':
      return { ...state, devices: [ ...state.devices, action.payload ] }
    case 'edit_device':
      let editedDevices = state.devices.map(device => {
        if(device.socket === action.payload.socket) {
          return action.payload
        } else {
          return device;
        }
      })
      return { ...state, devices: editedDevices };
    case 'remove_device':
      let removedDevices = state.devices.filter(device => {
        if(device.socket !== action.payload.socket) {
          return device;
        }
      })
      return { ...state, devices: removedDevices };
    case 'add_error':
      return { ...state, error: action.payload };
    case 'clear_error':
      return { ...state, error: '' }
    default:
      return state;
  }
}

const setSocket = ( dispatch ) => {
  return ( socket ) => {
    dispatch({ type: 'set_socket', payload: socket });
  }
}

const setServerConnection = ( dispatch ) => {
  return ( server_connection ) => {
    dispatch({ type: 'set_server_connection', payload: server_connection });
  }
}

const addDevice = (dispatch) => {
  return ( device, currentSockets, navigation ) => {
    dispatch({ type: 'add_device', payload: device })
  }
};

const toggleDevice = (dispatch) => {
  return ( device ) => {
    dispatch({ type: 'toggle_device', payload: device });
  }
}

const editDevice = (dispatch) => {
  return ( device ) => {
    dispatch({ type: 'edit_device', payload: device });
  }
}

const removeDevice = (dispatch) => {
  return ( device ) => {
    dispatch({ type: 'remove_device', payload: device });
  }
}

const clearError = (dispatch) => {
  return () => {
    dispatch({type: 'clear_error'});
  }
}

const addError = ( dispatch ) => {
  return ( error ) => {
    dispatch({ type: 'add_error', payload: error });
  }
}

export const {Provider, Context} = createDataContext(
  devicesReducer,
  { setSocket, setServerConnection, toggleDevice, addDevice, editDevice, removeDevice, addError, clearError },
  { devices: INITIAL_STATE, server_connection: {status:false, timestamp: ''}, error: '', socket: null }
);
