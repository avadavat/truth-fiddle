#!/bin/bash

git fetch origin master
git checkout --force master
npm install
npm run build
npm restart

