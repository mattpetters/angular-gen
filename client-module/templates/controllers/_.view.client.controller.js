(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>ViewController', <%= classifiedPluralName %>ViewController);

  <%= classifiedPluralName %>ViewController.$inject = ['$scope'];

  function <%= classifiedPluralName %>ViewController($scope) {

  }
}());
