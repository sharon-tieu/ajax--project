const $homeNavBar = document.querySelector('.home-nav-bar');
const $searchNavBar = document.querySelector('.search-nav-bar');
const $likesNavBar = document.querySelector('.likes-nav-bar');
const $homeView = document.querySelector('.home-page-view');
const $searchView = document.querySelector('.search-page-view');
const $likesView = document.querySelector('.likes-page-view');
const $pageTitle = document.querySelector('.page-title');
const $imgChick = document.querySelector('.img-chick');

// ====== VIEW SWAPPING ====== //
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
  // if (data.likes.length > 0) {
  //   viewLikesList();
  // } else {
  //   noLikesView();
  // }
  viewSwap();
});

$imgChick.addEventListener('click', () => {
  data.view = 'search-view';
  viewSwap();
});

window.addEventListener('DOMContentLoaded', function (event) {
  // var $viewLikes = document.querySelector('.view-likes-list');
  if (data.likes.length > 0) {
    for (var i = 0; i < data.likes.length; i++) {
      showLikeEntry(data.likes[i]);
      // $viewLikes.append(showLikes);
    }
  } else {
    noLikesView();
  }
  viewSwap();
});

// ====== HTTP REQUEST FUNCTION ====== //
const $getGhibli = document.querySelector('.get-ghibli');
const $cardLabel = document.querySelector('#card-label-result');
const $ulMovieTitle = document.querySelector('#movie-title');
const $ulElements = document.querySelector('ul');

