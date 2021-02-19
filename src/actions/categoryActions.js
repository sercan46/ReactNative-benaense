import {
  CATEGORY_CHANGE,
  CREATE_REQUEST_CATEGORY,
  CREATE_REQUEST_SUCCESS_CATEGORY,
  CATEGORY_LİST_SUCCESS} from './types';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';

export const categoryChange=({props,value})=>{
  return(dispatch)=>{
    dispatch({
        type:CATEGORY_CHANGE,
        payload:{props,value}
    })
  }
};
export const categoryList=()=>{
    return(dispatch)=>{
      axios.get('https://eticaret-de184-default-rtdb.firebaseio.com/category.json').then((resp)=>{
          dispatch({type:CATEGORY_LİST_SUCCESS,payload:resp.data});
      });
    };
};
export const categoryCreate=({description,image,name})=>{
  const sendCategory={
      description:description,
      image:image,
      name:name,
  }
      return(dispatch)=>{
        dispatch({type:CREATE_REQUEST_CATEGORY});
        axios.post('https://eticaret-de184-default-rtdb.firebaseio.com/category.json',
        {category:sendCategory})
        .then(()=>{
          dispatch({type:CREATE_REQUEST_SUCCESS_CATEGORY});
          Actions.pop();
      });
      };
};
