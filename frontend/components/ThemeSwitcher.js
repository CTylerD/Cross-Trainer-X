import React, { useContext } from "react";
import {View} from './Themed';
import { StyleSheet } from "react-native";

import ThemeContext from "../contexts/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
    <button onClick={() => setTheme("pink")}>
      Pink
    </button>
    <button onClick={() => setTheme("default")}>
     Black
  </button>
  <button onClick={() => setTheme("green")}>
     Green
  </button>
  </View>
  );
};

export default ThemeSwitcher;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:'center',
      }
})

