## Tasks

test: testRules testGuide

readme: build
	node build/tasks.js readme

testGuide: build
	node build/tasks.js testGuide $(TOPIC)

newRule: build
	node build/tasks.js newRule $(RULE)

testRules: build
	node build/tasks.js testRules $(RULE)

## Dependencies

build: FORCE
	tc-builder compile

info:
	node --version
	npm --version
	tsc --version
	typedoc --version

FORCE:
