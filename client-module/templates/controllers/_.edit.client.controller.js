(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>EditController', <%= classifiedPluralName %>EditController);

  <%= classifiedPluralName %>EditController.$inject = ['$scope'];

  function <%= classifiedPluralName %>EditController($scope) {

  }
}());
