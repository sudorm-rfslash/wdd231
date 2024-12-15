function showModalWhenClicked() {
  // get all the links
  var allLinks = document.getElementsByClassName('membership-cards')[0].getElementsByTagName('a');

  // loop through links
  for (var x = 0; x < allLinks.length; x++) {
    allLinks[x].onclick = function () {
      // stop normal link stuff
      event.preventDefault();

      // get modal id
      var modalID = this.href.split('#')[1];

      // show modal
      document.getElementById(modalID).style.display = 'flex';
    }
  }

  // close buttons
  var closeBtn = document.querySelectorAll('.modal button');

  // loop through
  for (var y = 0; y < closeBtn.length; y++) {
    closeBtn[y].onclick = function () {
      // hide the whole thing
      this.parentNode.parentNode.style.display = 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toLocaleString(); // Use a readable format
  }
});

window.onload = showModalWhenClicked;