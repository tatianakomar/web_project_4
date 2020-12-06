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
const cardForm = document.querySelector(".popup_type_add .form");
const cardTitleInput = document.querySelector("#title-input");
const cardLinkInput = document.querySelector("#link-input");
// Edit Profile
const editProfileButton = document.querySelector(".profile__btn-edit");
const editProfilePopup = document.querySelector(".popup.popup_type_edit");
const profileForm = document.querySelector(".popup_type_edit .form");
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
const togglePopup = (modal) => {
    modal.classList.toggle("popup_open");
};
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((closeButton) => {
    const popup = closeButton.closest(".popup");
    closeButton.addEventListener("click", () => {
        
        togglePopup(popup);
    });
});

const escapeButton = (evt) => {
   if(evt.key  === "Escape") {
    editProfilePopup.classList.remove("popup_open");
    addNewCardPopup.classList.remove("popup_open");
    cardPopup.classList.remove("popup_open");
   }
} 
document.addEventListener("keydown", escapeButton);

const mouseClick = (evt, popup) => {
    if(!evt.target.closest(".popup__content")) {
        popup.classList.remove("popup_open");
    }
}

const checkValidationInputs = (formInputs) => formInputs.some((formInput) => {
    return !formInput.checkValidity()
})

const showInputError = (input) => {
    input.classList.add("form__input_type_error");
    input.nextElementSibling.textContent = input.validationMessage;
    input.nextElementSibling.classList.add("form__input-error_active");
};

const hideInputError = (input) => {
    input.classList.remove("form__input_type_error");
    input.nextElementSibling.classList.remove("form__input-error_active");
    input.nextElementSibling.textContent = "";
};

const showHideInputError = (formInput) => {
    const isNotValid = !formInput.validity.valid;
    isNotValid ? showInputError(formInput) : hideInputError(formInput);
};

const setDisabledButton = (button, isDisabled) => {
    button.disabled = isDisabled;
    isDisabled ? button.classList.add("form__submit_disabled") : button.classList.remove("form__submit_disabled");
};

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
        document.addEventListener("click", (evt) => {mouseClick(evt, cardPopup)}, {once:true})
        togglePopup(cardPopup);
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
    const formInputs = Array.from(cardForm.querySelectorAll(".form__input"));
    formInputs.forEach((formInput) => {
        hideInputError(formInput);
    })
    const formSubmitButton = cardForm.querySelector(".form__submit");
    setDisabledButton(formSubmitButton, true);
    togglePopup(addNewCardPopup);
    document.addEventListener("click", (evt) => {mouseClick(evt, addNewCardPopup)})
});
// Create New Card
cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const card = createCard(cardLinkInput.value, cardTitleInput.value);
    gallery.prepend(card);

    togglePopup(addNewCardPopup);
});
//************************************************************************
//Open Edit Profile Popup
editProfileButton.addEventListener("click", (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    profileNameInput.value = nameProfile.textContent;
    profileJobInput.value = jobProfile.textContent;
    const formInputs = Array.from(profileForm.querySelectorAll(".form__input"));
    formInputs.forEach((formInput) => {
        hideInputError(formInput);
    })
    const formSubmitButton = profileForm.querySelector(".form__submit");
    setDisabledButton(formSubmitButton, false);
    togglePopup(editProfilePopup);
    document.addEventListener("click", (evt) => {mouseClick(evt, editProfilePopup)})
});
//Save New Profile
profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // Update profile
    nameProfile.textContent = profileNameInput.value;
    jobProfile.textContent = profileJobInput.value;
    document.addEventListener("click", mouseClick)
    togglePopup(editProfilePopup);
});

const forms = Array.from(document.querySelectorAll(".form"));
forms.forEach((form) => {
    const formInputs = Array.from(form.querySelectorAll(".form__input"));
    const formSubmitButton = form.querySelector(".form__submit");
    formInputs.forEach((formInput) => {
        formInput.addEventListener("input", () => {
            showHideInputError(formInput);
            const isNotValid = checkValidationInputs(formInputs);
            setDisabledButton(formSubmitButton, isNotValid);
        });
    });
});