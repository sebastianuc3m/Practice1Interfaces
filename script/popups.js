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

	function getAllCookies(){
		let word = "";
		let clist = [];
		let ca = document.cookie.split(';');
		for (let i = 0; i<ca.length;i++){
			for(let j = 0; j<ca[i].length;j++){
				if (ca[i][j]==="="){
					clist[i] = word;
					word = "";
					break;
				} else if (ca[i][j]!==" "){
					word+= ca[i][j];
					
				}
			}
		}
		return clist;
	}

	function parseCookie(cname) {
		let word = "";
		let clist = [];
		let wordcounter = 0;
		cookie = getCookie(cname);
		for (let i = 0; i<cookie.length;i++){
			if (cookie[i]===","){
				clist[wordcounter] = word;
				wordcounter++;
				word = "";
			} else {
				word+= cookie[i];
			}
		}
		clist[wordcounter] = word;
		return clist;
	}

	function logIn(username, password){
		let cookies = getAllCookies();
		let log = false;
		for (let i = 0; i<cookies.length; i++){
			values = parseCookie(cookies[i]);
			if (values[0]===username && values[1]===password){
				setCookie('logged', cookies[i], 1);
				log = true;
			}
		}
		console.log(log);
		if (log){
			$("#show-username").html(username);
			return true;
		} else{
			return false;
		}

	}


	var e = new Event("look", {"cancelable":true});
	var log;
	var pwd;
	var username;

	var expanded = false;
	/*
	function showCheckboxes() {
		var checkboxes = $("#checkboxes");
		if (!expanded) {
			checkboxes.show();
			expanded = true;
		} else {
			checkboxes.hide();
			expanded = false;
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
		}
	})

	$("#signup-but").click(function() {
		$("#log").hide();
		$("#sign").show();
	})

	$(".btn-cancel").click(function() {
		$("#log").hide();
		$("#sign").hide();

	})
	$("#log-form").submit(function(e){
		e.preventDefault();
		let username = $("#username-log").val();
		let password = $("#pwd-log").val();
		console.log('oaoaoa');
		if (logIn(username, password)){
			console.log('aaa');
			$("#log").hide();
			$("#show-username").html(username);
			pfpHide();

		}
	})
	
	$("#sign-form").submit(function(e) {
		e.preventDefault();
		var interests = "";
		$('.interests:checked').each(
			function() {
					interests += ($(this).val()+ "_");
			}
		)
		let data = [$('#username-sign').val(), $('#pwd-sign').val(), 
		$('#name').val(), $('#surname').val(), $('#birthdate').val(),
		interests, $('#input-pfp').val()];
		var email = $('#email').val();    
		setCookie(email, data, 71);   		
		$("#sign").hide();
		logIn($('#username-sign').val(), $('#pwd-sign').val());
		pfpHide();
	})

	$("#my-profile").click(function(){
		console.log('aaa')
		let logmail = getCookie('logged');
		let loginfo = parseCookie(logmail);
		$("#prf-email").html() = logmail;
		$("#prf-user").html() = loginfo[0];
		$("#prf-name").html() = loginfo[2];
		$("#prf-surname").html() = loginfo[3];
		$("#prf-birthdate").html() = loginfo[4];
		$("#prf-interests").html() = loginfo[5];
		$("#prf-img").html() = loginfo[6];
		$("#my-profile-menu").show();
	})

	$("#log-out").click(function(){
		setCookie("logged", "", 71);
		pfpHide();

	})


})
