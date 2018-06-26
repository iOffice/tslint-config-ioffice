# Contributing

You may contribute by adding or modifying sections to the style guide.

Before creating a pull request first make sure to open an issue so that others are aware of the
problems we are trying to solve.

## Modifying a section

- Branch from master.
- Use the following naming convention when modifying a section on the guide: `guide/topic/section`.
  For instance: `guide/arrows/use-them`;
- Do your edits to the file and add rules (if necessary) to `tslint.json`. The `tslint-config-ioffice.json`
  should only be used if you are creating a rule in this project.
- Make sure everything is ok by running `make test`.
- When creating a commit please follow the convention:
  - `[guide] fixed grammar in arrows/use-them`
  - `[feat] A new feature was added`
  - `[chore] modified some build files around, modified gitignore, etc`
  - `[refactor] made some code more readble`
  - `[perf] made some function faster`
  - `[docs] modified some documeation, this includes readme`
  - `[breaking-change] moved function 'x' to project 'y'.`
  - `[other] some useful message`

  A tag with the convention `[tag:subtitle] message` is also accepted. The point of using a tag
  is to be able to filter out the commit messages when updating the `CHANGELOG`. These make it
  easier to generate a summary of the changes.
- Make a pull request.

You can make sure that the readme is ok by running `make readme` but please do not commit
the changes to the file. The README file should only be generated during the release process so that
the tslint configuration reflects the changes in the README.

## Pre-releasing

Only members of iOFFICE may create a pre-release in any branch by running

```bash
make preRelease
```

The output of the command will provide the beta version number assigned to the pre-release. The
pre-released version is tagged so you may also install it by doing

```
yarn add @ioffice/tslint-config-ioffice@next
```

## Releasing

To make a release do the following:

- Create the branch `release` from the `master` branch.
- Update the `package.json` with the proper version number.
- Update `CHANGELOG.md` documenting all the changes.
- run `make readme` to generate the README file.
- Create a pull request.
- If everything is good, then merge.

Shortly after the branch is merged, the continous integration tool will do another build and the
package will be released to whichever registry is specified in the `package.json` file.
