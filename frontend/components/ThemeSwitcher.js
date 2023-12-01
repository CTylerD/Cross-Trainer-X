import React, { useContext } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import ThemeContext from "../contexts/ThemeContext";

export default function ThemeSwitcher(){
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    
    <View style={[styles.container]}>
      <Pressable style={[styles.button]} onPress={() => setTheme("pink")} accessibilityRole="button">
        <Text>Pink</Text>
      </Pressable>
      <Pressable style={[styles.button]} onPress={() => setTheme("default")} accessibilityRole="button">
       <Text>Dark</Text>
      </Pressable>
      <Pressable style={[styles.button]} onPress={() => setTheme("light")} accessibilityRole="button">
        <Text>Light</Text>
      </Pressable>
      <Pressable style={[styles.button]} onPress={() => setTheme("blue")} accessibilityRole="button">
        <Text>Blue</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:'center',
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',

      }
})

