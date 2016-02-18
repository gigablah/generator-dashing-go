'use strict';

var _          = require('lodash'),
    chalk      = require('chalk'),
    mkdirp     = require('mkdirp'),
    generators = require('yeoman-generator'),
    pkg        = require('../../package.json');

var DashingGoGenerator = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(chalk.green("\n" +
      "     _           _     _                            \n" +
      "  __| | __ _ ___| |__ (_)_ __   __ _     __ _  ___  \n" +
      " / _` |/ _` / __| '_ \\| | '_ \\ / _` |___/ _` |/ _ \\ \n" +
      "| (_| | (_| \\__ \\ | | | | | | | (_| /__| (_| | (_) |\n" +
      " \\__,_|\\__,_|___/_| |_|_|_| |_|\\__, |   \\__, |\\___/ \n" +
      "                               |___/    |___/       \n" +
      "\n"));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What would you like to call your project?',
        default: 'dashboard'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props
      done();
    }.bind(this));
  },

  writing: function() {
    _.map(['server.go', 'Gruntfile.js'], function (file) {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      );
    }.bind(this));

    _.map(['_package.json', '_bower.json', '_README.md'], function (file) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file.substring(1)),
        { name: this.props.name, _: _ }
      );
    }.bind(this));

    _.map(['gitignore', 'gitattributes', 'bowerrc'], function (file) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath('.' + file)
      );
    }.bind(this));

    _.map(['assets', 'dashboards', 'jobs', 'public', 'widgets'], function (dir) {
      this.fs.copy(
        this.templatePath(dir + '/**'),
        this.destinationPath(dir)
      );
    }.bind(this));

    mkdirp(this.destinationPath('build'));
    mkdirp(this.destinationPath('public/javascripts'));
    mkdirp(this.destinationPath('public/stylesheets'));
  },

  install: function () {
    this.npmInstall();
  }
});

module.exports = DashingGoGenerator;
