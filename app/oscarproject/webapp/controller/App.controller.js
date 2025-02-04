sap.ui.define([
  "sap/ui/core/mvc/Controller",
   "../model/GlobalModel"
], (BaseController, GlobalModel) => {
  "use strict";

  return BaseController.extend("oscarproject.controller.App", {
      onInit() {
         var oGlobalModel = GlobalModel.getInstance();
          oGlobalModel.setoModelMainService(this.getOwnerComponent().getModel());
      }
  });
});