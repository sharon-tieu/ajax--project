
var $studioGhibliInfo = document.querySelector('#card-box');

function getInfo() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://ghibliapi.herokuapp.com/locations');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    for (var i = 0; i < this.responseType.length; i++) {
      var $li = document.createElement('li');
      $li.textContent = xhr.response[i];
      $studioGhibliInfo.appendChild($li);
    }
  });
  xhr.send();
}

getInfo();

/*
  <h4 class="font-comfortaa text-align-c">Card Title</h4>
  <div class="divider-line"></div>
  <p class="font-comfortaa padding-left-20 padding-right-20">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
*/

var $cardTitle = document.createElement('h4');
$cardTitle.setAttribute('class', 'font-comfortaa text-align-c');
