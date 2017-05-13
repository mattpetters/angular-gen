(function () {
  'use strict';

  // <%= humanizedPluralName %> controller
  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>Controller', <%= classifiedPluralName %>Controller);

  <%= classifiedPluralName %>Controller.$inject = ['$scope', '$state'];

  function <%= classifiedPluralName %>Controller ($scope, $state) {
      
  }
}());
