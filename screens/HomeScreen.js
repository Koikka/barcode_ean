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
	Dimensions,
	Alert,
	ScrollView,
	Linking,
	Image
} from "react-native";
import DomSelector from 'react-native-dom-parser';
import Allergies from './Allergies.js';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';

class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};
	async readProduct(barcode) {
		this.didUpdate = true;
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
					let sub_title = 'Empty';
					try {
						sub_title = this.char_replace(product_subname.firstChild.text);
					} catch (error) {
						console.log(error);
					}
					console.log(ingredients);
					var all_text_elems = '';
					var all_text = '';
					try {
						all_text_elems = ingredients.children;
						for (let index = 0; index < all_text_elems.length; index++) {
							try {
								all_text += all_text_elems[index].firstChild.text;
							} catch (error) {
								all_text += all_text_elems[index].text;
							}
							// all_text += all_text_elems[index].text;
						}
						console.log(all_text);
						all_text = this.char_replace(all_text);
					} catch (error) {
						console.log(error);
						all_text = '';
					}
					try {
						// https://foodieimages.s3.amazonaws.com/images/entries/320x480/6413600002154_0.png
						let url_to_img = 'https://foodieimages.s3.amazonaws.com/images/entries/320x480/'+barcode+'_0.png';
						// let temp_img_url = Image.prefetch(url_to_img);
						// console.log(temp_img_url);
						var response_im = Image.prefetch(url_to_img,()=>console.log('Image is being fetched'));
						console.log(response_im);
						this.setState({img_width: 320});
						this.setState({img_height: 480});
						this.setState({ img_url: url_to_img });
						// Image.getSize(url_to_img, (width, height)=>{this.setState({img_width, img_height})}, console.log('fail'));
					} catch (error) {
						console.log(error);
						let url_to_img = 'https://foodieimages.s3.amazonaws.com/images/entries/320x480/'+barcode+'_0.png';
						this.setState({ img_url: url_to_img });
						this.setState({img_width: 320});
						this.setState({img_height: 480});
					}
					// console.log(rootNode.getElementById('js-pricebox').getElementsByClassName('whole-number')[0].firstChild.text+","+rootNode.getElementById('js-pricebox').getElementsByClassName('decimal')[0].firstChild.text);
					//const text = this.char_replace(ingredients.firstChild.text);
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
			} catch (error) {
				console.error(error);
			}
		} else {
			//alert('not valid barcode');
		}
		this.didUpdate = false;
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
			modalVisible: false,
			didUpdate: false,
			img_url: '',
			img_width: 0,
			img_height: 0
		};
	}
	setModalVisible(visible) {
		console.log(visible);
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
		if (!this.didUpdate) {
			console.log('componentDidUpdate: ' + global_barcode);
			this.readProduct(global_barcode);
		}
	}
	_changeAllergy = (e) => {
		this.setState({ allergy: e.target.value });
	}
	openUrl() {
		let food_url = 'https://www.foodie.fi/entry/' + global_barcode;
		console.log(food_url);
		Linking.canOpenURL(food_url)
			.then((supported) => {
				if (!supported) {
					console.log("Can't handle url: " + food_url);
				} else {
					return Linking.openURL(food_url);
				}
			})
			.catch((err) => console.error('An error occurred', err));
	}

	render() {
		const { navigate } = this.props.navigation;
		let { allergy, barcode, sub_title, title, text, price } = this.state;
		const instructions = "Looks like you haven't scanned any product barcodes yet!\n\nTo fix this situation, you have to go back one step, read the instructions on the main menu and try again. "
		const infoText = "Pressing the camera picture on top of this text takes you to product barcode reader. Pressing the buttons below will take you to product details and allergies selection.";
		const textColor = '#53452d';
		const containerMidColor = '#e8e4da';
		const containerBotColor = '#ffffff';
		let bool = false;
		// console.log(global_barcode);
		// console.log(this.state.barcode);
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground source={require('../images/old_road.jpg')} resizeMode='cover' blurRadius={10} style={styles.containerTop}>
					<TouchableOpacity style={styles.cameraView} onPress={() => navigate('Camera')}>
						<Icon2 name="camera" color="#ffffff" size={70} />
					</TouchableOpacity>
				</ImageBackground>
				<View style={styles.containerMid}>
					<Text style={{ color: '#53452d', fontSize: 13, textAlign: 'center' }}>{infoText}</Text>
				</View>
				<View style={styles.containerBot}>
					<TouchableOpacity style={styles.bottomButton} onPress={() => this.setModalVisible(true)}>
						<Icon name="md-list" color="#53452d" size={50} />
						<Text style={{ color: '#53452d', fontSize: 13, textAlign: 'center', paddingTop: 5 }}>Product Details</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.bottomButton} onPress={() => navigate('Allergies')}>
						<Icon name="md-nutrition" color="#53452d" size={50} />
						<Text style={{ color: '#53452d', fontSize: 13, textAlign: 'center', paddingTop: 5 }}>Select Allergies</Text>
					</TouchableOpacity>
				</View>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setModalVisible(!this.state.modalVisible);
					}}>
					<View style={styles.infoContainerMaster}>
						{title != "" ?
							<View style={styles.infoContainerMaster}>
								{/* <ImageBackground source={require('../images/old_road.jpg')} resizeMode='cover' blurRadius={10} style={styles.prodinfoTop}> */}
								<ImageBackground source={{uri: this.state.img_url}} resizeMode='cover' blurRadius={1} style={styles.prodinfoTop}>	
									<Icon2 name="tag" color="#ffffff" size={70} />
								</ImageBackground>
								<ScrollView style={styles.prodinfoMid}>
									<View>
										<View style={{ margin: 2 }}>
											<Text style={styles.sub_title}>{sub_title}</Text>
											<Text style={styles.title}>{title}</Text>
											<View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
												<Icon2 name="bread-slice" color="#53452d" size={20} style={{ paddingHorizontal: 5 }} />
												<Icon2 name="blender" color="#53452d" size={20} style={{ paddingHorizontal: 5 }} />
												<Icon2 name="cheese" color="#53452d" size={20} style={{ paddingHorizontal: 5 }} />
												<Text style={{ color: "#53452d", fontSize: 15, fontWeight: 'bold', paddingTop: 5, paddingHorizontal: 5 }} onPress={() => this.openUrl()}>...read more</Text>
											</View>
											<Text style={{ color: "#53452d", fontSize: 15, fontWeight: 'bold', paddingBottom: 2 }}>Ingredients:</Text>
											<Text style={{ paddingBottom: 10 }}>{text}</Text>
											<Text style={{ color: "#53452d", fontSize: 15, fontWeight: 'bold', paddingBottom: 2 }}>Price:</Text>
											<Text style={styles.price}>{price}</Text>
											<Text style={styles.allergy}>{allergy}</Text>
										</View>
										<View style={styles.img_container}>
											{/* <Image style={styles.img} source={{uri: this.state.img_url}}/> */}
											<Image style={{width: this.state.img_width, height: this.state.img_height}} source={{uri: this.state.img_url}}/>
										</View>
										<View>
											<View style={styles.hr} />
											<Text style={styles.barcode}>{"Barcode: " + barcode}</Text>
										</View>
									</View>
								</ScrollView>
								<View style={styles.prodinfoBot}>
									<TouchableOpacity
										style={styles.modalBottomButton}
										onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
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
											Cool!
										</Text>
									</TouchableOpacity>
								</View>
							</View>
							:
							<View style={styles.infoContainerMaster}>
								<View style={styles.infoContainerTop}>
									<Icon2 name="box-open" color="#53452d" size={120} />
								</View>
								<View style={styles.infoContainerMid}>
									<Text style={{
										color: "#53452d",
										fontSize: 35,
										fontWeight: "bold",
										textAlign: "center",
										paddingBottom: 30,
									}}
									>
										UH OH!
									</Text>
									<Text
										style={{
											color: "#53452d",
											fontSize: 15,
											fontWeight: "100",
											textAlign: "center",
											paddingTop: 5,
											lineHeight: 20
										}}
									>
										{instructions}
									</Text>
								</View>
								<View style={styles.infoContainerBot}>
									<TouchableOpacity
										style={styles.modalBottomButton}
										onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
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
											Allright
									</Text>
									</TouchableOpacity>
								</View>
							</View>
						}
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
		borderBottomColor: '#c4c4c4',
		borderTopWidth: 3,
		borderTopColor: '#c4c4c4'
	},
	containerBot: {
		flex: 0.30,
		backgroundColor: "#ffffff",
		justifyContent: 'space-between',
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
		justifyContent: 'center'
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
	modalBottomButton: {
		width: Dimensions.get("window").width * 0.5,
		height: "80%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 10,
		flexDirection: "row",
		borderColor: "#a8998d",
		borderWidth: 2,
		borderRadius: 10,
		backgroundColor: '#ffffff'
	},
	infoContainerMaster: {
		flex: 1,
		backgroundColor: "#e8e4da"
	},
	infoContainerTop: {
		flex: 0.25,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 20
	},
	infoContainerMid: {
		flex: 0.45,
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 15,
		paddingHorizontal: 10
	},
	infoContainerBot: {
		flex: 0.3,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingTop: 10
	},
	prodinfoTop: {
		flex: 0.25,
		backgroundColor: "#e8e4da",
		alignItems: 'center',
		justifyContent: 'center'
	},
	prodinfoMid: {
		flex: 0.65,
		// justifyContent: 'space-between',
		backgroundColor: '#e8e4da',
		borderTopWidth: 3,
		borderTopColor: '#c4c4c4'
	},
	prodinfoBot: {
		flex: 0.1,
		backgroundColor: '#e8e4da',
		alignItems: 'center',
		justifyContent: 'center'
	},
	hr: {
		borderBottomColor: 'black',
		borderBottomWidth: 1
	},
	sub_title: {
		fontWeight: 'bold',
		fontStyle: 'italic',
		fontSize: 16
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
		paddingBottom: 10
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
	},
	img_container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	img: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 320,
		height: 480
	}
});
