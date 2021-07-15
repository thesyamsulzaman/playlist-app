import { pubsub } from "./pubsub.js";

export const playlistForm = {
  render: (container) => {
    let template = document.getElementById("playlistFormTemplate");
    let form = template.content.cloneNode(true);

    form
      .getElementById("submit-playlist-button")
      .addEventListener("click", playlistForm.add);

    container.appendChild(form);
  },

  add: (event) => {
    event.preventDefault();

    let input = document.querySelector('input[name="playlist-name"]');
    let name = input.value.trim();

    if (input.value === "") return;
    input.value = "";

    //tell people an actor was added
    console.log(`PLAYLIST FORM: just add ${name} playlist`);
    pubsub.publish("playlistAdded", {
      name: name,
      songs: [],
    });
  },
};
