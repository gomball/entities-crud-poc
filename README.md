# EntitiesCrudPoc _(w.i.p.)_

Yeep... anothoer prove of concept. This time about integrating odata source with an enterprise class datagrid (ag-grid). All based in a 'kind-of' DDD arch.

_(*) this project uses private licensed packages just for learning pourposes. do not even think about using theese pieces of code in production environments._

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Before run or build

run `yarn install` for installing project dependencies.

### Running local server

Run `npm run serve.local` for a dev server. Navigate to `http://localhost:5555/`.

### Build

Run `npm run build.local` to build the project with development profile. Run `npm run build.pro.aot` to build the project with production profile. The build artifacts will be stored in the `dist/` directory. You can serve the app with any web server, f.e. nginx.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test.local` to execute the unit tests via [Karma](https://karma-runner.github.io) in watch mode.

Run `ng test.pro` to execute the unit tests and place the result lcov file in dist folder (f. e. to be used by sonar).

As this is a p.o.c. project, its mainly focused on features and functionallity. That means that 'it works' and 'it instantiates' tests are passing (dependecies of all services and components are correctly mocked). Increasing the code coverage is a TBD.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

