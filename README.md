# Volební kalkulačka v2

Jednoduchá implementace volební kalkulačky s využitím Preact, TypeScript a Tailwind CSS.

## Popis

Volební kalkulačka je webová aplikace, která umožňuje uživatelům zjistit, která politická strana nejlépe odpovídá jejich názorům. Uživatel prochází sérií otázek a na konci mu aplikace ukáže procentuální shodu s jednotlivými politickými stranami.

## Technologie

- **Preact** - Rychlá 3kB alternativa k React s podobným API
- **TypeScript** - Typový systém pro JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Moderní build nástroj

## Instalace a spuštění

### Pomocí skriptů

```bash
# Spuštění vývojového serveru
./start.sh

# Sestavení aplikace pro produkci
./build.sh
```

### Manuálně

```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev

# Build pro produkci
npm run build

# Náhled produkčního buildu
npm run preview
```

## Struktura projektu

```
kalkulacka-v2/
├── public/                # Statické soubory
│   └── images/            # Obrázky
│       └── party-logos/   # Loga politických stran
├── src/                   # Zdrojové soubory
│   ├── components/        # Komponenty
│   ├── data/              # Data a konfigurace
│   ├── types/             # TypeScript typy
│   ├── App.tsx            # Hlavní komponenta
│   ├── index.css          # Hlavní CSS soubor
│   └── main.tsx           # Vstupní bod aplikace
├── index.html             # HTML šablona
├── package.json           # Konfigurace projektu
├── tsconfig.json          # Konfigurace TypeScript
├── vite.config.ts         # Konfigurace Vite
├── start.sh               # Skript pro spuštění vývojového serveru
├── build.sh               # Skript pro sestavení aplikace
└── README.md              # Dokumentace
```

## Konfigurace kalkulačky

Konfigurace kalkulačky se nachází v souboru `src/data/example-config.ts`. Zde můžete upravit otázky, odpovědi a politické strany.

## Licence

Tento projekt je licencován pod MIT licencí. 
