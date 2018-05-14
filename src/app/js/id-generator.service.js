(function() {
  'use strict';

  angular
    .module('app')
    .service('idGeneratorService', idGeneratorService)

  idGeneratorService.$inject = [
    'md5'
  ];

  function idGeneratorService(
    md5
  ) {

    var service = {
      getId: getId
    }

    function getId() {
      var currentdate = new Date();
      var summOfTime = (currentdate.getHours() + currentdate.getFullYear() + currentdate.getMinutes() + currentdate.getSeconds()) + Math.random();
      var value = summOfTime.toString(36) + Math.random();
      return md5.createHash((Math.random().toString(36).substr(2, 9)) + value);
    };

    return service;

  };
}());
