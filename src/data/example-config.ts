import { CalculatorConfig } from '../types';

/**
 * Ukázkový konfigurační soubor pro volební kalkulačku
 * Tento soubor můžete použít jako šablonu pro vytvoření vaší vlastní konfigurace
 */
export const exampleConfig: CalculatorConfig = {
  title: 'Volební kalkulačka 2025',
  description: 'Zjistěte, která politická strana nejlépe odpovídá vašim názorům',
  
// Seznam otázek v kalkulačce
questions: [
  {
    id: 'economy1',
    text: 'Stát by měl zvyšovat minimální mzdu.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd', 'stacilo'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['spolu'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['pirati'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano'] }
    ]
  },
  {
    id: 'economy2',
    text: 'Daňové zatížení by mělo být progresivnější.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['stacilo'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'infrastructure1',
    text: 'Stát by měl více investovat do infrastruktury.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['stacilo'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['pirati'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'spolu'] }
    ]
  },
  {
    id: 'science1',
    text: 'Podpora vědy a výzkumu by měla být prioritou státu.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['stacilo'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'healthcare2',
    text: 'Zdravotní péče by měla být plně zdarma pro všechny občany.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['stacilo'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'pension1',
    text: 'Důchodový systém by měl být reformován.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd', 'stacilo'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'taxation1',
    text: 'Stát by měl zrušit daň z příjmu.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['ano', 'pirati'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['spolu'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spd'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['stacilo'] }
    ]
  },
  {
    id: 'education2',
    text: 'Vzdělávání by mělo být více financováno ze státního rozpočtu.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['stacilo'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'schooling1',
    text: 'Školní docházka by měla být povinná až do 18 let.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: ['stacilo'] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'housing1',
    text: 'Stát by měl více regulovat trh s nemovitostmi.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd', 'stacilo'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['spolu'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: [] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'crime1',
    text: 'Měly by být zavedeny přísnější tresty za hospodářskou kriminalitu.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['pirati'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['ano'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['spd', 'spolu', 'stacilo'] }
    ]
  },
  {
    id: 'transport1',
    text: 'Stát by měl podporovat ekologickou dopravu, například cyklistiku a veřejnou dopravu.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['stacilo'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'energy1',
    text: 'Měly by být omezeny fosilní paliva a podpořeny obnovitelné zdroje energie.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd', 'stacilo'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'defense2',
    text: 'Česká republika by měla více investovat do obranných technologií.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['pirati'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['ano'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['spolu', 'spd', 'stacilo'] }
    ]
  },
  {
    id: 'nato1',
    text: 'Česká republika by měla aktivně podporovat členství v NATO.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd', 'stacilo'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['pirati'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'spolu'] }
    ]
  },
  {
    id: 'immigration2',
    text: 'Imigrační politika by měla být liberalizována.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd', 'stacilo'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['spolu'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['ano'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['pirati'] }
    ]
  },
  {
    id: 'minority1',
    text: 'Stát by měl více chránit práva národnostních a sexuálních menšin.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd', 'stacilo'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  },
  {
    id: 'family1',
    text: 'Měly by být zavedeny programy na podporu rodin s dětmi.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['stacilo'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'spolu', 'pirati'] }
    ]
  },
  {
    id: 'investment1',
    text: 'Stát by měl omezit vliv zahraničních investorů v klíčových sektorech.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['ano', 'pirati'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['spolu'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['stacilo'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['spd'] }
    ]
  },
  {
    id: 'socialmedia1',
    text: 'Regulace sociálních médií by měla být přísnější.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['ano'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: [] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['stacilo'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['spolu', 'spd', 'pirati'] }
    ]
  },
  {
    id: 'culture1',
    text: 'Kultuře by mělo být věnováno více finančních prostředků.',
    answers: [
      { id: 'a1', text: 'Rozhodně nesouhlasím', value: -2, parties: ['spd'] },
      { id: 'a2', text: 'Spíše nesouhlasím', value: -1, parties: ['stacilo'] },
      { id: 'a3', text: 'Neutrální postoj', value: 0, parties: [] },
      { id: 'a4', text: 'Spíše souhlasím', value: 1, parties: ['spolu'] },
      { id: 'a5', text: 'Rozhodně souhlasím', value: 2, parties: ['ano', 'pirati'] }
    ]
  }
],

  // Seznam politických stran
  parties: [
    {
      id: 'ano',
      name: 'ANO',
      color: '#00AEEF', // modrá
      description: 'Hnutí ANO je centristické politické hnutí založené Andrejem Babišem.'
    },
    {
      id: 'spolu',
      name: 'SPOLU',
      color: '#1B61AB', // tmavě modrá
      description: 'SPOLU je koalice stran ODS, KDU-ČSL a TOP 09 s konzervativně-liberální orientací.'
    },
    {
      id: 'spd',
      name: 'SPD',
      color: '#0077C8', // modrá
      description: 'SPD je národně konzervativní politická strana vedená Tomiem Okamurou.'
    },
    {
      id: 'pirati',
      name: 'Piráti',
      color: '#000000', // černá
      description: 'Česká pirátská strana je liberální politická strana zaměřená na transparentnost a digitalizaci.'
    },
    {
      id: 'stacilo',
      name: 'STAČILO',
      color: '#CE1126', // červená
      description: 'STAČILO je levicové politické hnutí vedené Kateřinou Konečnou.'
    }
  ]
}; 