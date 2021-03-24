import React ,{Component} from 'react';
import {Text,FlatList} from 'react-native';
import {connect} from 'react-redux';
import {productList} from '../../actions';
import _ from "lodash";
import ProductList from './ProductListItem'
class ProductComponent extends Component{

    componentDidMount() {
        this.props.productList();
    }
    renderRow({ item, index }) {
        return <ProductList product={item} />;
    }

    render(){
      this.props.productList();

      return(
        <FlatList
        style={{marginTop:'9%'}}
            data={this.props.productArray}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
        />
      )
    }
}
const mapStateToProps = ({ productDataResponse }) => {
  const productArray = _.map(productDataResponse, (val,key) => {
       return { ...val.product,key };
      });
  return { productArray };
};
export default connect(mapStateToProps,{productList}) (ProductComponent)
