sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press"
], function (Opa5, Press){
    "use strict";

    var sViewName = "oscarproject.view.ObjectForm";

    Opa5.createPageObjects({
        onTheObjectForm: {
			viewName: sViewName,
			actions: {
              
                iPressCreateAward: function() {
                    return this.waitFor({
                        id: "addAwardsBtn",
                        actions: new Press({
                            altKey: true,
                            shiftKey: true,
                            ctrlKey: true
                        }),
                        errorMessage: "The page Award does not have a trigger"
                    });
                }
            },
            assertions: {
                iShouldSeeTheMultiInput: function(){
                    return this.waitFor({
                        controlType: "sap.m.Text",
						success: function () {
							Opa5.assert.ok(true, "The form is able");
						},
						errorMessage: "Did not find the form"
                    });
                }
            }
        }
    });
});