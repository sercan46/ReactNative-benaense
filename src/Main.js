import React,{Component} from 'react';
import {View,Text} from  'react-native';
import {Provider} from 'react-redux';
import firebase from '@firebase/app';
import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RouterComponent from './Router';

class Main extends Component{

  componentDidMount(){
    if (!firebase.apps.length) {
       firebase.initializeApp({
          apiKey: "AIzaSyAHwzqZYgLFwthZI7oo1jf-SRh3lZZIo-g",
          authDomain: "eticaret-de184.firebaseapp.com",
          databaseURL: "https://eticaret-de184-default-rtdb.firebaseio.com",
          projectId: "eticaret-de184",
          storageBucket: "eticaret-de184.appspot.com",
          messagingSenderId: "26542111574",
          appId: "1:26542111574:web:7d0a5a954651fd43e574f7",
          measurementId: "G-1BVPYCG6K3"
       });
    }
    else {
       firebase.app();
    }
  }

render(){
  const store=createStore(reducers,{},applyMiddleware(ReduxThunk));
    return(
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <RouterComponent />
        </View>
      </Provider>
    );
  }
};
export default Main;
