# Technická implementace požadovaných změn

## 1. Úprava systému odpovědí na bodovou škálu

### Nové komponenty

1. `RangeSlider.tsx` - Komponenta pro bodovou škálu
   - Vlastnosti:
     - `min`: minimální hodnota (0)
     - `max`: maximální hodnota (10)
     - `value`: aktuální hodnota
     - `onChange`: callback pro změnu hodnoty
     - `leftColor`: barva pro negativní část (červená)
     - `rightColor`: barva pro pozitivní část (modrá)

### Úpravy stávajících komponent

1. `QuestionCard.tsx` - Nahradit stávající seznam odpovědí za novou komponentu `RangeSlider`
2. `VotingCalculator.tsx` - Upravit logiku pro zpracování odpovědí

### Datový model

1. Úprava `Answer` v `types/index.ts`:
   - Odstranit textové reprezentace odpovědí
   - Upravit výpočet shody s politickými stranami pro bodovou škálu

## 2. Generování a export výsledků jako obrázek

### Knihovny

Doporučené odlehčené knihovny:
- `html2canvas` (~9KB gzipped) - konverze DOM elementů na canvas
- `dom-to-image` (~7KB gzipped) - alternativa k html2canvas
- `jsPDF` (volitelné pro další export do PDF)

### Nové komponenty

1. `ResultExport.tsx` - Komponenta pro export výsledků
   - Metody:
     - `captureResults()`: převod DOM na canvas/obrázek
     - `downloadImage()`: stažení vygenerovaného obrázku

### Úpravy stávajících komponent

1. `ResultsPage.tsx` - Přidat tlačítko a funkčnost pro export výsledků

## 3. Demografický průzkum po základní kalkulačce

### Nové komponenty

1. `DemographicSurvey.tsx` - Komponenta pro demografické otázky
   - Formulář pro sběr demografických údajů
   - Validace formuláře

2. `CompetitionForm.tsx` - Komponenta pro přihlášení do soutěže
   - Email a souhlas se zpracováním údajů
   - Napojení na systém ukládání dat

3. `ElectionPreferenceQuestion.tsx` - Komponenta pro otázku o volebních preferencích

### Úpravy stávajících komponent

1. `VotingCalculator.tsx` - Přidat přechod na demografický průzkum
2. `ResultsPage.tsx` - Přidat tlačítko pro přechod na demografický průzkum

## 4. Ukládání a propojení dat

### Nové komponenty

1. `DataService.ts` - Služba pro ukládání dat
   - Metody:
     - `saveAnonymousResult()`: ukládání výsledků
     - `saveDemographicData()`: ukládání demografických dat
   - Ukládání lokálně i na server (příprava)

### Datový model

1. Rozšíření typů v `types/index.ts`:
   - `AnonymousResult`: anonymní výsledky
   - `DemographicData`: demografické údaje

## 5. Vylepšení vybírání odpovědí

1. Přidání tlačítka "Pokračovat"
   - Uživatel musí aktivně vybrat odpověď a poté potvrdit
   - Vizuální indikace vybrané hodnoty

2. Podpora různých škál odpovědí (0-5, 0-10)
   - Konfigurace škály v rámci každé otázky
   - Dynamický rozsah slideru podle definované škály

3. Jemnější diferenciace podpory stran
   - Možnost definovat různé hodnoty podpory pro různé strany
   - Přesnější výpočet shody s politickými stranami 