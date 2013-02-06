PORT_DEVICE = 6000
PORT_LOCAL = 6000

#XPCSHELL = /Users/rory.petty/Dropbox/dev/firefoxos/xulrunner-sdk/bin/xpcshell
#ADB = /Users/rory.petty/Dropbox/dev/android-sdks/platform-tools/adb

XPCSHELL = ../build-scripts/mac/xulrunner-sdk/bin/xpcshell
ADB = ../build-scripts/mac/adb

FOLDER = .
NAME = SmallStoreInstall

package:
	cd ${FOLDER} && zip -Xr ./application.zip ./* -x application.zip

packaged: package
	${ADB} push ${FOLDER}/application.zip /data/local/tmp/b2g/${NAME}/application.zip

install:
	${ADB} forward tcp:$(PORT_LOCAL) tcp:$(PORT_DEVICE)
	@echo "!!! CONFIRM THE PROMPT on the phone !!!"
	${XPCSHELL} ../build-scripts/mac/install.js ${NAME} $(PORT_LOCAL)

# call by: | make packaged install |
