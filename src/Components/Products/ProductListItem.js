import React,{Component} from 'react';
import {View,Text,TouchableWithoutFeedback,Image,StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
class ProductList extends Component{
  productClick(){
    Actions.productUpdatePage({product:this.props.product});
  }
  render(){
    const {category,count,description,image,name,price,key}=this.props.product;
    return(
        <TouchableWithoutFeedback onPress={this.productClick.bind(this)}>
            <View  style={styles.cardStyle}>
                <View>
                  <Image source={{uri:image}}  style={{width:150, height:100,borderRadius:10}} />
                </View>
                <View style={styles.rightContainer}>
                <View style={styles.rightStyle}>
                    <Text>
                        {category}
                    </Text>

                    <Text>
                        {name}
                    </Text>
                    <Text>
                        {description}
                    </Text>
                </View>
                <View style={styles.rightStyle} >
                    <View style = {styles.lineStyle}></View>
                </View>
                <View style={styles.rightStyle}>
                    <Text>
                        {count}
                    </Text>

                    <Text>
                        {price} ₺
                    </Text>

                    <Text>
                        {count*price} ₺
                    </Text>
                </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
  }

};
const styles=StyleSheet.create({
      cardStyle:{
          flex:1,
          flexDirection:'row',
          shadowColor: "#000",
          shadowOffset: {
          	width: 0,
          	height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.00,
          elevation: 24,
          paddingTop:10,
          borderWidth:2,
          borderColor:'crimson'
        },
        rightContainer:{
          flex:1,
          flexDirection: 'column',
          justifyContent:'space-around',
        },
        rightStyle:{
          flex:1,
          flexDirection: 'row',
          justifyContent:'space-around'
        },
        lineStyle:{
               borderWidth: 0.5,
               borderColor:'gray',
               margin:10,
               width:200,
               height:1
        }
});
export default ProductList
