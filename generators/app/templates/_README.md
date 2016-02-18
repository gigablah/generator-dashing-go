# <%= _.kebabCase(name) %>

A dashboard to do the thing with the stuff.

## Getting Started

The `init` task copies third party assets (installed by Bower) into position and compiles BatmanJS. This should have been run automatically as a post-install script, but if you've added new dependencies or need to do it manually:

    bower install
    grunt init

## Running Stuff

This starts the backend (port 8080 by default).

    go run server.go

The `TOKEN` and `PORT` environment variables will set the authentication token and HTTP port respectively:

    TOKEN=foobar PORT=8080 go run server.go

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

* kebab-case for widget and dashboard names
* snake_case for Go job filenames
* camelCase for Go job structs

Existing third party Dashing widgets should be compatible with dashing-go.

## License

Released under the MIT license.
