import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { getAllItemAmounts, getAllTypes } from "@/database/db";
import { useEffect, useState } from "react";
{/* import { PieChart } from 'react-native-gifted-charts'; */}

export default function Statistics() {
  const [total, setTotal] = useState(0);
  const [types, setTypes] = useState(0);
  const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];

  const fetchTotal = async () => {
    const result = await getAllItemAmounts();
    setTotal(result);
  };

  const fetchTypes = async () => {
    const result = await getAllTypes();
    setTypes(result);
  };

  useEffect(() => {
    fetchTotal();
    fetchTypes();
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
        <View>
          <Text style={style.cardValue}>{total}</Text>
          <Text style={style.cardTitle}>Total Items</Text>
        </View>
      </View>

      <View style={style.card}>
      </View>

      <View style={style.card}>
        <Text style={style.cardTitle}>Most Scanned Item</Text>
        <Text style={style.cardValue}>Product A</Text>
      </View>

      {/* Placeholder for Charts */}
      <View style={style.chartContainer}>
        <Text style={style.chartTitle}>Category Distribution</Text>
        
        {/* Insert Pie Chart Component <PieChart data={data}/> */}
      </View>

      <View style={style.chartContainer}>
        <Text style={style.chartTitle}>Scan Frequency</Text>
        {/* Insert Bar Chart Component */}
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
  card: {

  },
  cardItemTypes: {
    backgroundColor: "#9835A0",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
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
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
