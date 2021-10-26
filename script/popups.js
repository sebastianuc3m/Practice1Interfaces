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
				setCookie('logged', cookies[i], 71);
				var email = cookies[i];
				log = true;
			}
		}
		if (log){
			$("#show-username").html(username);
			let user_exps = email+'_exp';
			console.log(user_exps);
			all_exps = parseCookie(user_exps);
			if (all_exps[0]!==""){
				for (let i=0; i<all_exps.length; i++){
					addExperience(all_exps[i]);
				}
			} else {
				$("#no-exp").show()
			}
			return true;
		} else{
			return false;
		}
	}

	function pfpHide(){
		var islogged = getCookie("logged");
		if (islogged === ""){
			$("#pfp").hide();
			$("#button-div").show();
		} else {
			$("#pfp").show();
			$("#button-div").hide();
		}
		$("#my-profile-menu").hide();		
	}

	function addExperience(title){
		$("#no-exp").hide()
		experience = parseCookie(title);
		console.log(experience);
		var idexp = 'exp-'+title;
		var newexp = $("<article></article>").attr('id', idexp);
		$('#added-exp').append(newexp);
		var close_btn = $("<button></button>");
		close_btn.onclick = "deleteExperience()";
		close_btn.html('delete experience');
		close_btn.addClass('delete-exp');
		close_btn.attr('type', 'button');
		var title_a = $("<h4></h4>").html(title);
		var location = $("<h3></h3>").html(experience[1]);
		var desc = $("<p></p>").html(experience[0]);
		$('#'+idexp).append(title_a, location, desc, close_btn);
	}

	function deleteExperience(){
		var title = $(this).closest('h4').html();
		deletecookie = getCookie(title);
		setCookie(title,null,-1);
		var user = getCookie('logged');
		user = user + '-exp';
		let cookie = parseCookie(user);
		cookie = cookie.filter(function(item) {
    		return item !== title})
		console.log('mismuertos');
		$(this).closest('article').remove();
	}

	var e = new Event("look", {"cancelable":true});
	var log;
	var pwd;
	var username;

	var expanded = false;
	$("#my-profile-menu").hide();
	$("#my-experiences-menu").hide();
	$("#add-exp").hide();
	$("#log").hide();
	$("#sign").hide();
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
	/*
	$(".delete-exp").click(function(){
			console.log('hola');
			var title = $(this).closest('h4').html();
			console.log(title);
			$.cookie(title, null, { path: '/' });
			var user = getCookie('logged');
			user = user + '-exp';
			var cookie = parseCookie(user);
			cookie.remove(title);
			$(this).closest('article').remove();
		})*/
	

	$("#log-form").submit(function(e){
		e.preventDefault();
		let username = $("#username-log").val();
		let password = $("#pwd-log").val();
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
		if ($("#my-profile-menu").is(':hidden')){
			let logmail = getCookie('logged');
			let loginfo = parseCookie(logmail);
			$("#prf-email").html(logmail);
			$("#prf-user").html(loginfo[0]); 
			$("#prf-name").html(loginfo[2]);
			$("#prf-surname").html(loginfo[3]);
			$("#prf-birthdate").html(loginfo[4]);
			$("#prf-interests").html(loginfo[5]);
			$("#prf-img").attr('src',loginfo[6]);
			$("#my-experiences-menu").hide();
			$("#my-profile-menu").show();
		} else {
			$("#my-profile-menu").hide();
		}		
	})

	$("#log-out").click(function(){
		let confirmation = confirm("Are you sure you want to log out?");
		if (confirmation){
			setCookie("logged", "", 71);
			pfpHide();
		}
	})

	$("#change-user").click(function(){
		let cookie = getCookie('logged');
		data = parseCookie(cookie);
		console.log(data);
		let newuser = prompt("Type the new user:", data[0]);
		if (newuser != null){
			data[0] = newuser;
			setCookie(cookie, data, 71);
			$("#show-username").html(newuser);
			$("#prf-user").html(newuser);
		}
		
	})
	$("#my-exp").click(function(e){
		e.preventDefault();
		if ($("#my-experiences-menu").is(':hidden')){
			$("#my-profile-menu").hide();
			$("#my-experiences-menu").show();
		} else {
			$("#my-experiences-menu").hide();
		}
	})

	$("#create-exp").click(function(e){
		e.preventDefault();
		if ($("#add-exp").is(':hidden')){
			$("#add-exp").show();
		} else {
			$("#add-exp").hide();
		}
	})

	$("#add-exp-form").submit(function(e) {
		e.preventDefault();
		let title = $('#add-title-exp').val();
		console.log(title);
		let data = [$('#add-desc-exp').val(),
		$('#add-location-exp').val(), $('#add-img-exp').val()];
		var expcookie = getCookie('logged') + "_exp";
		var experiences = parseCookie(expcookie);
		if (experiences.includes(title)==false){
			if (experiences[0] === ""){
				experiences = [title];				
			} else {
				experiences.push(title);
			}
			setCookie(expcookie, experiences, 71);
			setCookie(title, data, 71);
			addExperience(title);
		} else {
			window.alert("You can't create an experience with a title previously used.");
		}
		
	})


})
