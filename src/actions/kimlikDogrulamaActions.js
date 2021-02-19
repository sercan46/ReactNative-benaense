import {Alert} from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import {EMAIL_CHANGED, PASSWORD_CHANGED,LOGIN_USER,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL} from './types';
import { Actions } from 'react-native-router-flux';

export const emailChanged=(email)=>{
      return(dispatch)=>{
          dispatch({
            type:EMAIL_CHANGED,
            payload:email
          })
      };
};
export const passwordChanged=(password)=>{
      return(dispatch)=>{
        dispatch({
          type:PASSWORD_CHANGED,
          payload:password
        })
      };
};

export const loginUser=({email,password})=>{
      return(dispatch)=>{
          dispatch({type:LOGIN_USER});
          if(email===""||password===""){
            Alert.alert(
              'Hata',
              'Gerekli Alanları Giriniz!',
              [{text:"Tamam" , onPress:()=>null}]
            )
          }
          else{
            dispatch({type:LOGIN_USER});
            firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
                loginSuccess(dispatch,user)
            }).catch((err)=>{
              console.log('err',err)
                loginFail(dispatch)
            })
          }

      }
}

const loginSuccess=(dispatch,user)=>{
    dispatch({
      type:LOGIN_USER_SUCCESS,
      payload:user
    });
    Actions.main()
};
const loginFail=(dispatch)=>{
  Alert.alert(
    'Hata',
    'Bilgilerinizi Doğru Giriniz',
    [{text:"Tamam" , onPress:()=>null}]
  )
  dispatch({
    type:LOGIN_USER_FAIL,
    payload:""
  })
}
