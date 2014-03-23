'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var WidgetGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.name = this._.slugify(this._.humanize(this.name));
    this.log('Generating the ' + this.name + ' widget...');
  },

  files: function () {
    var widgetDir = 'widgets/' + this.name;
    var widgetPath = widgetDir + '/' + this.name;

    this.mkdir(widgetDir);

    this.template('_widget.coffee', widgetPath + '.coffee');
    this.template('_widget.scss', widgetPath + '.scss');
    this.copy('widget.html', widgetPath + '.html');
  }
});

module.exports = WidgetGenerator;
