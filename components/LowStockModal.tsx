import { View, Text, Modal, StyleSheet, Alert, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAllLowQuantityItems } from '@/database/db';

export const LowStockModal = ({modalVisible, setModalVisible}) => {
  const [lowStockItems, setLowStockItems] = useState([]);

  const fetchLowstock = async () => {
    try {
      const result = await getAllLowQuantityItems();
      setLowStockItems(result);
    } catch (error) {
      console.error("Error getting low stock items:", error);
    }
  };

  useEffect(() => {
    fetchLowstock();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cellQuantity}>{item.quantity}</Text>
    </View>
  )

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.overlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>LOW STOCK</Text>
            <FlatList
              data={lowStockItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              nestedScrollEnabled
              ListHeaderComponent={() => (
                <View style={styles.header}>
                  <Text style={styles.headerCell}>Name</Text>
                  <Text style={styles.headerCell}>Quantity</Text>
                </View>
              )}
            />
          </View>
          <Pressable
            style={[styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>CLOSE</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 35,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '50%',
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
  cellQuantity: {
    flex: 1,
    textAlign: 'center',
    color: '#9835A0',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  buttonClose: {
    backgroundColor: '#212121',
    marginBottom: 10,
    width: 275,
    borderRadius: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});