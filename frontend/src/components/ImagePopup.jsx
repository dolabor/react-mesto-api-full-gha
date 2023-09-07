import closeIcon from '../images/Close-icon.svg';

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section className= {`popup popup_zoom ${isOpen && "popup_opened"}`} id="enlarged-image">
      <div className="popup__image-container">
        <button className="button popup__close-button"
                type="button"
                aria-label="Закрыть всплывающее окно"
                onClick={onClose}>
          <img className="popup__close-button-image" src={closeIcon}  alt="Закрыть" />
        </button>
        <img className="popup__enlarged-photo" src={card ? card.link : ''} alt={`Изображение ${card.name}`} />
          <p className="popup__capture" id="popup-capture">{`Изображение ${card.name}`}</p>
      </div>
    </section>
  );
}

export default ImagePopup;

