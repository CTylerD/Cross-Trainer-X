import { StyleSheet} from 'react-native';
import { Text, View } from '../../components/Themed';
import React, {useState} from 'react';
import Animated, { FadeIn, FadeOut } from    'react-native-reanimated';
import Exercises from '../../components/Exercise';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function WorkoutScreen() {
  const [intro, setIntro] = useState(true);

  setTimeout(()=>{setIntro(false)}, 3000)

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('exerciseList');
      if (jsonValue != null){JSON.parse(jsonValue);}
      else{
        value = {'0': false, '1': false, '2': false, '3': false};
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('exerciseList', jsonValue);}
    } catch (e) {
      console.log(e)
    }
  };

  getData();


  return (
    <View style={styles.container}>
    {intro ?  (<Animated.View style={styles.container} entering={FadeIn.duration(1000)}>
                <Text style={styles.title}>Let's Workout</Text>
              </Animated.View>) :
              (<Exercises/>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});