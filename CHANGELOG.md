# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project
adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]

## [0.6.1] - November 20, 2018
*Sections*

- Import Order: There should be 3 groups for imports: 3rd Party Libs, iOFFICE, and project modules.

## [0.6.0] - November 14, 2018
*Sections*

- Type Assertion: forces use of `as Type` syntax.
- Consecutive Blank Lines: Lets avoid them.
- Import Order: Lets start alphabetizing and grouping our imports.
- Multiline Imports: No way to enforce this yet, but an example has been included.

## [0.5.0] - June 26, 2018
*Sections*

- Single Space: using `no-multi-spaces` rule to avoid adding more than one unnecessary space.
- Function Signature/Invocation: Specifying rule on how to deal with multi-line parameters. 

## [0.4.1] - May 18, 2018
- Fix:`io-export-style` rule false reporting inside namespaces or declared modules.


## [0.4.0] - May 7, 2018
- Added rules to check the "Blocks" section.
- Added "References" section.


## [0.3.1] - May 3, 2018
- Added `trailing-comma` rule.


## [0.2.0] - April 27, 2018
- Added `tsconfig.core.json`. This should provide a configuration related to errors in the code.
  Other configurations may use it by extending from 
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


[Unreleased]: https://github.com/ioffice/tslint-config-ioffice/compare/0.6.1...HEAD
[0.6.1]: https://github.com/ioffice/tslint-config-ioffice/compare/0.6.0...0.6.1
[0.6.0]: https://github.com/ioffice/tslint-config-ioffice/compare/0.5.0...0.6.0
[0.5.0]: https://github.com/ioffice/tslint-config-ioffice/compare/0.4.1...0.5.0
[0.4.1]: https://github.com/ioffice/tslint-config-ioffice/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/ioffice/tslint-config-ioffice/compare/0.3.1...0.4.0
[0.3.1]: https://github.com/ioffice/tslint-config-ioffice/compare/0.2.0...0.3.1
[0.2.0]: https://github.com/ioffice/tslint-config-ioffice/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/ioffice/tslint-config-ioffice/compare/d35148ee5a67da205b80ea2f8da243e02977b297...0.1.0
