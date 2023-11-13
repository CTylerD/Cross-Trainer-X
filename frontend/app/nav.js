import { StyleSheet, Pressable, Text, View, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import Theme from '../components/Themes';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function NavScreen() {

  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);

  return (
    <View style={[themed.container,styles.container]}>
      
      <Text style={[themed.text ,styles.title]}>Nav Links for Dev{'\n'}</Text>
      <ThemeSwitcher/>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={[themed.text,styles.text]}>Welcome Screen</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/login" asChild>
        <Pressable style={styles.button}>
          <Text style={[themed.text,styles.text]}>Login</Text>
        </Pressable>
      </Link>

      <Link href="/create" asChild>
        <Pressable style={styles.button}>
          <Text style={[themed.text,styles.text]}>Create Account</Text>
        </Pressable>
      </Link>

      <Link href="/dashboard" asChild>
        <Pressable style={styles.button}>
          <Text style={[themed.text,styles.text]}>Dashboard</Text>
        </Pressable>
      </Link>

      <Link href="/editplan" asChild>
        <Pressable style={styles.button}>
          <Text style={[themed.text,styles.text]}>Edit Fitness Plan</Text>
        </Pressable>
      </Link>

      <Link href="/workout" asChild>
        <Pressable style={styles.button}>
          <Text style={[themed.text,styles.text]}>Workout</Text>
        </Pressable>
        </Link>

      <Link href="/tabs" asChild>
      <Pressable style={styles.button}>
        <Text style={[themed.text,styles.text]}>Bottom Tabs</Text>
      </Pressable>
      </Link>

      <Link href="/welcomesurvey" asChild>
      <Pressable style={styles.button}>
        <Text style={[themed.text,styles.text]}>Welcome Survey</Text>
      </Pressable>
      </Link>

      <Link href="/postexercisesurvey" asChild>
      <Pressable style={styles.button}>
        <Text style={[themed.text,styles.text]}>Post Exercise Survey</Text>
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
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.25,
    color: 'black'
  }
});