'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var JobGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.name = this._.underscored(this._.humanize(this.name));
    this.log('Generating the ' + this.name + ' job...');
  },

  files: function () {
    this.mkdir('jobs');
    this.template('_job.go', 'jobs/' + this.name + '.go');
  }
});

module.exports = JobGenerator;
