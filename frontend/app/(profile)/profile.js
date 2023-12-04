import {useContext, useState, useEffect} from 'react';
import { StyleSheet, Pressable, Text, View, ImageBackground, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import React from 'react'

export default function ProfileScreen() {

  const [data, setData] = useState({});
  const {user, setUser} = useContext(UserContext);
  useEffect(() => {
    axios.get(`http://localhost:8080/users/65512a7064e79113efca213b`, {
      headers: {
          'authorization': `Bearer ${user}`
      }
      })
      .then(response => response.data)
      .then((data) => {
          setData(data);
      });
    },[])

    return (
      
  <ImageBackground source={require('../../assets/images/freeweights.png')} resizeMode="cover" style={{ width: '100%', height: '100%'}}>
  <View style={[styles.container]}>
    <Text style={[styles.title]}>Profile</Text>

    <View style={styles.rowContainer}>
        <Card containerStyle={{width: 500, height: 750}}>
        <Card.Title style={{}}>Your Info</Card.Title>
        <Card.Divider/>
        <Text style={styles.textBox}>

                {data.firstName} {data.lastName}
                {'\n'}
                {data.city}, {data.state}
                {'\n'}
                {data.email}

                </Text>

                <Card.Divider/>

      <Text style={styles.textBox}>
        Workout Track: {data.fitnessTrack}
        {'\n'}
        Age: {data.age}
        {'\n'}
        Height: {data.height}
        {'\n'}
        Weight: {data.weight}
        {'\n'}
        Gender: {data.gender}
        {'\n'}

        Max Bench Press: 135
        {'\n'}
        Max Squat: 225
        {'\n'}
        Max Deadlift: 405
        
        </Text>
                
              
        </Card>

  </View>
  </View>
    </ImageBackground>
)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    rowContainer: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      flexDirection: 'row',
    },
    title: {
      fontSize: 50,
      color: 'white',
      letterSpacing: 0.25,
      fontFamily:'Poppins',
    },
    text: {
      fontSize: 16,
      lineHeight: 40,
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
      paddingHorizontal: 32,
      fontWeight: 'bold'
    },
    cardbox: {
      width: 250,
      height: 250,
    },
    picture: {
      paddingLeft: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100,
    },
    textBox: {
      fontSize: 30,
      letterSpacing: 0.25,
      color: 'black', marginTop: 12, marginBottom: 12,  lineHeight: 50
    }
  });