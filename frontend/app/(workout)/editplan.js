import { StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, View} from 'react-native';
import { exercises } from '../../constants/Exercises';
import DeleteModal from '../../components/DeleteModal';
import {useContext} from 'react';
import Theme from '../../components/Themes';
import ThemeContext from '../../contexts/ThemeContext';

export default function EditPlanScreen() {

  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);

  return (
    <SafeAreaView style={[styles.container, themed.container]}>
      <Text style={[styles.largetext, themed.text]}>Edit Fitness Plan</Text>
      <ScrollView style={[themed.container, styles.scrollView]}>
      <Text style={[styles.title, themed.text, styles.container]}>Chest, Triceps, and Shoulders</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Push')
        return (
          <View style={styles.card_template} key={exercise.e_id}>
            <Text style={[themed.text, {flex:4, color:'black'}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise.name}/>
            
          </View>
        )
      })}
      <Text style={[styles.title, themed.text, styles.container]}>Back and Biceps</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Pull')
        return (
          <View style={styles.card_template} key={exercise.e_id}>
            <Text style={[themed.text, {flex:4, color:'black'}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise.name}/>
            
          </View>
        )
      })}
      <Text style={[styles.title, themed.text, styles.container]}>Legs</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Legs')
        return (
          <View style={styles.card_template} key={exercise.e_id}>
            <Text style={[themed.text, {flex:4, color:'black'}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise.name}/>
            
          </View>
        )
      })}
      <Text style={[styles.title, themed.text, styles.container]}>Yoga</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Yoga')
        return (
          <View style={styles.card_template} key={exercise.e_id}>
            <Text style={[themed.text, {flex:4, color:'black'}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise.name}/>
            
          </View>
        )
      })}
      <Text style={[styles.title, themed.text, styles.container]}>Cardio</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Cardio')
        return (
          <View style={styles.card_template} key={exercise.e_id}>
            <Text style={[themed.text, {flex:4, color:'black'}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise.name}/>
            
          </View>
        )
      })}
      <Text style={[styles.title, themed.text, styles.container]}>Stretch</Text>
      {Object.values(exercises).map((exercise) => {
        if(exercise.type == 'Stretch')
        return (
          <View style={styles.card_template} key={exercise.e_id}>
            <Text style={[themed.text, {flex:4, color:'black'}]}>    {exercise.name}{'\n'}</Text>
            <DeleteModal style={{flex:1}} exercise={exercise.name}/>
            
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