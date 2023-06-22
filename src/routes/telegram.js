const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const { sendMessage, sendPhoto, sendFile } = require('../controllers/telegram-controller');

router.post('/telegram/sendMessage', authenticationMiddleware, sendMessage);
router.post('/telegram/sendPhoto', authenticationMiddleware, sendPhoto)
router.post('/telegram/sendFile', authenticationMiddleware, sendFile)

module.exports = router;
