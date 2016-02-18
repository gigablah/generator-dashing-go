'use strict';

var _          = require('lodash'),
    chalk      = require('chalk'),
    mkdirp     = require('mkdirp'),
    generators = require('yeoman-generator');

var DashboardGenerator = generators.Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  }

  initializing: function () {
    this.props.name = _.kebabCase(this.name);
    this.log('Generating the ' + chalk.green(this.props.name) + ' dashboard...');
  },

  writing: function () {
    mkdirp(this.destinationPath('dashboards'));
    this.fs.copy(
      this.templatePath('dashboard.gerb'),
      this.destinationPath('dashboards/' + this.props.name + '.gerb')
    );
  }
});

module.exports = DashboardGenerator;
