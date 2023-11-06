import { StyleSheet, Pressable} from 'react-native';
import { Text, View } from '../components/Themed'
import React, {useState} from 'react';
import { exercises } from '../constants/Exercises';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Exercises() {

  return (

    <View style={[styles.container]} >
        <Link href={`/exercise/${exercises[0].e_id}`} asChild>
        <Pressable style={styles.card_template}>
            <Text style={[styles.title]} >{exercises[0].name}</Text>
        </Pressable>
        </Link>
        <Link href={`/exercise/${exercises[1].e_id}`} asChild>
            <Pressable style={styles.card_template}>
                <Text style={[styles.title]} >{exercises[1].name}</Text>
            </Pressable>
        </Link>
        <Link href={`/exercise/${exercises[2].e_id}`} asChild>
            <Pressable style={styles.card_template}>
                <Text style={[styles.title]} >{exercises[2].name}</Text>
            </Pressable>
        </Link>
        <Link href={`/exercise/${exercises[3].e_id}`} asChild>
            <Pressable style={styles.card_template}>
                <Text style={[styles.title]} >{exercises[3].name}</Text>
            </Pressable>
        </Link>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card_template:{
    width: '30%',
    height:'50%',
    margin: 3,
    borderWidth: 1,
    backgroundColor: 'lightgray',
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
});