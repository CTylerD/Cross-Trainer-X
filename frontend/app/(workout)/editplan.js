import { StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, View} from 'react-native';
import DeleteModal from '../../components/DeleteModal';
import {useContext, useState, useEffect} from 'react';
import Theme from '../../components/Themes';
import ThemeContext from '../../contexts/ThemeContext';
import AddModal from '../../components/AddModal';
import axios from 'axios';

export default function EditPlanScreen() {

  const auth = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik11bUdhNXVhSjVyR3N0M3kzTWp1NyJ9.eyJuaWNrbmFtZSI6InVzZXIxIiwibmFtZSI6InVzZXIxQG1vY2suY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2IxMDliMjZjZmJhMjFhMzRiNmFkMjI2Yzk3MjQ4YTdlP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdXMucG5nIiwidXBkYXRlZF9hdCI6IjIwMjMtMTEtMTlUMDA6MjE6NTUuNDYwWiIsImVtYWlsIjoidXNlcjFAbW9jay5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vY3Jvc3MtdHJhaW5lci14LnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJDN1VQR3FqODRhbjhGbzJGdVl6Q0IyU0E2SHdaQzg5eSIsImlhdCI6MTcwMDM1MzMxNiwiZXhwIjoxNzAwMzg5MzE2LCJzdWIiOiJhdXRoMHw2NTUxMmEzYjc0MDlmMTMwMjE4NTc3MjAiLCJzaWQiOiJ5akRHRVEzNmFyVEw1ejBUVndmZFVrYXptS1ZYWGhubyJ9.H8cFcpcSUvHAYLnOqAs6rrffhEgazYE6jsaKWhRfb_ZcSGO1qiXfOcywS13bRbBgRaTo4og3AEoAB2t6O5al3oFdK4jzqDyRAE6MzeCiWaf_I24J9j7pyCb4TZrxXipqlVb_JxXAXRdU2N4pZzXmZzGDIq-9A58X4iqBO9qvpoAsNinr9DY-HzFSCf6-vm6E4o8v07i7YYkvdaJ5aRRBk1OKlrrT02-h54W8gqLhHlresRr0RN01sibKhU1Kx0ENgznmw-mQp3Z96KTxcTVMyF_Fgui1Z2JWH5pgx-lH7EvPCDvxbJCa0Xre_iO-b7Zd34HGrtQ0YCsLrdKocMBTRg";
  const [exercises, setExercises] = useState({});
  console.log("Performing Get");
  
  useEffect(() => {
    axios.get('http://localhost:8080/exercises', {
      headers: {
          'authorization': `Bearer ${auth}`
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
    <SafeAreaView style={[styles.container, themed.container]}>
      <Text style={[styles.largetext, themed.text]}>Edit Fitness Plan</Text>
      <ScrollView style={[themed.container, styles.scrollView]}>
      <AddModal/>
      <Text style={[styles.title, themed.text, styles.container]}>Strength</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Strength')
        return (
          <View style={styles.card_template} key={exercise.id}>
            <Text style={[themed.text, {flex:4, color:'black'}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise}/>
            
          </View>
        )
      })}
      <Text style={[styles.title, themed.text, styles.container]}>Flexibility</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Flexibility')
        return (
          <View style={styles.card_template} key={exercise.id}>
            <Text style={[themed.text, {flex:4, color:'black'}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise}/>
            
          </View>
        )
      })}
      <Text style={[styles.title, themed.text, styles.container]}>Cardio</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Cardio')
        return (
          <View style={styles.card_template} key={exercise.id}>
            <Text style={[themed.text, {flex:4, color:'black'}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise}/>
            
          </View>
        )
      })}
      </ScrollView>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginHorizontal: 0,
    width: screenWidth
  },
  title: {
    fontSize: 20,
  },
  largetext: {
    fontSize: 30,
  },
  card_template:{
    width: '100&',
    height:'auto',
    margin: 3,
    borderWidth: 1,
    backgroundColor: 'lightgray',
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "space-between",
    flexDirection:'row'
  },
});