# Makefile
install: # устанавливает модули руководстувуясь локфайлом
	npm ci
gendiff: # запускает вычислитель отличий
	node bin/gendiff.js
publish: # выполняет отладку публикации пакета
	npm publish --dry-run
lint: # запускает eslint
	npx eslint .