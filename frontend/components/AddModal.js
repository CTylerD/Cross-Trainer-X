import React, {useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, Dimensions, View} from 'react-native';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';

export default function AddModal(){

  const [modalVisible, setModalVisible] = useState(false);
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);

  const [type, setType] = useState('Strength');

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
            <Picker
            style={styles.picker}
            selectedValue={type}
            onValueChange={currentType => setType(currentType)}>
            <Picker.Item style={{color:'black'}}label="Strength" value="Strength" />
            <Picker.Item label="Yoga" value="Yoga" />
            <Picker.Item label="Stretch" value="Stretch" />
            <Picker.Item label="Cardio" value="Cardio" />
            </Picker>
            <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <Pressable
              accessibilityRole="button"
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
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
        onPress={() => setModalVisible(true)}>
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
  }
});