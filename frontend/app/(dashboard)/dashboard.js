import { StyleSheet, Pressable, Text, View, Dimensions, ImageBackground, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Link } from 'expo-router';
import { useContext } from 'react';
import Theme from '../../components/Themes';
import ThemeContext from '../../contexts/ThemeContext';
import ExerciseContext from '../../contexts/ExerciseContext';
import UserContext from '../../contexts/userContext';


export default function DashboardScreen() {
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {workout, setWorkout} = useContext(ExerciseContext);
  const {user, setUser} = useContext(UserContext);
  return (
  <ImageBackground source={require('../../assets/images/dashboard.png')} resizeMode="cover" style={{ width: '100%', height: '100%'}}>
  <View style={[styles.container]}>
    <Text style={[styles.title]}>Dashboard</Text>


    <View style={styles.rowContainer}>
        <Card containerStyle={{width: 250, height: 250}}>
        <Card.Title>Today's Workout</Card.Title>
        <Card.Divider/>
        <Text style={{ alignItems: 'center',
                justifyContent: 'center',
                fontSize: 50,
                lineHeight: 21,
                letterSpacing: 0.25,
                color: 'black', marginLeft: 'auto', marginRight: 'auto', marginTop: 50}}>

                  Chest
                </Text>
        </Card>

        <Card containerStyle={{width: 250, height: 250}}>
        <Card.Title>Days Completed</Card.Title>
        <Card.Divider/>
          <Text style={{ alignItems: 'center',
                justifyContent: 'center',
                fontSize: 50,
                lineHeight: 21,
                letterSpacing: 0.25,
                color: 'black', marginLeft: 'auto', marginRight: 'auto', marginTop: 50}}>18</Text>
        </Card>
    </View>
    
    <View style={styles.rowContainer}>
    <Card containerStyle={{width: 250, height: 250,}}>
        <Card.Title>Stats</Card.Title>
        <Card.Divider/>
          <Text style={[styles.text, {color:'black'}]}>
          Avg Workout Time: 54 min 
          {"\n"}
          Longest Workout: 93 min
          {"\n"}
          Grip Strength: 64 psi
          {"\n"}

          </Text>
        </Card>

        <Card containerStyle={{width: 250, height: 250}}>
        <Card.Title>Calories Burned</Card.Title>

        <Card.Divider/>
          <Image style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 100, marginLeft: 'auto', marginRight: 'auto'}} source={require('../../assets/images/fire.png')} />
          <Text style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 25,
                lineHeight: 21,
                letterSpacing: 0.25,
                color: 'black', marginLeft: 'auto', marginRight: 'auto', marginTop: 10

  }}>953</Text>
        </Card>
    </View>

    <Card containerStyle={{width: 530, height: 100}}>

  <Text style={[{marginBottom: 10,}, [styles.text, themed.text, {color:'black'}]]}>
  </Text>
  {workout.workoutComplete ? <View style={[styles.button, themed.button]}><Text style={[styles.text, themed.text]}>Workout Complete</Text></View>:
                              <Link href='/workout' asChild style={[styles.button, themed.button]}><Pressable><Text style={{color:'white'}}>Start Workout</Text></Pressable></Link>}
                              
  
  </Card>
  
  </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 50,
    color: 'white',
    letterSpacing: 0.25,
    fontFamily:'Poppins',
  },
  text: {
    fontSize: 16,
    lineHeight: 40,
    letterSpacing: 0.25,
    color: 'black',
    
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    margin: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    fontWeight: 'bold'
  },
  cardbox: {
    width: 250,
    height: 250,
  },
  picture: {
    paddingLeft: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
});