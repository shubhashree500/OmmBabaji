/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined; // Define other screens if necessary
};

type RegistrationFormProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function RegistrationForm({ navigation }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    user_id: '',
    phone_no: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    if (
      !formData.name ||
      !formData.user_id ||
      !formData.phone_no ||
      !formData.address ||
      !formData.password
    ) {
      Alert.alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      console.log('Data to send:', formData);
      const response = await fetch('http://10.0.2.2:4001/api/user/register', {
      // http://192.168.1.100:4001/api/user/register
      // 10.0.2.2
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Registration Successful!', 'You can now log in.');
        navigation.navigate('Login'); // Navigate to the login screen after successful registration
      } else {
        Alert.alert('Registration Failed', data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'An error occurred while trying to register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.user_id}
        onChangeText={(value) => handleChange('user_id', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phone_no}
        onChangeText={(value) => handleChange('phone_no', value)}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(value) => handleChange('address', value)}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});
