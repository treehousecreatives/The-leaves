const photoViewer = document.getElementById("photo-viewer");
const viewerImage = photoViewer.querySelector("img");
let photoTrigger;

document.querySelectorAll("#photography .work-grid a").forEach(link => {
  link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    photoTrigger = link;
    viewerImage.src = link.href;
    viewerImage.alt = link.querySelector("img").alt;
    photoViewer.showModal();
  });
});

photoViewer.querySelector("button").addEventListener("click", () => photoViewer.close());
photoViewer.addEventListener("click", event => {
  if (event.target === photoViewer) photoViewer.close();
});
photoViewer.addEventListener("close", () => {
  viewerImage.removeAttribute("src");
  photoTrigger?.focus();
});
