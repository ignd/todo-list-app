import express from 'express';
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Serveur fonctionnel');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});