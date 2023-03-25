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

    if (isinActiveFormClicked) {
      this.$inActiveForm.style.display = "none";
      this.$activeForm.style.display = "flex";
      this.$inputNote.focus();
    } else if (!isinActiveFormClicked && !isActiveFormClicked) {
      this.$inActiveForm.style.display = "flex";
      this.$activeForm.style.display = "none";
    }
  }

  addNote(id, { title, text }) {
    const newNote = new Note(id, title, text);
    this.notes = [...this.notes, newNote];
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
    this.notes.map((note) =>
      console.log(`
  ID: ${note.id}
  Title: ${note.title}
  Text: ${note.text}
  `)
    );
  }
}

const app = new App();
