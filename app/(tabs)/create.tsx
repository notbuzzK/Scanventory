import { StyleSheet, View, Text, TextInput, Button, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { insertInventory, updateInventoryItem } from '@/database/db';
import db from '@/database/db';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabTwoScreen() {
  const [item, setItem] = useState({});
  const [update, setUpdate] = useState(false);
  const router = useRouter();
  const { barcode } = useGlobalSearchParams();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      barcode: barcode || "",
      name: "",
      description: "",
      quantity: 0,
      type: "",
    },
  });

  const getItem = async (barcode: string) => {
    try {
      const result = await db.getFirstAsync('SELECT * FROM inventory WHERE barcode = ?', [barcode]);
      if (result) {
        setItem(result);
        setValue('name', result.name);
        setValue('description', result.description);
        setValue('quantity', result.quantity.toString());
        setValue('type', result.type);
        setUpdate(true);
      } else {
        setUpdate(false);
      }
    } catch (error) {
      console.error('Error getting item:', error);
    }
  }

  useEffect(() => {
    if (barcode) {
      getItem(barcode);
    }
  }, [barcode]);

  useEffect(() => {
    reset({
      barcode: barcode || "",
      name: "",
      description: "",
      quantity: 0,
      type: "",
    });
  }, [barcode]);

  const onSubmit = (data: any) => {
    console.log(data);
    if (update === false) {
      console.log('Inserting item');
      insertInventory(data);
    } else {
      console.log('Updating item');
      updateInventoryItem(data);
    }
    reset({ barcode: "", name: "", description: "", quantity: 0, type: "" });
    router.push('/inventory');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Item Information</Text>
        <View>
          <Text style={styles.item}>Barcode:</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.itemInfo}
              />
            )}
            name="barcode"
          />
          {errors.barcode && <Text style={styles.error}>This is required.</Text>}
        </View>

        <View>
          <Text style={styles.item}>Name:</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.itemInfo}
              />
            )}
            name="name"
          />
          {errors.name && <Text style={styles.error}>This is required.</Text>}
        </View>

        <View>
          <Text style={styles.item}>Description:</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.itemInfo}
                maxLength={40}
              />
            )}
            name="description"
          />
        </View>

        <View>
          <Text style={styles.item}>Quantity:</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.itemInfo}
                keyboardType='numeric'
              />
            )}
            name="quantity"
          />
          {errors.quantity && <Text style={styles.error}>This is required.</Text>}
        </View>

        <View>
          <Text style={styles.item}>Type:</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.itemInfo}
              />
            )}
            name="type"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => [reset({ barcode: "", name: "", description: "", quantity: 0, type: "" }), router.push('/')]}
          >
          <Text style={{ color: 'white' }}>Cancel</Text>
        </Pressable>
        <Pressable onPress={handleSubmit(onSubmit)}>
          <LinearGradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={['#AB3CB5', '#4B1A4F']}
            style={styles.buttonSubmit}
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </LinearGradient>
        </Pressable>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 20,
    paddingTop: 40,
    height: '100%',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    color: 'white',
    fontSize: 20,
    width: '80%',
  },
  itemInfo: {
    color: '#CDCDCD',
    fontSize: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    width: '100%',
    paddingLeft: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    width: '40%',
    backgroundColor: '#212121',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    borderRadius: 20,
  },
  buttonSubmit: {
    width: 130,
    backgroundColor: '#AB3CB5',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    borderRadius: 20,
  },
});