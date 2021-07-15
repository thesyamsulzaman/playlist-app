import { pubsub } from "./pubsub.js";
import { playlist as playlistView } from "./playlist.js";

export const playlists = {
  list: [],

  render: (container) => {
    let template = document.getElementById("playlistsTemplate");
    let counterTemplate = document.getElementById("playlistCounterTemplate");
    let div = template.content.cloneNode(true);

    container.appendChild(div);

    let playlistCards = document.querySelector(".playlists-container");
    playlistCards.addEventListener("click", playlists.remove);

    // Register PubSub Events
    console.log(`PLAYLISTS: want to know if a Playlist is added`);
    pubsub.subscribe("playlistAdded", playlists.playlistAdded);
  },

  remove: (event) => {
    if (event.target.id === "remove-playlist-button") {
      const playListCard = event.target.parentNode.parentNode;
      const playlistName = playListCard.querySelector(".card-header-title")
        .textContent;

      playlists.list = playlists.list.filter(
        (playlist) => playlist.name !== playlistName
      );

      pubsub.publish("playlistDeleted", playlists.list);
      playListCard.remove();
    }
  },

  playlistAdded: ({ name, songs }) => {
    console.log(`PLAYLISTS: i hear that playlist ${name} was added`);

    const list = new Set(playlists.list);
    list.add({ name, songs });
    playlists.list = Array.from(list);

    const playlistContainer = document.querySelector(".playlists-container");
    playlistContainer.innerHTML = "";

    playlists.list.forEach((playlist) => {
      playlistContainer.appendChild(playlistView.render(playlist));
    });
  },
};
