# Contributing

All iOFFICE [npm](https://www.npmjs.com/org/ioffice) projects are managed by TeamCity. The flow
for contributing goes as follows.

- Branch from master.
- Add your source code in a file in the `src/main` directory.
- Add a test file in the `src/test` directory having the same name as your source file and the
  extension `.test.ts`.
  - At the moment we can only run the test by including the file in `src/test/index.ts`, so make
    sure to import the file.
  - Note that we currently have to run all the tests and have no way of running only specific ones.
    This is an issue that will be addressed later.
- Make sure your tests pass by running `make test`.
- When creating a commit please follow the convention:
  - `[feat] A new feature was added`
  - `[chore] modified some build files around, modified gitignore, etc`
  - `[refactor] made some code more readble`
  - `[perf] made some function faster`
  - `[docs] modified some documeation, this includes readme`
  - `[breaking-change] moved function 'x' to project 'y'.`
  - `[other] some useful message`

  A tag with the convention `[tag:subtitle] message` is also accepted. The point of using a tag
  is to be able to filter out the commit messages when creating a `CHANGELOG`. These make it easier
  to generate a summary of the changes.

- Make a pull request.

## Pre-releasing

Only members of iOFFICE may create a pre-release in any branch by running

```bash
make preRelease
```

The output of the command will provide the beta version number assigned to the pre-release.

## Releasing

To make a release do the following:

- Create the branch `release` from the `master` branch.
- Update the `package.json` with the proper version number.
- Update `CHANGELOG.md` documenting all the changes.
- Create a pull request.
- If everything is good, then merge.

Shortly after the branch is merged, TeamCity will do another build and the package will be
released to bartifcatory or npm.
