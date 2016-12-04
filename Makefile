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

buildProject:
	ts-compile tslint-config-ioffice --verbose
