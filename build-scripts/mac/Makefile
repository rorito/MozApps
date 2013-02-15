PORT_DEVICE = 6000
PORT_LOCAL = 6000

#XPCSHELL = /Users/rory.petty/Dropbox/dev/firefoxos/xulrunner-sdk/bin/xpcshell
#ADB = /Users/rory.petty/Dropbox/dev/android-sdks/platform-tools/adb

XPCSHELL = ./xulrunner-sdk/bin/xpcshell
ADB = ./adb

FOLDER = ../../dist
#FOLDER = ../../app
NAME = mozappsinstall441


handlebars:
	handlebars ../../app/scripts/templates-handlebars/*.handlebars -f ../../app/scripts/templates/templates.js

package: handlebars
	cd ${FOLDER} && rm -f application.zip && rm -f manifest.appcache && zip -Xr ./application.zip ./* -x application.zip

packaged: package
	${ADB} push ${FOLDER}/application.zip /data/local/tmp/b2g/${NAME}/application.zip

install:
	${ADB} forward tcp:$(PORT_LOCAL) tcp:$(PORT_DEVICE)
	@echo "!!! CONFIRM THE PROMPT on the phone !!!"
	${XPCSHELL} install.js ${NAME} $(PORT_LOCAL)

# call by: | make packaged install |
