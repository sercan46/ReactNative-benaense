import {combineReducers} from 'redux';
import KimlikDogrulamaReducers from './KimlikDogrulamaReducers';
import ProductDataReducers from './ProductDataReducers';
import ProductsCreateReducers from './ProductsCreateReducers';
import CategoryDataReducers from './CategoryDataReducers';
import ProductUpdateReducers from './ProductUpdateReducers';
import ProductsDeleteReducers from './ProductsDeleteReducers';
import CategoryCreateReducers from './CategoryCreateReducers';
import CategoryDataCategoryReducers from './CategoryDataCategoryReducers';
import CategoryUpdateReducers from './CategoryUpdateReducers';
import CategoryDeleteReducers from './CategoryDeleteReducers'

export default combineReducers({
  kimlikdogrulamaResponse:KimlikDogrulamaReducers,
  productDataResponse:ProductDataReducers,
  productAddResponse:ProductsCreateReducers,
  categoryDataResponse:CategoryDataReducers,
  productUpdateResponse:ProductUpdateReducers,
  productDeleteResponse:ProductsDeleteReducers,
  CategoryDataCategoryResponse:CategoryDataCategoryReducers,
  categoryAddResponse:CategoryCreateReducers,
  categoryUpdateResponse:CategoryUpdateReducers,
  categoryDeleteResponse:CategoryDeleteReducers
})
