import { songForm } from "./song-form.js";
import { pubsub } from "./pubsub.js";

const createSongTemplate = ({ name }) => `
  <li class="mb-2 is-flex is-align-items-center is-justify-content-space-between">
    <p class="song-name">${name}</p>
    <button id="remove-song-button" class="button is-small is-light">
      Remove
    </button>
  </li>
`;

export const playlist = {
  songs: [],
  render: ({ name, songs }) => {
    playlist.songs = songs;

    const template = document.getElementById("playlistTemplate");
    let playListCard = template.content.cloneNode(true);
    playListCard.querySelector(".card-header-title").innerText = name;

    const addSongFormContainer = playListCard.querySelector(
      ".add-song-form-container"
    );

    songForm.render(addSongFormContainer);

    const songsList = playListCard.querySelector(".menu-list");
    songsList.addEventListener("click", playlist.remove);

    pubsub.subscribe("songAdded", playlist.songAdded);

    return playListCard;
  },

  remove: () => {
    if (event.target.id === "remove-song-button") {
      const songElement = event.target.parentNode;
      const songName = songElement.querySelector(".song-name").textContent;

      playlist.songs = playlist.songs.filter((song) => {
        song.name !== songName;
      });

      pubsub.publish("songDeleted", playlist.songs);
      songElement.remove();
    }
  },

  songAdded: (song) => {
    console.log(`PLAYLISTS: i hear that ${name} song was added`);

    const list = new Set(playlist.songs);
    list.add(song);
    playlist.songs = Array.from(list);

    const songsList = document.querySelector(".menu-list");
    songsList.innerHTML = "";
    playlist.songs.forEach((song) => {
      songsList.innerHTML += createSongTemplate(song);
    });
  },
};
