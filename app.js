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

    this.addEventListeners();
    this.displayNotes();
  }

  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
      this.openModal(event);
      this.closeModal(event);
      this.handleArchiving(event);
      console.log("event clicked", event.target);
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
    this.$notes.addEventListener("mouseover", (event) => this.handleMouseOverNote(event));
    this.$notes.addEventListener("mouseout", (event) => this.handleMouseOutOfNote(event));
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
    const $note = document.getElementById(`${event.target.id}`);
    if ($note) {
      const $checkNote = $note.getElementsByClassName("check-circle");
      const $noteFooter = $note.getElementsByClassName("create-note--footer");
      $checkNote[0].style.visibility = "visible";
      $noteFooter[0].style.visibility = "visible";
      this.$notes.addEventListener("mouseout", this.handleMouseOutOfNote);
    }
  }

  handleMouseOutOfNote(event) {
    const $note = document.getElementById(`${event.target.id}`);
    if ($note) {
      const $checkNote = $note.getElementsByClassName("check-circle");
      const $noteFooter = $note.getElementsByClassName("create-note--footer");
      $checkNote[0].style.visibility = "hidden";
      $noteFooter[0].style.visibility = "hidden";
      this.$notes.addEventListener("mouseover", this.handleMouseOverNote);
    }
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

  handleArchiving(event) {
    const $selectedClosestNote = event.target.closest(".create-note");
    const $archiveBtn = event.target.closest(".archive");
    console.log("archive >>", $archiveBtn);
    if ($selectedClosestNote && $archiveBtn) {
      console.log("archive worked");
      this.selectedNoteId = $selectedClosestNote.id;
      this.deleteNote(this.selectedNoteId);
    } else {
      return;
    }
  }
}

const app = new App();
