const { Document, Group } = require("sketch/dom");
const Settings = require("sketch/settings");
const UI = require("sketch/ui");
const Constants = require("./constants");

function Decimals(options){

	console.log(options);
	const document = Document.getSelectedDocument();


	//	Safety check:

	if(!document){
		UI.alert("Decimal number generator", "Please select a text layer to generate data");
		return;
	}

	//	Safety check:

	const selectedLayer = document.selectedLayers.layers[0];

	if(!selectedLayer){
		UI.alert("Decimal number generator", "Please select a text layer to generate data");
		return;
	}

	var { templateNumber, decimals, startNumber, preffix, suffix } = options;
	var selectedLayers = document.selectedLayers;
	var range;
	

	
    selectedLayers.forEach(function (layer, i) {
		if (startNumber == '') {range = Math.floor(Math.random() * Math.floor(10)) + '.'} else {range = startNumber + '.'}

    	randomisedString = randomiseIt(decimals);
    	overrideValue = (range + randomisedString).toString(); 
		layer.text = preffix + ' ' + overrideValue + ' ' + suffix;
	});

	//Unselect layers:
	//document.selectedLayers.clear();

}


  //randomise the numbers based on decimal count and pad with 0 is shorter than original decimal value length:
  function randomiseIt(number) {

	var length = number;
	var randomDigit;

	while (number.length < length) {
		randomDigit = Math.floor(Math.random() * Math.floor(10));
		number += randomDigit;
	  }
	
	return number;
  }
  

module.exports = Decimals;