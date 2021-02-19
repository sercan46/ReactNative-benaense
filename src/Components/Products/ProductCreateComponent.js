import React, {Component} from 'react';
import {View,Text,TextInput,Picker} from 'react-native';
import { CustomCard, CustomCardSection,CustomButton ,CustomSpinner} from '../../UiMixin';
import {productChange,productCreate,productList,categoryList} from '../../actions';
import {connect} from 'react-redux';
import _ from 'lodash'
class ProductCreateComponent extends Component{
  componentDidMount(){
    this.props.categoryList();
  }
  clickSave(){
    const {category,count,description,image,name,price}=this.props
    this.props.productCreate({category,count,description,image,name,price})
    this.props.productList();
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
                    onChangeText={name=>this.props.productChange({props:'name',value:name})}
                  />
              </CustomCardSection>
              <CustomCardSection>
                  <TextInput
                    placeholder="Ürün Açıklaması"
                    style={inputStyle}
                    value={this.props.description}
                    onChangeText={description=>this.props.productChange({props:'description',value:description})}
                  />
              </CustomCardSection>
              <CustomCardSection>
                  <TextInput
                    placeholder="Ürün Sayısı"
                    style={inputStyle}
                    value={this.props.count}
                    onChangeText={count=>this.props.productChange({props:'count',value:count})}
                  />
              </CustomCardSection>

              <CustomCardSection>
                  <TextInput
                    placeholder="Ürün Fiyatı"
                    style={inputStyle}
                    value={this.props.price}
                    onChangeText={price=>this.props.productChange({props:'price',value:price})}
                  />
              </CustomCardSection>
              <CustomCardSection>
                  <TextInput
                    placeholder="Resim"
                    style={inputStyle}
                    value={this.props.image}
                    onChangeText={image=>this.props.productChange({props:'image',value:image})}
                  />
              </CustomCardSection>
              <CustomCardSection>
                <Text style={{fontSize:14}}> Kategori </Text>
                  <Picker
                    style={{flex:1,marginRight:45}}
                    selectedValue={this.props.category}
                    onValueChange={category=>this.props.productChange({props:'category',value:category})}
                  >
                  {this.props.categoryArray.map((item, index) => {
                   return (< Picker.Item label={item.name} value={item.name} key={index} />);
                  })}

                  </Picker>
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
const mapToStateProps=({productAddResponse,categoryDataResponse})=>{

  const {category,count,description,image,name,price,loading}=productAddResponse;
    console.log('categ',categoryDataResponse)
    const categoryArray=_.map(categoryDataResponse,(val)=>{
      console.log('val',val)
        return { ...val.category };
    })
    console.log('cate',categoryArray)
  return {category,count,description,image,name,price,loading,categoryArray};
}
export default connect(mapToStateProps,{productChange,productCreate,productList,categoryList}) (ProductCreateComponent);
