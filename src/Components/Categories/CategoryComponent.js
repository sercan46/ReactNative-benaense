import React,{Component} from 'react';
import {Text,FlatList} from 'react-native';
import {connect} from 'react-redux';
import {categoryList} from '../../actions';
import _ from "lodash";
import CategoryList from './CategoryListItem'
class CategoryComponent extends Component{
  componentDidMount() {
      this.props.categoryList();
  }
  renderRow({ item, index }) {
     return <CategoryList category={item} />;
  }
  render(){
    return(
      <FlatList
          data={this.props.categoryArray}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
      />
    )
  }
};
const mapStateToProps=({categoryDataResponse})=>{
    const categoryArray=_.map(categoryDataResponse,(val,key)=>{
        return { ...val.category,key };
    });
    console.log('categoryArray',categoryArray)
    return {categoryArray};
};
export default connect(mapStateToProps,{categoryList}) (CategoryComponent);
