import { pubsub } from "./pubsub.js";

export const songForm = {
  render: (container) => {
    let template = document.getElementById("songFormTemplate");
    let form = template.content.cloneNode(true);

    form
      .getElementById("submit-song-button")
      .addEventListener("click", songForm.add);

    container.appendChild(form);
  },

  add: (event) => {
    event.preventDefault();

    let input = document.querySelector('input[name="song-name"]');
    let songName = input.value.trim();

    if (input.value === "") return;
    console.log(songName);
    input.value = "";

    console.log(`SONG FORM: just add ${songName} to the playlist`);
    pubsub.publish("songAdded", {
      name: songName,
    });
  },
};
