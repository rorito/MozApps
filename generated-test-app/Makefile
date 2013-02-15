PORT_DEVICE = 6000
PORT_LOCAL = 6000
XPCSHELL = ../build-scripts/mac/xulrunner-sdk/bin/xpcshell
ADB = ../build-scripts/mac/adb
APP_NAME = smallstore216
FOLDER = dist

copyFiles:
	mkdir -p app/scripts
	mkdir -p app/imgs/products
	mkdir -p app/styles
	cp -R ../app/scripts app
	cp -R ../app/imgs/products app/imgs
	cp -R ../app/styles app
	rm app/scripts/main.js

package: copyFiles
	cd ${FOLDER} && rm -f application.zip && rm -f manifest.appcache && zip -Xr ./application.zip ./* -x application.zip

packaged: package
	${ADB} push ${FOLDER}/application.zip /data/local/tmp/b2g/${APP_NAME}/application.zip

install:
	${ADB} forward tcp:$(PORT_LOCAL) tcp:$(PORT_DEVICE)
	@echo "!!! CONFIRM THE PROMPT on the phone !!!"
	${XPCSHELL} ../build-scripts/mac/install.js ${APP_NAME} $(PORT_LOCAL)

# call by: | make packaged install |
