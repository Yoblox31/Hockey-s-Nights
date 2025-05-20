const playBtn = document.getElementById('playBtn');
const gameArea = document.getElementById('gameArea');
const cardsContainer = document.getElementById('cardsContainer');

const cards = [
  { name: "Butteur Pro", description: "Augmente la puissance de tir." },
  { name: "Gardien de Fer", description: "Protège le but avec brio." },
  { name: "Passe Magique", description: "Améliore la précision des passes." }
];

playBtn.addEventListener('click', () => {
  gameArea.classList.remove('hidden');
  playBtn.disabled = true;
  afficherCartes();
});

function afficherCartes() {
  cardsContainer.innerHTML = '';
  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
      <h3>${card.name}</h3>
      <p>${card.description}</p>
    `;
    cardsContainer.appendChild(cardDiv);
  });
}
