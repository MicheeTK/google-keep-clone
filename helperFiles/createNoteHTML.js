export function createNoteHTML(note) {
  return `
            <div class="create-note">
            <span class="material-icons check-circle"> check_circle </span>
            <div class="create-note--title">${note.title}</div>
            <div class="create-note--text">${note.text}</div>

            <div class="create-note--footer">
              <div class="tooltip">
                <i class="material-icons hover">add_alert</i>
                <span class="tooltip-text">Remind me</span>
              </div>
              <div class="tooltip">
                <i class="material-icons hover">person_add</i>
                <span class="tooltip-text">Collaborator</span>
              </div>
              <div class="tooltip">
                <i class="material-icons hover">palette</i>
                <span class="tooltip-text">Background options</span>
              </div>

              <div class="tooltip">
                <i class="material-icons hover">image</i>
                <span class="tooltip-text">Add Image</span>
              </div>
              <div class="tooltip">
                <i class="material-icons hover">archive</i>
                <span class="tooltip-text">Archive</span>
              </div>
              <div class="tooltip">
                <i class="material-icons hover">more_vert</i>
                <span class="tooltip-text">More</span>
              </div>
            </div>
          </div>
    `;
}
