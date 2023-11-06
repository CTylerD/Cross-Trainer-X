import { StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import { Text, View } from '../../components/Themed';
import { exercises } from '../../constants/Exercises';
import DeleteModal from '../../components/DeleteModal';

export default function EditPlanScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Fitness Plan</Text>
      <ScrollView style={styles.scrollView}>
      {Object.values(exercises).map((exercise) => {
        return (
          <View style={styles.card_template} key={exercise.e_id}>
            <Text style={{flex:4}}>{exercise.name}{`\n`}{exercise.description}</Text>
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
    backgroundColor: 'white',
    marginHorizontal: 0,
    width: screenWidth

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  largetext: {
    fontSize: 40,
    fontWeight: 'bold',
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