import { StyleSheet, Pressable, Text, View} from 'react-native';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CrossTrainerX!{'\n'}</Text>

      <Link href="/login" asChild>
        <Pressable style={styles.button} accessibilityRole="button">
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </Link>
      <Link href="/create" asChild>
        <Pressable style={styles.button} accessibilityRole="button">
          <Text style={styles.text}>Create Account</Text>
        </Pressable>
      </Link>

      <Link href="/nav" asChild>
        <Text>Nav Links For Dev</Text>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  }
});