## Tasks

test: travis

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

travis: build
	node ./build/buildTools/tcBuilder.js

## Dependencies

build: FORCE
	tc-builder compile

clean:
	rm -rf build

FORCE:
