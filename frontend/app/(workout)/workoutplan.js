import { StyleSheet, Pressable, useWindowDimensions, Dimensions, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';
import { workouts } from '../../constants/Workouts';
import { exercises } from '../../constants/Exercises';
import * as React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


const FirstRoute = () => (
  <View style={[styles.container]} >
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[0].name}</Text>
    </View>
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[1].name}</Text>
    </View>
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[2].name}</Text>
    </View>
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[3].name}</Text>
    </View>
  </View>
);
const SecondRoute = () => (
  <View style={[styles.container]} >
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[4].name}</Text>
    </View>
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[5].name}</Text>
    </View>
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[6].name}</Text>
    </View>
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[7].name}</Text>
    </View>
  </View>
);
const ThirdRoute = () => (

  <View style={[styles.container]} >
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[8].name}</Text>
    </View>
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[9].name}</Text>
    </View>
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[10].name}</Text>
    </View>
    <View style={styles.card_template}>
      <Text style={[styles.title]} >{exercises[11].name}</Text>
    </View>
  </View>

);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: 'black' }}
  />)


export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Monday' },
    { key: 'second', title: 'Wednesday' },
    {key: 'third', title:'Thursday'}
  ]);

  return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />

  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    margin: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32
  },
  card_template:{
    width: '47%',
    height:'65%',
    margin: 3,
    borderWidth: 1,
    backgroundColor: 'lightgray',
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  tab_bar:{
    backgroundColor: 'black'
  }
});