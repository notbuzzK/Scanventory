import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { deleteInventoryItem } from '@/database/db';

export const ItemInfoModal = ({ values, modalVisible, setModalVisible }) => {
  const router = useRouter();

  const handleDelete = async () => {
    deleteInventoryItem(values.barcode);
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <Text>Item Info</Text>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{values.barcode}</Text>
          <Text style={styles.modalText}>{values.name}</Text>
          <Text style={styles.modalText}>{values.description}</Text>
          <Text style={styles.modalText}>{values.quantity}</Text>
          <Text style={styles.modalText}>{values.type}</Text>
        </View>
        <View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisible(!modalVisible);
              router.push(`/create?barcode=${values.barcode}`);
            }}
          >
            <Text style={styles.textStyle}>EDIT ITEM</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => [setModalVisible(!modalVisible), handleDelete()]}
          >
            <Text style={styles.textStyle}>DELETE</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>CLOSE</Text>
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