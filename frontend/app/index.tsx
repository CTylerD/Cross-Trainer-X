import { StyleSheet, Pressable, Text, View, ImageBackground} from 'react-native';
import { Link } from 'expo-router';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Theme from '../components/Themes';

export default function WelcomeScreen() {
  
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);


  return (
    <ImageBackground source={require('../assets/images/welcome.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
    <View style={[styles.container]}>
      <Text style={[styles.title, themed.text]}>Welcome to CrossTrainerX!{'\n'}</Text>
      <Link href="/login" asChild>
        <Pressable style={styles.button} accessibilityRole="button">
          <Text style={[styles.text, themed.text, {color:'black'} ]}>Login</Text>
        </Pressable>
      </Link>
      <Link href="/create" asChild>
        <Pressable style={styles.button} accessibilityRole="button">
          <Text style={[styles.text, themed.text, {color:'black'} ]}>Create Account</Text>
        </Pressable>
      </Link>
       <Link href="/nav">
         <Text style={themed.text}>Nav Links For Dev</Text>
       </Link>
    </View> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#000000a0'
  },
  title: {
    fontSize: 20
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
    letterSpacing: 0.25,
    color: 'black',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  }
});