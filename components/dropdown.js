// https://github.com/renrizzolo/react-native-sectioned-multi-select#readme
import React, { Component } from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Allergies from '../screens/Allergies.js';
// import console = require('console');

// This is how you can load a local icon
// You can remove this if you'd like
// const icon = require('./icon.png');

const items = [
  {
    name: 'Fruits',
    id: 0,
    // icon: icon, // Make sure the icon const is set, or you can remove this
    children: [
      {
        name: 'Apple',
        id: 'apple',
      },
      {
        name: 'Strawberry',
        id: 17,
      },
      {
        name: 'Pineapple',
        id: 13,
      },
      {
        name: 'Banana',
        id: 14,
      },
      {
        name: 'Watermelon',
        id: 15,
      },
      {
        name: 'Kiwi fruit',
        id: 16,
      },
    ],
  },
  {
    name: 'Gems',
    id: 1,
    // icon: { uri: 'https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png' }, // web uri
    children: [
      {
        name: 'Quartz',
        id: 20,
      },
      {
        name: 'Zircon',
        id: 21,
      },
      {
        name: 'Sapphire',
        id: 22,
      },
      {
        name: 'Topaz',
        id: 23,
      },
    ],
  },
  {
    name: 'Plants',
    id: 2,
    // icon: 'filter_vintage', // material icons icon name
    children: [
      {
        name: "Mother In Law's Tongue",
        id: 30,
      },
      {
        name: 'Yucca',
        id: 31,
      },
      {
        name: 'Monsteria',
        id: 32,
      },
      {
        name: 'Palm',
        id: 33,
      },
    ],
  },
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
    };
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    //global_allergies = this.state.selectedItems;
  };
  componentDidUpdate() {
    console.log(this.state.selectedItems);
    global_allergies = this.state.selectedItems;
    // Allergies._storeData();
    // Allergies.Allergies._storeData();
    // this.readProduct(global_barcode);
    // this._changeBarcode();
  };
  // _storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem('allergy_items', global_allergies);
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };
  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('allergy_items');
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  // componentDidMount() {
  //   const { navigation } = this.props;
  //   this.focusListener = navigation.addListener("didFocus", () => {
  //     // The screen is focused
  //     // Call any action
  //     console.log("page focus");
  //     this._retrieveData();
  //     // this.setState({ barcode: global_barcode });
  //   });
  // }

  render() {
    return (
      <View>
        <SectionedMultiSelect
          items={items}
          uniqueKey="id"
          subKey="children"
          iconKey="icon"
          selectText="Valitse allergia(t)..."
          confirmText="Valitse"
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          showCancelButton={true}
        />
      </View>
    );
  }
}