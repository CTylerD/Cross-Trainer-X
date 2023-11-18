import React, {useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';
import {Picker} from '@react-native-picker/picker'

export default function PostExerciseModal({exercise}){

  const [modalVisible, setModalVisible] = useState(false);
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);

  const [selectedDifficulty, setSelectedDifficulty] = useState("");


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
            <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <Pressable
              accessibilityRole="button"
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, themed.text]}>Submit</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        accessibilityRole="button"
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={[themed.text,{color:'black'}]}>Complete Workout</Text>
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
    backgroundColor: 'white',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
