import '../styles/main.scss';
import lo from 'lodash';

const getSearchTerm = (e) => {
  if (e.target.value.length >= 2) fetchAlbums(e.target.value);
};

const searchInput = document.querySelector('#searchInput');
searchInput.addEventListener('keyup', lo.debounce(getSearchTerm, 500));

const fetchAlbums = async (term) => {
  console.log(`I am gonna fetch all the albums of ${term}`);
  let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${term}&api_key=341d440c6e3852d0a35fc8ce1678768d&format=json`;

  // fetch(url)
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     console.log('I got some data');
  //     //DO THE REST OF STUFF HERE
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log('I got some data');
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });

  try {
    let response = await fetch(url);
    let data = await response.json();
    appendAlbums(data.results.albummatches.album);
  } catch (error) {
    console.log(error);
  }
};

const appendAlbums = (albums) => {
  // console.log(albums);
  // // arr.filter; //  when i want to pick elements based on a filter
  // const rhcpAlbums = albums.filter((steve) => {
  //   return steve.artist == 'Red Hot Chili Peppers';
  // });
  // console.log('RHCP ALBUMS', rhcpAlbums);
  // // arr.map; //  when i want to edit all the elements of the array
  // const streamables = albums.map((el) => {
  //   el.name = el.name.toUpperCase();
  //   el.streamable = `I'M STREAMABLE FREAKS`;
  //   return el;
  // });
  // console.log('EDITED ALBUMS', streamables);
  // // arr.forEach; //  just like a for loop
  // // arr.sort; //  sorts the original array (no new one returned)
  // albums.sort((a, b) => {
  //   if (a.name > b.name) return 1;
  //   else return -1;
  // });
  // console.log(albums);
  // let allName = albums.reduce((acc, el) => {
  //   return acc + el.artist + '-';
  // }, 'ALLNAMES: ');
  // console.log(allName);
  // arr.reduce;
  let albumsContainer = document.querySelector('#albums-container');
  albumsContainer.innerHTML = '';

  albums.forEach((el) => {
    let albumContainer = document.createElement('div');
    albumContainer.className = 'album';

    let albumImage = document.createElement('img');
    // el.image
    // el[image]
    albumImage.src = el.image[3]['#text'];

    let infoContainer = document.createElement('div');
    infoContainer.className = 'info';

    let title = document.createElement('p');
    title.className = 'title';
    title.innerHTML = el.name;

    let artist = document.createElement('p');
    artist.className = 'artist';
    artist.innerHTML = el.artist;

    albumContainer.append(albumImage);
    infoContainer.append(title);
    infoContainer.append(artist);
    albumContainer.append(infoContainer);

    albumsContainer.append(albumContainer);
  });
};
