/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image} from 'react-native';
import { Images } from '../assets/image';

const Splash = ({navigation}:any) => {

    setTimeout(() => {
      navigation.navigate('Login');
    }, 600);

  return (

    <View style={styles.container}>
      <View style={styles.box1}>
      <Image source={Images.logo} style={styles.logo}  />
      </View>
        <View style={styles.box2}>
          <View style={styles.box2a}>
          <Text style={styles.text1}>Omm Babaji</Text>
          </View>
          <View style={styles.box2b}>
          <Text style={styles.text2}>Lets get started</Text>
          </View>
        </View>
      </View>

  );

};
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#B3E5FC',

    justifyContent:'center',
    alignItems:'center',
    },
    box1:{
      flex:0.5,
      alignItems:'center',
      justifyContent:'flex-end',

    },
    box2:{
      flex:0.5,
    },
    box2a:{
      flex:0.2,
      alignItems:'center',

    },
    box2b:{
      flex:0.1,
      alignItems:'center',
      justifyContent:'flex-start',
    },
    text1:{
      color:'#000000',
      fontSize:30,
      fontWeight:'bold',

    },
    text2:{
      color:'#000000',
      fontSize:18,
      fontWeight:'bold',
      marginTop:5,
    },
    logo: {
      width:80 ,
      height: 80,
      resizeMode: 'contain',
    },
});




  export default Splash;


