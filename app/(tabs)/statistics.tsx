import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import { getAllItemAmounts, getAllLowQuantityItems, getAllLowQuantityItemsAmount, getAllTypes, getItemDistribution } from "@/database/db";
import { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { LowStockModal } from "@/components/LowStockModal";
import { PieChart } from "react-native-chart-kit";

export default function Statistics() {
  const [total, setTotal] = useState(0);
  const [types, setTypes] = useState(0);
  const [lowStock, setLowstock] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemDistribution, setItemDistribution] = useState([]);

  const screenWidth = Dimensions.get("window").width;

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

  const fetchItemDistribution = async () => {
    try {
      const result: { type: string; total: number }[] = await getItemDistribution(); // Raw data from the database
      const formattedData = result.map((item) => ({
        name: item.type,
        population: item.total,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }));
      setItemDistribution(formattedData); // Set the transformed data
    } catch (error) {
      console.error("Error fetching item distribution:", error);
      setItemDistribution([]); // Fallback in case of an error
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  

  useEffect(() => {
    fetchTotal();
    fetchTypes();
    fetchLowstock();
    fetchItemDistribution();
  }, []);

  const handleRefresh = () => {
    fetchTotal();
    fetchTypes();
    fetchLowstock();
    fetchItemDistribution();
  };

  return (
    <ScrollView style={style.container}>
      <Text style={style.title}>Statistics</Text>

      <View style={style.cardItemTypes}>
        <View style={style.totalType}>
          <Text style={style.cardValue}>{types}</Text>
          <Text style={style.cardTitle}>Total Types</Text>
        </View>
        <View style={style.totalItems}>
          <Text style={style.cardValue}>{total}</Text>
          <Text style={style.cardTitle}>Total Items</Text>
        </View>
      </View>

      <View style={style.cardLowStock}>
        <View style={style.totalType}>
          <Text style={style.cardValue}>{lowStock}</Text>
          <Text style={style.cardTitle}>Low Stock Items</Text>
        </View>
        <View style={style.totalItems}>
          <Pressable
            onPress={() => [setModalVisible(true), console.log("pressed")]}
          >
            <AntDesign name="right" size={36} color="white" style={style.rightIcon}/>
          </Pressable>
        </View>
        <LowStockModal 
        modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>

      <View>
        <PieChart
          data={itemDistribution}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: "#1E2923",
            backgroundGradientFrom: "#08130D",
            backgroundGradientTo: "#1F2C18",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            decimalPlaces: 2,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

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
    marginTop: 5,
  },
  cardItemTypes: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  totalType:{
    width: "50%",
    alignItems: "center",
    backgroundColor: "#9835A0",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  totalItems: {
    width: "50%",
    alignItems: "center",
    backgroundColor: "#9835A0",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftColor: "white",
    borderLeftWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardLowStock: {
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
