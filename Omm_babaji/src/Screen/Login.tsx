/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, View, Pressable,SafeAreaView,Switch, StatusBar, Image, ScrollView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginForm( { navigation }: any ) {
  const [click,setClick] = useState(false);


  const [user_id, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (user_id && password) {
      setLoading(true);
      try {
        const response = await axios.post('http://192.168.29.161:4001/api/user/login', {
          user_id,
          password,
        }, { timeout: 10000 });
       console.log('Response:', response);

       if (response.status === 200) {
        const data = response.data;

       if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Login Successful!', 'Welcome back!');
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Login Failed', 'Token not found in the response.');
      }
    } else {
      Alert.alert('Login Failed', response.data.message || 'Invalid credentials.');
    }
  } catch (error) {
    console.error('Login error:', error);
    Alert.alert('Error', 'An error occurred while trying to log in.');
  } finally {
    setLoading(false);
  }
} else {
  Alert.alert('Input Error', 'Please enter both username and password.');
}
};

return (
  <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
          <TextInput style={styles.input} placeholder= "EMAIL OR USERNAME" autoCorrect={false}
      autoCapitalize="none"
      value={user_id}
      onChangeText={setUsername} />

          <TextInput style={styles.input} placeholder="PASSWORD" secureTextEntry  autoCorrect={false}
      autoCapitalize="none"
      value={password}
          onChangeText={setPassword}/>

      </View>
      <View style={styles.rememberView}>
          <View>
              <Pressable onPress={() => Alert.alert('Forget Password!')}>
                  <Text style={styles.forgetText}>Forgot Password?</Text>
              </Pressable>
          </View>
      </View>

      <View style={styles.buttonView}>
      <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
        <Text style={styles.optionsText}>OR {'\n'} LOGIN WITH</Text>
      </View>

      <Text style={styles.footerText}>
        Don't Have an Account?{'\n'}
        <TouchableOpacity
    style={styles.signupButton}
    onPress={() => navigation.navigate('Registration')}
  >
    <Text style={styles.signupText}>Sign Up</Text>
  </TouchableOpacity>
      </Text>
  </SafeAreaView>
);
}


const styles = StyleSheet.create({
  container : {
  alignItems : 'center',
  paddingTop: 70,
  },
    image : {
    height : 160,
    width : 170,
  },
  title : {
  fontSize : 30,
  fontWeight : 'bold',
  textTransform : 'uppercase',
  textAlign: 'center',
  paddingVertical : 40,
  color : 'red',
  },
    inputView : {
    gap : 15,
    width : '100%',
    paddingHorizontal : 40,
    marginBottom  :5,
    },
input : {
height : 50,
paddingHorizontal : 20,
borderColor : 'red',
borderWidth : 1,
borderRadius: 7,
},
    rememberView : {
    width : '100%',
    paddingHorizontal : 50,
    justifyContent: 'space-between',
    alignItems : 'center',
    flexDirection : 'row',
    marginBottom : 8,
    },
switch :{
flexDirection : 'row',
gap : 1,
justifyContent : 'center',
alignItems : 'center',
},
  rememberText : {
  fontSize: 13,
  },
    forgetText : {
    fontSize : 11,
    color : 'red',
    },
button : {
backgroundColor : 'red',
height : 45,
borderColor : 'gray',
borderWidth  : 1,
borderRadius : 5,
alignItems : 'center',
justifyContent : 'center',
},
  buttonText : {
  color : 'white'  ,
  fontSize: 18,
  fontWeight : 'bold',
  },
buttonView :{
width :'100%',
paddingHorizontal : 50,
},
    optionsText : {
    textAlign : 'center',
    paddingVertical : 10,
    color : 'gray',
    fontSize : 13,
    marginBottom : 6,
    },
mediaIcons : {
flexDirection : 'row',
gap : 15,
alignItems: 'center',
justifyContent : 'center',
marginBottom : 23,
},
icons : {
width : 40,
height: 40,
},
  footerText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 15,
  },
  signupButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  signupText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
