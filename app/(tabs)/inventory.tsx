import React, { useState, useEffect } from 'react';
import { getAllInventory } from "@/database/db";
import { View, Text, StyleSheet, Button, FlatList, Pressable, TextInput } from "react-native";
import { ItemInfoModal } from '@/components/ItemInfoModal';
import Foundation from '@expo/vector-icons/Foundation';
import { getSearchItems } from '@/database/db';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchInventory = async () => {
    try {
      const allRows = await getAllInventory();
      setInventory(allRows);
    } catch (error) {
      console.error("Error getting all inventory:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await getSearchItems(searchTerm);
      setSearchResults(result);
    } catch (error) {
      console.error("Error getting search items:", error);
    }

  useEffect(() => {
    fetchInventory();
  }, []);
}

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
      <View style={styles.searchBar}>
        
        <TextInput 
          style={styles.input} placeholder="Search"
          value={searchTerm} onChangeText={(text) => setSearchTerm(text)}/>
        <Pressable
          style={styles.button}
          onPress={handleSearch}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </Pressable>
      </View>
      <View style={styles.tableContainer}>
        <FlatList
          data={searchTerm ? searchResults : inventory}
          renderItem={renderItem}
          keyExtractor={(item) => item.barcode}
          nestedScrollEnabled
          contentContainerStyle={{ flexGrow: 1, }}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.headerCellBarcode}>Barcode</Text>
              <Text style={styles.headerCellName}>Name</Text>
              <Pressable onPress={fetchInventory} style={styles.refresh}>
                <Foundation name="refresh" size={18} color="black" />
              </Pressable>
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
    width: '25%',
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
  searchBar: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    color: 'white',
    fontSize: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 5,
    width: '73%',
    paddingLeft: 10,
    marginRight: 5,
  },
  refresh: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    marginLeft: 10,
  },
  tableContainer: {
    marginBottom: 90,
  },
});