export function render(data, planet, species) {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const description = document.createElement('p');
  const characteristics = document.createElement('div');
  const planetsContent = document.createElement('div');
  const titlePlanet = document.createElement('h2');
  const textPlanets = document.createElement('p');
  const speciesContent = document.createElement('div');
  const titleSpecies = document.createElement('h2');
  const textSpecies = document.createElement('p');
  const button = document.createElement('div');
  const buttonBack = document.createElement('a');

  title.textContent = `id: ${data.episode_id}. ${data.title}`;
  // buttonBack.href = "starWars.html";
  buttonBack.textContent = "Back to episodes";
  buttonBack.id = "button-back";
  description.textContent = `${data.opening_crawl}`;
  titlePlanet.textContent = "Planets";
  titleSpecies.textContent = "Species";

  container.classList.add('container', 'py-4', 'bg-warning', 'bg-opacity-50');
  title.classList.add('text-center', 'text-uppercase');
  description.classList.add('lead', 'text-center', 'py-4');
  characteristics.classList.add('d-flex', 'justify-content-around');
  button.classList.add('d-grid', 'col-4', 'mx-auto', 'py-4')
  buttonBack.classList.add('btn', 'btn-dark');

  container.append(title);
  container.append(description);
  container.append(characteristics);
  characteristics.append(planetsContent);
  characteristics.append(speciesContent);
  planetsContent.append(titlePlanet);
  planetsContent.append(textPlanets);
  speciesContent.append(titleSpecies);
  speciesContent.append(textSpecies);
  button.append(buttonBack);
  container.append(button);

  createItem(textPlanets, planet)
  createItem(textSpecies, species)

  function createItem(place, array) {
    let ul = document.createElement('ul');
    place.append(ul);
    array.forEach(i => {
      let li = document.createElement('li');
      li.textContent = i;
      ul.append(li);
    })
  }

  return container;
}
