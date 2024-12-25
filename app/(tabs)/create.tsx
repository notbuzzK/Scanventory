import { StyleSheet, Image, Platform, View, Text, TextInput, Button} from 'react-native';
import { Link, Stack, router } from "expo-router";

export default function TabTwoScreen() {

  return (
    <View style={styles.container}>
      
      <View>
        <Text style={styles.item}>Barcode</Text>
        <Text style={styles.item}>gagana kaya</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    backgroundColor: 'black',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  item: {
    color: '#CDCDCD',
    fontSize: 20,
    width: '80%',
  },
  itemInfo: {
    color: '#CDCDCD',
    fontSize: 20,
    width: '80%',
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    
  },
});
