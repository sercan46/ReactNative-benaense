import React, { Component } from 'react';
import { Text, Picker, View, TextInput, Image, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { categoryChange, categoryUpdate, categoryListCategory, categoryDelete } from '../../actions';
import { CustomCard, CustomCardSection, CustomButton, CustomSpinner } from '../../UiMixin';
import _ from 'lodash'
import { RNCamera } from 'react-native-camera';
import ImgToBase64 from 'react-native-image-base64';
import { Actions, Router } from 'react-native-router-flux';
import { TAKEAPHOTO } from '../../Image'
class CategoryUpdateComponent extends Component {
  state = { description: '', image: '', name: '', flag: false, imageUrl: "" };
  componentDidMount() {

    const { description, image, name, key } = this.props.category;
    this.setState({ description, image, name, key });
  }
  clickUpdate() {
    const { description, image, name, key } = this.state;
    this.props.categoryUpdate({ description, image, name, key })
    this.props.categoryListCategory();

  }
  deleteCategory() {
    const { key } = this.state;
    this.props.categoryDelete({ key });
    this.props.categoryListCategory();

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
          this.setState({ image: 'data:image/jpeg;base64,' + base64String, flag: false });

        })
        .catch(err => console.error(err));
    }, 500)
  }
  renderButton() {
    if (!this.props.loadingUpdateCategory) {
      return <View>
        <CustomButton onPress={this.clickUpdate.bind(this)}> Kaydet </CustomButton>
        <CustomButton onPress={this.deleteCategory.bind(this)}> Sil </CustomButton>
      </View>;

    }
    return <CustomSpinner size='small' />;

  }
  renderImageClick() {
    if (this.state.flag == false) {
      return <Image source={this.state.image ? { uri: this.state.image } : null} style={{ resizeMode: 'stretch', width: 200, height: 200, display: 'flex', flex: 1 }} />
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
      // return <Button title="Ürün Resmi Çek" onPress={() => this.goToImagePage()}></Button>

      return <TouchableOpacity onPress={() => this.goToImagePage()}><ImageBackground
        source={TAKEAPHOTO}
        style={{ width: 30, height: 30, marginRight: 10 }}
      >
      </ImageBackground>
      </TouchableOpacity>
    }
  }
  render() {
    const { inputStyle } = styles

    return (
      <SafeAreaView style={{ paddingTop: 100 }}>
        <ScrollView>
          <Text style={styles.headerStyle}>Ürün Adı</Text>

          <CustomCardSection>
            <TextInput
              placeholder="Ürün Adı"
              style={inputStyle}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              returnKeyType="next"
              onSubmitEditing={() => { this.urunAciklama.focus(); }}
              blurOnSubmit={false}

            />
          </CustomCardSection>
          <Text style={styles.headerStyle}>Ürün Adı</Text>

          <CustomCardSection>
            <TextInput
              ref={(input) => { this.urunAciklama = input; }}
              placeholder="Ürün Açıklaması"
              style={inputStyle}
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
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
const mapToStateProps = ({ categoryUpdateResponse }) => {
  const { loadingUpdateCategory } = categoryUpdateResponse;
  return { loadingUpdateCategory };
}
export default connect(mapToStateProps, { categoryChange, categoryUpdate, categoryListCategory, categoryDelete })(CategoryUpdateComponent)
