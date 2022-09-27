/* exported data */

var data = {
  view: 'home-view',
  entries: [],
  likesId: 1
};

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('user-likes-local-storage', dataJSON);
});

var previousDataJSON = localStorage.getItem('user-likes-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
