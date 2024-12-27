import { View, Text, StyleSheet } from "react-native";

export default function Statistics() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={style.title}>Statistics</Text>
    </View>
  );
}

const style = StyleSheet.create({
  title: {
    color: 'white',
  }
})