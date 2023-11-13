import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import DashboardScreen from '../(dashboard)/dashboard'
import EditPlanScreen from '../(workout)/editplan'
import NavScreen from '../nav'

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen}/>
      <Tab.Screen name="Workouts" component={EditPlanScreen}/>
      <Tab.Screen name="Dev" component={NavScreen}/>
    </Tab.Navigator>
  );
}
