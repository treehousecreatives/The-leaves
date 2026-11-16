// Put your MP3 files in assets/music, then add an entry for each track.
// { title: "Track title", artist: "Artist name", file: "track-title.mp3", credit: "Mixed by Tree" }
const tracks = [];

const musicList = document.querySelector(".music-tracks");
for (const track of tracks) {
  const card = document.createElement("article");
  const title = document.createElement("h3");
  const details = document.createElement("p");
  const player = document.createElement("audio");

  title.textContent = track.title;
  details.textContent = [track.artist, track.credit].filter(Boolean).join(" · ");
  player.controls = true;
  player.preload = "none";
  player.src = "assets/music/" + encodeURIComponent(track.file);
  player.setAttribute("aria-label", track.title);
  player.textContent = "Your browser does not support audio playback.";

  card.append(title, details, player);
  musicList.append(card);
  player.addEventListener("play", () => {
    for (const other of musicList.querySelectorAll("audio")) {
      if (other !== player) other.pause();
    }
  });
}

document.querySelector(".music-empty").hidden = tracks.length > 0;
