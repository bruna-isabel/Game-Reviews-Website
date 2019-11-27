#!/bin/bash

printf "Running Jest...\n"
./node_modules/.bin/jest --runInBand --coverage

printf "\nRunning Cucumber...\n"
./node_modules/.bin/cucumber-js ./tests/features
