(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>CreateController', <%= classifiedPluralName %>CreateController);

  <%= classifiedPluralName %>CreateController.$inject = ['$scope'];

  function <%= classifiedPluralName %>CreateController($scope) {

  }
}());
