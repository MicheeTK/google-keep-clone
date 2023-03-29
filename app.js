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
    this.$activeForm = document.querySelector(".active-form");
    this.$inActiveForm = document.querySelector(".inactive-form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$inputNote = document.querySelector("#input-note");
    this.$notes = document.querySelector(".notes");
    this.$formAction = document.querySelector("#form-action");

    this.addEventListeners();
    this.displayNotes();
  }

  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
    });

    this.$formAction.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$inputNote.value;
      this.addNote({ title, text });
      this.$inActiveForm.style.display = "flex";
      this.$activeForm.style.display = "none";
      this.$inputNote.value = "";
      this.$noteTitle.value = "";
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
      //only creates notes when the text field is not empty
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
}

const app = new App();
