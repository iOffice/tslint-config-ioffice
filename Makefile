buildProject:
	ts-compile tslint-config-ioffice --verbose

readme: buildProject
	node build/tasks.js readme

test: buildProject
	node build/tasks.js test
