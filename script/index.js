// Initial Cards
const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];
// Create New Card 
const cardPopup = document.querySelector(".popup.popup_type_card");
const popupCardImage = cardPopup.querySelector(".popup__image");
const popupCardTitle = cardPopup.querySelector(".popup__card-title");
const cardTemplate = document.querySelector("#card-template").content;
const gallery = document.querySelector(".gallery");
// Show Card Popup
const addNewCardButton = document.querySelector(".profile__btn-add");
const addNewCardPopup = document.querySelector(".popup.popup_type_add");
const cardForm = document.querySelector(".popup_type_add .popup__form");
const cardTitleInput = document.querySelector("#title-input");
const cardLinkInput = document.querySelector("#link-input");
// Edit Profile
const editProfileButton = document.querySelector(".profile__btn-edit");
const editProfilePopup = document.querySelector(".popup.popup_type_edit");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const profileNameInput = document.querySelector("#name-input");
const profileJobInput = document.querySelector("#job-input")
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");



const likeCard = (evt) => {
    evt.target.classList.toggle("card__btn-like_active");
};
const deleteCard = (evt) => {
    const cardItem = evt.target.closest(".card");
    cardItem.remove();
};

const openPopup = (modal) => {
    modal.classList.add("popup_open");
    document.addEventListener("keydown", escapeButton);
    document.addEventListener("click", mouseClick);
}
const closePopup = (modal) => {
    const openedPopup = document.querySelector(".popup_open");
    openedPopup.classList.remove("popup_open");
    document.removeEventListener("keydown", escapeButton);
    document.removeEventListener("click", mouseClick);
}
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        closePopup();
    });
});

const escapeButton = (evt) => {
    if (evt.key === "Escape") {
        closePopup();
    }
}

const mouseClick = (evt) => {
    if (!evt.target.closest(".popup__content") && !evt.target.closest(".popup__content_content_card")) {
        closePopup();
    }
}

const createCard = (link, title) => {
    const newCard = cardTemplate.cloneNode(true);
    const cardImage = newCard.querySelector(".card__image");
    const cardTitle = newCard.querySelector(".card__title");
    cardImage.src = link;
    cardImage.alt = title;
    cardTitle.textContent = title;

    // Like New Card
    const likeButton = newCard.querySelector(".card__btn-like");
    likeButton.addEventListener("click", likeCard);

    // Delete New Card
    const deleteButton = newCard.querySelector(".card__btn-delete");
    deleteButton.addEventListener("click", deleteCard);

    // Open Card Popup
    cardImage.addEventListener("click", (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        popupCardImage.src = link;
        popupCardImage.alt = title;
        popupCardTitle.textContent = title;
        openPopup(cardPopup);
    });
    return newCard;
}
// ******************************************************************************************
// Append Initial Cards
initialCards.forEach((initCard) => {
    const card = createCard(initCard.link, initCard.name);
    gallery.append(card);
});
// ******************************************************************************************
//Open Creating Card Popup
addNewCardButton.addEventListener("click", (evt) => {
    cardForm.reset();
    evt.preventDefault()
    evt.stopPropagation()
    const formInputs = Array.from(cardForm.querySelectorAll(validationSettings.inputSelector));
    formInputs.forEach((formInput) => {
        hideInputError(formInput);
    })
    const formSubmitButton = cardForm.querySelector(validationSettings.submitButtonSelector);
    setDisabledButton(formSubmitButton, true);
    openPopup(addNewCardPopup);
});
// Create New Card
cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const card = createCard(cardLinkInput.value, cardTitleInput.value);
    gallery.prepend(card);
    closePopup();
});
//************************************************************************
//Open Edit Profile Popup
editProfileButton.addEventListener("click", (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    profileNameInput.value = nameProfile.textContent;
    profileJobInput.value = jobProfile.textContent;
    const formInputs = Array.from(profileForm.querySelectorAll(validationSettings.inputSelector));
    formInputs.forEach((formInput) => {
        hideInputError(formInput);
    })
    const formSubmitButton = profileForm.querySelector(validationSettings.submitButtonSelector);
    setDisabledButton(formSubmitButton, false);
    openPopup(editProfilePopup);
});
//Save New Profile
profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // Update profile
    nameProfile.textContent = profileNameInput.value;
    jobProfile.textContent = profileJobInput.value;
    closePopup();
});