const express = require('express');
const router = express.Router();
const { addSearchHistory, getSearchHistory, deleteSearchHistory } = require('../controllers/searchHistoryController');
const auth = require('../middleware/auth');

router.post('/', auth, addSearchHistory);
router.get('/', auth, getSearchHistory);
router.delete('/:id', auth, deleteSearchHistory);

module.exports = router;