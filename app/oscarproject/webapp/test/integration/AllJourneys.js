sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./Journeys"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		//viewNamespace: "oscarproject.view.",
		autoWait: true
	});
});
