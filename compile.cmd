@ECHO OFF
TITLE Compilando el proyecto
CALL ng build  --aot --base-href ./ --output-path ./www/
