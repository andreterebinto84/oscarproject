sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press"
], function (Opa5, Press){
    "use strict";

    var sViewName = "oscarproject.view.ListWinners";

    Opa5.createPageObjects({
        onTheListWinners: {
			viewName: sViewName,
			actions: {
              
                iPressCreateAward: function() {
                    return this.waitFor({
                        id: "addAwardsBtn",
                        actions: new Press(),
                        success: function () {
							Opa5.assert.ok(true, "The tile is able");
						},
                        errorMessage: "The page Award does not have a trigger"
                    });
                }
            },
            assertions: {
                iShouldSeeTheGenericTile: function(){
                    return this.waitFor({
                        controlType: "sap.m.Title",
						success: function () {
							Opa5.assert.ok(true, "The tile is able");
						},
						errorMessage: "Did not find the tile"
                    });
                }
            }
        }
    });
});