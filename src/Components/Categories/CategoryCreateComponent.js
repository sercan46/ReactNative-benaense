import React, { Component } from 'react';
import { Text, Picker, View, TextInput, Image, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity ,Keyboard} from 'react-native';
import { CustomCard, CustomCardSection, CustomButton, CustomSpinner } from '../../UiMixin';
import { categoryChange, categoryCreate, categoryListCategory } from '../../actions';
import { connect } from 'react-redux';
import _ from 'lodash'
import { RNCamera } from 'react-native-camera';
import ImgToBase64 from 'react-native-image-base64';
import { Actions, Router } from 'react-native-router-flux';
import { TAKEAPHOTO } from '../../Image'
class CategoryCreateComponent extends Component {
  state = { flag: false, imageUrl: "" }

  clickSave() {
    const { description, image, name } = this.props
    this.props.categoryCreate({ description, image, name })
    this.props.categoryListCategory();
  }

  renderButton() {
    if (!this.props.loading) {
      return <CustomButton onPress={this.clickSave.bind(this)}> Kaydet </CustomButton>;
    }
    return <CustomSpinner size='small' />;

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

          this.props.categoryChange({ props: 'image', value: 'data:image/jpeg;base64,' + base64String })
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
      // return <Button title="Ürün Resmi Çek" onPress={() => this.goToImagePage()}></Button>

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
      <View style={{ paddingTop: 100 }}>
        <CustomCardSection>
          <TextInput
            placeholder="Kategori Adı"
            style={inputStyle}
            value={this.props.name}
            onChangeText={name => this.props.categoryChange({ props: 'name', value: name })}
            returnKeyType="next"
            onSubmitEditing={() => { this.urunAciklama.focus(); }}
            blurOnSubmit={false}
          />
        </CustomCardSection>
        <CustomCardSection>
          <TextInput
            ref={(input) => { this.urunAciklama = input; }}
            placeholder="Kategori Açıklaması"
            style={inputStyle}
            value={this.props.description}
            onChangeText={description => this.props.categoryChange({ props: 'description', value: description })}
            returnKeyType="enter"
            onSubmitEditing={() => { Keyboard.dismiss(); }}
          />
        </CustomCardSection>


        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.headerStyle}>Kategori Resmi</Text>
          </View>
          <View>
            {this.imageButton()}
          </View>
        </View>
        <CustomCardSection>

          {this.renderImageClick()}
        </CustomCardSection>

        {this.renderButton()}
      </View>
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
const mapToStateProps = ({ categoryAddResponse }) => {

  const { description, image, name, loading } = categoryAddResponse;

  return { description, image, name, loading };
}
export default connect(mapToStateProps, { categoryChange, categoryCreate, categoryListCategory })(CategoryCreateComponent);
