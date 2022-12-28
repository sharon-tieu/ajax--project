const $homeNavBar = document.querySelector('.home-nav-bar');
const $searchNavBar = document.querySelector('.search-nav-bar');
const $likesNavBar = document.querySelector('.likes-nav-bar');
const $homeView = document.querySelector('.home-page-view');
const $searchView = document.querySelector('.search-page-view');
const $likesView = document.querySelector('.likes-page-view');
const $pageTitle = document.querySelector('.page-title');
const $imgChick = document.querySelector('.img-chick');

const viewSwap = view => {
  if (data.view === 'home-view') {
    data.view = 'home-view';
    $homeView.className = 'row home-view';
    $searchView.className = 'hidden';
    $likesView.className = 'hidden';
  } else if (data.view === 'search-view') {
    data.view = 'search-view';
    $homeView.className = 'hidden';
    $searchView.className = 'row search-view';
    $likesView.className = 'hidden';
  } else {
    data.view = 'likes-view';
    $homeView.className = 'hidden';
    $searchView.className = 'hidden';
    $likesView.className = 'row likes-page-view flex-wrap-wrap';
  }
};

$searchNavBar.addEventListener('click', () => {
  data.view = 'search-view';
  $getGhibli.reset();
  $ulElements.textContent = '';
  $ulMovieTitle.textContent = '';
  viewSwap();
});

$pageTitle.addEventListener('click', () => {
  data.view = 'home-view';
  viewSwap();
});

$homeNavBar.addEventListener('click', () => {
  data.view = 'home-view';
  viewSwap();
});

$likesNavBar.addEventListener('click', () => {
  data.view = 'likes-view';
  viewSwap();
});

$imgChick.addEventListener('click', () => {
  data.view = 'search-view';
  viewSwap();
});

window.addEventListener('DOMContentLoaded', event => {
  if (data.likes.length > 0) {
    for (var i = 0; i < data.likes.length; i++) {
      showLikeEntry(data.likes[i]);
    }
  } else {
    noLikesView();
  }
  viewSwap();
});

const $getGhibli = document.querySelector('.get-ghibli');
const $cardLabel = document.querySelector('#card-label-result');
const $ulMovieTitle = document.querySelector('#movie-title');
const $ulElements = document.querySelector('ul');
const $loadingSpinner = document.querySelector('.lds-spinner');
const $loadingMessage = document.querySelector('.loading-message');

const displayLoading = () => {
  $loadingSpinner.classList.remove('hidden');
  $loadingMessage.classList.remove('hidden');
  setTimeout(() => {
    $loadingSpinner.classList.add('hidden');
    $loadingMessage.classList.add('hidden');
  }, 300);
};

