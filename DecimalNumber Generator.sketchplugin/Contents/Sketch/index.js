const UI = require("./ui");
const Decimals = require("./decimals");
const Async = require("sketch/async");

//	Sketch Handlers

var fiber;

function onRun(context){
	if(!fiber){
		fiber = Async.createFiber();
		fiber.onCleanup(() => {
			UI.cleanup();
		});
	}
	
	
	UI.loadAndShow(context.scriptURL, options => {
		Decimals(options);
	});
};