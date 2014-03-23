'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var DashingGoGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    this.log('\n' +
      "     _           _     _                            \n" +
      "  __| | __ _ ___| |__ (_)_ __   __ _     __ _  ___  \n" +
      " / _` |/ _` / __| '_ \\| | '_ \\ / _` |___/ _` |/ _ \\ \n" +
      "| (_| | (_| \\__ \\ | | | | | | | (_| /__| (_| | (_) |\n" +
      " \\__,_|\\__,_|___/_| |_|_|_| |_|\\__, |   \\__, |\\___/ \n" +
      "                               |___/    |___/       \n" +
      '\n');

    var prompts = [{
      name: 'appName',
      message: 'What would you like to call your project?',
      default: 'dashboard'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  app: function () {
    this.directory('assets', 'assets');
    this.directory('dashboards', 'dashboards');
    this.directory('jobs', 'jobs');
    this.directory('public', 'public');
    this.directory('widgets', 'widgets');

    this.copy('server.go', 'server.go');

    this.mkdir('build');
    this.mkdir('public/javascripts');
    this.mkdir('public/stylesheets');
  },

  git: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  bower: function () {
    this.copy('bowerrc', '.bowerrc');
    this.template('_bower.json', 'bower.json');
  },

  package: function () {
    this.template('_package.json', 'package.json');
  },

  grunt: function () {
    this.copy('Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = DashingGoGenerator;
