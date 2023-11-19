import React, {useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';
import axios from 'axios';

export default function DeleteModal({exercise}){

  const [modalVisible, setModalVisible] = useState(false);
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);

  const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik11bUdhNXVhSjVyR3N0M3kzTWp1NyJ9.eyJuaWNrbmFtZSI6InVzZXIxIiwibmFtZSI6InVzZXIxQG1vY2suY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2IxMDliMjZjZmJhMjFhMzRiNmFkMjI2Yzk3MjQ4YTdlP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdXMucG5nIiwidXBkYXRlZF9hdCI6IjIwMjMtMTEtMTlUMDA6MjE6NTUuNDYwWiIsImVtYWlsIjoidXNlcjFAbW9jay5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vY3Jvc3MtdHJhaW5lci14LnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJDN1VQR3FqODRhbjhGbzJGdVl6Q0IyU0E2SHdaQzg5eSIsImlhdCI6MTcwMDM1MzMxNiwiZXhwIjoxNzAwMzg5MzE2LCJzdWIiOiJhdXRoMHw2NTUxMmEzYjc0MDlmMTMwMjE4NTc3MjAiLCJzaWQiOiJ5akRHRVEzNmFyVEw1ejBUVndmZFVrYXptS1ZYWGhubyJ9.H8cFcpcSUvHAYLnOqAs6rrffhEgazYE6jsaKWhRfb_ZcSGO1qiXfOcywS13bRbBgRaTo4og3AEoAB2t6O5al3oFdK4jzqDyRAE6MzeCiWaf_I24J9j7pyCb4TZrxXipqlVb_JxXAXRdU2N4pZzXmZzGDIq-9A58X4iqBO9qvpoAsNinr9DY-HzFSCf6-vm6E4o8v07i7YYkvdaJ5aRRBk1OKlrrT02-h54W8gqLhHlresRr0RN01sibKhU1Kx0ENgznmw-mQp3Z96KTxcTVMyF_Fgui1Z2JWH5pgx-lH7EvPCDvxbJCa0Xre_iO-b7Zd34HGrtQ0YCsLrdKocMBTRg";
  axios.defaults.headers.delete['Authorization'] = `Bearer ${auth}`;

  const deleteExercise = () => {
    console.log(exercise);
    axios.delete(`http://localhost:8080/exercises/${exercise.id}`);
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
            <Text style={[styles.modalText, themed.text, {color:'black'}]}>Delete {exercise.name} from Fitness Plan?</Text>
            <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <Pressable
              accessibilityRole="button"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible);deleteExercise()}}>
              <Text style={[styles.textStyle, themed.text]}>Confirm</Text>
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
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>⌫</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
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
});
