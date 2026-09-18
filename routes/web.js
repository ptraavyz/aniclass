const express = require('express');
const catalogController = require('../controllers/catalogController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Beranda' });
});

router.get('/catalog', catalogController.index);

module.exports = router;