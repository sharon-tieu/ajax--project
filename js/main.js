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

// HTTP REQUEST
window.addEventListener('DOMContentLoaded', function (event) {
  viewSwap();
});

var $studioGhibliInfo = document.querySelector('#card-box');

function getGhibli(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://ghibliapi.herokuapp.com/locations');
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    for (var i = 0; i < this.responseType.length; i++) {
      var $li = document.createElement('li');
      $li.textContent = xhr.response.name;
      $studioGhibliInfo.appendChild($li);
    }
  });
  xhr.send();
}

getGhibli('Irontown');

// var getLocation = ()
