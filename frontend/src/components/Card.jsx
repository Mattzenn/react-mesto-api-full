import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext)
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `elements__remove-button ${isOwn ? '' : 'elements__remove-button_state_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some((item) => item._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`
    );

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="elements__card">
            <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick}></img>
            <div className="elements__container">
                <h2 className="elements__title">{props.card.name}</h2>
                <div className="elements__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="elements__like-count">{props.card.likes.length}</span>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
        </li>
    )
}

export default Card