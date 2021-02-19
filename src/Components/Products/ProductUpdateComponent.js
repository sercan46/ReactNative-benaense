import React,{Component} from 'react';
import {Text,Picker,View,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {productChange,productUpdate,categoryList,productList,productDelete} from '../../actions';
import { CustomCard, CustomCardSection,CustomButton ,CustomSpinner} from '../../UiMixin';
import _ from 'lodash'

class ProductUpdateComponent extends Component{
    state={category:'',count:'',description:'',image:'',name:'',price:''};
    componentDidMount(){
      this.props.categoryList();

      const{category,count,description,image,name,price,key}=this.props.product;
      this.setState({category,count,description,image,name,price,key});
    }
    clickUpdate(){
      const {category,count,description,image,name,price,key}=this.state;
      this.props.productUpdate({category,count,description,image,name,price,key})
      this.props.productList();

    }
    deleteProduct(){
      const {key}=this.state;
      this.props.productDelete({key});
      this.props.productList();

    }
    renderButton(){
      if(!this.props.loadingUpdate){
        return <View>
           <CustomButton  onPress={this.clickUpdate.bind(this)}> Kaydet </CustomButton>
           <CustomButton  onPress={this.deleteProduct.bind(this)}> Sil </CustomButton>
           </View>;

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
                    value={this.state.name}
                    onChangeText={name=>this.setState({name})}
                  />
              </CustomCardSection>
              <CustomCardSection>
                  <TextInput
                    placeholder="Ürün Açıklaması"
                    style={inputStyle}
                    value={this.state.description}
                    onChangeText={description=>this.setState({description})}
                  />
              </CustomCardSection>
              <CustomCardSection>
                  <TextInput
                    placeholder="Ürün Sayısı"
                    style={inputStyle}
                    value={this.state.count}
                    onChangeText={count=>this.setState({count})}
                  />
              </CustomCardSection>

              <CustomCardSection>
                  <TextInput
                    placeholder="Ürün Fiyatı"
                    style={inputStyle}
                    value={this.state.price}
                    onChangeText={price=>this.setState({price})}
                  />
              </CustomCardSection>
              <CustomCardSection>
                  <TextInput
                    placeholder="Resim"
                    style={inputStyle}
                    value={this.state.image}
                    onChangeText={image=>this.setState({image})}
                  />
              </CustomCardSection>
              <CustomCardSection>
                <Text style={{fontSize:14}}> Kategori </Text>
                  <Picker
                    style={{flex:1,marginRight:45}}
                    selectedValue={this.state.category}
                    onValueChange={category=>this.setState({category})}
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
const mapToStateProps=({productUpdateResponse,categoryDataResponse,productDeleteResponse})=>{
  const {loadingUpdate}=productUpdateResponse;
  const {loadingDelete}=productDeleteResponse;
  const categoryArray=_.map(categoryDataResponse,(val)=>{
    console.log('val',val)
      return { ...val.category };
  })
  return {loadingUpdate,loadingDelete,categoryArray};
}
export default connect(mapToStateProps,{productChange,productUpdate,categoryList,productList,productDelete}) (ProductUpdateComponent)
