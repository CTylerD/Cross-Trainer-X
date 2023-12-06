import {useContext, useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Pressable } from 'react-native';
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import React from 'react';
import Theme from '../../components/Themes';
import ThemeContext from '../../contexts/ThemeContext';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { Link } from 'expo-router';

export default function ProfileScreen() {

  const [data, setData] = useState({});
  const {user, setUser} = useContext(UserContext);
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
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

    <ScrollView>
      <View style={[styles.container, themed.container]}>
        <View style={[styles.container,{alignItems:'left',paddingTop:0, paddingLeft:17}]}>
        <Link href="/dashboard" asChild>
            <Text style={{fontSize:20, color:themed.text.color}}>⇦</Text>
        </Link>
        </View>
        <Text style={[styles.title, themed.text]}>Profile</Text>
        <Text style={[styles.text, themed.text]}>Choose Theme</Text>
        <View style={[styles.card_template, themed.card]}>
            <ThemeSwitcher />
        </View>
        <Text style={[styles.text, themed.text]}>Personal Information</Text>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Name: {data.firstName} {data.lastName}</Text>
        </View>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Location: {data.city}, {data.state}</Text>
        </View>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Email: {data.email}</Text>
        </View>
        <Text style={[styles.text, themed.text]}>Fitness Information</Text>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Fitness Track: {data.fitnessTrack}</Text>
        </View>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Age: {data.age}</Text>
        </View>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Height: {data.height}</Text>
        </View>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Weight: {data.weight}</Text>
        </View>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Gender: {data.gender}</Text>
        </View>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Max Bench Press: 135</Text>
        </View>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Max Squat: 225</Text>
        </View>
        <View style={[styles.card_template, themed.card]}>
            <Text style={[styles.text, themed.text]}>Max Deadlift: 405</Text>
        </View>
      </View>
    </ScrollView>
)}


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    width: screenWidth,
    paddingTop: 60
    
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    color: 'white',
    letterSpacing: 0.25,
    fontFamily:'Poppins',
  },
  text: {
    fontSize: 16,
    flexWrap:'wrap'
    
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
  card_template:{
    width: screenWidth *.95,
    margin: 3,
    elevation: 3,
    borderRadius: 15,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    flexDirection:'column',
    paddingVertical: 15,
    paddingHorizontal:5,
    alignItems:'center',
    opacity:.90,
    borderWidth:1,
    alignItems:'left'
  },
});