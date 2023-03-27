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

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
    });
  }

  handleFormClick(event) {
    const isActiveFormClicked = this.$activeForm.contains(event.target);
    const isinActiveFormClicked = this.$inActiveForm.contains(event.target);
    const title = this.$noteTitle.value;
    const text = this.$inputNote.value;

    if (isinActiveFormClicked) {
      this.$inActiveForm.style.display = "none";
      this.$activeForm.style.display = "flex";
      this.$inputNote.focus();
    } else if (!isinActiveFormClicked && !isActiveFormClicked) {
      this.addNote({ title, text });
      this.$inActiveForm.style.display = "flex";
      this.$activeForm.style.display = "none";
      this.$inputNote.value = "";
      this.$noteTitle = "";
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
    this.$notes.innerHTML = this.notes.map((note) => createNoteHTML(note));
  }
}

const app = new App();