const getGhibliCharacter = name => {

  const $ulTitle = document.createElement('p');
  const $liAge = document.createElement('li');
  const $liGender = document.createElement('li');
  const $liEyeColor = document.createElement('li');
  const $liHairColor = document.createElement('li');

  // $ulTitle.setAttribsucute('id', name);

  const targetUrl = encodeURIComponent('https://ghibli-api.sharonproject.com/people/');
  var xhr = new XMLHttpRequest();
  // xhr.open('GET', 'https://ghibliapi.herokuapp.com/people/');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('xhr status:', xhr.status);
    // console.log('xhr response:', xhr.response);

    var character = xhr.response.find(function (el) {
      return el.name === name;
    });
    // console.log('character object:', character);

    var $parentDiv = document.createElement('div');
    $parentDiv.setAttribute('class', 'row align-items-center jc-flex-end');
    $cardLabel.appendChild($parentDiv);

    var $colDiv = document.createElement('div');
    $colDiv.setAttribute('class', 'column-half');
    $parentDiv.appendChild($colDiv);

    // var $ulTitle = document.createElement('ul');
    $ulTitle.textContent = character.name;
    $ulTitle.setAttribute('class', 'font-comfortaa search-item text-align-center');
    $colDiv.appendChild($ulTitle);

    var $colThird = document.createElement('div');
    $colThird.setAttribute('class', 'column-one-third');
    $parentDiv.appendChild($colThird);

    var $heart = document.createElement('i');
    $heart.setAttribute('class', 'fa-regular fa-heart');
    $colThird.appendChild($heart);

    var $unHeart = document.createElement('i');
    $unHeart.setAttribute('class', 'fa-solid fa-heart pink-heart hidden');
    $colThird.appendChild($unHeart);

    $heart = document.querySelector('.fa-regular');
    $heart.addEventListener('click', function () {
      // console.log('liked !');
      $heart.classList.add('hidden');
      $unHeart.classList.remove('hidden');
      userLikes();
      // var dataLikes = data.likes;
      // dataLikes.likesId = 0;
      // data.likesId++;
    });

    $unHeart = document.querySelector('.fa-solid');
    $unHeart.addEventListener('click', function () {
      // console.log('unliked !');
      $heart.classList.remove('hidden');
      $unHeart.classList.add('hidden');
    });

    function userLikes() {
      var dataLikes = data.likes;
      if ($heart) {
        dataLikes.push(character);
      }
    }

    // var $liAge = document.createElement('li');
    $liAge.textContent = 'Age: ' + character.age;
    $liAge.setAttribute('class', 'font-comfortaa search-item text-align-left');
    $cardLabel.appendChild($liAge);

    // var $liGender = document.createElement('li');
    $liGender.textContent = 'Gender: ' + character.gender;
    $liGender.setAttribute('class', 'font-comfortaa search-item text-align-left');
    $cardLabel.appendChild($liGender);

    // var $liEyeColor = document.createElement('li');
    $liEyeColor.textContent = 'Eye Color: ' + character.eye_color;
    $liEyeColor.setAttribute('class', 'font-comfortaa search-item text-align-left');
    $cardLabel.appendChild($liEyeColor);

    // var $liHairColor = document.createElement('li');
    $liHairColor.textContent = 'Hair Color: ' + character.hair_color;
    $liHairColor.setAttribute('class', 'font-comfortaa search-item text-align-left');
    $cardLabel.appendChild($liHairColor);

    // console.log('character[0].films[0]:', character[0].films[0]);
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', character.films[0]);
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', function () {
      // console.log('xhr2.response.image: ', xhr2.response.image);
      var $image = document.createElement('img');
      $image.setAttribute('src', xhr2.response.image);
      $image.setAttribute('class', 'movie-title-image search-item');
      $ulMovieTitle.appendChild($image);
    });
    xhr2.send();
    $ulMovieTitle.textContent = '';

    var xhr3 = new XMLHttpRequest();
    xhr3.open('GET', character.species);
    xhr3.responseType = 'json';
    xhr3.addEventListener('load', function () {
      // console.log('xhr3.response:', xhr3.response);
      var $liSpecies = document.createElement('li');
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
// getGhibliCharacter();

// ====== SEARCH BUTTON ====== //
var $searchButton = document.querySelector('.search-btn');
var $searchInfo = document.querySelector('.search-info');
$searchButton.addEventListener('click', function () {
  getGhibliCharacter($searchInfo.value);
});

var $noLikesView = document.querySelector('.no-likes-view');
var $likesListResults = document.querySelector('.likes-list-results');
function noLikesView() {
  if (data.likes.length === 0) {
    $noLikesView.className = 'no-likes-view column-full margin-top-5 text-align-c padding-top-20';
    $likesListResults.className = 'hidden';
  } else {
    $noLikesView.className = 'hidden';
    $likesListResults.className = 'likes-list-results column-full margin-top-5 display-flex';
  }
}

// LIKES LIST
var $viewLikesList = document.querySelector('.view-likes-list');

function showLikeEntry(likesEntry) {

  var $divParentLayout = document.createElement('div');
  $divParentLayout.setAttribute('class', 'column-one-third display-flex jc-center align-items-center padding-top-10 padding-bottom-10');
  $viewLikesList.appendChild($divParentLayout);

  var $cardBox = document.createElement('div');
  $cardBox.setAttribute('class', 'card-home-box');
  $divParentLayout.appendChild($cardBox);

  var $contentParentDiv = document.createElement('div');
  $contentParentDiv.setAttribute('class', 'text-align-c padding-top-10 display-flex align-items-center');
  $cardBox.appendChild($contentParentDiv);

  var $pName = document.createElement('p');
  $pName.setAttribute('class', 'likes-data font-comfortaa column-half jc-flex-end text-align-right');
  $pName.textContent = likesEntry.name;
  $contentParentDiv.appendChild($pName);

  var $heart = document.createElement('i');
  $heart.setAttribute('class', 'fa-solid fa-heart column-half pink-heart');
  $heart.setAttribute('id', likesEntry.id);
  $contentParentDiv.appendChild($heart);

  $heart.addEventListener('click', function () {
    var $modalContainer = document.querySelector('.modal-container');
    $modalContainer.classList.remove('hidden');

    var $cancelButton = document.querySelector('.modal-cancel');
    $cancelButton.addEventListener('click', function () {
      $modalContainer.classList.add('hidden');
    });

    var $removeButton = document.querySelector('.modal-remove');

    $removeButton.addEventListener('click', function () {
      // debugger;
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

  // var $taskList = document.querySelector('.task-list');
  // $taskList.addEventListener('click', function (event) {
  //   console.log('event.target:', event.target);
  //   console.log('event.target.tagName:', event.target.tagName);
  //   if (event.target.tagName === 'BUTTON') {
  //     var ancestorElement = event.target.closest('.task-list-item');
  //     console.log("event.target.closest('.task-list-item):", ancestorElement);
  //     ancestorElement.remove();
  //   }
  // });

  var $ulData = document.createElement('ul');
  $ulData.setAttribute('class', 'text-align-left padding-top-10');
  $cardBox.appendChild($ulData);

  var $liAge = document.createElement('li');
  $liAge.setAttribute('class', 'font-comfortaa');
  $liAge.textContent = 'Age: ' + likesEntry.age;
  $ulData.appendChild($liAge);

  var $liGender = document.createElement('li');
  $liGender.textContent = 'Gender: ' + likesEntry.gender;
  $liGender.setAttribute('class', 'font-comfortaa');
  $ulData.appendChild($liGender);

  var $liEyeColor = document.createElement('li');
  $liEyeColor.textContent = 'Eye Color: ' + likesEntry.eye_color;
  $liEyeColor.setAttribute('class', 'font-comfortaa');
  $ulData.appendChild($liEyeColor);

  var $liHairColor = document.createElement('li');
  $liHairColor.textContent = 'Hair Color: ' + likesEntry.hair_color;
  $liHairColor.setAttribute('class', 'font-comfortaa');
  $ulData.appendChild($liHairColor);

  var likesSpecies = new XMLHttpRequest();
  likesSpecies.open('GET', likesEntry.species);
  likesSpecies.responseType = 'json';
  likesSpecies.addEventListener('load', function () {
    var $liSpecies = document.createElement('li');
    $liSpecies.textContent = 'Species: ' + likesSpecies.response.name;
    $liSpecies.setAttribute('class', 'font-comfortaa');
    $ulData.appendChild($liSpecies);
  });

  likesSpecies.send();
}
