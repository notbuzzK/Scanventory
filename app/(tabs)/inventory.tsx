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
        style={styles.buttonView}
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
      <Pressable onPress={fetchInventory} style={styles.button}>
        <Text style={styles.buttonText}>REFRESH INVENTORY</Text>
      </Pressable>
      <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
    padding: 20,
    paddingTop: 40,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
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
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#212121',
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    backgroundColor: '#9835A0',
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});