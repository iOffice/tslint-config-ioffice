## Tasks

readme: buildProject
	node build/tasks.js readme

testGuide: buildProject
	node build/tasks.js testGuide $(TOPIC)

newRule: buildProject
	node build/tasks.js newRule $(RULE)

testRules: buildProject
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
