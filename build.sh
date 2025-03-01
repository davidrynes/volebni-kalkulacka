#!/bin/bash

# Instalace závislostí
npm install

# Sestavení aplikace
npm run build

echo "Aplikace byla úspěšně sestavena v adresáři dist/"
echo "Pro spuštění sestavené aplikace můžete použít:"
echo "npx serve dist" 