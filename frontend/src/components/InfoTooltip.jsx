export default function InfoTooltip({ isOpen, onClose, title, img }) {
   return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container popup__overlay">
        <div className='popup__wrapper'>
            <img src={img} alt={img} className='popup__tooltip' />
            <h2 className="popup__title popup__title_type_tooltip">{title}</h2>
        </div>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
    </div>  
  </div>
   )
}