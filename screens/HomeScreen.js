import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	Modal,
	ImageBackground,
	Dimensions
} from "react-native";
import DomSelector from 'react-native-dom-parser';
import Allergies from './Allergies.js';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from "react-native-vector-icons/Ionicons";

class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};
	async readProduct(barcode) {
		if (barcode.length > 0 && barcode != "Empty" && barcode != global_last_barcode) {
			try {
				const response = await fetch('https://www.foodie.fi/entry/' + barcode);
				const responseText = await response.text();
				const rootNode = DomSelector(responseText);
				const ingredients = rootNode.getElementById('product-ingredients');
				const product_subname = rootNode.getElementById('product-subname');
				const product_name = rootNode.getElementById('product-name');

				let title = "";
				try {
					title = this.char_replace(product_name.firstChild.text);
				} catch (error) {
					console.log(error);
				}
				if (title.length > 0) {
					const sub_title = this.char_replace(product_subname.firstChild.text);
					// console.log(ingredients);
					const all_text_elems = ingredients.children;
					let all_text = "";
					for (let index = 0; index < all_text_elems.length; index++) {
						try {
							all_text += all_text_elems[index].firstChild.text;
						} catch (error) {
							all_text += all_text_elems[index].text;
						}
						// all_text += all_text_elems[index].text;
					}
					all_text = this.char_replace(all_text);
					// console.log(rootNode.getElementById('js-pricebox').getElementsByClassName('whole-number')[0].firstChild.text+","+rootNode.getElementById('js-pricebox').getElementsByClassName('decimal')[0].firstChild.text);
					const text = this.char_replace(ingredients.firstChild.text);
					// console.log(this.char_replace(ingredients.firstChild.text));
					let allergy = "";
					if (typeof global_allergies !== 'undefined') {
						console.log(global_allergies);
						if (global_allergies.length > 0) {
							allergy = this.check_food_content(sub_title + " " + title + " " + all_text);
						}
					}
					const price = rootNode.getElementById('js-pricebox').getElementsByClassName('whole-number')[0].firstChild.text + "," + rootNode.getElementById('js-pricebox').getElementsByClassName('decimal')[0].firstChild.text + "€";
					//alert(sub_title + "\n" + title + "\n" + text + "\n\n" + allergy.toString().toUpperCase());
					global_sub_title = sub_title;
					global_title = title;
					global_text = all_text;
					global_curr_allergy = allergy.toString().toUpperCase();
					this.setState({ sub_title: sub_title });
					this.setState({ title: title });
					this.setState({ text: all_text });
					this.setState({ allergy: global_curr_allergy });
					this.setState({ price: price });
					this.setModalVisible(true);
				}
				// this.setState({ barcode: global_barcode });
				// this.check_food_content(sub_title + " " + title + " " + text);
				// alert(responseJson);
				global_last_barcode = barcode;
			}
			catch (error) {
				console.error(error);
			}
		} else {
			//alert('not valid barcode');
		}
	}
	char_replace(str) {
		let unicode_char = ["&#32;", "&#33;", "&#34;", "&#35;", "&#36;", "&#37;", "&#38;", "&#39;", "&#40;", "&#41;", "&#42;", "&#43;", "&#44;", "&#45;", "&#46;", "&#47;", "&#48;", "&#49;", "&#50;", "&#51;", "&#52;", "&#53;", "&#54;", "&#55;", "&#56;", "&#57;", "&#58;", "&#59;", "&#60;", "&#61;", "&#62;", "&#63;", "&#64;", "&#65;", "&#66;", "&#67;", "&#68;", "&#69;", "&#70;", "&#71;", "&#72;", "&#73;", "&#74;", "&#75;", "&#76;", "&#77;", "&#78;", "&#79;", "&#80;", "&#81;", "&#82;", "&#83;", "&#84;", "&#85;", "&#86;", "&#87;", "&#88;", "&#89;", "&#90;", "&#91;", "&#92;", "&#93;", "&#94;", "&#95;", "&#96;", "&#97;", "&#98;", "&#99;", "&#100;", "&#101;", "&#102;", "&#103;", "&#104;", "&#105;", "&#106;", "&#107;", "&#108;", "&#109;", "&#110;", "&#111;", "&#112;", "&#113;", "&#114;", "&#115;", "&#116;", "&#117;", "&#118;", "&#119;", "&#120;", "&#121;", "&#122;", "&#123;", "&#124;", "&#125;", "&#126;", "&#160;", "&#161;", "&#162;", "&#163;", "&#164;", "&#165;", "&#166;", "&#167;", "&#168;", "&#169;", "&#170;", "&#171;", "&#172;", "&#173;", "&#174;", "&#175;", "&#176;", "&#177;", "&#178;", "&#179;", "&#180;", "&#181;", "&#182;", "&#183;", "&#184;", "&#185;", "&#186;", "&#187;", "&#188;", "&#189;", "&#190;", "&#191;", "&#192;", "&#193;", "&#194;", "&#195;", "&#196;", "&#197;", "&#198;", "&#199;", "&#200;", "&#201;", "&#202;", "&#203;", "&#204;", "&#205;", "&#206;", "&#207;", "&#208;", "&#209;", "&#210;", "&#211;", "&#212;", "&#213;", "&#214;", "&#215;", "&#216;", "&#217;", "&#218;", "&#219;", "&#220;", "&#221;", "&#222;", "&#223;", "&#224;", "&#225;", "&#226;", "&#227;", "&#228;", "&#229;", "&#230;", "&#231;", "&#232;", "&#233;", "&#234;", "&#235;", "&#236;", "&#237;", "&#238;", "&#239;", "&#240;", "&#241;", "&#242;", "&#243;", "&#244;", "&#245;", "&#246;", "&#247;", "&#248;", "&#249;", "&#250;", "&#251;", "&#252;", "&#253;", "&#254;", "&#255;"];
		let utf8_char = [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", " ", "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", "	", "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];
		for (let i = 0; i < unicode_char.length; i++) {
			str = str.replace(new RegExp(unicode_char[i], 'g'), utf8_char[i]);
		}
		return str;
	}
	check_food_content(food) {
		//console.log("food: " + food);
		//console.log("Forbidden");
		const possible_allergy = [];
		const allergy_forbidden = "";
		const allergy_allow = "";
		//console.log(global_allergies_list);
		for (let index = 0; index < global_allergies.length; index++) {
			for (let index_inner = 0; index_inner < global_allergies_list.allergy_list.length; index_inner++) {
				if (global_allergies_list.allergy_list[index_inner].name == global_allergies[index]) {
					//console.log(global_allergies_list.allergy_list[index_inner].forbidden);
					let forbidden = global_allergies_list.allergy_list[index_inner].forbidden;
					for (let i = 0; i < forbidden.length; i++) {
						const element = forbidden[i];
						if (food.includes(forbidden[i])) {
							possible_allergy.push(global_allergies_list.allergy_list[index_inner].name);
						}

					}
					// allergy_allow += global_allergies_list.allergy_list[index_inner].allow.toString();
					// allergy_forbidden += global_allergies_list.allergy_list[index_inner].forbidden.toString();
				}

			}
			//console.log(global_allergies_list.allergy_list.global_allergies[index]);

		}
		return possible_allergy;
	}
	constructor(props) {
		super(props);
		this.state = {
			barcode: global_barcode,
			allergy: global_curr_allergy,
			sub_title: global_sub_title,
			title: global_title,
			text: global_text,
			price: "",
			modalVisible: false
		};
	}
	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	componentDidMount() {
		const { navigation } = this.props;
		this.focusListener = navigation.addListener("didFocus", () => {
			// The screen is focused
			// Call any action
			console.log("page focus");
			// setTimeout(() => {new Allergies().getData()}, 1000)
			setTimeout(() => { this.getData() }, 1000)
			// new Allergies().getData();
			// Allergies.functions.getData();
			this.setState({ barcode: global_barcode });
		});
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
				global_allergies = value.split(",");
			}
		} catch (e) {
			// error reading value
		}
	}

	componentWillUnmount() {
		// Remove the event listener
		this.focusListener.remove();
	}
	componentDidUpdate() {
		console.log(global_barcode);
		this.readProduct(global_barcode);
	}
	_changeAllergy = (e) => {
		this.setState({ allergy: e.target.value });
	}

	render() {
		const { navigate } = this.props.navigation;
		let { allergy, barcode, sub_title, title, text, price } = this.state;
		const infoText = "Pressing the camera picture on top of this text takes you to product barcode reader. Pressing the buttons below will take you to product details and allergies selection.";
		const textColor = '#53452d';
		const containerMidColor = '#e8e4da';
		const containerBotColor = '#ffffff';
		// console.log(global_barcode);
		// console.log(this.state.barcode);
		return (
			<View style={{flex: 1}}>
				<ImageBackground source={require('../images/old_road.jpg')} resizeMode='cover' blurRadius={10} style={styles.containerTop}>
					<TouchableOpacity style={styles.cameraView} onPress={() => navigate('Camera')}>
						<Icon name="md-camera" color="#ffffff" size={70} />
					</TouchableOpacity>
				</ImageBackground>
				<View style={styles.containerMid}>
					<Text style={{color: '#53452d', fontSize: 13, textAlign: 'center'}}>{infoText}</Text>
				</View>
				<View style={styles.containerBot}>
					<TouchableOpacity style={styles.bottomButton} onPress={() => this.setModalVisible(true)}>
						<Icon name="md-list" color="#53452d" size={50} />
						<Text style={{color: '#53452d', fontSize: 13, textAlign: 'center', paddingTop: 5}}>Product Details</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.bottomButton} onPress={() => navigate('Allergies')}>
						<Icon name="md-nutrition" color="#53452d" size={50} />
						<Text style={{color: '#53452d', fontSize: 13, textAlign: 'center', paddingTop: 5}}>Select Allergies</Text>
					</TouchableOpacity>
				</View>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>
					<View style={{ marginTop: 22 }}>
						<View style={{ margin: 10 }}>
							<Text style={styles.sub_title}>{sub_title}</Text>
							<Text style={styles.title}>{title}</Text>
							<Text>{text}</Text>
							<Text style={styles.price}>{price}</Text>
							<View style={styles.hr} />
							<Text style={styles.barcode}>{barcode}</Text>
							<View style={styles.hr} />
							<Text style={styles.allergy}>{allergy}</Text>
							<View style={styles.center}>
								<TouchableOpacity style={styles.button} onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
									<Text>Close this</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
			);
	}
	async readUrl(barcode) {
		try {
			const response = await fetch('https://facebook.github.io/react-native/movies.json');
			const responseJson = await response.json();
			alert(responseJson.movies);
		}
		catch (error) {
			console.error(error);
		}
	}
}

