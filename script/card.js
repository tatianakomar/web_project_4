const initCard = () => {
    const addCard = (link, title, isAppend) => {
        const cardTemplate = document.querySelector("#card-template").content;
        const popupTemplate = document.querySelector("#popup-open-template").content;
        const page = document.querySelector(".page");
        const gallery = document.querySelector(".gallery");
        const newCard = cardTemplate.cloneNode(true);
        newCard.querySelector(".card__image").src = link;
        newCard.querySelector(".card__image").alt = title;
        newCard.querySelector(".card__title").textContent = title;

        // Like New Card
        const likeButton = newCard.querySelector(".card__btn-like");
        const likeCard = () => {
            likeButton.classList.toggle("card__btn-like_active");
        };
        likeButton.addEventListener("click", likeCard);

        // Delete New Card
        const deleteButton = newCard.querySelector(".card__btn-delete");
        const deleteCard = () => {
            const cardItem = deleteButton.closest(".card");
            cardItem.remove();
        };
        deleteButton.addEventListener("click", deleteCard);

        // Open Popup-Card 
        newCard.querySelector(".card__image").addEventListener("click", () => {
            const card = popupTemplate.cloneNode(true);
            card.querySelector(".popup-open__image").src = link;
            card.querySelector(".popup-open__image").alt = title;
            card.querySelector(".popup-open__title").textContent = title;

            // Close Popup-Card
            const closeCardButton = card.querySelector(".popup-open__btn-close");
            const closeCard = function() {
                const openedCardItem = closeCardButton.closest(".popup-open");
                openedCardItem.remove();
            };
            closeCardButton.addEventListener("click", closeCard);
            page.append(card);
        });
        if (isAppend) {
            gallery.append(newCard)
        } else {
            gallery.prepend(newCard)
        };
    }
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
    initialCards.forEach((card) => {
        addCard(card.link, card.name, true);
    });

    // ******************************************************************************************
    // Create New Card
    const addButton = document.querySelector(".profile__btn-add");
    const closeButton = document.querySelector(".popup-add__btn-close");
    const popup = document.querySelector(".popup-add");
    const formCard = document.querySelector(".popup-add__form");
    const titleInput = document.querySelector(".popup-add_input_title");
    const linkInput = document.querySelector(".popup-add_input_link");

    //Open Popup
    const openCreatePopup = () => {
        formCard.reset();
        popup.classList.add("popup-add_open");
    }
    addButton.addEventListener("click", openCreatePopup);

    //Close Popup
    const closeCreatePopup = () => {
        popup.classList.remove("popup-add_open");
    }
    closeButton.addEventListener("click", closeCreatePopup);

    // Create New Card
    const formCreateHandler = function(evt) {
        evt.preventDefault();
        addCard(linkInput.value, titleInput.value, false);
        closeCreatePopup();
    }
    formCard.addEventListener("submit", formCreateHandler);
}
initCard();