import React ,{Component} from 'react';
import {Text,ScrollView,StyleSheet,TextInput,Button,Image,Dimensions,Linking, TouchableOpacity} from 'react-native';
import { CustomCard, CustomCardSection,CustomButton ,CustomSpinner} from '../UiMixin';
import { BENEONSE } from '../Image';
import { Actions } from 'react-native-router-flux';
import {emailChanged, passwordChanged,loginUser} from '../actions';
import {connect} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class LoginComponent extends Component{
  state={email:'',password:'', loading:false};

  clickLogin(){
    const {email,password}=this.props;
    this.props.loginUser({email,password});
  }

 renderButton(){
    if(!this.props.loading){
        return <CustomButton onPress={this.clickLogin.bind(this)}> Giriş </CustomButton>;
    }
      return <CustomSpinner size='small' />;
  }

    render(){
      return(
        <ScrollView style={styles.containerStyle}>
         <Image source={BENEONSE}   style={{ width: windowWidth, height: windowWidth ,marginTop:windowWidth/12}}/>
          <CustomCard>
            <CustomCardSection>
                <TextInput
                  autoCapitalize = 'none'
                  placeholderTextColor='blue'
                  placeholder="E-Mail"
                  style={styles.inputStyle}
                  value={this.props.email}
                  onChangeText={(email)=>this.props.emailChanged(email)}
                />
            </CustomCardSection>
            <CustomCardSection>
                <TextInput
                secureTextEntry
                  placeholderTextColor='blue'
                  placeholder='Şifre'
                  style={styles.inputStyle}
                  value={this.props.password}
                  onChangeText={(password)=>this.props.passwordChanged(password)}
                />
            </CustomCardSection>


          </CustomCard>
            {this.renderButton()}
          <Text style={styles.textStyle}>Üyelik İşlemleri İçin İletişime Geçiniz</Text>
          <TouchableOpacity style={{backgroundColor:'gray',marginLeft:80,marginRight:80,borderRadius:20}} onPress={() => Linking.openURL('mailto:chesercan@gmail.com') }>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'white'}}>chesercan@gmail.com</Text>
            </TouchableOpacity>
        </ScrollView>
      )
    }


}
const styles = StyleSheet.create({
  containerStyle:{
    backgroundColor:'black',
    height:windowHeight/3
  },
  inputStyle:{
    color:'crimson',
    paddingRight:5,
    paddingLeft:5,
    fontSize:18,
    lineHeight:23,
    flex:2
  },
  textStyle:{
    color:'red',
    paddingLeft:windowWidth/5,
    marginTop:20,

  }
})
const mapStateToProps=({kimlikdogrulamaResponse})=>{
  const {email,password,loading}=kimlikdogrulamaResponse;
  return {
    email:'elche_46@hotmail.com',password:'123123',loading
  }
};
export default connect(mapStateToProps, {emailChanged,passwordChanged,loginUser}) (LoginComponent);
