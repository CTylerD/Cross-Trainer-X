import { StyleSheet, Pressable, TextInput, Text, View} from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import axios from 'axios';


export default function LoginScreen() {

  const post = () => {
      axios.post("http://localhost:8080/login", [])
  }

  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login{'\n'}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
      />
        <Pressable style={styles.button} onPress={() => post()}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    width: 175,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});
