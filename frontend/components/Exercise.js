import { StyleSheet, Pressable, Dimensions,SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Card } from 'react-native-elements'
import {useState, useContext} from 'react';
import ThemeContext from '../contexts/ThemeContext';
import ExerciseContext from '../contexts/ExerciseContext';
import Theme from '../components/Themes';
import PostExerciseModal from './PostExerciseModal';


export default function Exercises({exercises}) {

  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {workout, setWorkout} = useContext(ExerciseContext);

  console.log('Exercise workout list');


  return (

    <SafeAreaView style={[styles.container, themed.container]}>
    <ScrollView style={[styles.scrollView]}>
    {Object.values(exercises).map((exercise) => {
      return (
        <Link href={`/exercise/${exercise.e_id}`} asChild>
          <Pressable disabled={workout[exercise.e_id]}
                     accessibilityRole="button">
            <Card>
              <Card.Title style={{color:'black'}}>{exercise.name}</Card.Title>
              <Card.Divider/>
              {workout[exercise.e_id] ? <Card.Title style={{color:'black'}}>Complete</Card.Title>:
              <Card.Title style={{color:'black'}}>Incomplete</Card.Title>}
            </Card>  
          </Pressable>
        </Link>
      )
    })}
    <PostExerciseModal/>
    </ScrollView>
  </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginHorizontal: 0,
    width: screenWidth
  },
  title: {
    fontSize: 20,
  },
  largetext: {
    fontSize: 30,
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
});
