import createDataContext from './createDataContext';
import INITIAL_STATE from '../data/defaultDevices';


const devicesReducer = (state, action) => {
  switch (action.type) {
    case 'server_connection':
      return { ...state, server_connection: action.payload }
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

const clearError = (dispatch) => {
  return () => {
    dispatch({type: 'clear_error'})
  }
}

const addError = ( dispatch ) => {
  return ( error ) => {
    dispatch({ type: 'add_error', payload: error })
  }
}

const updateServerStatus = (dispatch) => {
  return ( serverStatus ) => {
    if(!serverStatus) {
      dispatch({ type: 'server_connection', payload: serverStatus })
      dispatch({ type: 'add_error', payload: 'Disconnected from home server' })
    } else {
      dispatch({ type: 'server_connection', payload: serverStatus })
    }
  }
}

const addDevice = (dispatch) => {
  return ( device, currentSockets, navigation ) => {
    dispatch({ type: 'add_device', payload: device })
  }
};

const toggleDevice = (dispatch) => {
  return ( device ) => {
    dispatch({ type: 'toggle_device', payload: device })
  }
}

const editDevice = (dispatch) => {
  return ( device ) => {
    dispatch({ type: 'edit_device', payload: device })
  }
}

const removeDevice = (dispatch) => {
  return ( device ) => {
    dispatch({ type: 'remove_device', payload: device });
  }
}


export const {Provider, Context} = createDataContext(
  devicesReducer,
  { toggleDevice, addDevice, editDevice, removeDevice, updateServerStatus, addError, clearError },
  { devices: INITIAL_STATE, server_connection: false, error: '' }
);
