import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

export default function DashboardScreen() {
  return (

  <View style={styles.container}>
    <Text style={styles.title}>Dashboard</Text>

    <View style={styles.rowContainer}>
        <Card>
        <Card.Title>Workout Title Card</Card.Title>
        <Card.Divider/>
          <Text style={styles.text}>Text</Text>
        </Card>

        <Card>
        <Card.Title>Day in the week card</Card.Title>
        <Card.Divider/>
          <Text style={styles.text}>Text</Text>
        </Card>
    </View>
    
    <View style={styles.rowContainer}>
        <Card>
        <Card.Title>Statistics Info Card</Card.Title>
        <Card.Divider/>
          <Text style={styles.text}>Text</Text>
        </Card>

        <Card>
        <Card.Title>Additional Info Card</Card.Title>
        <Card.Divider/>
          <Text style={styles.text}>Text</Text>
        </Card>
    </View>

  <Card>
  <Card.Title>Maybe card gets a title here</Card.Title>
  <Card.Divider/>
  <Text style={{marginBottom: 10,}}>
    Click this blue button!
  </Text>

  <Button
   // icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='START WORKOUT' />
  </Card>
  
  </View>
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
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
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
    paddingHorizontal: 32
  }
});