/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from "./screens/HomeScreen";
import Camera from "./screens/Camera";
import Allergies from "./screens/Allergies";

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Camera: {screen: Camera},
  Allergies: {screen: Allergies},
  // Profile: {screen: ProfileScreen},
});

const App = createAppContainer(MainNavigator);

export default App;

// https://facebook.github.io/react-native/docs/signed-apk-android
// $ cd android
// $ ./gradlew bundleRelease
// ./gradlew assembleRelease







// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
