(function(root, angular) {
  'use strict';

  var injectParams = [];

  var AboutController = function() {
    var vm = this;

    vm.handleBack = function() {
      root.history.back();
    };
  };

  AboutController.$inject = injectParams;

  angular.module('kursrsApp.Controllers').controller('AboutController', AboutController);
}(this, this.angular));