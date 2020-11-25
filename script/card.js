const initCard = function(){
    //Initial Cards
    const initialCards = [
        {
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

    const cardTemplate = document.querySelector("#card-template").content;
    const gallery = document.querySelector(".gallery");
    //Append Card Template
    initialCards.forEach((card)=>{
        const newCard = cardTemplate.cloneNode(true);
        newCard.querySelector(".card__image").src = card.link;
        newCard.querySelector(".card__image").alt = card.name;
        newCard.querySelector(".card__title").textContent = card.name;
        gallery.append(newCard);
    });

    //Like Card
    let likeButtons = document.querySelectorAll(".card__btn-like");
    likeButtons.forEach((likeButton)=>{
        let likeCard = function() {
            likeButton.classList.toggle("card__btn-like_active");
        }
        likeButton.addEventListener("click", likeCard);
    })

    //Delete Card
    let deleteButtons = document.querySelectorAll(".card__btn-delete");
    deleteButtons.forEach((deleteButton)=>{
        let deleteCard = function(){
            const cardItem = deleteButton.closest(".card");
            cardItem.remove();
        }
        deleteButton.addEventListener("click", deleteCard);
    })

    //New Cards
    const addButton = document.querySelector(".profile__btn-add");
    const closeButton = document.querySelector(".popup-add__btn-close");
    const popup = document.querySelector(".popup-add");
    const formCard = document.querySelector(".popup-add__form");
    const titleInput = document.querySelector(".popup-add_input_title");
    const linkInput = document.querySelector(".popup-add_input_link");

    //Open Popup
    let openPopup = function() {
        formCard.reset();
        popup.classList.add("popup-add_open");  
    }
    addButton.addEventListener("click", openPopup);

    //Close Popup
    let closePopup = function() {
        popup.classList.remove("popup-add_open");
    }
    closeButton.addEventListener("click", closePopup);

    //Create New Card
    let formSubmitHandler = function(evt) {
        evt.preventDefault();
        const newCard = cardTemplate.cloneNode(true);
        newCard.querySelector(".card__image").src = linkInput.value;
        newCard.querySelector(".card__image").alt = titleInput.value;
        newCard.querySelector(".card__title").textContent = titleInput.value;
        gallery.prepend(newCard);

        //Like New Card
        let likeButton = document.querySelector(".card__btn-like");
        let likeCard = function() {
            likeButton.classList.toggle("card__btn-like_active");
        }
        likeButton.addEventListener("click", likeCard);

        //Delete New Card
        let deleteButton = document.querySelector(".card__btn-delete");
        let deleteCard = function(){
            const cardItem = deleteButton.closest(".card");
            cardItem.remove();
        }
        deleteButton.addEventListener("click", deleteCard);

        closePopup();
    }
    formCard.addEventListener("submit", formSubmitHandler);
}
initCard();
