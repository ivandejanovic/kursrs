(function(root, angular) {
  'use strict';

  var injectParams = ['$routeParams', 'RatesFactory'];

  var CurrencyController = function ($routeParams, RatesFactory) {
    var vm = this;
    vm.cur = $routeParams.currencyId;
    vm.rates = RatesFactory.getRates(vm.cur);

    vm.handleBack = function() {
      root.history.back();
    };
  };

  CurrencyController.$inject = injectParams;

  angular.module('kursrsApp.Controllers').controller('CurrencyController', CurrencyController);
}(this, this.angular));