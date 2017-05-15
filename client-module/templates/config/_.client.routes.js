(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('<%= slugifiedPluralName %>', {
        abstract: true,
        url: '/<%= slugifiedPluralName %>',
        template: '<ui-view/>'
      })
      .state('<%= slugifiedPluralName %>.list', {
        url: '',
        templateUrl: 'modules/<%= slugifiedPluralName %>/views/<%= slugifiedPluralName %>.list.client.view.html',
        controller: '<%= classifiedPluralName %>ListController',
        data: {
          friendlyName: '<%= humanizedPluralName %> List'
        }
      })
      .state('<%= slugifiedPluralName %>.create', {
        url: '/create',
        templateUrl: 'modules/<%= slugifiedPluralName %>/views/<%= slugifiedSingularName %>.create.client.view.html',
        controller: '<%= classifiedPluralName %>CreateController',
        resolve: {

        },
        data: {
          needAdmin: true,
          friendlyName: '<%= humanizedPluralName %> Create'
        }
      })
      .state('<%= slugifiedPluralName %>.edit', {
        url: '/:<%= camelizedSingularName %>_id/edit',
        templateUrl: 'modules/<%= slugifiedPluralName %>/views/<%= slugifiedSingularName %>.edit.client.view.html',
        controller: '<%= classifiedPluralName %>EditController',
        resolve: {

        },
        data: {
          needAdmin: true,
          friendlyName: 'Edit <%= humanizedSingularName %> {{ <%= slugifiedSingularName %>Resolve.name }}'
        }
      })
      .state('<%= slugifiedPluralName %>.view', {
        url: '/:<%= camelizedSingularName %>_id',
        templateUrl: 'modules/<%= slugifiedPluralName %>/views/<%= slugifiedSingularName %>.view.client.view.html',
        controller: '<%= classifiedPluralName %>ViewController',
        resolve: {

        },
        data: {
          friendlyName: '<%= humanizedSingularName %> {{ <%= slugifiedSingularName %>Resolve.name }}'
        }
      });
  }

}());
