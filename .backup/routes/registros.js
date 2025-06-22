const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');
const db = require('../database');

// Rota POST para criar novo registro
router.post('/', registroController.criarRegistro);

// Nova rota para buscar último registro
router.get('/ultimo', (req, res) => {
  db.get(
    "SELECT * FROM registros ORDER BY id DESC LIMIT 1",
    (err, row) => {
      if (err) {
        console.error('Erro ao buscar último registro:', err);
        return res.status(500).json({ error: 'Erro ao buscar registro' });
      }
      res.json(row || {});
    }
  );
});

module.exports = router;