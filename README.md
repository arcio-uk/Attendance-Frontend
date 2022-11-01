# FrontEnd

## Credits

 - [@JohnCosta27](https://github.com/JohnCosta27) For the biggest percentage of this frontend, lots of the structure to request data and display it to the user in a friendly way
 - [@Acorn221](https://github.com/Acorn221) For lots of the frontend design work and some of the functionality, including the login page, the home page card, the attendometer chart and the animated button
 - [@IzStriker](https://github.com/IzStriker) For work on the frontend functionality

## Commit rules

Husky is setup to inforce commit rules through CommitLint

You must write your commits in the following format:

	type(scope?): subject 

types:
- ci (Changes to the CI configuration files and scripts)
- chore (Other changes that don't modify src or test files)
- docs (Changes to documentation files)
-	feat (A new feature that has been added)
-	fix (A fix that has been made)
-	perf (A change relating to performance)
-	refactor (A code change that neither fixes a bug nor adds a feature)
-	revert (Reverting a previous commit/change)
-	style (A change that is relating to code style)
- test (Any new tests or adjustments to them)

examples:

	chore: enabled commit linting
	ci(app.ts): commiting progress on express server

[Click here to find out more](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)
