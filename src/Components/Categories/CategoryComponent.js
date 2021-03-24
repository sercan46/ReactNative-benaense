import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { categoryListCategory } from '../../actions';
import _ from "lodash";
import CategoryList from './CategoryListItem'
class CategoryComponent extends Component {
  componentDidMount() {
    this.props.categoryListCategory();
  }
  renderRow({ item, index }) {
    return <CategoryList category={item} />;
  }
  render() {
    this.props.categoryListCategory();

    return (
      <FlatList
        style={{ marginTop: '9%' }}
        data={this.props.categoryArray}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }
};
const mapStateToProps = ({ CategoryDataCategoryResponse }) => {
  const categoryArray = _.map(CategoryDataCategoryResponse, (val, key) => {
    return { ...val.category, key };
  });
  return { categoryArray };
};
export default connect(mapStateToProps, { categoryListCategory })(CategoryComponent);
