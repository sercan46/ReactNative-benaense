import React from 'react';
import {Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CustomButton=(props)=>{
    return(
      <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
            <Text style={styles.textStyle}>{props.children}</Text>
      </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
  textStyle:{
    color:'white',
    fontSize:25,
    paddingTop:10,
    textAlign: 'center',

  },
  buttonStyle:{
      marginTop:30,
      marginLeft:25,
      height:50,
      marginRight:25,
      backgroundColor:'crimson',
      borderRadius:10
  }

})
export {CustomButton}
