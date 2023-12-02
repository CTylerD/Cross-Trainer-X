import { useLocalSearchParams } from 'expo-router';
import { exercises } from '../../../constants/Exercises';
import { StyleSheet, Dimensions, Text, View, Pressable, ImageBackground } from 'react-native';
import {useState, useContext} from 'react';
import { Link } from 'expo-router';
import Theme from '../../../components/Themes';
import ThemeContext from '../../../contexts/ThemeContext';
import ExerciseContext from '../../../contexts/ExerciseContext';
import StrengthTimer from '../../../components/StrengthTimer';
import FlexTimer from '../../../components/FlexTimer';



export default function Page() {
  const { exercise } = useLocalSearchParams();
  const currExercise = exercises[exercise];
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {workout, setWorkout} = useContext(ExerciseContext);

  console.log(currExercise.name);



  return (
    <ImageBackground source={exercise.type==='Strength' ? require('../../../assets/images/Barbell.png'):require('../../../assets/images/zen.png')} resizeMode="cover">
    <View style={styles.container}>
        <Text style={[styles.title, themed.text]}>{currExercise.name}</Text>
        <View style={[styles.card, themed.card]}>
        <Text style={[styles.text, themed.text]}>{'\n'}How To:</Text>
        <Text style={[styles.text, themed.text]}>{currExercise.description}</Text>
        {currExercise.category == 'Strength' ?
          <StrengthTimer exercise={currExercise}/>:
          <FlexTimer exercise={currExercise} />}
      </View>
      <View style={[styles.button, themed.button]}>
      <Link href="/workout" asChild>
        <Pressable onPressIn={() => setWorkout({...workout, [currExercise.e_id] :true})}>
          <Text style={[themed.text, styles.text]}>Complete Exercise</Text>
        </Pressable>
      </Link>
      </View>
    </View>
    </ImageBackground>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: 'center',
      justifyContent:'center',
      paddingTop:60,
      width:screenWidth,
      height:screenHeight,
      backgroundColor:'#000000a0'
      },
  
    title: {
      fontSize: 30,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: 0.25,
    },
    card: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      elevation: 3,
      margin: 12,
      borderWidth: 0,
      paddingVertical: 20,
      paddingHorizontal: 20,
      width: screenWidth*.95,
      opacity:.90
    },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    margin: 12,
    paddingVertical: 12,
    paddingHorizontal: 32
  },
});