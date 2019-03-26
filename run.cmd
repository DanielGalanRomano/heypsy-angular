@ECHO OFF
TITLE Compilando el proyecto en el dispositivo
CALL cordova build android && cordova run android --device
