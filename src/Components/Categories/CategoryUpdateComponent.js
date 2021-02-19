import React,{Component} from 'react';
import {Text,Picker,View,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {categoryChange,categoryUpdate,categoryListCategory,categoryDelete} from '../../actions';
import { CustomCard, CustomCardSection,CustomButton ,CustomSpinner} from '../../UiMixin';
import _ from 'lodash'

class CategoryUpdateComponent extends Component{
    state={description:'',image:'',name:''};
    componentDidMount(){

      const{description,image,name,key}=this.props.category;
      this.setState({description,image,name,key});
    }
    clickUpdate(){
      const {description,image,name,key}=this.state;
      console.log('//as/dasd',this.state)
      this.props.categoryUpdate({description,image,name,key})
      this.props.categoryListCategory();

    }
    deleteCategory(){
      const {key}=this.state;
      this.props.categoryDelete({key});
      this.props.categoryListCategory();

    }
    renderButton(){
      if(!this.props.loadingUpdateCategory){
        return <View>
           <CustomButton  onPress={this.clickUpdate.bind(this)}> Kaydet </CustomButton>
           <CustomButton  onPress={this.deleteCategory.bind(this)}> Sil </CustomButton>
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
                    placeholder="Resim"
                    style={inputStyle}
                    value={this.state.image}
                    onChangeText={image=>this.setState({image})}
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
const mapToStateProps=({categoryUpdateResponse})=>{
  const {loadingUpdateCategory}=categoryUpdateResponse;
  return {loadingUpdateCategory};
}
export default connect(mapToStateProps,{categoryChange,categoryUpdate,categoryListCategory,categoryDelete}) (CategoryUpdateComponent)
