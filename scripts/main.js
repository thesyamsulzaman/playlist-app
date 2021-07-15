import { playlists } from "./playlists.js";
import { playlistForm } from "./playlist-form.js";

document.addEventListener("DOMContentLoaded", () => {
  let main = document.querySelector("main");

  playlistForm.render(main);
  playlists.render(main);
});
