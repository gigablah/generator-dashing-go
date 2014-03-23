'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var DashboardGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.name = this._.slugify(this._.humanize(this.name));
    this.log('Generating the ' + this.name + ' dashboard...');
  },

  files: function () {
    this.mkdir('dashboards');
    this.copy('dashboard.gerb', 'dashboards/' + this.name + '.gerb');
  }
});

module.exports = DashboardGenerator;
