#!/bin/bash
echo "Building the DSL"
yarn build

echo "Starting WTDSL"

if [ "$1" != "" ]; then   
    node src/main.js $1
else
    echo "Must provied the target file"
fi