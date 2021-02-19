import {
  CATEGORY_CHANGE,
  CREATE_REQUEST_CATEGORY,
  CREATE_REQUEST_CATEGORY_SUCCESS,
  CATEGORY_LİST_SUCCESS_CATEGORY,
  UPDATE_REQUEST_CATEGORY,
  UPDATE_REQUEST_SUCCESS_CATEGORY,
  DELETE_REQUEST_CATEGORY,
  DELETE_REQUEST_SUCCESS_CATEGORY
} from './types';
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
export const categoryListCategory=()=>{
    return(dispatch)=>{
      axios.get('https://eticaret-de184-default-rtdb.firebaseio.com/category.json').then((resp)=>{
          dispatch({type:CATEGORY_LİST_SUCCESS_CATEGORY,payload:resp.data});
      });
    };
};
export const categoryCreate=({description,image,name})=>{
  const sendCategory={
      description:description,
      image:image,
      name:name
  };
    return(dispatch)=>{
        dispatch({type:CREATE_REQUEST_CATEGORY});
          axios.post('https://eticaret-de184-default-rtdb.firebaseio.com/category.json',
            {category:sendCategory})
            .then((response)=>{
              console.log('respppasd',response)
              dispatch({type:CREATE_REQUEST_CATEGORY_SUCCESS});
              Actions.pop();
            }).catch((err)=>{
              console.error(err);;
            });
    };
};
export const categoryUpdate=({description,image,name,key})=>{
    const updateCategory={
      description:description,
      image:image,
      name:name
    };
    return(dispatch)=>{
        dispatch({type:UPDATE_REQUEST_CATEGORY});
        axios.put('https://eticaret-de184-default-rtdb.firebaseio.com/category/'+key+'/.json',{category:updateCategory})
        .then((resp)=>{
          console.log('ASDASDASDASD',resp)
            dispatch({type:UPDATE_REQUEST_SUCCESS_CATEGORY});
            console.log('11111',resp)

            Actions.pop();
        })
        .catch((err)=>{
          console.error(err);
        })
    }
}
export const categoryDelete=({key})=>{
  return(dispatch)=>{
    dispatch({type:DELETE_REQUEST_CATEGORY});
    axios.delete('https://eticaret-de184-default-rtdb.firebaseio.com/category/'+key+'/.json')
    .then((resp)=>{
      dispatch({type:DELETE_REQUEST_SUCCESS_CATEGORY});
      Actions.pop();
    })
    .catch((err)=>{
        console.error(err)
    });

  }
};
