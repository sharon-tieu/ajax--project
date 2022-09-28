var $homeNavBar = document.querySelector('.home-nav-bar');
var $searchNavBar = document.querySelector('.search-nav-bar');
var $homeView = document.querySelector('.home-page-view');
var $searchView = document.querySelector('.search-page-view');

// VIEW SWAPPING
function viewSwap(view) {
  if (data.view === 'home-view') {
    data.view = 'home-view';
    $homeView.className = 'row home-view';
    $searchView.className = 'hidden';
  } else {
    data.view = 'search-view';
    $homeView.className = 'hidden';
    $searchView.className = 'row search-view';
  }
}

$searchNavBar.addEventListener('click', function () {
  data.view = 'search-view';
  viewSwap();
});

$homeNavBar.addEventListener('click', function () {
  data.view = 'home-view';
  viewSwap();
});

window.addEventListener('DOMContentLoaded', function (event) {
  viewSwap();
});

// HTTP REQUEST

var $cardLabel = document.querySelector('#card-label-result');
var $cardInfoResult = document.querySelector('#card-info-result');
var $cardPhoto = document.querySelector('#card-photo-result');

function getGhibliCharacter(name) {

  var $ulTitle = document.createElement('ul');
  var $liAge = document.createElement('li');
  var $liGender = document.createElement('li');
  var $liEyeColor = document.createElement('li');
  var $liHairColor = document.createElement('li');

  $ulTitle.setAttribute('id', name);
  // $ulTitle.innerHTML = '';
  // $liAge.innerHTML = '';
  // $liGender.innerHTML = '';
  // $liEyeColor.innerHTML = '';
  // $liHairColor.innerHTML = '';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://ghibliapi.herokuapp.com/people/');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log('xhr status:', xhr.status);
    console.log('xhr response:', xhr.response);

    var character = xhr.response.filter(function (el) {
      return el.name === name;
    });
    console.log('character:', character);

    // var $ulTitle = document.createElement('ul');
    $ulTitle.textContent = character[0].name;
    $ulTitle.setAttribute('class', 'font-comfortaa');
    $cardLabel.appendChild($ulTitle);

    // var $liAge = document.createElement('li');
    $liAge.textContent = 'Age: ' + character[0].age;
    $liAge.setAttribute('class', 'font-comfortaa');
    $cardInfoResult.appendChild($liAge);

    // var $liGender = document.createElement('li');
    $liGender.textContent = 'Gender: ' + character[0].gender;
    $liGender.setAttribute('class', 'font-comfortaa');
    $cardInfoResult.appendChild($liGender);

    // var $liEyeColor = document.createElement('li');
    $liEyeColor.textContent = 'Eye Color: ' + character[0].eye_color;
    $liEyeColor.setAttribute('class', 'font-comfortaa');
    $cardInfoResult.appendChild($liEyeColor);

    // var $liHairColor = document.createElement('li');
    $liHairColor.textContent = 'Hair Color: ' + character[0].hair_color;
    $liHairColor.setAttribute('class', 'font-comfortaa');
    $cardInfoResult.appendChild($liHairColor);

    console.log('character[0].films[0]:', character[0].films[0]);
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', character[0].films[0]);
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', function () {
      console.log('xhr2.response.image: ', xhr2.response.image);
      var $image = document.createElement('img');
      $image.setAttribute('src', xhr2.response.image);
      $image.setAttribute('class', 'movie-title-image');
      $cardPhoto.appendChild($image);
    });
    console.log(xhr2.response);
    xhr2.send();

    var xhr3 = new XMLHttpRequest();
    xhr3.open('GET', character[0].species);
    xhr3.responseType = 'json';
    xhr3.addEventListener('load', function () {
      console.log('xhr3.response:', xhr3.response);
      var $liSpecies = document.createElement('li');
      $liSpecies.textContent = 'Species: ' + xhr3.response.name;
      $liSpecies.setAttribute('class', 'font-comfortaa');
      $cardInfoResult.appendChild($liSpecies);
    });
    xhr3.send();
  });
  xhr.send();
  $searchInfo.value = '';
}
// getGhibliCharacter();

// SEARCH BUTTON
var $searchButton = document.querySelector('.search-btn');
var $searchInfo = document.querySelector('.search-info');
$searchButton.addEventListener('click', function () {
  console.log('click');
  console.log('search-info.value:', $searchInfo.value);
  getGhibliCharacter($searchInfo.value);
  data.oldSearches = $searchInfo.value;
  console.log('data.oldSearches:', data.oldSearches);
});
