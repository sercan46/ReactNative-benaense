import React, {Component} from 'react';
import {View,Text,TextInput,Picker} from 'react-native';
import { CustomCard, CustomCardSection,CustomButton ,CustomSpinner} from '../../UiMixin';
import {categoryChange,categoryCreate,categoryList} from '../../actions';
import {connect} from 'react-redux';
import _ from 'lodash'

class CategoryCreateComponent extends Component{

  clickSave(){
    const {description,image,name}=this.props
    this.props.categoryCreate({description,image,name})
    //this.props.productList();
  }

  renderButton(){
    if(!this.props.loading){
        return <CustomButton  onPress={this.clickSave.bind(this)}> Kaydet </CustomButton>;
    }
      return <CustomSpinner size='small' />;

  }
    render(){
      const {inputStyle}=styles
        return(
          <View style={{paddingTop:100}}>
              <CustomCardSection>
                  <TextInput
                    placeholder="Ürün Adı"
                    style={inputStyle}
                    value={this.props.name}
                    onChangeText={name=>this.props.categoryChange({props:'name',value:name})}
                  />
              </CustomCardSection>
              <CustomCardSection>
                  <TextInput
                    placeholder="Ürün Açıklaması"
                    style={inputStyle}
                    value={this.props.description}
                    onChangeText={description=>this.props.categoryChange({props:'description',value:description})}
                  />
              </CustomCardSection>


              <CustomCardSection>
                  <TextInput
                    placeholder="Resim"
                    style={inputStyle}
                    value={this.props.image}
                    onChangeText={image=>this.props.categoryChange({props:'image',value:image})}
                  />
              </CustomCardSection>

                  {this.renderButton()}
          </View>
        )

    }
}
const styles={

  inputStyle:{
    color:'#000',
    paddingRight:5,
    paddingLeft:5,
    fontSize:18,
    lineHeight:23,
    flex:2
  },
};
const mapToStateProps=({categoryAddResponse})=>{

  const {description,image,name,loading}=categoryAddResponse;

  return {description,image,name,loading};
}
export default connect(mapToStateProps,{categoryChange,categoryCreate,categoryList}) (CategoryCreateComponent);
