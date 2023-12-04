import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import UserContext from '../../contexts/userContext';



export default function WelcomeSurvey() {

  const [data, setData] = useState({});
  const {user, setUser} = useContext(UserContext);

  const [firstName, setFirstName]=useState("");
  const [lastName, setLastName]=useState("");
  const [age, setAge]=useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  async function sendSurvey(firstName, lastName, age, gender, weight, height, selectedExperience, selectedPlan) {
    axios.patch('http://localhost:8080/users/65512a7064e79113efca213b',
    {   
      "email": 'mock2@mock.com',  
      "avatarId": 2,
      "firstName": firstName,
      "lastName": lastName,
      "fitnessTrack": selectedPlan,
      "age": age,
      "gender": gender,
      "height": height,
      "weight": weight,
      "experience": selectedExperience
    },
    {
      headers: {
        'authorization': `Bearer ${user}`
      }}).then(response => response.data)
      .then((data) => {
          setData(data);
      },
      console.log(data)
      )

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Survey{'\n'}</Text>

      <View style={styles.surveyBox}>
      <Text>First Name</Text>
      <TextInput
      style={styles.input}
      placeholder='Placeholder'
      onChangeText={(text)=>{setFirstName(text)}}
      value={firstName}
      />
      </View>

      <View style={styles.surveyBox}>
      <Text>Last Name</Text>
      <TextInput
      style={styles.input}
      placeholder='Placeholder'
      onChangeText={(text)=>{setLastName(text)}}
      value={lastName}
      />
      </View>
      
      <View style={styles.surveyBox}>
      <Text>Age</Text>
      <TextInput
      style={styles.input}
      placeholder='Placeholder'
      onChangeText={(text)=>{setAge(text)}}
      value={age}
      />
      </View>

      <View style={styles.surveyBox}>
      <Text>Gender</Text>
      <TextInput
      style={styles.input}
      placeholder='Placeholder'
      onChangeText={(text)=>{setGender(text)}}
      value={gender}
      />
      </View>

      <View style={styles.surveyBox}>
      <Text>Weight (lbs)</Text>
      <TextInput
      style={styles.input}
      placeholder='Placeholder'
      onChangeText={(text)=>{setWeight(text)}}
      value={weight}
      />
      </View>

      <View style={styles.surveyBox}>
      <Text>Height</Text>
      <TextInput
      style={styles.input}
      placeholder='Placeholder'
      onChangeText={(text)=>{setHeight(text)}}
      value={height}
      />
      </View>

      <View style={styles.surveyBox}>
        <Text>Please select which workout plan</Text>
      <Picker style={styles.input}
      selectedValue={selectedPlan}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedPlan(itemValue)
      }>
      <Picker.Item label="Weightlifting" value="weightlifting" />
      <Picker.Item label="Cardio (Running)" value="running" />
      <Picker.Item label="Cardio (Cycling)" value="cycling" />
      <Picker.Item label="Flexibility (Yoga)" value="yoga" />
      <Picker.Item label="Flexibility (Stretching)" value="stretching" />
    </Picker>
      </View>

      <View style={styles.surveyBox}>
        <Text>Please select experience level</Text>
      <Picker style={styles.input}
      selectedValue={selectedExperience}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedExperience(itemValue)
      }>
      <Picker.Item label="Beginner" value="beginner" />
      <Picker.Item label="Intermediate" value="intermediate" />
      <Picker.Item label="Expert" value="expert" />
    </Picker>
      </View>

      <View>
        <Pressable href='tabs' onPressIn={() => sendSurvey(
          firstName, lastName, age, gender, weight, height, selectedExperience, selectedPlan
        )}>  <Text style={styles.text}>Welcome!</Text>
        </Pressable>
        </View>
    </View>
  )
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
  surveyBox: {
    marginBottom: 10,
    marginTop: 10,
  }
});