import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useState } from 'react';

export const ItemInfoModal = async ( barcode: string, modalVisibility: boolean ) => {
  const [modalVisible, setModalVisible] = useState(modalVisibility);
  return (
    <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');            setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{barcode}</Text>
            <Text style={styles.modalText}>Barcode not found</Text>
          </View>
          <View>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => [setModalVisible(!modalVisible)]}>
                <Text style={styles.textStyle}>ADD AS NEW ITEM</Text>
              </Pressable>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>CANCEL</Text>
              </Pressable>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});