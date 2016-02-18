'use strict';

var _          = require('lodash'),
    chalk      = require('chalk'),
    mkdirp     = require('mkdirp'),
    generators = require('yeoman-generator');

var JobGenerator = generators.Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  }

  initializing: function () {
    this.props.name = _.snakeCase(this.name);
    this.log('Generating the ' + chalk.green(this.props.name) + ' job...');
  },

  writing: function () {
    mkdirp(this.destinationPath('jobs'));
    this.fs.copyTpl(
      this.templatePath('_job.go'),
      this.destinationPath('jobs/' + this.props.name + '.go'),
      { name: this.props.name }
    );
  }
});

module.exports = JobGenerator;
