## Tasks

test: tcBuild

preRelease: build
	PRERELEASE=true node build/build-tools/tcbuilder.js

readme: build
	node ./build/tasks.js readme

testGuide: build
	node ./build/tasks.js testGuide $(TOPIC)

newRule: build
	node ./build/tasks.js newRule $(RULE)

testRules: build
	node ./build/tasks.js testRules $(RULE)

tcBuild: info build
	node ./build/buildTools/tcBuilder.js

## Dependencies

build: FORCE
	tc-builder compile

clean:
	rm -rf build

info:
	node --version
	npm --version
	yarn --version
	tsc --version
	typedoc --version

FORCE:
