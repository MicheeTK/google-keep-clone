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
    this.notes = []; //[new Note("2568", "generic title", "generic text")];
    this.$activeForm = document.querySelector(".active-form");
    this.$inActiveForm = document.querySelector(".inactive-form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$inputNote = document.querySelector("#input-note");
    this.$notes = document.querySelector(".notes");
    this.$formContainerActions = document.querySelector("#form-container-actions");
    this.$modalFormActions = document.querySelector("#modal-form-actions");

    this.addEventListeners();
    this.displayNotes();
  }

  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
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

    this.$modalFormActions.addEventListener("submit", (event) => event.preventDefault());
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
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  displayNotes() {
    this.$notes.innerHTML = this.notes.map((note) => createNoteHTML(note)).join("");
  }

  handleMouseOverNote(event) {
    const $note = document.getElementById(`${event.target.id}`);
    const $checkNote = $note.getElementsByClassName("check-circle");
    const $noteFooter = $note.getElementsByClassName("create-note--footer");
    $checkNote[0].style.visibility = "visible";
    $noteFooter[0].style.visibility = "visible";
  }

  handleMouseOutOfNote(event) {
    const $note = document.getElementById(`${event.target.id}`);
    const $checkNote = $note.getElementsByClassName("check-circle");
    const $noteFooter = $note.getElementsByClassName("create-note--footer");
    $checkNote[0].style.visibility = "hidden";
    $noteFooter[0].style.visibility = "hidden";
  }
}

const app = new App();
