import { StyleSheet, Pressable} from 'react-native';
import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';

export default function WorkoutPlanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Plan Here</Text>

      <Link href="/editworkout" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Edit Workout</Text>
        </Pressable>
      </Link>
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
  }
});