export default HomeScreen;

const styles = StyleSheet.create({
	containerTop: {
		flex: 0.5,
		backgroundColor: "#e8e4da",
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerMid: {
		flex: 0.20,
		backgroundColor: "#e8e4da",
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
		borderBottomWidth: 3,
		borderBottomColor:'#c4c4c4',
		borderTopWidth: 3,
		borderTopColor:'#c4c4c4'
	},
	containerBot: {
		flex: 0.30,
		backgroundColor: "#ffffff",
		justifyContent:'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 20
	},
	cameraView: {
		width: 150,
		height: 150,
		borderRadius: 150 / 2,
		borderColor: "#ffffff",
		borderWidth: 2,
		alignItems: 'center',
		justifyContent:'center'
	},
	bottomButton: {
		width: Dimensions.get('window').width / 2.5,
		height: '70%',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#a8998d',
		borderWidth: 2,
		borderRadius: 10
	},
	hr: {
		borderBottomColor: 'black',
		borderBottomWidth: 1
	},
	button: {
		margin: 10,
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		height: 40,
		width: 160,
		borderRadius: 10
	},
	sub_title: {
		fontWeight: 'bold',
		fontStyle: 'italic',
		fontSize: 16
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18
	},
	barcode: {
		fontSize: 12
	},
	allergy: {
		fontWeight: 'bold',
		fontStyle: 'italic',
		fontSize: 18
	},
	price: {
		fontWeight: 'bold',
		fontSize: 20
	}
});
