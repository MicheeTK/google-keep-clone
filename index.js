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
    this.idCount = -1;
    this.newID = 7856;
    this.idArray = [];
  }

  addNote({ title, text }) {
    this.idCount += 1;
    this.newID += 1;
    this.idArray.push(this.newID);
    const id = this.idArray[this.idCount];
    const newNote = new Note(id, title, text);
    this.notes = [...this.notes, newNote];
  }

  editNote(id, { title, text }) {
    this.notes.map((note) => {
      if (note.id === id) {
        note.title = title;
        note.text = text;
        console.log("Note succesfully updated");
      }
    });
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}

const note1 = {
  title: "user title",
  text: "user string of texts",
};

const note1chg = {
  title: "user title updated",
  text: "user1 strings of text",
};

const listOfNotes = [
  (groceries = {
    title: "Groceries",
    text: "Grocery list",
  }),
  (projectNotes = {
    title: "Project Notes",
    text: "Take Project Notes",
  }),
  (equipments = {
    title: "Equipments",
    text: "Write list of equipments",
  }),
];

// calling the app
const app = new App();
listOfNotes.map((note) => app.addNote(note));

app.editNote(2, note1chg);

app.deleteNote(7859);
console.log(app.notes);
