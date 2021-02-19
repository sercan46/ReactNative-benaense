import React,{Component} from 'react';
import {View,Text,TouchableWithoutFeedback,Image,StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
class CategoryList extends Component{
  categoryClick(){
    Actions.categoryUpdatePage({category:this.props.category});
  }
  render(){
    const {description,image,name,key}=this.props.category;
    return(
        <TouchableWithoutFeedback onPress={this.categoryClick.bind(this)}>
            <View  style={styles.cardStyle}>
                <View>
                  <Image source={{uri:image}}  style={{width:150, height:100,borderRadius:10}} />
                </View>
                <View style={styles.rightContainer}>
                <View style={styles.rightStyle}>

                    <Text>
                        {name}
                    </Text>
                    <Text>
                        {description}
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
          paddingTop:40
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
export default CategoryList
