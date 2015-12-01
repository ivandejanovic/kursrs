(function(root, angular) {
  'use strict';

  var injectParams = [];

  var InstructionsController = function () {
    var vm = this;

     vm.handleBack = function() {
      root.history.back();
    };
  };

  InstructionsController.$inject = injectParams;

  angular.module('kursrsApp.Controllers').controller('InstructionsController', InstructionsController);
}(this, this.angular));