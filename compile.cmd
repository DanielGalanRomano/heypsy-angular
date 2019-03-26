@ECHO OFF
TITLE Compilando el proyecto
CALL ng build --prod --aot --base-href ./ --output-path ./www/
