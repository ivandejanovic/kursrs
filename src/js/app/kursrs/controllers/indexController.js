(function(root, angular) {
  'use strict';

  var injectParams = ['$scope', '$http', 'RatesFactory'];

  var IndexController = function($scope, $http, RatesFactory) {
    var vm = this;
    
    vm.fetchRates = function() {
      $http.get('http://quineinteractive.com/rest/kursrs/getData')
      .then(function(response) {
        var status = RatesFactory.updateRates(response.data);
        if (status) {
          vm.message = 'Podaci uspesno osvezeni';
        } else {
          vm.message = 'Greska prilikom snimanja podataka na uredjaj';
        }
      }, function(){
        vm.message = 'Greska prilikom preuzimanja podataka';
      });
    };
  };

  IndexController.$inject = injectParams;

  angular.module('kursrsApp.Controllers').controller('IndexController', IndexController);
}(this, this.angular));