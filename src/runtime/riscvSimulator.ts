const kotlin = require("kotlin")

if (typeof kotlin !== "undefined" && typeof kotlin.kotlin !== "undefined" && typeof kotlin.kotlin.Number === "undefined") {
	kotlin.kotlin.Number = function (){}
	kotlin.kotlin.Number.prototype.call = function(a){}
}

const {LocalStorageManager} = require('./helpers')
const {fakeDOM, document} = require('./fakeDOM')
import { StorageMock } from './mockLocalStorage'
const {HTMLButtonElement, HTMLInputElement, HTMLSelectElement, HTMLElement, HTMLTextAreaElement} = fakeDOM.window
global.HTMLElement = HTMLElement
global.HTMLButtonElement = HTMLButtonElement
global.HTMLInputElement = HTMLInputElement
global.HTMLSelectElement = HTMLSelectElement
global.HTMLTextAreaElement = HTMLTextAreaElement

global["LocalStorageManager"] = LocalStorageManager
if (typeof localStorage === "undefined" || localStorage === null) {
	const LocalStorage = require('node-localstorage').LocalStorage;
	global["localStorage"] = new StorageMock();
	// global["localStorage"] = new LocalStorage('./scratch');
}
const load_update_message = (msg) => console.log(msg)
const load_done = function () {
    load_update_message("Done!");
    window.document.body.classList.add("loaded");
    window.onerror = null;
};
global["document"] = document
global["load_update_message"] = load_update_message
global["load_done"] = load_done
global["window"] = fakeDOM.window
window["driver_load_done"] = function () {
    /* Check if packages are all loaded */
    const h  = function(){
        if (driver.driver_complete_loading) {
            load_done();
            return
        }
        setTimeout(h, 10);
    };
    setTimeout(h, 10);
};
global["codeMirror"] = {
	refresh: () => {},
	setValue: (txt) => {},
	save: () => {},
}

const venus = require("./venus/build/kotlin-js-min/main/venus")

const venus_main = venus;
const driver = venus_main.venus.Driver;
driver.driver_init(true, venus_main.venus.VSCodeRenderer);
venus.api = venus_main.venus.api.API;
const simulatorAPI = venus_main.venus.api.venusbackend.simulator.Simulator;

Object.assign(global, {
	driver
})

import frontendAPI = require("./frontendAPI")

export = {
	venus_main,
	driver,
	venus,
	simulatorAPI,
	frontendAPI,
}

