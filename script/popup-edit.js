const initPofile = () => {

  const editButton = document.querySelector(".profile__btn-edit");
  const closeButton = document.querySelector(".popup-edit__btn-close");
  const popup = document.querySelector(".popup-edit");
  const formProfile = document.querySelector(".popup-edit__form");
  const nameInput = document.querySelector(".popup-edit_input_name");
  const jobInput = document.querySelector(".popup-edit_input_job");
  const nameProfile = document.querySelector(".profile__name");
  const jobProfile = document.querySelector(".profile__job");

  //Open popup
  const openPopup = () => {
    // Fill the form fields with current data
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    popup.classList.add("popup-edit_open");
  }
  editButton.addEventListener("click", openPopup);

  //Close Popup
  const closePopup = () => {
    popup.classList.remove("popup-edit_open");
  }
  closeButton.addEventListener("click", closePopup);

  //Save New Profile
  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    // Update profile
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup();
  }
  formProfile.addEventListener("submit", formSubmitHandler);
}
initPofile();