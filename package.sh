#!/bin/bash

rm game.zip
zip -r game.zip gen-map.js js/ data/ images/ audio/ *.html CREDITS LICENSE
