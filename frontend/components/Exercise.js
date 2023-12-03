import { StyleSheet, Pressable, Dimensions,SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { useContext} from 'react';
import ThemeContext from '../contexts/ThemeContext';
import ExerciseContext from '../contexts/ExerciseContext';
import UserContext from '../contexts/userContext';
import Theme from '../components/Themes';
import axios from 'axios';


export default function Exercises({exercises}) {

  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {workout, setWorkout} = useContext(ExerciseContext);

  console.log('Exercise workout list');

  const {user, setUser} = useContext(UserContext);
  axios.defaults.headers.post['Authorization'] = `Bearer ${user}`;

  const complete = () => {
    const now = new Date();
    // axios.patch(`http://localhost:8080/workouts/${workout.workoutId}`, {"dateCompleted":now});
    setWorkout({...workout, workoutComplete:true});
    router.replace('/dashboard');
  }

  return (

    <View style={[styles.container, themed.container]}>
      <Text style={[styles.title, themed.text]}>Today's Workout</Text>
    <ScrollView contentContainerStyle={[styles.scrollView]}>
    {Object.values(exercises).map((exercise) => {
      return (
        <Link href={`/exercise/${exercise.id}`} asChild>
          <Pressable disabled={workout[exercise.id]}
                     accessibilityRole="button"
                     >
              <View style={[styles.card, themed.card]}>
              <Text style={[{fontSize:16},themed.text]}>{exercise.name}</Text>
              {workout[exercise.id] ? <View style={{alignItems:'center'}}><Text style={themed.text}>Complete</Text></View>:
              null}
              </View>
          </Pressable>
        </Link>

      )
    })}
    <View style={[styles.button, themed.button,{alignSelf:'center'}]}>
      <Pressable onPressIn={() => complete()} ><Text style={themed.text}>Complete Workout</Text></Pressable>
    </View>

    </ScrollView>
  </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60
  },
  scrollView: {
    width:screenWidth,
    paddingBottom:50
  },
  title: {
    fontSize: 20,
  },
  largetext: {
    fontSize: 30,
  },
  card: {
    height:screenHeight*.18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 3,
    margin: 12,
    paddingVertical: 10,
    paddingHorizontal: 32
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    margin: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
});
