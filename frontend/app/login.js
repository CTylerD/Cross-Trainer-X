import { StyleSheet, Pressable, TextInput, Text, View} from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import axios from 'axios';
import UserContext from './../contexts/userContext';
import {useContext, useState, useEffect} from 'react';


export default function LoginScreen() {

  const [data, setData] = useState({});
  const {user, setUser} = useContext(UserContext);

async function loginRequest(username, password) {

    axios.post('http://localhost:8080/login', {
      "username": username,
      "password": password
    })
    .then(response => response.data)
    .then((data) => {
        setData(data);
    })

    // setUser(data.user)
    console.log(data)

  return <Redirect href="/nav"/>
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
      <TextInput secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
      />
        <Pressable style={styles.button} href='/tabs' onPressIn={() => loginRequest(username, password)}>
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
