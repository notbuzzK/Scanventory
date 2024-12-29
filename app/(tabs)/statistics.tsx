import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { getAllItemAmounts, getAllLowQuantityItems, getAllLowQuantityItemsAmount, getAllTypes } from "@/database/db";
import { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { LowStockModal } from "@/components/LowStockModal";
{/* import { PieChart } from 'react-native-gifted-charts'; */}


export default function Statistics() {
  const [total, setTotal] = useState(0);
  const [types, setTypes] = useState(0);
  const [lowStock, setLowstock] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];

  const fetchTotal = async () => {
    const result = await getAllItemAmounts();
    setTotal(result);
  };

  const fetchTypes = async () => {
    const result = await getAllTypes();
    setTypes(result);
  };

  const fetchLowstock = async () => {
    const result = await getAllLowQuantityItemsAmount();
    setLowstock(result);
  };

  useEffect(() => {
    fetchTotal();
    fetchTypes();
    fetchLowstock();
  }, []);

  const handleRefresh = () => {
    fetchTotal();
    fetchTypes();
  };

  return (
    <ScrollView style={style.container}>
      <Text style={style.title}>Statistics</Text>

      <View style={style.cardItemTypes}>
        <View>
          <Text style={style.cardValue}>{types}</Text>
          <Text style={style.cardTitle}>Total Types</Text>
        </View>
        <View style={{ borderLeftWidth: 1, borderColor: "white", paddingLeft: 54}}>
          <Text style={style.cardValue}>{total}</Text>
          <Text style={style.cardTitle}>Total Items</Text>
        </View>
      </View>

      <View style={style.cardLowStock}>
        <View>
          <Text style={style.cardValue}>{lowStock}</Text>
          <Text style={style.cardTitle}>Low Stock Items</Text>
        </View>
        <View style={{ borderLeftWidth: 1, borderColor: "white", paddingLeft: 49}}>
          <Pressable
            onPress={() => [setModalVisible(true), console.log("pressed")]}
          >
            <AntDesign name="right" size={36} color="white" style={style.rightIcon}/>
          </Pressable>
        </View>
        <LowStockModal 
        modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>


      <Pressable onPress={handleRefresh} style={style.button}>
        <Text style={style.buttonText}>REFRESH STATISTICS</Text>
      </Pressable>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "white",
  },
  rightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardItemTypes: {
    backgroundColor: "#9835A0",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  cardLowStock: {
    backgroundColor: "#9835A0",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  cardTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  cardValue: {
    color: "white",
    textAlign: "center",
    fontSize: 48,
    fontWeight: "bold",
  },
  chartContainer: {

  },
  chartTitle: {

  },
  button: {
    backgroundColor: '#212121',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});
