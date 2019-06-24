import React, { Component, PureComponent } from "react";
// import { Platform, AppRegistry, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { RNCamera } from "react-native-camera";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  Alert,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

class Camera extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      userHasVisitedCamera: "false"
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userhasvisitedcamera").then(value => {
      if (value == null) {
        this.setState({ userHasVisitedCamera: "false" });
      }
      if (value == "true") {
        this.setState({ userHasVisitedCamera: "true" });
      }
    });
    console.log("asyncstoragen arvo:", this.state.userHasVisitedCamera);
  }

  userhasreadtheinfo = async () => {
    try {
      await AsyncStorage.setItem("userhasvisitedcamera", "true");
      this.setState({ userHasVisitedCamera: "true" });
    } catch (error) {
      Alert.alert("Something went wrong, try again.");
    }
  };

  render() {
    const instructions =
      "The app will most probaly ask for your permission to use the camera if you are using it for the first time. This is necessary in order to scan barcodes. Here are the instuctions on how to use the camera:\n\n1. Accept the request\n2. Point the camera at the barcode\n3. Give it some time to process\n4. View the product details\n5. Be happy :)\n\nYou will not see this prompt again after pressing 'I understand', so digest this information carefully. ";
    const { navigate } = this.props.navigation;
    if (this.state.userHasVisitedCamera == "false") {
      return (
        <View style={styles.infoContainerMaster}>
          <View style={styles.infoContainerTop}>
            <View style={styles.cameraView}>
              <Icon name="md-information" color="#53452d" size={70} />
            </View>
          </View>
          <View style={styles.infoContainerMid}>
            <Text
              style={{
                color: "#53452d",
                fontSize: 13,
                fontWeight: "100",
                textAlign: "left",
                paddingTop: 5,
                lineHeight: 20
              }}
            >
              {instructions}
            </Text>
          </View>
          <View style={styles.infoContainerBot}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                this.userhasreadtheinfo();
              }}
            >
              <Icon name="md-thumbs-up" color="#53452d" size={30} />
              <Text
                style={{
                  color: "#53452d",
                  fontSize: 17,
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: 5,
                  paddingHorizontal: 5
                }}
              >
                I Understand
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.userHasVisitedCamera == "true") {
      return (
        // <View style={styles.container}>
        //     <Text>Camera</Text>
        //     <Button title='Home' onPress={() => navigate('Home')}/>
        // </View>
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
            androidRecordAudioPermissionOptions={{
              title: "Permission to use audio recording",
              message: "We need your permission to use your audio",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
              //             // Alert.alert(title, message?, buttons?, options?, type?)
              //             // Alert.alert("Code "+barcodes[0].data);//("Read: "+barcodes[0].data);
              //   //           ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
              ToastAndroid.showWithGravity(
                "CODE: " + barcodes[0].data,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
              global_barcode = barcodes[0].data;
              // {global_barcode} = barcodes[0];
              console.log(global_barcode);
              navigate("Home");
              // navigate('Home', {barcode: barcodes[0]});
            }}
          />
          {/* <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                              <Text style={{ fontSize: 14 }}> SNAP </Text>
                              <Text style={styles.instructions}>{instructions}</Text>
                          </TouchableOpacity>
                      </View> */}
        </View>
      );
    }
  }
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}
export default Camera;

const styles = StyleSheet.create({
  // container: {
  //     flex: 1,
  //     alignItems: 'center',
  //     justifyContent: 'center'
  // },
  infoContainerMaster: {
    flex: 1,
    backgroundColor: "#e8e4da"
  },
  infoContainerTop: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center"
  },
  infoContainerMid: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  infoContainerBot: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10
  },
  cameraView: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: "#53452d",
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  bottomButton: {
    width: Dimensions.get("window").width * 0.5,
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    borderColor: "#a8998d",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#ffffff"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});
