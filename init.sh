#!/bin/sh
# This script removes all boilerplate specific code and creates a new package.json.
# Warning: this script is meant to only be run once and will automatically remove itself.

# Overwrite the package.json with the template package.json
mv package.template.json package.json
echo "[boilerplate] Deleted package.template.json and created package.json."

# Replace placeholder project-name with passed 
if [ $1 ]; then
    sed -i "" "s/project-name/$1/g" "package.json"
    echo "[boilerplate] Set project name to $1 in package.json."
fi

# Reset README.md
echo "" > README.md
echo "[boilerplate] reset readme.md."

# Install dependencies
npm install
echo "[boilerplate] Installed npm dependencies."

# Remove init.sh 
rm init.sh
echo "[boilerplate] Setup done."