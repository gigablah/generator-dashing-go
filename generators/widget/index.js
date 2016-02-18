'use strict';

var _          = require('lodash'),
    chalk      = require('chalk'),
    mkdirp     = require('mkdirp'),
    generators = require('yeoman-generator');

var WidgetGenerator = generators.Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  }

  initializing: function () {
    this.props.name = _.kebabCase(this.name);
    this.log('Generating the ' + chalk.green(this.props.name) + ' widget...');
  },

  writing: function () {
    var widgetDir = 'widgets/' + this.props.name;
    var widgetPath = widgetDir + '/' + this.props.name;

    mkdirp(this.destinationPath(widgetDir));
    this.fs.copy(
      this.templatePath('widget.html'),
      this.destinationPath(widgetPath + '.html'),
    );
    this.fs.copyTpl(
      this.templatePath('_widget.coffee'),
      this.destinationPath(widgetPath + '.coffee'),
      { name: this.props.name }
    );
    this.fs.copyTpl(
      this.templatePath('_widget.scss'),
      this.destinationPath(widgetPath + '.scss'),
      { name: this.props.name }
    );
  }
});

module.exports = WidgetGenerator;
