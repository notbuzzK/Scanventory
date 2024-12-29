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
        <Text style={styles.title}>Item Info</Text>
          <View style={styles.modalLine}>
            <Text style={styles.itemName}>Barcode:</Text>
            <Text style={styles.itemInfo}>{values.barcode}</Text>
          </View>
          <View style={styles.modalLine}>
            <Text style={styles.itemName}>Name:</Text>
            <Text style={styles.itemInfo}>{values.name}</Text>
          </View>
          <View style={styles.modalLine}>
            <Text style={styles.itemName}>Description:</Text>
            <Text style={styles.itemInfo}>{values.description}</Text>
          </View>
          <View style={styles.modalLine}>
            <Text style={styles.itemName}>Quantity:</Text>
            <Text style={styles.itemInfo}>{values.quantity}</Text>
          </View>
          <View style={styles.modalLine}>
            <Text style={styles.itemName}>Type:</Text>
            <Text style={styles.itemInfo}>{values.type}</Text>
          </View>

        </View>
        <View>
          <Pressable
            style={[styles.buttonEdit]}
            onPress={() => {
              setModalVisible(!modalVisible);
              router.push(`/create?barcode=${values.barcode}`);
            }}
          >
            <Text style={styles.textStyle}>EDIT ITEM</Text>
          </Pressable>
          <Pressable
            style={[styles.buttonDelete]}
            onPress={() => [setModalVisible(!modalVisible), handleDelete()]}
          >
            <Text style={styles.textStyle}>DELETE</Text>
          </Pressable>
          <Pressable onPress={() => setModalVisible(!modalVisible)}
            style={[styles.buttonClose]}>
            <Text style={styles.textStyle}>CLOSE</Text>
          </Pressable>
        </View>
      </View>
      </View>
    </Modal>
  );
};

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
  modalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemName: {
    color: 'white',
    fontSize: 16,
  },
  itemInfo: {
    color: '#AB3CB5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonEdit: {
    backgroundColor: '#AB3CB5',
    marginBottom: 10,
    width: 275,
    borderRadius: 20,      
  },
  buttonDelete: {
    backgroundColor: 'red',
    marginBottom: 10,
    width: 275,
    borderRadius: 20,    
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