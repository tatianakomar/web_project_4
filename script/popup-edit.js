const initPofile = function() {

  let editButton = document.querySelector(".profile__btn-edit");
  let closeButton = document.querySelector(".popup-edit__btn-close");
  let popup = document.querySelector(".popup-edit");
  let formProfile = document.querySelector(".popup-edit__form");
  let nameInput = document.querySelector(".popup-edit_input_name");
  let jobInput = document.querySelector(".popup-edit_input_job");
  let nameProfile = document.querySelector(".profile__name");
  let jobProfile = document.querySelector(".profile__job");

  //Open popup
  let openPopup = function() {
    // Fill the form fields with current data
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  
    popup.classList.add("popup-edit_open");  
  }
  editButton.addEventListener("click", openPopup);

  //Close Popup
  let closePopup = function() {
    popup.classList.remove("popup-edit_open");
  }
  closeButton.addEventListener("click", closePopup);

  //Save New Profile
  let formSubmitHandler = function(evt) {
    evt.preventDefault();
    // Update profile
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup();
  }
  formProfile.addEventListener("submit", formSubmitHandler);
}
initPofile();