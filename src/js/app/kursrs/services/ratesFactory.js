(function (root, angular) {
  'use strict';

  var injectParams = [];

  var RatesFactory = function() {
    var factory = {}
      , rates = {eur: [],
                 usd: [],
                 chf: []};
    
    factory.getRates = function(cur) {
      if (cur === 'EUR') {
        return rates.eur;
      } else if (cur === 'USD') {
        return rates.usd;
      } else {
        return rates.chf;
      }
    };

    factory.updateRates = function(newRates) {
      rates = newRates;
      return true;
    };
    
    return factory;
  };
    
  RatesFactory.$inject = injectParams;
    
  angular.module('kursrsApp.Services').factory('RatesFactory', RatesFactory);
}(this, this.angular));