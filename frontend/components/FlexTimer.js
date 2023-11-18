import { StyleSheet, Pressable, Dimensions,SafeAreaView, ScrollView, Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {useState, useContext} from 'react';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';

export default function FlexTimer({exercise}){

    const [hold, setHold] = useState(false);

    const {theme, setTheme} = useContext(ThemeContext);
    const themed = Theme(theme);

    const endHold = () => {
        setHold(false);
    }

    const beginHold = () => {
        setHold(true)
    }

    return(
        <View style={styles.card_template}>
            {hold ? <CountdownCircleTimer
                        isPlaying
                        duration={exercise.duration}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={() => endHold()}
                    >
                        {({ remainingTime }) => <View style={{alignItems:'center'}}>
                                                <Text style={[styles.text, themed.text, {color:'black'}]}>Hold</Text>
                                                <Text style={[styles.text, themed.text, {color:'black'}]}>{remainingTime}</Text>
                                                </View>}
                    </CountdownCircleTimer>:
                    <Pressable style={styles.button} onPressIn={() => beginHold()}>
                    <Text style={[themed.text, styles.text, {color:'black'}]}>Begin</Text>
                    </Pressable>}
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