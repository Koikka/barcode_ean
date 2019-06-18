import React, { Component, PureComponent } from "react";
// import { Platform, AppRegistry, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ToastAndroid,
    TouchableOpacity,
    Platform
} from "react-native";
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
class Camera extends React.Component {
    static navigationOptions = {
        title: 'Camera',
    };
    render() {
        const { navigate } = this.props.navigation;
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
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                        //             // Alert.alert(title, message?, buttons?, options?, type?)
                        //             // Alert.alert("Code "+barcodes[0].data);//("Read: "+barcodes[0].data);
                        //   //           ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
                        ToastAndroid.showWithGravity(
                            'CODE: ' + barcodes[0].data,
                            ToastAndroid.LONG,
                            ToastAndroid.CENTER,
                        );
                        global_barcode = barcodes[0].data;
                        // {global_barcode} = barcodes[0];
                        console.log(global_barcode);
                        navigate('Home');
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
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
});