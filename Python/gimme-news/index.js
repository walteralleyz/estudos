const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('build'));

app.post('/category', async (req, res) => {
  const { category } = req.body;

  if(!category) return res.status(403).json({
    error: 'Acesso não autorizado'
  });

  const dataToSend = await exec(`python3 script.py ${category}`);

  res.status(200).json(dataToSend.stdout);
});

app.get('*', (req, res) => res.status(404).send("404! Não encontrado"));

app.listen(PORT, () => console.log('Listen on port %d', PORT));
