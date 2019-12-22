
//const UI = require("sketch/ui");
		
var decimals = 9999; // default number of decimals after. Example: 9999 is 4 random decimals
var overrideValue; //new text value
var starterNumber = 0; // default preffix value to decimals
var excludedNumbers; //numbers to exclude from generated results
var preffix;
var suffix;



function apply(){
	console.log("clicked!");
	//	Grab options


	templateNumber = document.getElementById("templateNumber").value;
	decimals = document.getElementById("decimals").value;
	startNumber = document.getElementById("firstNumber").value;
	preffix = document.getElementById("preffix").value;
	suffix = document.getElementById("suffix").value;

	const message = {templateNumber, decimals, startNumber, preffix, suffix};

	//	Send options to plugin
	
	if(window.webkit && window.webkit.messageHandlers.sketchPlugin){
		window.webkit.messageHandlers.sketchPlugin.postMessage(JSON.stringify(message));
	} else {
		console.error("Failed to duuuplicate - could not to find 'sketchPlugin' message handler. Is every thing set up properly for messaging?");
	}
};

//Preview generator:
function checkVal(val) {
	var decimals = parseFloat(document.getElementById("decimals").value);
	decimals = val.length - 2;
	document.getElementById("decimals").value = decimals;

	var startNumber = val.slice(0, 1);
	document.getElementById("firstNumber").value = startNumber;

}
function checkDec(val) {
	var templateNumber = parseFloat(document.getElementById("templateNumber").value);
	templateNumber = templateNumber.toString();
	if (templateNumber.length - 2 < val) {
		var difference = val-(templateNumber.length - 2);
		while (difference > 0) {
		console.log(difference);
		var addition = Math.floor(Math.random() * Math.floor(9));
		console.log(addition);
		templateNumber = templateNumber + addition.toString();
		document.getElementById("templateNumber").value = templateNumber;
		difference--;
		}
	}
	else if (templateNumber.length - 2 > val) {
		var difference = val-(templateNumber.length - 2);
		templateNumber = templateNumber.slice(0, difference);
		document.getElementById("templateNumber").value = templateNumber;
	}
}

function fixFirst(val) {
	var templateNumber = parseFloat(document.getElementById("templateNumber").value);
	templateNumber = templateNumber.toString();
	var setRange = document.getElementById("setRange");
	var fixedFirst = document.getElementById("fixedFirst");

	if (val) {
		templateNumber = templateNumber.slice(1);
		console.log(templateNumber);
		templateNumber =  + val + templateNumber;
		document.getElementById("templateNumber").value = templateNumber;

		//disable alternatives
		document.getElementById("minimum").value = "";
		document.getElementById("maximum").value = "";
		setRange.classList.remove("activeElement");
		setRange.classList.add("disabledElement");
		fixedFirst.classList.add("activeElement");
	}
	else if (!val) {
		//disable fixed first number
		
		setRange.classList.add("activeElement");
		document.getElementById("minimum").value = "0";
		document.getElementById("maximum").value = "9";
		fixedFirst.classList.remove("activeElement");
		fixedFirst.classList.add("disabledElement");
	}
}

function addType(val) { 

	if (val == "%" || val == "℃" || val == "℉" || val == "°" || val == "USD" || val == "GBP" || val == "BTC") {
		document.getElementById("suffix").value = val;
		document.getElementById("preffix").value = '';
		suffix = val;
	}
	else if (val == "$" || val == "£" || val == "€" || val == "₨" || val == "₹" || val == "₿") {
		document.getElementById("preffix").value = val;
		document.getElementById("suffix").value = '';
		preffix = val;
	}
}