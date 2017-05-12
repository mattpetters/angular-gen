(function() {
  'use strict';

  angular
    .module('<%= slugifiedModuleName %>')
    .controller('<%= classifiedControllerName %>Controller', <%= classifiedControllerName %>Controller);

  <%= classifiedControllerName %>Controller.$inject = ['$scope'];

  function <%= classifiedControllerName %>Controller($scope) {
    

  }
})();
