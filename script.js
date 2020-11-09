let editButton = document.querySelector(".btn_action_edit");
let closeButton = document.querySelector(".btn_action_close");
let popup = document.querySelector(".popup-edit");
let formProfile = document.querySelector(".popup-edit__form");

let openPopup = function() {
  popup.setAttribute("style", "display: block");  
}

editButton.addEventListener("click", openPopup);

let closePopup = function() {
    popup.setAttribute("style", "display: none");  
}
  
closeButton.addEventListener("click", closePopup);

let formSubmitHandler = function(evt) {
    evt.preventDefault();

    let nameInput = document.querySelector(".popup-edit__input_name");
    let jobInput = document.querySelector(".popup-edit__input_job");
    let nameProfile = document.querySelector(".profile__name");
    let jobProfile = document.querySelector(".profile__job");

    nameProfile.innerText = nameInput.value;
    jobProfile.innerText = jobInput.value;
    closePopup();
}

formProfile.addEventListener("submit", formSubmitHandler);