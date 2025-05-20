const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Pour servir le fichier html si tu le mets dans /public

// Simple stockage en mémoire (à remplacer par une DB en vrai projet)
const users = [];

// Middleware session simple
app.use(session({
  secret: 'uneCleSecretePourSession',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 heure
}));

// Inscription
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if(!username || !email || !password) return res.status(400).json({message:'Champs manquants.'});

  // Vérifier si email déjà pris
  if(users.find(u => u.email === email)) {
    return res.status(400).json({message:'Email déjà utilisé.'});
  }

  // Hash du mot de passe
  const hash = await bcrypt.hash(password, 10);

  users.push({ username, email, passwordHash: hash });
  return res.json({message: 'Inscription réussie !'});
});

// Connexion
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({message:'Champs manquants.'});

  const user = users.find(u => u.email === email);
  if(!user) return res.status(400).json({message:'Email ou mot de passe incorrect.'});

  const valid = await bcrypt.compare(password, user.passwordHash);
  if(!valid) return res.status(400).json({message:'Email ou mot de passe incorrect.'});

  // Stockage simple dans session
  req.session.userId = user.email;

  return res.json({message: 'Connexion réussie !', username: user.username});
});

// Démarrage serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
