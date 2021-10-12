import React, { useEffect } from 'react'
import PopupWithForm from './PopupWithForm'


function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({
            name: name,
            link: link,
        })
    }

    useEffect(() => {
        setName('')
        setLink('')
    }, [isOpen])

    return (
        <PopupWithForm name='card-add' title='Новое место' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isModal={true}>
            <input id="placeName" name="name" className="popup__input popup__input_place_name" type="text" placeholder="Название" minLength="2" maxLength="30" value={name} required onChange={handleNameChange}></input>
            <span id="placeName-error" className="popup__input-error"></span>
            <input id="link" name="link" className="popup__input popup__input_place_description" type="url" placeholder="Ссылка на картинку" minLength="2" maxLength="100000" value={link} required onChange={handleLinkChange}></input>
            <span id="link-error" className="popup__input-error"></span>
        </PopupWithForm>
    )


}

export default AddPlacePopup