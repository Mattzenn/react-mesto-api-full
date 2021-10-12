import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext)

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateUser({
            name: name,
            about: description,
        })

    }

    return (
        <PopupWithForm name='profile-edit' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="userName" name="userName" className="popup__input popup__input_user_name" type="text" placeholder="Имя" minLength="2" maxLength="40" required value={name || ''}  onChange={handleNameChange}></input>
            <span id="userName-error" className="popup__input-error"></span>
            <input id="userAbout" name="userAbout" className="popup__input popup__input_user_description" type="text" placeholder="Профессия" minLength="2" maxLength="200" required value={description || ''}  onChange={handleDescriptionChange}></input>
            <span id="userAbout-error" className="popup__input-error"></span>
        </PopupWithForm>
    )

}

export default EditProfilePopup