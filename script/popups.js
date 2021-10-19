function openForm() {
  document.getElementById("login").style.display = "flex";
}

function closeForm() {
  document.getElementById("login").style.display = "none";
}

var e = new Event("look", {"cancelable":true});
$("#submit-log").click(function(e) {
  e.preventDefault();
  var username = document.getElementById('username').value;
  var pwd = document.getElementById('pwd').value;

  if ()

})

$("#submit-sign").click(function(e) {
  e.preventDefault():
  var username = document.getElementById('username').value;
  var pwd = document.getElementById('pwd').value;

  document.cookie = username + "=" + pwd;
})
