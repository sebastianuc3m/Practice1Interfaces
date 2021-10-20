// document.cookie = ["A=a"; "b=gasdf"; expires=hadsfa]
$(document).ready(function() {

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var e = new Event("look", {"cancelable":true});
  var log;
  var pwd;
  var username;

  function getLog() {
    log = getCookie("logged");
    console.log(log);
    if (log != null) {
      console.log("hola");
      $("#login-but").innerHTML = "Log-out";
    }
  }

  getLog();

  $("#login-but").click(function() {
    if ($(this).html() == "Log-in"){
      $("#log").css("display", "flex");
      $("#title-log").html("Log-in");
      $("#submit").html("Log-in");
    }
    else {
      setCookie("logged", "", 71);
    }
  })

  $("#signup-but").click(function() {
    $("#log").css("display", "flex");
    $("#title-log").html("Sign-up");
    $("#submit").html("Sign-up");
  })

  $("#btn-cancel").click(function() {
    $("#log").css("display", "none");
  })

  $("#submit").click(function(e) {
    e.preventDefault();
    username = $('#username').val();
    pwd = $('#pwd').val();
    console.log(username);

    if ($(this).html() == "Log-in") {
      var stored = getCookie(username);
      if (pwd == stored) {
        setCookie("logged", "c", 1);
      }
    }
    else {
      setCookie(username, pwd, 71);
    }
    getLog();
    console.log(log);
    $("#log").css("display", "none");
  })
})
