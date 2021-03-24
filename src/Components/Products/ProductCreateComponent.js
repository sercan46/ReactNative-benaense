import React, { Component } from 'react';
import { Text, Picker, View, TextInput, Image, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity,Keyboard } from 'react-native';
import { CustomCard, CustomCardSection, CustomButton, CustomSpinner } from '../../UiMixin';
import { productChange, productCreate, productList, categoryList } from '../../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { RNCamera } from 'react-native-camera';
import ImgToBase64 from 'react-native-image-base64';
import { Actions, Router } from 'react-native-router-flux';
import { TAKEAPHOTO } from '../../Image'
class ProductCreateComponent extends Component {
  state = { flag: false, imageUrl: "" }
  componentDidMount() {
    this.props.categoryList();
  }
  clickSave() {
    const { category, count, description, image, name, price } = this.props
    this.props.productCreate({ category, count, description, image, name, price })
    this.props.productList();
  }
  goToImagePage() {
    this.setState({ flag: true })
  }
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ imageUrl: data.uri })
      this.imageConvert();
    }
  };
  imageConvert() {
    setTimeout(() => {
      ImgToBase64.getBase64String(this.state.imageUrl)
        .then((base64String) => {

          this.props.productChange({ props: 'image', value: 'data:image/jpeg;base64,' + base64String })
          this.setState({ flag: false });

        })
        .catch(err => console.error(err));
    }, 500)
  }
  renderImageClick() {
    if (this.state.flag == false) {
      return <Image source={this.props.image ? { uri: this.props.image } : null} style={{ resizeMode: 'stretch', width: 200, height: 200, display: 'flex', flex: 1 }} />
    }
    else {
      return <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Resim Çek </Text>
          </TouchableOpacity>
        </View>
      </View>
    }
  }
  imageButton() {
    if (this.state.flag == false) {
      return <TouchableOpacity onPress={() => this.goToImagePage()}><ImageBackground
        source={TAKEAPHOTO}
        style={{ width: 30, height: 30, marginRight: 10 }}
      >
      </ImageBackground>
      </TouchableOpacity>
    }
  }
  renderButton() {
    if (!this.props.loading) {
      return <CustomButton onPress={this.clickSave.bind(this)}> Kaydet </CustomButton>;
    }
    return <CustomSpinner size='small' />;

  }
  render() {
    const { inputStyle } = styles
    return (
      <SafeAreaView style={{ paddingTop: 100 }}>
        <ScrollView>

          <CustomCardSection>
            <TextInput
              placeholder="Ürün Adı"
              style={inputStyle}
              value={this.props.name}
              onChangeText={name => this.props.productChange({ props: 'name', value: name })}
              returnKeyType="next"
              onSubmitEditing={() => { this.urunAciklama.focus(); }}
              blurOnSubmit={false}
            />
          </CustomCardSection>
          <CustomCardSection>
            <TextInput
                          ref={(input) => { this.urunAciklama = input; }}

              placeholder="Ürün Açıklaması"
              style={inputStyle}
              value={this.props.description}
              onChangeText={description => this.props.productChange({ props: 'description', value: description })}
              returnKeyType="next"
              onSubmitEditing={() => { this.urunMiktar.focus(); }}
              blurOnSubmit={false}
            />
          </CustomCardSection>
          <CustomCardSection>
            <TextInput
              ref={(input) => { this.urunMiktar = input; }}
              keyboardType='numeric'
              placeholder="Ürün Sayısı"
              style={inputStyle}
              value={this.props.count}
              onChangeText={count => this.props.productChange({ props: 'count', value: count })}
              returnKeyType="next"
              onSubmitEditing={() => { this.urunFiyat.focus(); }}
              blurOnSubmit={false}

            />
          </CustomCardSection>

          <CustomCardSection>
            <TextInput
                          ref={(input) => { this.urunFiyat = input; }}

              keyboardType='numeric'
              placeholder="Ürün Fiyatı"
              style={inputStyle}
              value={this.props.price}
              onChangeText={price => this.props.productChange({ props: 'price', value: price })}
              returnKeyType="enter"
              onSubmitEditing={() => { Keyboard.dismiss(); }}

            />
          </CustomCardSection>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.headerStyle}>Ürün Resmi</Text>
            </View>
            <View>
              {this.imageButton()}
            </View>
          </View>
          <CustomCardSection>

            {this.renderImageClick()}
          </CustomCardSection>
          <CustomCardSection>
            <Text style={{ fontSize: 14 }}> Kategori </Text>
            <Picker
              style={{ flex: 1, marginRight: 45 }}
              selectedValue={this.props.category}
              onValueChange={category => this.props.productChange({ props: 'category', value: category })}
            >
              {this.props.categoryArray.map((item, index) => {
                return (< Picker.Item label={item.name} value={item.name} key={index} />);
              })}

            </Picker>
          </CustomCardSection>
          {this.renderButton()}
        </ScrollView>

      </SafeAreaView>
    )

  }
}
const styles = {

  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    textAlign: 'center'
  },
  headerStyle: {
    marginLeft: 15,
    color: 'red',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    height: 300
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 300

  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
};
const mapToStateProps = ({ productAddResponse, categoryDataResponse }) => {

  const { category, count, description, image, name, price, loading } = productAddResponse;
  const categoryArray = _.map(categoryDataResponse, (val) => {
    return { ...val.category };
  })
  return { category, count, description, image, name, price, loading, categoryArray };
}
export default connect(mapToStateProps, { productChange, productCreate, productList, categoryList })(ProductCreateComponent);
