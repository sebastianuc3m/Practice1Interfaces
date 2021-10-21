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

  var expanded = false;

  function showCheckboxes() {
    var checkboxes = $("#checkboxes");
    if (!expanded) {
      checkboxes.show();
      expanded = true;
    } else {
      checkboxes.hide();
      expanded = false;
    }
  }

/*
  function getLog() {
    log = getCookie("logged");
    console.log(log);
    if (log === "") {
      //console.log("hola");
      $("#login-but").innerHTML = "Log-out";
    }
  }*/

  function pfpHide(){
    var islogged = getCookie("logged");
    if (islogged === ""){
      $("#pfp").hide();
      $("#button-div").show();
    } else {
      $("#pfp").show();
      $("#button-div").hide();
    }
    
  }

  //getLog();
  pfpHide();

  $("#login-but").click(function() {
    if ($(this).html() == "Log-in"){
      $("#log").show();
      $("#sign").hide();
      $("#title-log").html("Log-in");
      $("#submit").html("Log-in");
    }
    else {
      setCookie("logged", "", 71);
    }
  })

  $("#signup-but").click(function() {
    $("#log").hide();
    $("#sign").show();
    $("#title-log").html("Sign-up");
    $("#submit").html("Sign-up");
  })

  $(".btn-cancel").click(function() {
    $("#log").hide();
    $("#sign").hide();

  })
  
  $("#sign-form").submit(function() {
    // e.preventDefault();
    var interests = "";
    $('.interests:checked').each(
      function() {
          interests += ($(this).val()+ "_");
      }
    )
    console.log(interests);
    let data = [$('#username-sign').val(), $('#pwd-sign').val(), 
    $('#name').val(), $('#surname').val(), $('#birthdate').val(),
    interests, $('#input-pfp').val()];
    var email = $('#email').val();

    
    setCookie(email, data, 71);
    setCookie("logged", email, 1);
    
    var stored = getCookie(email);
    if (data == stored) {
      setCookie("logged", email, 1);
    }
    
    
    $("#sign").hide();
    $("#show-username").html(username);
    pfpHide(); 
    
    

  })
  /*
  
  $("#submit").click(function(e) {
    e.preventDefault();
    username = $('#username').val();
    pwd = $('#pwd').val();
    console.log(username);

    if ($(this).html() == "Sign-up") {
      setCookie(username, pwd, 71);
    }
    var stored = getCookie(username);
    if (pwd == stored) {
      setCookie("logged", username, 1);
    }
    //getLog();
    console.log(log);
    $("#log").css("display", "none");
    $("#show-username").html(username);
    pfpHide();

  })
  */

  $("#log-out").click(function(){
    setCookie("logged", "", 71);
    pfpHide();

  })


})
