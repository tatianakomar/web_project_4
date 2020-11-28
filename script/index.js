
    const cardPopup = document.querySelector(".popup-open");
    const popupImage = cardPopup.querySelector(".popup-open__image");
    const popupTitle = cardPopup.querySelector(".popup-open__title");
    const cardTemplate = document.querySelector("#card-template").content;
    const gallery = document.querySelector(".gallery");

    const likeCard = (evt) => {
        evt.target.classList.toggle("card__btn-like_active");
    };
    const deleteCard = (evt) => {
        const cardItem = evt.target.closest(".card");
        cardItem.remove();
    };
    const openPopup = (modal, className) =>{
        modal.classList.add(className);
    };
    const closePopup = (modal, className) =>{
        modal.classList.remove(className);
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
        cardImage.addEventListener("click", ()=> {
            popupImage.src = link;
            popupImage.alt = title;
            popupTitle.textContent = title;
            
            cardPopup.classList.add("popup-open_open");
        });
        return newCard;
    }

    // Close Card Popup
    const closeCardButton = document.querySelector(".popup-open__btn-close");
    const closeCard = ()=>{
        cardPopup.classList.remove("popup-open_open");
    };
    closeCardButton.addEventListener("click", closeCard);
    // ******************************************************************************************
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
    // Append Initial Cards
    initialCards.forEach((initCard) => {
        const card = createCard(initCard.link, initCard.name);
        gallery.append(card);
    });
    // ******************************************************************************************
    // Create New Card
    const addButton = document.querySelector(".profile__btn-add");
    const closePopupCardButton = document.querySelector(".popup-add__btn-close");
    const popupAdd = document.querySelector(".popup-add");
    const formCard = document.querySelector(".popup-add__form");
    const titleInput = document.querySelector(".popup-add_input_title");
    const linkInput = document.querySelector(".popup-add_input_link");

    //Open Popup
    const openCreatePopup = () => {
        formCard.reset();
        openPopup(popupAdd, "popup-add_open");
    }
    addButton.addEventListener("click", openCreatePopup);

    //Close Popup
    const closeCreatePopup = () => {
        closePopup(popupAdd, "popup-add_open");
    }
    closePopupCardButton.addEventListener("click", closeCreatePopup);

    // Create New Card
    const formCreateHandler = function(evt) {
        evt.preventDefault();
        const card = createCard(linkInput.value, titleInput.value);
        gallery.prepend(card);
        closeCreatePopup();
    }
    formCard.addEventListener("submit", formCreateHandler);

    //************************************************************************
    const editButton = document.querySelector(".profile__btn-edit");
    const closeButton = document.querySelector(".popup-edit__btn-close");
    const popupEdit = document.querySelector(".popup-edit");
    const formProfile = document.querySelector(".popup-edit__form");
    const nameInput = document.querySelector(".popup-edit_input_name");
    const jobInput = document.querySelector(".popup-edit_input_job");
    const nameProfile = document.querySelector(".profile__name");
    const jobProfile = document.querySelector(".profile__job");
  
    //Open popup
    const openEditPopup = () => {
      // Fill the form fields with current data
      nameInput.value = nameProfile.textContent;
      jobInput.value = jobProfile.textContent;
      openPopup(popupEdit, "popup-edit_open");     
    }
    editButton.addEventListener("click", openEditPopup);
  
    //Close Popup
    const closeEditPopup = () => {
        closePopup(popupEdit, "popup-edit_open");
    }
    closeButton.addEventListener("click", closeEditPopup);
  
    //Save New Profile
    const formSubmitHandler = (evt) => {
      evt.preventDefault();
      // Update profile
      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;
  
      closeEditPopup();
    }
    formProfile.addEventListener("submit", formSubmitHandler);
