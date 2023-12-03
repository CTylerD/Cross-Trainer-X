import { StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, View} from 'react-native';
import DeleteModal from '../../components/DeleteModal';
import {useContext, useState, useEffect} from 'react';
import Theme from '../../components/Themes';
import ThemeContext from '../../contexts/ThemeContext';
import UserContext from '../../contexts/userContext';
import AddModal from '../../components/AddModal';
import axios from 'axios';


export default function EditPlanScreen() {

  const [exercises, setExercises] = useState({});
  const {user, setUser} = useContext(UserContext);
  console.log("Performing Get");
  
  useEffect(() => {
    axios.get('http://localhost:8080/exercises', {
      headers: {
          'authorization': `Bearer ${user}`
      }
      })
      .then(response => response.data)
      .then((data) => {
          setExercises(data);
      });
    },[])

  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);

  return (
    <View style={[styles.container, themed.container]}>
      <Text style={[styles.largetext, themed.text]}>Edit Fitness Plan</Text>
      <ScrollView style={[themed.container, styles.scrollView]} contentContainerStyle={{alignItems:'center', paddingBottom:30}}>
      <Text style={[styles.title, themed.text]}>Strength</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Strength')
        return (
          <View style={[styles.card_template, themed.card]} key={exercise.id}>
            <Text style={[themed.text, {flex:2}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise}/>
            
          </View>
        )
      })}
      <Text style={[styles.title, themed.text]}>Flexibility</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Flexibility')
        return (
          <View style={[styles.card_template, themed.card]} key={exercise.id}>
            <Text style={[themed.text, {flex:2}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise}/>
            
          </View>
        )
      })}
      <Text style={[styles.title, themed.text]}>Cardio</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Cardio')
        return (
          <View style={[styles.card_template, themed.card]} key={exercise.id}>
            <Text style={[themed.text, {flex:2}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise}/>
            
          </View>
        )
      })}
        <AddModal/>
      </ScrollView>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60
  },
  scrollView: {
    marginHorizontal: 0,
    width: screenWidth,
  },
  title: {
    fontSize: 20,
  },
  largetext: {
    fontSize: 30,
  },
  card_template:{
    width: screenWidth * .9,
    height:'auto',
    margin: 3,
    elevation: 3,
    borderRadius: 15,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    justifyContent: "center",
    flexDirection:'row',
    paddingVertical: 15
  },
});