const getGhibliCharacter = name => {
  displayLoading();

  const $ulTitle = document.createElement('p');
  const $liAge = document.createElement('li');
  const $liGender = document.createElement('li');
  const $liEyeColor = document.createElement('li');
  const $liHairColor = document.createElement('li');

  const targetUrl = encodeURIComponent('https://ghibli-api.sharonproject.com/people/');

  const xhr = new XMLHttpRequest();

  xhr.open(
    'GET',
    'https://lfz-cors.herokuapp.com/?url=' + targetUrl
  );

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    const character = xhr.response.find(el => {
      return el.name.toLowerCase() === name.toLowerCase();
    });

    for (let i = 0; i < xhr.response.length; i++) {
      const charName = {};
      charName.name = xhr.response[i].name;
    }

    if (character === undefined) {
      const $parentDiv = document.createElement('div');
      $parentDiv.setAttribute('id', 'error-message');
      $parentDiv.setAttribute('class', 'row jc-center');
      $cardLabel.appendChild($parentDiv);
      $parentDiv.textContent = `Sorry. Studio Ghibli API left out some data. Could not find "${name}" in the server. Please try again.`;
    }

    const $parentDiv = document.createElement('div');
    $parentDiv.setAttribute('id', 'search-result-title');
    $parentDiv.setAttribute('class', 'row align-items-center jc-flex-end');
    $cardLabel.appendChild($parentDiv);

    const $colDiv = document.createElement('div');
    $colDiv.setAttribute('class', 'column-half');
    $parentDiv.appendChild($colDiv);

    $ulTitle.textContent = character.name;
    $ulTitle.setAttribute('class', 'font-comfortaa search-item text-align-center');
    $colDiv.appendChild($ulTitle);

    const $colThird = document.createElement('div');
    $colThird.setAttribute('class', 'column-one-third');
    $parentDiv.appendChild($colThird);

    let $heart = document.createElement('i');
    $heart.setAttribute('class', 'fa-regular fa-heart');
    $colThird.appendChild($heart);

    let $unHeart = document.createElement('i');
    $unHeart.setAttribute('class', 'fa-solid fa-heart pink-heart hidden');
    $colThird.appendChild($unHeart);

    $heart = document.querySelector('.fa-regular');
    $heart.addEventListener('click', () => {
      $heart.classList.add('hidden');
      $unHeart.classList.remove('hidden');
      userLikes();
    });

    $unHeart = document.querySelector('.fa-solid');
    $unHeart.addEventListener('click', () => {
      $heart.classList.remove('hidden');
      $unHeart.classList.add('hidden');
    });

    const userLikes = () => {
      const dataLikes = data.likes;
      if ($heart) {
        dataLikes.push(character);
      }
    };

    $liAge.textContent = 'Age: ' + character.age;
    $liAge.setAttribute('class', 'font-comfortaa search-item text-align-left');
    $cardLabel.appendChild($liAge);

    $liGender.textContent = 'Gender: ' + character.gender;
    $liGender.setAttribute('class', 'font-comfortaa search-item text-align-left');
    $cardLabel.appendChild($liGender);

    $liEyeColor.textContent = 'Eye Color: ' + character.eye_color;
    $liEyeColor.setAttribute('class', 'font-comfortaa search-item text-align-left');
    $cardLabel.appendChild($liEyeColor);

    $liHairColor.textContent = 'Hair Color: ' + character.hair_color;
    $liHairColor.setAttribute('class', 'font-comfortaa search-item text-align-left');
    $cardLabel.appendChild($liHairColor);

    const targetFilm = encodeURIComponent(character.films[0]);
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetFilm);
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', () => {
      const $image = document.createElement('img');
      $image.setAttribute('src', xhr2.response.image);
      $image.setAttribute('class', 'movie-title-image search-item');
      $ulMovieTitle.appendChild($image);
    });
    xhr2.send();
    $ulMovieTitle.textContent = '';

    const xhr3 = new XMLHttpRequest();
    const targetSpecies = encodeURIComponent(character.species);
    xhr3.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetSpecies);
    xhr3.responseType = 'json';
    xhr3.addEventListener('load', () => {
      const $liSpecies = document.createElement('li');
      $liSpecies.textContent = 'Species: ' + xhr3.response.name;
      $liSpecies.setAttribute('class', 'font-comfortaa search-item text-align-left');
      $cardLabel.appendChild($liSpecies);
    });
    xhr3.send();
  });
  xhr.send();
  $getGhibli.reset();
  $ulElements.textContent = '';
};

const $searchButton = document.querySelector('.search-btn');
const $searchInfo = document.querySelector('.search-info');
$searchButton.addEventListener('click', event => {
  event.preventDefault();
  getGhibliCharacter($searchInfo.value);
  const movieTitlePhoto = document.querySelector('.movie-title-image');
  movieTitlePhoto.remove();
});

