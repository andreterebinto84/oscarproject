sap.ui.define([
    'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/model/FilterType',
	"../model/AwardModel",
	"sap/m/MessageBox",
], (Controller, JSONModel, Label, Filter, FilterOperator, FilterType, AwardModel, MessageBox) => {
    "use strict";

    return Controller.extend("oscarproject.controller.ObjectForm.controller", {
        onInit: function() {
			//route objects
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("ObjectForm").attachDisplay(this.handleRouteMatched, this);
		},

		//function to set a new object in the model to create a new item
		createModel: function () {
			this.oModel = new JSONModel();
			//formModel
			this.getView().setModel(new sap.ui.model.json.JSONModel({
				actor_ID: "",
				film_ID: "",
				category_ID:"",
			}), "FormObjectModel");

			//Screen model to set a button visible
			this.getView().setModel(new sap.ui.model.json.JSONModel({
				isEdit:false,
				isRegister:true,
			}), "ScreenModel");
		},

		//Edit Item if recieve the objectId argument
		editModel: function (dataReturn) {
			this.oModel = new JSONModel();
			//set values
			this.getView().setModel(new sap.ui.model.json.JSONModel({
				actor_ID: dataReturn.actor_ID,
				film_ID: dataReturn.film_ID,
				category_ID:dataReturn.category_ID,
			}), "FormObjectModel");

			this.getView().setModel(new sap.ui.model.json.JSONModel({
				isEdit:true,
				isRegister:false,
			}), "ScreenModel");


		},

		//verify is create or edit item and set the 18n
		handleRouteMatched: async function (oEvent) {

			this.oAwardModel = new AwardModel();
			this.textI18n = this.getView().getModel("i18n").getResourceBundle();
			//if get data edit item
			if(oEvent.getParameter("data").context){
				this.idAward = oEvent.getParameter("data").context;
				let dataReturn = await this.oAwardModel.getById(this.idAward);
				this.editModel(dataReturn)
			}else{
				this.createModel();
			}
		},
		//Back button
		_onBack: function(oEvent){
			this.oRouter.navTo("ListWinners")
		},
		//Create a new Award
		_onCreateAward: async function(oEvent){
			let oForm = this.getView().getModel("FormObjectModel");
			//go to the model and call de create method
			let dataReturn = await this.oAwardModel.create(oForm.getData());

			//if success messageBox success
			if(dataReturn){
				MessageBox.success(this.textI18n.getText("successAward"), {
					actions: [MessageBox.Action.OK],
					onClose: function (sAction) {
							this._onBack()
					}.bind(this),
					dependentOn: this.getView()
				});
			}else{
				//messageBox error
				MessageBox.error(this.textI18n.getText("errorAward"));
			}
			
		},

		//Edit Award
		_onEditAward: async function(oEvent){
			let oForm = this.getView().getModel("FormObjectModel");
			//go to the model and call de edit method
			let dataReturn = await this.oAwardModel.updateById(this.idAward, oForm.getData());
			//if success messageBox success
			if(dataReturn){
				MessageBox.success(this.textI18n.getText("successAward"), {
					actions: [MessageBox.Action.OK],
					onClose: function (sAction) {
							this._onBack()
					}.bind(this),
					dependentOn: this.getView()
				});
			}else{
				//messageBox error
				MessageBox.error(this.textI18n.getText("errorAward"));
			}
			
		},
		

		
    });
});