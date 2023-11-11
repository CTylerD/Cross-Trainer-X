import { StyleSheet, Dimensions, Text, View} from 'react-native';
import Animated, { FadeIn } from    'react-native-reanimated';
import Exercises from '../../components/Exercise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useContext} from 'react';
import Theme from '../../components/Themes';
import ThemeContext from '../../contexts/ThemeContext';
import ExerciseContext from '../../contexts/ExerciseContext';
import { exercises } from '../../constants/Exercises';


export default function WorkoutScreen() {
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {workout, setWorkout} = useContext(ExerciseContext);

  if (workout.intro){
    var newWorkout = workout;
    for(const exercise in exercises){
      newWorkout[exercise] = false;
    }
    setWorkout(newWorkout);
    console.log("workout created");
    setTimeout(()=>{setWorkout({...workout, intro: false})}, 3000);
  }

  console.log("workout page");

  return (
    <View style={styles.container}>
    {workout.intro ?  (<Animated.View style={[styles.container, themed.container]} entering={FadeIn.duration(1000)}>
                <Text style={[styles.title, themed.text]}>Let's Workout {workout.intro}</Text>
              </Animated.View>) :
              (<Exercises exercises={exercises}/>)}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
  },
  title: {
    fontSize: 20,
  },
});