(function() {

  'use strict';

  angular
    .module('app', ['ui.router', 'angular-md5', 'angularFileUpload', 'ngDialog'])
    .config(configure);

  configure.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$sceDelegateProvider',
  ];

  function configure(
    $stateProvider,
    $urlRouterProvider,
    $sceDelegateProvider
  ) {

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      '*'
    ]);

    $stateProvider
      .state('fileExchanger', {
        url: '/file-exchanger',
        templateUrl: 'file-exchanger.html',
        controller: 'fileExchanger'
      });

    $urlRouterProvider.otherwise('/file-exchanger');
  }

}());
