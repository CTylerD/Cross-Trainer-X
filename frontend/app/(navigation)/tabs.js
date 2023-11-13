import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import NavScreen from '../nav'
import LoginScreen from '../login'
import DashboardScreen from '../(dashboard)/dashboard'
import WelcomeScreen from '..';
import { NavigationContainer } from '@react-navigation/native';

export default function BottomTabs() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Welcome Screen" component={WelcomeScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Dev" component={NavScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
