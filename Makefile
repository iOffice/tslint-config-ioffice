## Tasks

test: tcBuild

preRelease: build
	PRERELEASE=true tc-builder run

readme: build
	node build/tasks.js readme

testGuide: build
	node build/tasks.js testGuide $(TOPIC)

newRule: build
	node build/tasks.js newRule $(RULE)

testRules: build
	node build/tasks.js testRules $(RULE)

tcBuild: info build
	node build/build-tools/tcbuilder.js

## Dependencies

build: FORCE
	tc-builder compile

info:
	node --version
	npm --version
	tsc --version
	typedoc --version

FORCE:
