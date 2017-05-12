'use strict';

var util = require('util'),
  inflections = require('underscore.inflections'),
  s = require('underscore.string'),
  _ = require('lodash'),
  mkdirp = require('mkdirp'),
  yeoman = require('yeoman-generator');

var ModuleGenerator = yeoman.generators.Base.extend({
  init: function() {
  },
  askForName: function () {
   var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      default: '',
      message: 'What is the name of the module?'
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;

      this.slugifiedName = s(this.name).slugify().value();

      this.slugifiedPluralName = inflections.pluralize(this.slugifiedName);
      this.slugifiedSingularName = inflections.singularize(this.slugifiedName);

      this.camelizedPluralName = s(this.slugifiedPluralName).camelize().value();
      this.camelizedSingularName = s(this.slugifiedSingularName).camelize().value();

      this.classifiedPluralName = s(this.slugifiedPluralName).classify().value();
      this.classifiedSingularName = s(this.slugifiedSingularName).classify().value();

      this.humanizedPluralName = s(this.slugifiedPluralName).humanize().value();
      this.humanizedSingularName = s(this.slugifiedSingularName).humanize().value();

      this.capitalizedSingularName = s(this.humanizedSingularName).capitalize().value();

      done();
    }.bind(this));
  },
  askForModuleFolders: function() {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'clientFolders',
      message: 'Which client-side folders would you like your module to include?',
      choices: [{
        value: 'addCSSFolder',
        name: 'css',
        checked: false
      }, {
        value: 'addImagesFolder',
        name: 'img',
        checked: false
      }, {
        value: 'addDirectivesFolder',
        name: 'directives',
        checked: false
      }, {
        value: 'addFiltersFolder',
        name: 'filters',
        checked: false
      }]
    }, {
      type: 'confirm',
      name: 'addMenuItems',
      message: 'Would you like to add the CRUD module links to a menu?',
      default: true
    }];

    this.prompt(prompts, function(props) {
      var clientFolders = {},
        serverFolders = {};

      _.forEach(props.clientFolders, function(prop) {
        clientFolders[prop] = true;
      });

      this.clientFolders = clientFolders;


      done();
    }.bind(this));
  },

  askForMenuId: function() {
    if (this.addMenuItems) {
      var done = this.async();

      var prompts = [{
        name: 'menuId',
        message: 'What is your menu identifier(Leave it empty and press ENTER for the default "topbar" menu)?',
        default: 'topbar'
      }];

      this.prompt(prompts, function(props) {
        this.menuId = props.menuId;

        done();
      }.bind(this));
    }
  },

  renderModule: function() {
    // Create module folder
    mkdirp.sync('modules/' + this.slugifiedPluralName);

    // Create module supplemental folders
    if (this.clientFolders.addCSSFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/css');
    }

    if (this.clientFolders.addImagesFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/img');
    }

    if (this.clientFolders.addDirectivesFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/directives');
    }

    if (this.clientFolders.addFiltersFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/filters');
    }

    // Render angular module files
    this.template('config/_.client.routes.js', 'modules/' + this.slugifiedPluralName + '/config/' + this.slugifiedPluralName + '.client.routes.js');
    this.template('controllers/_.client.controller.js', 'modules/' + this.slugifiedPluralName + '/controllers/' + this.slugifiedPluralName + '.client.ctrl.js');
    this.template('controllers/_.list.client.controller.js', 'modules/' + this.slugifiedPluralName + '/controllers/' + this.slugifiedPluralName + '.list.client.ctrl.js');
    this.template('services/_.client.service.js', 'modules/' + this.slugifiedPluralName + '/services/' + this.slugifiedPluralName + '.client.service.js');

    // Render angular tests
    this.template('tests/_.client.controller.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/' + this.slugifiedPluralName + '.create.client.controller.tests.js');
    this.template('tests/_.client.routes.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/' + this.slugifiedPluralName + '.view.client.routes.tests.js');
    this.template('tests/_.list.client.controller.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/' + this.slugifiedPluralName + '.list.client.controller.tests.js');

    // Render angular module views
    this.template('views/_.form.client.view.html', 'modules/' + this.slugifiedPluralName + '/views/' + this.slugifiedSingularName + '.create.client.view.html');
    this.template('views/_.view.client.view.html', 'modules/' + this.slugifiedPluralName + '/views/' + this.slugifiedSingularName + '.view.client.view.html');
    this.template('views/_.list.client.view.html', 'modules/' + this.slugifiedPluralName + '/views/' + this.slugifiedPluralName + '.list.client.view.html');

    // Render menu configuration
    if (this.addMenuItems) {
      this.template('config/_.client.config.js', 'modules/' + this.slugifiedPluralName + '/config/' + this.slugifiedPluralName + '.client.config.js');
    }

    // Render angular module definition
    this.template('_.client.module.js', 'modules/' + this.slugifiedPluralName + '/' + this.slugifiedPluralName + '.client.module.js');

    // Render e2e tests
    this.template('tests/e2e/_.e2e.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/e2e/' + this.slugifiedPluralName + '.e2e.tests.js');
  }
});

module.exports = ModuleGenerator;
