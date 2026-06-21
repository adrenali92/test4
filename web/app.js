const facts = [
  ['Hauptstadt', 'Bukarest'],
  ['Einwohner', 'ca. 19 Mio.'],
  ['Fläche', '238.397 km²'],
  ['Sprache', 'Rumänisch'],
  ['Währung', 'Rumänischer Leu (RON)'],
  ['EU-Mitglied', 'seit 2007'],
];

const highlights = [
  {
    icon: '🏰',
    title: 'Transsilvanien',
    text: 'Mittelalterliche Städte, Kirchenburgen, Karpatenlandschaften und Schloss Bran machen die Region weltberühmt.',
  },
  {
    icon: '🌊',
    title: 'Donaudelta',
    text: 'UNESCO-Welterbe, Labyrinth aus Wasserwegen und eines der wichtigsten Vogelparadiese Europas.',
  },
  {
    icon: '🏙️',
    title: 'Bukarest',
    text: 'Die Hauptstadt verbindet Belle-Époque-Fassaden, Parks, Museen, Cafés und ein lebendiges Nachtleben.',
  },
  {
    icon: '⛰️',
    title: 'Karpaten',
    text: 'Bergstraßen, Wanderwege, Wälder und Nationalparks bieten viel Raum für Outdoor-Abenteuer.',
  },
];

const timeline = [
  ['1859', 'Vereinigung der Fürstentümer Moldau und Walachei als Grundlage des modernen Rumäniens.'],
  ['1918', 'Große Vereinigung: Siebenbürgen schließt sich Rumänien an.'],
  ['1989', 'Ende der kommunistischen Diktatur und Beginn demokratischer Reformen.'],
  ['2007', 'Rumänien wird Mitglied der Europäischen Union.'],
];

const tips = [
  'Probiere Sarmale, Mămăligă, Papanași und Cozonac.',
  'Plane in den Karpaten und auf Landstraßen mehr Zeit ein als die reine Kilometerzahl vermuten lässt.',
  'Für Städte, Natur und Roadtrips sind Frühling bis Herbst besonders angenehm.',
  'In Kirchen und Klöstern sind ruhiges Verhalten und respektvolle Kleidung wichtig.',
];

const sources = [
  ['EU-Länderprofil Rumänien', 'https://european-union.europa.eu/principles-countries-history/eu-countries/romania_de'],
  ['UNESCO: Donaudelta', 'https://whc.unesco.org/en/list/588/'],
  ['Offizielle Tourismusinfos', 'https://www.romaniatourism.com/'],
];

const recommendations = {
  culture: 'Starte in Bukarest, fahre weiter nach Brașov und Sibiu und plane Zeit für Cafés, Museen und Altstädte ein.',
  nature: 'Kombiniere die Karpaten mit dem Donaudelta: Wandern, Bergstraßen und danach Naturbeobachtung am Wasser.',
  food: 'Besuche Märkte und traditionelle Restaurants. Suche nach Sarmale, Mămăligă, Ciorbă und süßem Papanași.',
  history: 'Plane Kirchenburgen in Siebenbürgen, Schloss Peleș, Altstädte und die neuere Geschichte in Bukarest ein.',
};

function renderFacts() {
  const factGrid = document.querySelector('#fact-grid');
  factGrid.innerHTML = facts
    .map(([label, value]) => `<article class="fact"><span>${label}</span><strong>${value}</strong></article>`)
    .join('');
}

function renderHighlights() {
  const cards = document.querySelector('#highlight-cards');
  cards.innerHTML = highlights
    .map(
      (item) => `
        <article class="card">
          <span class="card-icon" aria-hidden="true">${item.icon}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join('');
}

function renderTimeline() {
  const list = document.querySelector('#timeline');
  list.innerHTML = timeline
    .map(([year, text]) => `<li><time>${year}</time><p>${text}</p></li>`)
    .join('');
}

function renderTips() {
  const list = document.querySelector('#tips');
  list.innerHTML = tips.map((tip) => `<li>${tip}</li>`).join('');
}

function renderSources() {
  const links = document.querySelector('#source-links');
  links.innerHTML = sources
    .map(([title, url]) => `<a class="source" href="${url}" target="_blank" rel="noreferrer">${title} ↗</a>`)
    .join('');
}

function setupPlanner() {
  const form = document.querySelector('#planner-form');
  const select = document.querySelector('#interest');
  const output = document.querySelector('#recommendation');

  const updateRecommendation = () => {
    output.value = recommendations[select.value];
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    updateRecommendation();
  });

  select.addEventListener('change', updateRecommendation);
  updateRecommendation();
}

renderFacts();
renderHighlights();
renderTimeline();
renderTips();
renderSources();
setupPlanner();
