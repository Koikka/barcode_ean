render() {
		const { navigate } = this.props.navigation;
		let { allergy, barcode, sub_title, title, text, price } = this.state;
		// console.log(global_barcode);
		// console.log(this.state.barcode);
		return (
			<View style={styles.container}>
				<View style={{ margin: 10, alignItems: 'center' }}>
					<TouchableHighlight style={styles.button} onPress={() => navigate('Camera')}>
						<Text>Open Camera</Text>
					</TouchableHighlight>
				</View>
				<View style={{ margin: 10, alignItems: 'center' }}>
					<TouchableOpacity style={styles.button} onPress={() => navigate('Allergies')}>
						<Text>Select allergies</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.sub_title}>{sub_title}</Text>
				{/* <View style={styles.hr} />
				<Text style={styles.title}>{title}</Text>
				<Text>{text}</Text>
				<Text style={styles.price}>{price}</Text>
				<Text style={styles.barcode}>{barcode}</Text>
				<Text style={styles.allergy}>{allergy}</Text> */}
				<TouchableHighlight style={styles.button} onPress={() => this.setModalVisible(true)}>
					<Text>Open Product Details</Text>
				</TouchableHighlight>
				{/* <TextInput type="text" value={allergy} onChange={this._changeAllergy} /> */}
				{/* <Text>Allergy: {allergy}</Text> */}
				{/* <View style={{ marginTop: 22 }}> */}
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