import uniqueID from "./helperFiles/uniqueID.js";
import { createNoteHTML } from "./helperFiles/createNoteHTML.js";

class Note {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}

class App {
  constructor() {
    this.notes = [];
    this.selectedNoteId = "";
    this.miniSideBar = true;
    this.$activeForm = document.querySelector(".active-form");
    this.$inActiveForm = document.querySelector(".inactive-form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$inputNote = document.querySelector("#input-note");
    this.$notes = document.querySelector(".notes");
    this.$formContainerActions = document.querySelector("#form-container-actions");
    this.$modalForm = document.querySelector("#modal-form");
    this.$modalActiveForm = document.querySelector(".modal-active-form");
    this.$modal = document.querySelector(".modal");
    this.$modalCloseBtn = document.querySelector(".modal-active-form--close-btn");
    this.$modalNoteTitle = document.querySelector("#modal-note-title");
    this.$modalInputNote = document.querySelector("#modal-input-note");
    this.$mainAsideWrapper = document.querySelector(".main-aside-wrapper");
    this.$sideBar = document.querySelector(".side-bar");
    this.$sideBarItemsAll = document.querySelectorAll(".side-bar-items");
    this.$sideBarItemsAllText = document.querySelectorAll(".side-bar-items--text");
    this.$sideBarItemsMaterialsAll = document.querySelectorAll(".material-symbols-outlined");
    this.$sideBarActiveItem = document.querySelector(".active-item");

    this.addEventListeners();
    this.displayNotes();
    this.handleToggleNoteFooter();
  }

  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
      this.openModal(event);
      this.closeModal(event);
      this.handleArchive(event);
    });

    this.$formContainerActions.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$inputNote.value;
      this.addNote({ title, text });
      this.$inActiveForm.style.display = "flex";
      this.$activeForm.style.display = "none";
      this.$inputNote.value = "";
      this.$noteTitle.value = "";
    });

    this.$modalForm.addEventListener("submit", (event) => event.preventDefault());

    this.$sideBarItemsMaterialsAll.forEach((sideBarItemsMaterial) =>
      sideBarItemsMaterial.addEventListener("mouseover", (event) => {
        this.handleToggleSideBarMouseOver(event);
      })
    );

    this.$sideBar.addEventListener("mouseleave", (event) => {
      this.handleToggleSideBarMouseOut(event);
    });
  }

  handleFormClick(event) {
    const activeFormClicked = this.$activeForm.contains(event.target);
    const inActiveFormClicked = this.$inActiveForm.contains(event.target);
    const title = this.$noteTitle.value;
    const text = this.$inputNote.value;

    if (inActiveFormClicked) {
      this.$inActiveForm.style.display = "none";
      this.$activeForm.style.display = "flex";
      this.$inputNote.focus();
    } else if (!inActiveFormClicked && !activeFormClicked) {
      this.addNote({ title, text });
      this.$inActiveForm.style.display = "flex";
      this.$activeForm.style.display = "none";
      this.$inputNote.value = "";
      this.$noteTitle.value = "";
    }
  }

  addNote({ title, text }) {
    if (text != "") {
      //only creates notes when there is text in the text field
      const newNote = new Note(uniqueID(), title, text);
      this.notes = [...this.notes, newNote];
      this.displayNotes();
    }
  }

  editNote(id, { title, text }) {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        note.title = title;
        note.text = text;
      }
      return note;
    });
    this.displayNotes();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.displayNotes();
  }

  displayNotes() {
    this.$notes.innerHTML = this.notes.map((note) => createNoteHTML(note)).join("");
  }

  handleMouseOverNote(event) {
    const $checkNote = event.target.getElementsByClassName("check-circle");
    const $noteFooter = event.target.getElementsByClassName("create-note--footer");
    $checkNote[0].style.visibility = "visible";
    $noteFooter[0].style.visibility = "visible";
  }

  handleMouseOutOfNote(event) {
    const $checkNote = event.target.getElementsByClassName("check-circle");
    const $noteFooter = event.target.getElementsByClassName("create-note--footer");

    $checkNote[0].style.visibility = "hidden";
    $noteFooter[0].style.visibility = "hidden";
  }

  openModal(event) {
    const $selectedClosestNote = event.target.closest(".create-note");
    const $archiveBtn = event.target.closest(".archive");
    if ($selectedClosestNote && !$archiveBtn) {
      const arrSelectedNoteChildren = $selectedClosestNote.children;
      this.$modalNoteTitle.value = arrSelectedNoteChildren[1].innerHTML;
      this.$modalInputNote.value = arrSelectedNoteChildren[2].innerHTML;
      this.selectedNoteId = $selectedClosestNote.id;
      this.$notes.style.visibility = "hidden";
      this.$modal.classList.add("open-modal");
      this.$modalActiveForm.style.display = "flex";
    } else {
      return;
    }
  }

  closeModal(event) {
    const modalFormClicked = this.$modalForm.contains(event.target);
    const checkIfOpenedModal = this.$modal.classList.contains("open-modal");
    const modalClicked = this.$modal.contains(event.target);
    const closeBtnClicked = this.$modalCloseBtn.contains(event.target);
    if ((modalClicked && !modalFormClicked && checkIfOpenedModal) || closeBtnClicked) {
      this.$notes.style.visibility = "visible";
      this.$modal.classList.remove("open-modal");
      this.$modalActiveForm.style.display = "none";
      this.editNote(this.selectedNoteId, { title: this.$modalNoteTitle.value, text: this.$modalInputNote.value });
    }
  }

  handleArchive(event) {
    const $selectedClosestNote = event.target.closest(".create-note");
    const $archiveBtn = event.target.closest(".archive");
    const $modalActiveArchiveIcon = event.target.closest("#modal-active-archive-icon");
    if ($selectedClosestNote && $archiveBtn) {
      this.selectedNoteId = $selectedClosestNote.id;
      this.deleteNote(this.selectedNoteId);
    } else {
      return;
    }
  }

  handleToggleSideBarMouseOver(event) {
    if (event.target.closest(".material-symbols-outlined")) {
      this.$sideBar.style.width = "250px";
      this.$sideBar.classList.add("side-bar-hover");
      this.$sideBarActiveItem.classList.add("side-bar-active-item");
      this.$sideBarItemsMaterialsAll.forEach((sideBarItemsMaterial) => (sideBarItemsMaterial.style.padding = "0px"));
      this.$sideBarItemsAll.forEach((sideBarItem) => (sideBarItem.style.alignSelf = "auto"));
      this.$sideBarItemsAllText.forEach((textElement) => (textElement.style.display = "block"));
    } else {
      return;
    }
  }

  handleToggleSideBarMouseOut(event) {
    if (event.target.closest(".main-aside-wrapper") && event.target.closest(".side-bar")) {
      this.$sideBar.style.width = "content";
      this.$sideBar.classList.remove("side-bar-hover");
      this.$sideBarActiveItem.classList.remove("side-bar-active-item");
      this.$sideBarItemsMaterialsAll.forEach((sideBarItemsMaterial) => (sideBarItemsMaterial.style.padding = "10px"));
      this.$sideBarItemsAll.forEach((sideBarItem) => (sideBarItem.style.alignSelf = "flex-start"));
      this.$sideBarItemsAllText.forEach((textElement) => (textElement.style.display = "none"));
    }
  }

  handleToggleNoteFooter() {
    this.$notes.addEventListener("mouseenter", (event) => {
      this.$createNoteAll = document.querySelectorAll(".create-note");
      this.$createNoteAll.forEach((note) => {
        note.addEventListener("mouseover", (event) => this.handleMouseOverNote(event));
        note.addEventListener("mouseleave", (event) => this.handleMouseOutOfNote(event));
      });
    });
  }
}

const app = new App();
