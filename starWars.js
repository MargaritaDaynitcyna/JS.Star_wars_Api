const cssPromises = {};

function loadResourse(src) {
  // JS Module
  if (src.endsWith('.js')) {
    return import(src);
  }
  // CSS файл
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = "stylesheet";
      link.href = src;
      document.head.append(link);
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => {
          resolve();
        })
      });
    }
    return cssPromises[src];
  }
  // Данные сервера
  return fetch(src).then(res => res.json())
}

const appContainer = document.getElementById('app');
// const searchParam = new URLSearchParams(location.search);
// const filmId = searchParam.get('filmId');

function renderPage(moduleJS, apiUrl, css) {
  Promise.all([moduleJS, apiUrl, css].map(src => loadResourse(src)))
    .then(([pageModule, data]) => {

      appContainer.innerHTML = '';

      if (data.planets && data.species) {
        async function getListNames(listType) {
          let arrayTitle = await Promise.all(listType.map((src) => loadResourse(src)));
          arrayTitle = arrayTitle.map(item => item.name);
          return arrayTitle;
        }
        Promise.all([
            getListNames(data.planets),
            getListNames(data.species),
          ])
          .then(datalist => {
            console.log(datalist)
            appContainer.append(pageModule.render(data, datalist[0], datalist[1]));
            onclick(document.querySelector('#button-back'), 'starWars.html', page1)
          })
      } else {
        //Для ожидания картинки
        let promise =
          new Promise(resolve => {
            const img = new Image();
            img.src = 'https://cdn.worldvectorlogo.com/logos/starwars.svg';
            img.addEventListener('load', () => {
              resolve(img)
            });
          });

        async function loadImage() {
          const img = await promise;
          appContainer.append(pageModule.render(data, img));

          let link = document.querySelectorAll('a');
          link.forEach(i=>{
            onclick(i, i.getAttribute('href'), page2)
          })
          // onclick(link[0], '?filmId=1', page2)
          // onclick(link[1], '?filmId=2', page2)
          // onclick(link[2], '?filmId=3', page2)
          // onclick(link[3], '?filmId=4', page2)
          // onclick(link[4], '?filmId=5', page2)
          // onclick(link[5], '?filmId=6', page2)
        }
        loadImage()

        // appContainer.append(pageModule.render(data));
        // onclick(document.querySelector('ol'), `?filmId=${filmId}`, page2)

        // let arrayOfId = data.results.map(res => res.episode_id);
        // console.log(arrayOfId);

        // appContainer.append(pageModule.render(data));
        // let filmId=arrayOfId[4-1];
        // onclick(document.querySelector('ol'), `?filmId=${filmId}`, page2)

        //   let arrayOfFilms = [];
        //   for (const film of data.results) {
        //     arrayOfFilms.push(film.episode_id);
        //     console.log(arrayOfFilms)
      }
    })
}

// if (filmId) {
//   page2()
// } else {
page1();
// }

function page2() {
  let filmId = new URLSearchParams(location.search).get('filmId');
  console.log(filmId)
  renderPage(
    './details.js',
    `https://swapi.dev/api/films/${filmId}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css')
}

function page1() {
  renderPage(
    './main.js',
    'https://swapi.dev/api/films',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css')
}

function onclick(element, url, page) {
  element.addEventListener('click', event => {
    event.preventDefault();
    history.pushState(null, '', url);
    window.addEventListener('popstate', page());
  })
}
