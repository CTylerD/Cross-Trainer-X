import { StyleSheet} from 'react-native';
import { Text, View } from '../../components/Themed';
import React, {useState} from 'react';
import Animated, { FadeIn, FadeOut } from    'react-native-reanimated';
import Exercises from '../../components/Exercise';
import { useReducer } from 'react';

export default function WorkoutScreen() {
  const [intro, setIntro] = useState(true);

  setTimeout(()=>{setIntro(false)}, 3000)


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