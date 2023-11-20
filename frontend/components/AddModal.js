import React, {useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, TextInput, Pressable, Dimensions, View} from 'react-native';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function AddModal(){

  

  const [modalVisible, setModalVisible] = useState(false);
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);

  const initialState = {}
  const [exercise, setExercise] = useState(initialState);

  const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik11bUdhNXVhSjVyR3N0M3kzTWp1NyJ9.eyJuaWNrbmFtZSI6InVzZXIxIiwibmFtZSI6InVzZXIxQG1vY2suY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2IxMDliMjZjZmJhMjFhMzRiNmFkMjI2Yzk3MjQ4YTdlP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdXMucG5nIiwidXBkYXRlZF9hdCI6IjIwMjMtMTEtMTlUMDA6MjE6NTUuNDYwWiIsImVtYWlsIjoidXNlcjFAbW9jay5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vY3Jvc3MtdHJhaW5lci14LnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJDN1VQR3FqODRhbjhGbzJGdVl6Q0IyU0E2SHdaQzg5eSIsImlhdCI6MTcwMDM1MzMxNiwiZXhwIjoxNzAwMzg5MzE2LCJzdWIiOiJhdXRoMHw2NTUxMmEzYjc0MDlmMTMwMjE4NTc3MjAiLCJzaWQiOiJ5akRHRVEzNmFyVEw1ejBUVndmZFVrYXptS1ZYWGhubyJ9.H8cFcpcSUvHAYLnOqAs6rrffhEgazYE6jsaKWhRfb_ZcSGO1qiXfOcywS13bRbBgRaTo4og3AEoAB2t6O5al3oFdK4jzqDyRAE6MzeCiWaf_I24J9j7pyCb4TZrxXipqlVb_JxXAXRdU2N4pZzXmZzGDIq-9A58X4iqBO9qvpoAsNinr9DY-HzFSCf6-vm6E4o8v07i7YYkvdaJ5aRRBk1OKlrrT02-h54W8gqLhHlresRr0RN01sibKhU1Kx0ENgznmw-mQp3Z96KTxcTVMyF_Fgui1Z2JWH5pgx-lH7EvPCDvxbJCa0Xre_iO-b7Zd34HGrtQ0YCsLrdKocMBTRg";
  axios.defaults.headers.post['Authorization'] = `Bearer ${auth}`;

  const add = () => {
    console.dir(exercise);
    axios.post('http://localhost:8080/exercises', exercise);
  }

  return (
    <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, themed.text, {color:'black'}]}>Add New Exercise</Text>
            <TextInput
              style={styles.input}
              onChangeText={currentName => setExercise({...exercise, name:currentName })}
              value={exercise.name}
              placeholder="Exercise Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={currentDesc => setExercise({...exercise, description:currentDesc })}
              value={exercise.description}
              placeholder="Description of Exercise"
            />
            <Picker
            style={styles.picker}
            selectedValue={exercise.type}
            onValueChange={currentType => setExercise({...exercise, type:currentType })}>
            <Picker.Item label="..." value={null} />
            <Picker.Item label="Strength" value="Strength" />
            <Picker.Item label="Yoga or Stretch" value="Flexibility" />
            <Picker.Item label="Cardio" value="Cardio" />
            </Picker>
            {exercise.type === 'Strength' ? (<View style={styles.centeredView}>
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.secondaryType}
                                              onValueChange={currentSType => setExercise({...exercise, secondaryType:currentSType })}>
                                              <Picker.Item label="..." value={null} />
                                              <Picker.Item label="Push" value="Push" />
                                              <Picker.Item label="Pull" value="Pull" />
                                              <Picker.Item label="Legs" value="Legs" />
                                              </Picker>
                                              {exercise.secondaryType === 'Push' ? <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.muscleGroup}
                                              onValueChange={currentMG => setExercise({...exercise, muscleGroup:currentMG })}>
                                              <Picker.Item label="Select Muscle Group" value={null} />
                                              <Picker.Item label="Chest" value="Chest" />
                                              <Picker.Item label="Shoulders" value="Shoulders" />
                                              <Picker.Item label="Triceps" value="Triceps" />
                                              </Picker>:null}
                                              {exercise.secondaryType === 'Pull' ? <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.muscleGroup}
                                              onValueChange={currentMG => setExercise({...exercise, muscleGroup:currentMG })}>
                                              <Picker.Item label="Select Muscle Group" value={null} />
                                              <Picker.Item label="Back" value="Back" />
                                              <Picker.Item label="Biceps" value="Biceps" />
                                              <Picker.Item label="Deltoids" value="Deltoids" />
                                              </Picker>:null}
                                              {exercise.secondaryType === 'Legs' ? <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.muscleGroup}
                                              onValueChange={currentMG => setExercise({...exercise, muscleGroup:currentMG })}>
                                              <Picker.Item label="Select Muscle Group" value={null} />
                                              <Picker.Item label="Calves" value="Calves" />
                                              <Picker.Item label="Glutes" value="Glutes" />
                                              <Picker.Item label="Hamstrings" value="Hamstrings" />
                                              <Picker.Item label="Quads" value="Quads" />
                                              </Picker>:null}
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentEquip => setExercise({...exercise, equipment:currentEquip })}
                                                value={exercise.equipment}
                                                placeholder="Equipment"
                                              />
                                              <View style={styles.rowContainer}>
                                              <View style={{alignItems:'center'}}>
                                              <Text>Reps:</Text>
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentReps => setExercise({...exercise, reps:Number(currentReps) })}
                                                value={exercise.reps}
                                                placeholder="Number of Reps"
                                              />
                                              </View>
                                              <View style={{alignItems:'center'}}>
                                              <Text>Sets:</Text>
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentSets => setExercise({...exercise, sets:Number(currentSets) })}
                                                value={exercise.sets}
                                                placeholder="Number of Sets"
                                              />
                                              </View>
                                              <View style={{alignItems:'center'}}>
                                              <Text>Weight:</Text>
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentWeight => setExercise({...exercise, weight:Number(currentWeight)})}
                                                value={exercise.weight}
                                                placeholder="Weight(lbs)"
                                              />
                                              </View>
                                              </View>
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.weightClass}
                                              onValueChange={currentWC => setExercise({...exercise, weightClass:currentWC })}>
                                              <Picker.Item label="..." value={null} />
                                              <Picker.Item label="Bodyweight" value="Bodyweight" />
                                              <Picker.Item label="Dumbbell" value="Dumbbell" />
                                              <Picker.Item label="Barbell" value="Barbell" />
                                              </Picker>
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentRest => setExercise({...exercise, rest:Number(currentRest) })}
                                                value={exercise.rest}
                                                placeholder="Rest Time(Seconds)"
                                              />
                                              </View>):null}
            {exercise.type === 'Cardio' ? (<View style={styles.centeredView}>
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.secondaryType}
                                              onValueChange={currentSType => setExercise({...exercise, secondaryType:currentSType })}>
                                              <Picker.Item label="..." value={null} />
                                              <Picker.Item label="Running" value="Running" />
                                              <Picker.Item label="Cycling" value="Cycling" />
                                              </Picker>
                                              <View style={styles.rowContainer}>
                                              <View>
                                              <Text>Duration(minutes):</Text>
                                              <TextInput
                                              style={styles.input}
                                              onChangeText={currentDuration => setExercise({...exercise, duration:Number(currentDuration) })}
                                              value={exercise.duration}
                                              placeholder="Duration(minutes)"
                                              />
                                              </View>
                                              <View>
                                              <Text>Distance(miles):</Text>
                                              <TextInput
                                              style={styles.input}
                                              onChangeText={currentDistance => setExercise({...exercise, distance:Number(currentDistance) })}
                                              value={exercise.distance}
                                              placeholder="Distance(miles)"
                                              />
                                              </View>
                                              </View>
                                            </View>):null}
            {exercise.type === 'Flexibility' ? (<View style={styles.centeredView}>
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.secondaryType}
                                              onValueChange={currentSType => setExercise({...exercise, secondaryType:currentSType })}>
                                              <Picker.Item label="..." value={null} />
                                              <Picker.Item label="Yoga" value="Yoga" />
                                              <Picker.Item label="Stretching" value="Stretching" />
                                              </Picker>
                                              <Text>Duration(seconds):</Text>
                                              <TextInput
                                              style={styles.input}
                                              onChangeText={currentDuration => setExercise({...exercise, duration:Number(currentDuration) })}
                                              value={exercise.duration}
                                              placeholder="Duration(seconds)"
                                              />
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.difficulty}
                                              onValueChange={currentDiff => setExercise({...exercise, difficulty:Number(currentDiff) })}>
                                              <Picker.Item label="Select Difficulty" value={null} />
                                              <Picker.Item label="Beginner" value="1" />
                                              <Picker.Item label="Intermediate" value="2" />
                                              <Picker.Item label="Advanced" value="3" />
                                              </Picker>
                                              </View>):null}                                              



            <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <Pressable
              accessibilityRole="button"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible); add()}}>
              <Text style={[styles.textStyle, themed.text]}>Add</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, themed.text]}>Cancel</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        accessibilityRole="button"
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {setModalVisible(true); setExercise(initialState)}}>
        <Text style={styles.textStyle}>+Add New</Text>
      </Pressable>
    </View>
  );
};

const screenWidth = (Dimensions.get('window').width) * .75

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: screenWidth,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'black',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  picker: {
    width: 150
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
  rowContainer: {
    flexDirection:'row'
  }
});