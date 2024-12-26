import { getAllInventory } from "@/database/db";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Inventory() {
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Inventory</Text>

      <Button
        title="Get All Inventory"
        onPress={() => getAllInventory()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});