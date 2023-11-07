import { useLocalSearchParams } from 'expo-router';
import { Text, View } from '../../../components/Themed';
import { exercises } from '../../../constants/Exercises';
import { StyleSheet } from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Page() {
  const { exercise } = useLocalSearchParams();
  const currExercise = exercises[exercise];

  const [data, setData] = useState('')

  return (
    <View style={styles.container}>
        <Text style={styles.title}>{currExercise.name}{'\n'}</Text>
        <Text style={styles.text}>{currExercise.description}{'\n\n'}</Text>
        <Text style={styles.text}>Sets: 4        Reps: 12{'\n'}</Text>
        <Text style={styles.text}>Previous Weight: N/A</Text>
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
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
    },
});