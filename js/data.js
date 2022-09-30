/* exported data */

var data = {
  view: 'home-view',
  likes: [],
  likesId: 1,
  oldSearches: ''
};

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('likes-local-storage', dataJSON);
});

var previousDataJSON = localStorage.getItem('likes-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
