import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginComponent from './Components/LoginComponent';
import MenuComponent from './Components/MenuComponent';
import ProductComponent from './Components/Products/ProductComponent';
import ProductCreateComponent from './Components/Products/ProductCreateComponent';
import ProductUpdateComponent from './Components/Products/ProductUpdateComponent';
import CategoryComponent from './Components/Categories/CategoryComponent';
import CategoryCreateComponent from './Components/Categories/CategoryCreateComponent';
import CategoryUpdateComponent from './Components/Categories/CategoryUpdateComponent';

class RouterComponent extends Component {
  render() {
    return (
      <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={{ marginTop: 20 }}>
        <Scene key="root" >
          <Scene key="loginPage" component={LoginComponent} title="Giriş Sayfası" />
        </Scene>
        <Scene key="main" >
          <Scene key="menuPage" component={MenuComponent} title="Menü" />

          <Scene key="productPage" component={ProductComponent} title="Ürünler" onRight={() => { Actions.productAddPage() }}
            rightTitle="Yeni Ürün" />
          <Scene key="productAddPage" component={ProductCreateComponent} title="Ürün Ekle" />
          <Scene key='productUpdatePage' component={ProductUpdateComponent} title='Ürün Güncelle' />

          <Scene key='categoryPage' component={CategoryComponent} title='Kategoriler' onRight={() => { Actions.categoryAddPage() }}
            rightTitle="Yeni Kategori" />
          <Scene key="categoryAddPage" component={CategoryCreateComponent} title="Kategori Ekle" />
          <Scene key='categoryUpdatePage' component={CategoryUpdateComponent} title='Kategori Güncelle' />

        </Scene>
      </Router>
    );
  }
}
const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: 'crimson',
  },
  navTitle: {
    color: 'white'
  }
})

export default RouterComponent;
