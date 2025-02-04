sap.ui.define([
    'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/model/FilterType'
], (Controller, JSONModel, Label, Filter, FilterOperator, FilterType) => {
    "use strict";

    return Controller.extend("oscarproject.controller.ListWinners", {
        onInit: function() {
			//route objects
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("ListWinners").attachDisplay(this.handleRouteMatched, this);	
		},

		//Bind the itens of table and setting filterBar and add i18n on the buttens
		handleRouteMatched: function (oEvent) {
			this.oModel = new JSONModel();
			this.oTable = this.byId("table");
			this.oTable.getBinding("items").getModel().refresh();
			this.textI18n = this.getView().getModel("i18n").getResourceBundle();
			this.oFilterBar = this.getView().byId("filterbar");
			this.oFilterBar._getClearButton().setText(this.textI18n.getText("btnClear"))
			this.oFilterBar._getSearchButton().setText(this.textI18n.getText("btnGo"))
			this.oFilterBar._getFiltersButton().setText(this.textI18n.getText("btnAdjustFilters"))
		},

		//Onpress de add button to create a new Award
		_onAddPress: function(oEvent){
			const oLink = oEvent.getSource()
			const oContext = oLink.getBindingContext();
			this.oRouter.navTo("ObjectForm")
		},
		
		
		//Row press to edit a award item, and set de ID item on the route
		_onEditPress: function(oEvent){
			const oLink = oEvent.getSource()
			const oContext = oLink.getBindingContext();
			this.oRouter.navTo("ObjectFormEdit", {
				objectId: oContext.getObject().ID
			});
		},

		//change value filter
		onSelectionChange: function (oEvent) {
			this.oFilterBar.fireFilterChange(oEvent);
		},

		//search itens em add on the FILTERS to bind list table
		onSearch: function () {
			var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl(),
					aSelectedKeys = oControl.getSelectedKeys(),
					aFilters = aSelectedKeys.map(function (sSelectedKey) {
						return new Filter({
							path: oFilterGroupItem.getName(),
							operator: FilterOperator.Contains,
							value1:"'"+sSelectedKey+"'"
						});
					});

				if (aSelectedKeys.length > 0) {
					aResult.push(new Filter({
						filters: aFilters,
						and: false
					}));
				}

				return aResult;
			}, []);

			this.oTable.getBinding("items").filter(aTableFilters);
		},

		//Clear aoo inputs filters
		clearFilters() {
			
			const allFilters = this.oFilterBar.getAllFilterItems();
			allFilters.map((filter) => {
				const control = filter?.getControl();

				//Filter Select
				if (filter?.getControl()?.getSelectedKey) {
					const keySelected = filter?.getControl()?.getSelectedKey()
					if (keySelected) {
						control.setSelectedKey(null);
					}
				}
				if (control?.getValue && control?.setValue) {
					control.setValue(null);
				}

				if (control?.getSelectedKeys) {
					const keys = control?.getSelectedKeys();
					if (keys.length > 0) {
						control?.setSelectedKeys([]);
					}
				}
			})
		},

		
    });
});