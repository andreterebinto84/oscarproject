sap.ui.define([
    "sap/ui/base/Object",
    "./GlobalModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], function (Object,
    GlobalModel,) {
    "use strict";
    return Object.extend("oscarproject.model.AwardModel", {

        constructor: function () {

        },
      
        
        create: async function (data) {
            
            const oGlobalModel = GlobalModel.getInstance();
            const oDataModel = oGlobalModel.getoModelMainService();

            try {
                const result = new Promise(async function (res, rej) {

                    var oAward = oDataModel.bindList("/Awards");
                    data["year"] = new Date().getFullYear()
                    this.oAwardContext = oAward.create(data);
    
                    this.oAwardContext.created().then(function () {

                        oDataModel.submitBatch("WLEGroup").then(function () {
                            if (!oDataModel.hasPendingChanges()) {
                                res(true)
                            } else {
                                rej(false)
                            }
                          });
                    }, function () {
                        rej(false)
                    })
                }.bind(this))

                return result;
            } catch (error) {
                return error;
            }
        },
        updateById: async function (id, data) {
            const oGlobalModel = GlobalModel.getInstance();
            const oDataModel = oGlobalModel.getoModelMainService();

            try {
                
                const result = new Promise(async function (res, rej) {
                    const oContext = await oDataModel.bindContext(`/Awards('${id}')`, null, {
                        $$updateGroupId: "cmpchange"
                    });

                    oContext.getBoundContext().setProperty("actor_ID", data.actor_ID);
                    oContext.getBoundContext().setProperty("film_ID", data.film_ID);
                    oContext.getBoundContext().setProperty("category_ID", data.category_ID);

                    var fnSuccess = function () {
                        res(true)
                    }.bind(this);
            
                    var fnError = function (oError) {
                        rej(oError)
                    }.bind(this);
    
                    oDataModel.submitBatch("cmpchange").then(fnSuccess, fnError);
                });

                return result;
            
            } catch (error) {
                return error;
            }
        },
        getById: async function(ID){
            const oGlobalModel = GlobalModel.getInstance();
            const oDataModel = oGlobalModel.getoModelMainService();
            let oList = oDataModel.bindContext(`/Awards('${ID}')`);
            let dataReturn =  await oList.requestObject();

            return dataReturn;
        },

        
    })
})

