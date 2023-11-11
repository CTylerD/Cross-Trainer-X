import { useLocalSearchParams } from 'expo-router';
import { exercises } from '../../../constants/Exercises';
import { StyleSheet, Dimensions, Text, View, Pressable } from 'react-native';
import {useState, useContext} from 'react';
import { Link } from 'expo-router';
import Theme from '../../../components/Themes';
import ThemeContext from '../../../contexts/ThemeContext';
import ExerciseContext from '../../../contexts/ExerciseContext';


export default function Page() {
  const { exercise } = useLocalSearchParams();
  const currExercise = exercises[exercise];
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {workout, setWorkout} = useContext(ExerciseContext);

  console.log(currExercise.name);

  return (
    <View style={[styles.container, themed.container]}>
      <View style={styles.card_template}>
        <Text style={[styles.title, themed.text]}>{currExercise.name}</Text>
        <Text style={[styles.text, themed.text]}>{'\n'}{currExercise.description}</Text>
      </View>
      <View style={styles.card_template}>
      <Link href="/workout" asChild>
        <Pressable style={styles.button} onPressIn={() => setWorkout({...workout, [currExercise.e_id] :true})}>
          <Text style={[themed.text, styles.text, {color:'black'}]}>Complete Exercise</Text>
        </Pressable>
      </Link>
      </View>

    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent:'center',
      width: screenWidth,
      height: screenHeight
      },
  
    title: {
      fontSize: 30,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: 0.25,
    },
    card_template:{
    width: (screenWidth),
    height:'auto',
    margin: 10,
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'darkgray',
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    justifyContent: "center",
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