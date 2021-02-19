import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import { CustomButton } from '../UiMixin';
import { Actions } from 'react-native-router-flux';

const windowHeight = Dimensions.get('window').height;

class MenuComponent extends Component{
  urunler(){
    Actions.productPage()
  };
  kategori(){
    Actions.categoryPage();
  };
      render(){
        return(
          <View style={styles.viewStyle}>
            <View style={{marginTop:windowHeight/3}}>
                <CustomButton onPress={()=>{this.urunler()}}> Ürünler </CustomButton>
                <CustomButton onPress={()=>{this.kategori()}}> Kategoriler </CustomButton>
            </View>
        </View>
      )
    }
}
const styles=StyleSheet.create({
  viewStyle:{

    backgroundColor:'pink',
    height:windowHeight

  }
})
export default MenuComponent
