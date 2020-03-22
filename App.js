import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as DeviceProvider } from './src/context/DevicesContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import DevicesScreen from './src/screens/DevicesScreen';
import DeviceReviewScreen from './src/screens/DeviceReviewScreen';
import NewDeviceScreen from './src/screens/NewDeviceScreen';
import EditDeviceScreen from './src/screens/EditDeviceScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddButton from './src/components/AddButton';
import { customColors } from './src/styles';

const HEADER_STYLES = {
  headerStyle: {
    height: 60,
    backgroundColor: customColors.secondaryDark,
    borderColor: 'black',
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    color: customColors.mainGreen
  },
  headerTintColor: customColors.mainPurple
}


export default function App() {

  const DevicesStack = createStackNavigator();

  function DevicesStackFlow({navigation}) {
    return (
      <DevicesStack.Navigator>
        <DevicesStack.Screen
          name={"Devices"}
          component={DevicesScreen}
          options={{
            headerRight: () => (
              <AddButton title={'Add Device'} onPress={() => navigation.navigate('NewDevice')}/>
            ),
            ...HEADER_STYLES
          }}
          socket={'hello'}
        />
        <DevicesStack.Screen
          name={"DeviceReview"}
          component={DeviceReviewScreen}
          options={{
            title: 'Device',
            ...HEADER_STYLES
          }}

        />
        <DevicesStack.Screen
          name={"NewDevice"}
          style={{backgroundColor: 'black'}}
          component={NewDeviceScreen}
          options={{
            title: 'New Device',
            ...HEADER_STYLES
          }}
        />
        <DevicesStack.Screen
          name={"EditDevice"}
          component={EditDeviceScreen}
          options={{
            title: 'Edit Device',
            ...HEADER_STYLES
          }}
        />
      </DevicesStack.Navigator>
    )
  }




  const Tab = createBottomTabNavigator()

  return (

    <DeviceProvider>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Devices') {
              iconName = 'devices';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings';
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: customColors.mainGreen,
          inactiveTintColor: customColors.mainGrey,
          style: {
            backgroundColor: customColors.mainBlack,
            borderTopColor: customColors.secondaryDark
          }
        }}
        >
          <Tab.Screen
            name={"Devices"}
            component={DevicesStackFlow}
          />
          <Tab.Screen name={"Settings"} component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </DeviceProvider>

  );
}
