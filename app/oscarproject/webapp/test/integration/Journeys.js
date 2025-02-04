/*global QUnit*/

sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/ListWinners",
    "./pages/ObjectForm"
], function (opaTest) {
    "use strict";

    QUnit.module("ListWinners");

    opaTest("Should see the generic tiles and the links", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        // Assertions
		Then.onTheListWinners.iShouldSeeTheGenericTile();
    });



   
    opaTest("Should see the press add button award", function (Given, When, Then){
          // Arrangements
          Given.iStartMyApp();
        // Actions
        When.onTheListWinners.iPressCreateAward();

       // Cleanup
        Then.iTeardownMyApp();
    });

    QUnit.module("ObjectForm");


       
   
   
});