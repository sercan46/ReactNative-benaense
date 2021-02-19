import React from 'react';
import {View} from 'react-native';
const CustomCard=(props)=>{
    return(
        <View style={styles.containerStyle}>
          {props.children}
        </View>

    )

}
const styles={
    containerStyle:{
      borderWidth:1,
      borderRadius:6,
      borderColor:'#ddd',
      shadowColor:'#000',
      shadowOffset:{width:0,height:2},
      shadowOpacity:0.1,
      shadowRadius:2,
      elevation:1,
      marginLeft:5,
      marginRight:5,
    },
}
export {CustomCard};
