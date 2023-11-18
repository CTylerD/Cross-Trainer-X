import { StyleSheet, Pressable, Dimensions,SafeAreaView, ScrollView, Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {useState, useContext} from 'react';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';

export default function StrengthTimer({exercise}){

    const weight = "40 lbs--Bar Only";
    const reps = "12";
    const [set, setSet] = useState(4);
    const [rest, setRest] = useState(false);

    const {theme, setTheme} = useContext(ThemeContext);
    const themed = Theme(theme);

    const endRest = () => {
        setRest(false);
    }

    const beginRest = () => {
        if(set > 0){setSet(set-1);setRest(true);}
    }

    return(
        <View style={styles.card_template}>
            <Text style={[themed.text, {color:'black'}]}>Weight: {weight}</Text>
            <Text style={[themed.text, {color:'black'}]}>Sets Left: {set}</Text>
            <Text style={[themed.text, {color:'black'}]}>Reps Left: {reps}</Text>
            <View style={[styles.card_template, {borderWidth:0}]}>
            {rest ? <CountdownCircleTimer
                        isPlaying
                        duration={exercise.duration}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={() => endRest()}
                    >
                        {({ remainingTime }) => <View style={{alignItems:'center'}}>
                                                <Text style={[styles.text, themed.text, {color:'black'}]}>Rest</Text>
                                                <Text style={[styles.text, themed.text, {color:'black'}]}>{remainingTime}</Text>
                                                </View>}
                    </CountdownCircleTimer>:
                    <Pressable style={styles.button} onPressIn={() => beginRest()}>
                    <Text style={[themed.text, styles.text, {color:'black'}]}>Complete Set</Text>
                    </Pressable>}
            </View>
        </View>
    )

}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card_template:{
        width: (screenWidth),
        height:'auto',
        margin: 10,
        padding: 5,
        borderWidth: 1,
        backgroundColor: 'darkgray',
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
        justifyContent: "center",
        alignItems: 'center',
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
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25
      }
  });