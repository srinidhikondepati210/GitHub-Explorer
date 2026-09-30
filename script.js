const API = "https://commons.wikimedia.org/w/api.php";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const statusLine = document.getElementById("status");
const profile = document.getElementById("profile");
const repositories = document.getElementById("repositories");
const repoHeading = document.getElementById("repo-heading");


// Fetch images from Wikimedia Commons
async function searchImages(query) {
  const encodedQuery = encodeURIComponent(query);

  const url =
    `${API}?action=query` +
    `&generator=search` +
    `&gsrsearch=${encodedQuery}` +
    `&gsrnamespace=6` +
    `&gsrlimit=20` +
    `&prop=imageinfo` +
    `&iiprop=url` +
    `&iiurlwidth=400` +
    `&format=json` +
    `&origin=*`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
}


// Create one image card
function makeImageCard(page) {
  const card = document.createElement("article");
  card.className = "repo-card";

  const image = document.createElement("img");
  image.className = "result-image";

  image.src = page.imageinfo[0].thumburl;

  image.alt = page.title.replace("File:", "");

  const title = document.createElement("h3");
  title.className = "repo-name";

  title.textContent = page.title.replace("File:", "");

  const link = document.createElement("a");

  link.href = `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "View image";

  card.append(image, title, link);

  return card;
}


// Display image results