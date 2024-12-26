import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { insertInventory } from '@/database/db';

export default function TabTwoScreen() {
  const router = useRouter();
  const { barcode } = useGlobalSearchParams();
  const {
    control,
    handleSubmit,
    reset,
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
    insertInventory(data);
    reset({ barcode: "", name: "", description: "", quantity: 0, type: "" }); 
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
      <Button title="Reset" onPress={() => [reset({ barcode: "", name: "", description: "", quantity: 0, type: "" }), router.push('/')]} />
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