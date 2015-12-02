(function(root, angular) {
  'use strict';

  var app = angular.module('kursrsApp', ['ngRoute', 'kursrsApp.Controllers']);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'IndexController',
      templateUrl: 'partials/index.html',
      controllerAs: 'vm'
    })
    .when('/currency/:currencyId', {
      controller: 'CurrencyController',
      templateUrl: 'partials/currency.html',
      controllerAs: 'vm'
    })
    .when('/instructions', {
      controller: 'InstructionsController',
      templateUrl: 'partials/instructions.html',
      controllerAs: 'vm'
    })
    .when('/about', {
      controller: 'AboutController',
      templateUrl: 'partials/about.html',
      controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

  }]);
}(window, window.angular));
