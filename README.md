### Hexlet tests and linter status:
[![Actions Status](https://github.com/MikeDruzhin/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/MikeDruzhin/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/7f8ef765bb6ce088d770/maintainability)](https://codeclimate.com/github/MikeDruzhin/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7f8ef765bb6ce088d770/test_coverage)](https://codeclimate.com/github/MikeDruzhin/frontend-project-46/test_coverage)

## Description
Difference calculator is a command line app. It can to compare some types of files and show the difference between them.

**Availible file formats:**

* JSON
* YML
* YAML

This app can compare different files formats between themselves.

Result of comparison may be presented in three formats:

* **stylish format** (this format is using by default):
https://asciinema.org/a/bCNMvKjUvbWYpECBnCj99fciu

* **plain format** 
https://asciinema.org/a/C387XtJHo838Go4pt9PMDKczB

* **JSON format**
https://asciinema.org/a/v2uqruNFQcD5O7S0fGd4SiNDe

gendiff for .json 
https://asciinema.org/a/wFMLQ4speYPv2z43HDToKSJe6

gendiff for yml/yaml 
https://asciinema.org/a/9GgNobds3yS0zPEzfQ1jRucxn

## Setup
```bash
make install
```
## How to start

* **default (stylish) format:**
```bash
gendiff 
``` 
or 

```bash
gendiff -f stylish
``` 
* **plain format:**
```bash
gendiff -f plain
``` 
* **JSON format:**
```bash
gendiff -f json
``` 

For example:
```bash
gendiff -f stylish file1.json file2.json
```
```bash
gendiff -f plain file1.json file2.json
```
```bash
gendiff -f json file1.json file3.yml
```

## System requirements
* **System** Ubuntu 22.04.3 
* **Node.js** v21.1.0
* **npm** v10.2.5