const $noLikesView = document.querySelector('.no-likes-view');
const $likesListResults = document.querySelector('.likes-list-results');
const noLikesView = () => {
  if (data.likes.length === 0) {
    $noLikesView.className = 'no-likes-view column-full margin-top-5 text-align-c padding-top-20';
    $likesListResults.className = 'hidden';
  } else {
    $noLikesView.className = 'hidden';
    $likesListResults.className = 'likes-list-results column-full margin-top-5 display-flex';
  }
};

const $viewLikesList = document.querySelector('.view-likes-list');

const showLikeEntry = likesEntry => {

  const $divParentLayout = document.createElement('div');
  $divParentLayout.setAttribute('class', 'display-flex jc-center align-items-center padding-top-10 padding-bottom-10');
  $viewLikesList.appendChild($divParentLayout);

  const $cardBox = document.createElement('div');
  $cardBox.setAttribute('class', 'card-likes-box');
  $divParentLayout.appendChild($cardBox);

  const $contentParentDiv = document.createElement('div');
  $contentParentDiv.setAttribute('class', 'text-align-c padding-top-10 display-flex align-items-center');
  $cardBox.appendChild($contentParentDiv);

  const $pName = document.createElement('p');
  $pName.setAttribute('class', 'likes-data font-comfortaa column-half jc-flex-end text-align-right');
  $pName.textContent = likesEntry.name;
  $contentParentDiv.appendChild($pName);

  const $heart = document.createElement('i');
  $heart.setAttribute('class', 'fa-solid fa-heart column-half pink-heart');
  $heart.setAttribute('id', likesEntry.id);
  $contentParentDiv.appendChild($heart);

  $heart.addEventListener('click', () => {
    const $modalContainer = document.querySelector('.modal-container');
    $modalContainer.classList.remove('hidden');

    const $cancelButton = document.querySelector('.modal-cancel');
    $cancelButton.addEventListener('click', () => {
      $modalContainer.classList.add('hidden');
    });

    const $removeButton = document.querySelector('.modal-remove');

    $removeButton.addEventListener('click', () => {
      $modalContainer.classList.add('hidden');
      for (var i = 0; i < data.likes.length; i++) {
        if ($heart.id === data.likes[i].id) {
          data.likes.splice(i, 1);
          var $allCardBox = document.querySelectorAll('.column-one-third');
          for (var k = 0; k < $allCardBox.length; k++) {
            $allCardBox[i].remove();
          }
        }
      }
      window.location.reload();
    });
  });

  const $ulData = document.createElement('ul');
  $ulData.setAttribute('class', 'text-align-left padding-top-10');
  $cardBox.appendChild($ulData);

  const $liAge = document.createElement('li');
  $liAge.setAttribute('class', 'font-comfortaa likes-details');
  $liAge.textContent = 'Age: ' + likesEntry.age;
  $ulData.appendChild($liAge);

  const $liGender = document.createElement('li');
  $liGender.textContent = 'Gender: ' + likesEntry.gender;
  $liGender.setAttribute('class', 'font-comfortaa likes-details');
  $ulData.appendChild($liGender);

  const $liEyeColor = document.createElement('li');
  $liEyeColor.textContent = 'Eye Color: ' + likesEntry.eye_color;
  $liEyeColor.setAttribute('class', 'font-comfortaa likes-details');
  $ulData.appendChild($liEyeColor);

  const $liHairColor = document.createElement('li');
  $liHairColor.textContent = 'Hair Color: ' + likesEntry.hair_color;
  $liHairColor.setAttribute('class', 'font-comfortaa likes-details');
  $ulData.appendChild($liHairColor);

  const likesSpecies = new XMLHttpRequest();
  likesSpecies.open('GET', likesEntry.species);
  likesSpecies.responseType = 'json';
  likesSpecies.addEventListener('load', function () {
    const $liSpecies = document.createElement('li');
    $liSpecies.textContent = 'Species: ' + likesSpecies.response.name;
    $liSpecies.setAttribute('class', 'font-comfortaa likes-details');
    $ulData.appendChild($liSpecies);
  });

  likesSpecies.send();
};
