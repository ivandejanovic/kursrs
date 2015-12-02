(function (root, angular) {
  'use strict';

  var injectParams = ['localStorageService'];

  var RatesFactory = function(localStorageService) {
    var factory = {}
      , rates = {eur: [],
                 usd: [],
                 chf: []}
      , key = 'kursrs';

    //localStorageService.setPrefix(key);

    var storedRates = localStorageService.get(key);
    if (storedRates !== null) {
      rates = storedRates;
    }
    
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
      return localStorageService.set(key, newRates);
    };
    
    return factory;
  };
    
  RatesFactory.$inject = injectParams;
    
  angular.module('kursrsApp.Services').factory('RatesFactory', RatesFactory);
}(this, this.angular));