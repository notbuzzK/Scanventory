import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { insertInventory, updateInventoryItem } from '@/database/db';
import db from '@/database/db';

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
    <View>
      <View>
        <View>
          <Text style={styles.item}>Barcode</Text>
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
          {errors.barcode && <Text>This is required.</Text>}
        </View>

        <View>
          <Text style={styles.item}>Name</Text>
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
          {errors.name && <Text>This is required.</Text>}
        </View>

        <View>
          <Text style={styles.item}>Description</Text>
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
          <Text style={styles.item}>Quantity</Text>
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
          {errors.quantity && <Text>This is required.</Text>}
        </View>

        <View>
          <Text style={styles.item}>Type</Text>
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

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <Button title="Cancel" onPress={() => [reset({ barcode: "", name: "", description: "", quantity: 0, type: "" }), router.push('/')]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  item: {
    color: '#CDCDCD',
    fontSize: 20,
    width: '80%',
  },
  itemInfo: {
    color: '#CDCDCD',
    fontSize: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    width: '80%',
  },
});