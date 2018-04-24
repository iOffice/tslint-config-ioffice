## Tasks

test: testRules testGuide

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
	tc-builder run

## Dependencies

build: FORCE
	tc-builder compile

info:
	node --version
	npm --version
	tsc --version
	typedoc --version

FORCE:
