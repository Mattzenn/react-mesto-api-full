const { Router } = require('express');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidation, idValidation } = require('../middlewares/validate');

const cardsRouter = Router();

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', cardValidation, createCard);
cardsRouter.delete('/cards/:_id', idValidation, deleteCard);
cardsRouter.put('/cards/:_id/likes', idValidation, likeCard);
cardsRouter.delete('/cards/:_id/likes', idValidation, dislikeCard);

module.exports = cardsRouter;
