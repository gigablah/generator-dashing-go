generator-dashing-go
====================

This is a [Yeoman][1] generator for creating dashboards with the [dashing-go][2] library, a Go port of [Shopify/dashing][3].

The dashboard runs on the [Martini][4] microframework, while the frontend dependencies are managed by [Grunt][5] and [Bower][6].

## Requirements

* [Git][7]
* [Node.js ~0.10][8]
* [Go ~1.2][9]

## Installation

Install Yeoman:

    npm install -g yo

Install the dashing-go generator:

    npm install -g generator-dashing-go

## Creating a project

Create a new directory:

    mkdir my-dashboard && cd $_

Generate the project (this will also run the initial Bower and Grunt tasks):

    yo dashing-go

Grab the Go dependencies:

    go get

Start the server:

    go run server.go

The sample dashboard is now available at [http://localhost:3000](http://localhost:3000).

## Asset pipeline

The `init` task copies third party assets (installed by Bower) into position and compiles BatmanJS. This should have been run automatically as a post-install script, but if you've added new dependencies or need to do it manually:

    bower install
    grunt init

## Hot reloading

You may also start a livereload server that watches the `assets` directory for changes and runs the build pipeline automatically. When you access it (port 9000 by default), it injects a script into the page that initiates a reload whenever the compiled assets are updated.

    grunt serve

## Building Stuff

    grunt build

If you need to build just `application.js` or `application.css`, you may run each task individually:

    grunt js
    grunt css

## Minifying Stuff

    grunt minify

`application.js` and `application.css` are minified in-place.

## Generating Stuff

Create new dashboards, jobs and widgets:

    yo dashing-go:dashboard foo
    yo dashing-go:job foo
    yo dashing-go:widget foo

Note the following naming conventions (the generator automatically enforces them):

* dashed-slug for widget and dashboard names
* under_score for Go job filenames
* camelCase for Go job structs

Existing third party Dashing widgets should be compatible with dashing-go.

## License

Released under the MIT license.

[1]: http://yeoman.io
[2]: https://github.com/gigablah/dashing-go
[3]: http://shopify.github.io/dashing
[4]: http://martini.codegangsta.io
[5]: http://gruntjs.com
[6]: http://bower.io
[7]: http://git-scm.com
[8]: http://nodejs.org
[9]: http://golang.org
