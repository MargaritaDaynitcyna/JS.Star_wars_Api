export function render(data, img) {

  const container = document.createElement('div');
  const header = document.createElement('div');
  const main = document.createElement('div');
  // const logo = document.createElement('img');
  const logo = img;
  const list = document.createElement('ol');

  container.style.backgroundColor = "black";
  // logo.src = "https://cdn.worldvectorlogo.com/logos/starwars.svg"
  logo.alt = "Star Wars";
  logo.style.width = "400px";
  list.style.display = "inline-block";

  container.append(header);
  container.append(main);
  header.append(logo);
  main.append(list);

  container.classList.add('container', 'py-4', 'text-center', 'text-warning');
  list.classList.add('fs-3', 'text-uppercase');

  for (const film of data.results) {
    const item = document.createElement('li');
    const moreDetails = document.createElement('a');
    moreDetails.textContent = film.title;
    moreDetails.style.textDecoration = "none";
    moreDetails.style.cursor = "pointer";
    item.classList.add('py-3');
    moreDetails.classList.add('text-warning');
    moreDetails.setAttribute('href', '?filmId='+film.episode_id)
    item.append(moreDetails);
    list.append(item);
  }

  return container;
}
