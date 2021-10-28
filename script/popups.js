	function setCookie(cname, cvalue, exdays, path="") {
		const d = new Date();
		path_txt =path;
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"+ path_txt;
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
				pfp = getCookie(cookies[i]+'_pfp');
				$("#pfp-img").attr('src',pfp);
				log = true;
			}
		}
		if (log){
			$("#show-username").html(username);
			$("#no-exp").show();
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
			$("#add-exp").hide();
			$("#my-profile-menu").hide();
			$("#my-experiences-menu").hide();
		} else {
			$("#pfp").show();
			$("#button-div").hide();
			$("#add-exp").hide();
			$("#my-profile-menu").hide();
			$("#my-experiences-menu").hide();
		}
		$("#my-profile-menu").hide();		
	}

	function addExperience(title_txt, desc_txt, location_txt, img_path){
		$("#no-exp").hide()
		//experience = parseCookie(title);
		var idexp = 'exp-'+title_txt;
		var newexp = $("<article></article>").attr('id', idexp);
		newexp.attr('class', 'exp-cr');
		$('#added-exp').append(newexp);
		//var close_btn = $("<input class='delete-exp' type='button'>");
		var close_btn = $("<button></button>");
		close_btn.attr('onclick', 'deleteExperience(this)');
		close_btn.html('delete experience');
		//close_btn.addClass('delete-exp');
		close_btn.attr('type', 'button');
		var title = $("<h4></h4>").html(title_txt);
		var location = $("<h3></h3>").html(location_txt);
		var desc = $("<p></p>").html(desc_txt);
		var img = $("<img>").attr('src',img_path);
		$('#'+idexp).append(title, img, location, desc, close_btn);
		$("#add-exp").hide();

	}

	function deleteExperience(but){
		var this_exp = $(but).parent();
		this_exp.remove();
	}

// document.cookie = ["A=a"; "b=gasdf"; expires=hadsfa]
$(document).ready(function() {
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
		$("#add-exp").hide();
		$("#my-profile-menu").hide();
		$("#my-experiences-menu").hide();
		$(".pop-experiences").hide()
	})

	$(".delete-exp").click(function(){
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
	})
	
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
		var interests = [];
		pfp_img = "images/pfp.png";
		let img = document.getElementById('input-pfp').files[0];
		if (img != null) {
			pfp_img = URL.createObjectURL(img);
		}
		$('.interests:checked').each(
			function() {
				if (interests.length == 0){
					interests[0] = $(this).val();
				} else{
					interests.push($(this).val());
				}
			}
		)
		let data = [$('#username-sign').val(), $('#pwd-sign').val(), 
		$('#name').val(), $('#surname').val(), $('#birthdate').val()];
		var email = $('#email').val();
		setCookie(email+'_pfp', pfp_img, 71);
		setCookie(email+'_int', interests, 71);
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
			let interests = getCookie(logmail+'_int');
			$("#prf-interests").html(interests);
			$("#prf-img").attr('src',$("#pfp-img").attr('src'));
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
		let desc = $('#add-desc-exp').val();
		let location = $('#add-location-exp').val();
		var imgurl ="";		
		let img = document.getElementById('add-img-exp').files[0];
		imgurl = URL.createObjectURL(img);
			addExperience(title, desc, location, imgurl);
			document.getElementById("add-exp-form").reset();
			//$("#add-exp-form").reset()	
	})

	$("#change-int").click(function(){
		if ($("#change-int-form").is(':hidden')){
			$("#change-int-form").show();
		} else {			
			$("#change-int-form").hide();
		}
	})

	//Change interests
	$("#change-int-form").submit(function(e){
		e.preventDefault();
		let interests="";
		$('.interests-c:checked').each(
			function() {
				interests+=$(this).val() + ","
			})
		interests = interests.slice(0, -1)
		$("#prf-interests").html(interests);
		var email = getCookie('logged');
		setCookie(email+'_int', interests, 71);
	})

	//Search filter
	$("#in-search").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
	    $(".experience").filter(function() {
	      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    });
	  });

	$("#change-pfp").change(function(){
		let img = document.getElementById('change-pfp').files[0];
		pfp_img = URL.createObjectURL(img);
		email = getCookie('logged');
		setCookie(email+"_pfp",pfp_img,71);
		$("#prf-img").attr('src',pfp_img);
		$("#pfp-img").attr('src',pfp_img);

	})
	$(".experience").click(function() {
		let exp = $(this).attr('id');
		exp += '-pop'
		console.log(exp);
		$('#'+exp).show()
	})
})
