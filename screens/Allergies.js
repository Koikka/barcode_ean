import React, { Component } from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet
} from "react-native";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import AsyncStorage from '@react-native-community/async-storage';
// import Dropdown from '../components/dropdown.js';
const items = [
    {
        name: 'Tyypilliset allergiat',
        id: 0,
        // icon: icon, // Make sure the icon const is set, or you can remove this
        children: [
            {
                name: 'Gluteiiniton',
                id: 'Gluteiiniton',
            },
            {
                name: 'Vilja-allergia',
                id: 'Vilja-allergia',
            },
            {
                name: 'Vähälaktoosinen',
                id: 'Vähälaktoosinen',
            },
            {
                name: 'Laktoositon',
                id: 'Laktoositon',
            },
            {
                name: 'Kasvissyöjät',
                id: 'Kasvissyöjät',
            },
            {
                name: 'Vegaaninen',
                id: 'Vegaaninen',
            },
        ],
    },
    {
        name: 'Muut',
        id: 1,
        // icon: { uri: 'https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png' }, // web uri
        children: [
            {
                name: 'Quartz',
                id: 'Quartz',
            },
            {
                name: 'Zircon',
                id: 'Zircon',
            },
            {
                name: 'Sapphire',
                id: 'Sapphire',
            },
            {
                name: 'Topaz',
                id: 'Topaz',
            },
        ],
    }
];
class Allergies extends React.Component {
    static navigationOptions = {
        title: 'Select allergies',
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
        };
    }

    onSelectedItemsChange = (selectedItems) => {
        console.log(selectedItems);
        this.setState({ selectedItems });
        //global_allergies = this.state.selectedItems;
    };
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            // The screen is focused
            // Call any action
            console.log("page focus allergies");
            this.getData();
            // this.setState({ barcode: global_barcode });
        });
    }
    componentDidUpdate() {
        console.log(this.state.selectedItems);
        global_allergies = this.state.selectedItems;
        this.storeData();
        // this.remove_old_data();
        // this.storeData();
        // this.readProduct(global_barcode);
        // this._changeBarcode();
    };
    remove_old_data = async () => {
        try {
            await AsyncStorage.removeItem('@allergy_items');
            this.storeData();
            // await AsyncStorage.setItem('@allergy_items', global_allergies);
        } catch (e) {
            // saving error
        }
    }
    storeData = async () => {
        try {
            console.log(global_allergies.toString());
            // await AsyncStorage.removeItem('@allergy_items');
            await AsyncStorage.setItem('@allergy_items', global_allergies.toString());
        } catch (e) {
            // saving error
        }
    }
    getData = async () => {
        console.log("getData called");
        try {
            const value = await AsyncStorage.getItem('@allergy_items')
            if (value !== null) {
                // value previously stored
                console.log("-------");
                console.log(value.toString());
                console.log(value);
                console.log("-------");
                let selectedItems_temp = value.split(",");
                console.log(selectedItems_temp);
                this.onSelectedItemsChange(selectedItems_temp);
                // let selectedItems = selectedItems_temp;
                // this.setState({ selectedItems });
                // selectedItems = value.split(",");
                // this.setState({ selectedItems });
                //this.state.selectedItems = value.split(",");
            }
        } catch (e) {
            // error reading value
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Sample test</Text>
                {/* <Dropdown /> */}
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
// module.exports = {
//     functions: getData
// };
export default Allergies;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});