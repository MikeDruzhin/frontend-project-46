# Makefile
install: # устанавливает модули руководстувуясь локфайлом
	npm ci
gendiff: # запускает вычислитель отличий
	node src/index.js
publish: # выполняет отладку публикации пакета
	npm publish --dry-run
lint: # запускает eslint
	npx eslint .
test: # запускает тестирование
	npm test
test-coverage:
	npx jest --coverage