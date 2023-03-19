class Note {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
}

class App {
  constructor() {
    this.notes = [];
  }

  addNote({ title, text }) {
    const newNote = new Note(title, text);
    this.notes = [...this.notes, newNote];
  }
}

const note1 = {
  title: "user title",
  text: "user string of texts",
};

// calling the app
const app = new App();
app.addNote(note1);

console.log(app.notes);
