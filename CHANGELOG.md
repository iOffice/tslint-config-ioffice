# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project
adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]


## [0.2.0] - April 27, 2018
- Added `tsconfig.core.json`. This should provides configuration related to errors in the code.
  Other configuration may use it by extending from 
  `./node_modules/@ioffice/tslint-config-ioffice/tsconfig.core.json`.

### Tslint Rules
- `semicolon`
- `no-interrable-types`


## [0.1.0] - April 26, 2018
- First release of the guide.
- There is only very basic rules.

### Rules
- `io-export-style`: This rule is very specific to iOffice and does not have any options. This rule
  is meant to disallow the use of multiple `export` keywords and to disallow the user of default
  exports.


[Unreleased]: https://github.com/ioffice/tslint-config-ioffice/compare/0.2.0...HEAD
[0.2.0]: https://github.com/ioffice/tslint-config-ioffice/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/ioffice/tslint-config-ioffice/compare/d35148ee5a67da205b80ea2f8da243e02977b297...0.1.0
