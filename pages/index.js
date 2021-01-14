import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";

import {initialCards} from "../utils/constants.js"

const gallerySelector = ".gallery";
const popupSelector = ".popup.popup_type_card";

const popupWithImage = new PopupWithImage(popupSelector);


const cardList = new Section({ items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "#card-template", (link,title) => {
          popupWithImage.open(link, title);
        });
  
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }                                  
}, gallerySelector);

cardList.renderItems();

