import React from 'react';
import {View,Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const CustomCardSection=(props)=>{
    return(
        <View style={styles.subContainerStyle}>
          {props.children}
        </View>
    )
}
const styles={
  subContainerStyle:{
    borderBottomWidth:1,
    padding:10,
    width:windowWidth,
    backgroundColor:'#fff',
    justifyContent:'space-between',
    alignSelf:'stretch',
    flexDirection:'row',
    borderColor:'#ddd',
    position:'relative',
  },
}
export  {CustomCardSection};
