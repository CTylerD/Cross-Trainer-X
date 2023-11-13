import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function postExerciseSurvey() {

  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How was the exercise?{'\n'}</Text>

      <View style={styles.surveyBox}>
        <Text>Please select difficulty</Text>
      <Picker style={styles.input}
      selectedValue={selectedDifficulty}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedDifficulty(itemValue)
      }>
      <Picker.Item label="Too easy" value="-1" />
      <Picker.Item label="Just right" value="0" />
      <Picker.Item label="Too difficult" value="1" />
    </Picker>
      </View>

      <View style={{margineBottom: 10}}>
        <Button title='Submt'/> 
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