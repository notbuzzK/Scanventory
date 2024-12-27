import React, { useState, useEffect } from 'react';
import { getAllInventory } from "@/database/db";
import { View, Text, StyleSheet, Button, FlatList, Pressable } from "react-native";
import { ItemInfoModal } from '@/components/ItemInfoModal';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchInventory = async () => {
    try {
      const allRows = await getAllInventory();
      setInventory(allRows);
    } catch (error) {
      console.error("Error getting all inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.barcode}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>VIEW</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <Button title="Refresh Inventory" onPress={fetchInventory} />
      <FlatList
        data={inventory}
        renderItem={renderItem}
        keyExtractor={(item) => item.barcode}
        nestedScrollEnabled
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerCellBarcode}>Barcode</Text>
            <Text style={styles.headerCellName}>Name</Text>
          </View>
        )}
      />
      {selectedItem && (
        <ItemInfoModal
          values={selectedItem}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 8,
  },
  headerCellBarcode: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '45%',
  },
  headerCellName: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '40%',
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});