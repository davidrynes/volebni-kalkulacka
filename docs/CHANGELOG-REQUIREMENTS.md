# Požadavky na změny v aplikaci

## 1. Nahrazení textových odpovědí za horizontální posuvník

### Popis požadavku
Nahradit stávající textové odpovědi za horizontální bodovou škálu, která umožní uživatelům vyjádřit svůj postoj na škále od 0 do 10.

### Očekávané chování
- Uživatel vidí horizontální posuvník místo textových odpovědí
- Posuvník má barevný přechod (červená pro nesouhlas, modrá pro souhlas)
- Po přesunu posuvníku se automaticky zaznamená odpověď
- Uživatel by měl vidět, jakou hodnotu na škále zvolil

### Rozšíření požadavku (v2)
- Tlačítko "Pokračovat" místo automatického postupu na další otázku
- Podpora různých škál (0-5, 0-10) podle konfigurace otázky
- Jemnější diferenciace hodnot podpory pro jednotlivé strany

## 2. Export výsledků jako obrázek

### Popis požadavku
Přidat možnost exportu výsledků kalkulačky jako obrázek, který můžou uživatelé sdílet na sociálních sítích.

### Očekávané chování
- Tlačítko "Stáhnout jako obrázek" na stránce s výsledky
- Generovaný obrázek obsahuje logo kalkulačky, výsledky a odkaz na web
- Obrázek je v dostatečném rozlišení pro sdílení
- Podpora stažení do zařízení uživatele

## 3. Demografický průzkum po dokončení kalkulačky

### Popis požadavku
Po zobrazení výsledků nabídnout uživatelům možnost vyplnit dodatečný demografický průzkum, který pomůže analyzovat preference různých skupin voličů.

### Očekávané chování
- Tlačítko "Pokračovat na demografický průzkum" na stránce s výsledky
- Formulář s demografickými otázkami (věk, pohlaví, vzdělání, region...)
- Možnost přihlásit se do soutěže zadáním e-mailu
- Uživatelé mohou průzkum přeskočit

## 4. Ukládání anonymních dat s možností propojení s e-mailem

### Popis požadavku
Ukládat anonymizovaná data o odpovědích uživatelů a propojit je s demografickými údaji a případně e-mailem pro soutěž.

### Očekávané chování
- Vygenerování unikátního ID pro každou instanci kalkulačky
- Ukládání odpovědí s tímto ID (bez osobních údajů)
- Propojení s demografickými údaji pomocí ID
- Propojení s e-mailem pro soutěž (volitelné)
- Data jsou ukládána lokálně i na server (s vysvětlením) 