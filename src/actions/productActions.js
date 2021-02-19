import {
  PRODUCT_CHANGE,
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  UPDATE_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS,
  PRODUCT_LİST_SUCCESS,
  CATEGORY_LİST_SUCCESS} from './types';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';

export const productChange=({props,value})=>{
  return(dispatch)=>{
    dispatch({
        type:PRODUCT_CHANGE,
        payload:{props,value}
    })
  }
};
export const productList=()=>{
    return(dispatch)=>{
      axios.get('https://eticaret-de184-default-rtdb.firebaseio.com/product.json').then((resp)=>{
          dispatch({type:PRODUCT_LİST_SUCCESS,payload:resp.data});
      });
    };
};
export const categoryList=()=>{
    return(dispatch)=>{
      axios.get('https://eticaret-de184-default-rtdb.firebaseio.com/category.json').then((resp)=>{
          dispatch({type:CATEGORY_LİST_SUCCESS,payload:resp.data});
      });
    };
};
export const productCreate=({category,count,description,image,name,price})=>{
  const sendProd={
      category:category,
      count:count,
      description:description,
      image:image,
      name:name,
      price:price
  }
      return(dispatch)=>{
        dispatch({type:CREATE_REQUEST});
        axios.post('https://eticaret-de184-default-rtdb.firebaseio.com/product.json',
        {product:sendProd})
        .then(()=>{
          dispatch({type:CREATE_REQUEST_SUCCESS});
          Actions.pop();
      });
      };
};
export const productUpdate=({category,count,description,image,name,price,key})=>{
  const updateProd={
    category:category,
    count:count,
    description:description,
    image:image,
    name:name,
    price:price
  };
    return(dispatch)=>{
        dispatch({type:UPDATE_REQUEST});
        axios.put('https://eticaret-de184-default-rtdb.firebaseio.com/product/'+key+'/.json',{product:updateProd})
        .then((resp)=>{
              dispatch({type:UPDATE_REQUEST_SUCCESS});
              Actions.pop();
        })
        .catch((err)=>{
          console.log('ERR',err)
        })
    }
};
export const productDelete=({key})=>{
  return(dispatch)=>{
    dispatch({type:DELETE_REQUEST});
    axios.delete('https://eticaret-de184-default-rtdb.firebaseio.com/product/'+key+'/.json')
    .then((resp)=>{
      dispatch({type:DELETE_REQUEST_SUCCESS});
      Actions.pop();
    })
    .catch((err)=>{
        console.error(err)
    });

  }
};
