import React, { useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {

    const avatarRef = React.useRef('')

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    useEffect(() => {
        avatarRef.current.value = ''
      }, [isOpen])


    return (
        <PopupWithForm name='avatar-edit' title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="avatar-link" name="userAvatar" className="popup__input popup__input_place_description" type="url" placeholder="Ссылка на картинку" minLength="2" maxLength="100000" required ref={avatarRef}></input>
            <span id="avatar-link-error" className="popup__input-error"></span>
        </PopupWithForm>
    )

}

export default EditAvatarPopup