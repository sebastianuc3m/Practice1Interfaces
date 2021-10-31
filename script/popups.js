// We created a function to set cookies in the document, this function is quite
// similar to the one found in W3Schools
function setCookie(cname, cvalue, exdays, path="") {
	const d = new Date();
	path_txt =path;
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"+ path_txt;
}

// We needed a function to search through the cookies. This function will take
// a cookie name as input and will return the elements inside that cookie as a string.
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

// This function will return a string containing the names of all cookies in the website in a list.
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

// This function does the same as getCookie but returns a list instead of a string
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

// This function will be used to log into an account once the user has filled
// the corresponding form
function logIn(username, password){
	// We get all cookies to later look for the user inside them
	let cookies = getAllCookies();
	let log = false;
	// get the value of elements in the cookies and compare them to the input
	for (let i = 0; i<cookies.length; i++){
		values = parseCookie(cookies[i]);
		// If the input corresponds to an existing user, change the log attribute
		// and the profile picture preview
		if (values[0]===username && values[1]===password){
			setCookie('logged', cookies[i], 71);
			// the profile picture src is changed accordingly.
			// this profile pic changing process gives us a security error sometimes due to
			// the browser policy but the src is correctly changed.
			pfp = getCookie(cookies[i]+'_pfp');
			$("#pfp-img").attr('src',pfp);
			log = true;
		}
	}
	// if login was successfull, we show the username below the profile picture
	if (log){
		$("#show-username").html(username);
		$("#no-exp").show();
		return true;
	} else{
		window.alert("Incorrect credentials.");
		return false;
	}
}

// This function hides or shows elements depending on if the user is logged or not
function pfpHide(){
	var islogged = getCookie("logged");
	if (islogged === ""){
		$("#pfp").hide();
		$("#pfp-menu").hide();
		$("#button-div").show();
		$("#add-exp").hide();
		$("#my-profile-menu").hide();
		$("#my-experiences-menu").hide();
	} else {
		$("#pfp").show();
		$("#pfp-menu").show();
		$("#button-div").hide();
		$("#add-exp").hide();
		$("#my-profile-menu").hide();
		$("#my-experiences-menu").hide();
	}
	$("#my-profile-menu").hide();
}

// This function will add an experience using the input form the user in the
// create experience form
function addExperience(title_txt, desc_txt, location_txt, img_path){
	// When an experience is added we need to hide the message indicating that the user has no experiences.
	$("#no-exp").hide()
	// We use the user inputs to create the titles and descriptions of the experience
	var idexp = 'exp-'+title_txt;
	var newexp = $("<article></article>").attr('id', idexp);
	newexp.attr('class', 'exp-cr');
	$('#added-exp').append(newexp);
	// Each experience will have a delete button to remove it
	var close_btn = $("<button></button>");
	// We asign a handler to the delete button that will delete the experiences when required.
	close_btn.attr('onclick', 'deleteExperience(this)');
	close_btn.html('delete experience');
	close_btn.attr('type', 'button');
	var title = $("<h4></h4>").html(title_txt);
	var location = $("<h3></h3>").html(location_txt);
	var desc = $("<p></p>").html(desc_txt);
	var img = $("<img>").attr('src',img_path);
	// We add these experiences to the user experiences in order to show them
	$('#'+idexp).append(title, img, location, desc, close_btn);
	// We hide the add experience form popup
	$("#add-exp").hide();
}

// This will delete an user experience
function deleteExperience(but){
	// we just delete the parent of the clicked button
	var this_exp = $(but).parent();
	this_exp.remove();
	// The user has no experiences a message indicating it is shown.
	if($('#added-exp').children().length==0){
		$("#no-exp").show()
	}
}

// When the document is open, we will execute the following code:
$(document).ready(function() {
	var e = new Event("look", {"cancelable":true});
	// By default, all menus are hidden
	$("#my-profile-menu").hide();
	$("#my-experiences-menu").hide();
	$("#add-exp").hide();
	$("#log").hide();
	$("#sign").hide();
	pfpHide();

	// The program will first check for the logged user in the databse
	// If a user is already logged its usrnameand profile picture will be shown.
	let email = getCookie('logged');
	if (email!==""){
		let data = parseCookie(email);
		$("#show-username").html(data[0]);
		let pfp = getCookie(email+'_pfp');
		$("#pfp-img").attr('src',pfp);
	}

	// If the login button is clicked, show the login form menu
	$("#login-but").click(function() {
		$("#log").show();
		// hide the signup menu just in case it is open
		$("#sign").hide();
	})

	// If the signup button is clicked, show the signup form menu
	$("#signup-but").click(function() {
		$("#log").hide();
		// hide the login menu just in case it is open
		$("#sign").show();
	})

	// If the button to close a popup menu is clicked, all menus are hidden.
	$(".btn-cancel").click(function() {
		$("#log").hide();
		$("#sign").hide();
		$("#add-exp").hide();
		$("#my-profile-menu").hide();
		$("#my-experiences-menu").hide();
		$(".pop-experiences").hide()
	})

	// if the submit log button is clicked
	$("#log-form").submit(function(e){
		// we first prevent the website from refreshing using the created event
		e.preventDefault();
		// we get the user input
		let username = $("#username-log").val();
		let password = $("#pwd-log").val();
		// We use the logIn function to try to login using the inputs
		if (logIn(username, password)){
			// If we were successfull, we hide the popup and show the username
			$("#log").hide();
			$("#show-username").html(username);
			pfpHide();
			document.getElementById("log-form").reset();
		}
	})

	// If, istead, the sign submit button is clicked
	$("#sign-form").submit(function(e) {
		// we also prevent the website from refreshing
		e.preventDefault();
		// we get the user input
		var interests = [];
		pfp_img = "images/pfp.png";
		let img = document.getElementById('input-pfp').files[0];
		if (img != null) {
			// we create an image object in order to later use it in the profile picture
			pfp_img = URL.createObjectURL(img);
		}
		// for each interest checked in the form, we will add it to a list
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
		if (getCookie(email)==""){
			// We will create a cookie with an arbitrary expiration date of 71 days.
			// It will have the user email as name and all other inputs as content.
			// The interests and the profile picture are saved in different cookies
			// to facilitate their manipulation later.
			// To distinguish them we will use the email and a sufix.
			setCookie(email+'_pfp', pfp_img, 71);
			setCookie(email+'_int', interests, 71);
			setCookie(email, data, 71);
			$("#sign").hide();
			// we directly login using these inputs calling the fucntion LogIn
			logIn($('#username-sign').val(), $('#pwd-sign').val());
			pfpHide();
			document.getElementById("sign-form").reset();
		} else {
			window.alert("Error. A user with the same email is already signed up.");
		}
	})

	// when clicking on the "my profile" option, we have to open a popup
	$("#my-profile").click(function(){
		if ($("#my-profile-menu").is(':hidden')){
			// This popup will contain a form with the user information
			// The information is obtained from the cookies and displayed.
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
		}
		// however, if the popup menu is already open, we have to close it
		else {
			$("#my-profile-menu").hide();
		}
	})

	// When the user want to logout, he can click the button
	$("#log-out").click(function(){
		// we will ask for confirmation
		let confirmation = confirm("Are you sure you want to log out?");
		if (confirmation){
			// we set the logged cookie to an empty list and hide the profile picture
			setCookie("logged", "", 71);
			pfpHide();
		}
	})

	// The user can opt to change the account name
	$("#change-user").click(function(){
		let cookie = getCookie('logged');
		data = parseCookie(cookie);
		// The inputs in this case will be asked to the user using prompts
		let newuser = prompt("Type the new user:", data[0]);
		if (newuser != null){
			data[0] = newuser;
			// we will change the user name in the cookie as well as in the main website
			setCookie(cookie, data, 71);
			$("#show-username").html(newuser);
			$("#prf-user").html(newuser);
		}
	})

	// If the user click on "my experiences", then a popup menu will be opened
	$("#my-exp").click(function(e){
		e.preventDefault();
		if ($("#my-experiences-menu").is(':hidden')){
			$("#my-profile-menu").hide();
			$("#my-experiences-menu").show();
		} else {
			$("#my-experiences-menu").hide();
		}
	})

	// The user can create an experience by clicking on that option button
	$("#create-exp").click(function(e){
		e.preventDefault();
		// this will just show the add-experience menu
		if ($("#add-exp").is(':hidden')){
			$("#add-exp").show();
		} else {
			$("#add-exp").hide();
		}
	})

	// When the user has finished filling the add-experiences form, he can submit it
	$("#add-exp-form").submit(function(e) {
		e.preventDefault();
		// we get the user input
		let title = $('#add-title-exp').val();
		let desc = $('#add-desc-exp').val();
		let location = $('#add-location-exp').val();
		var imgurl ="";
		let img = document.getElementById('add-img-exp').files[0];
		imgurl = URL.createObjectURL(img);
		// we call the addExperience function with the user inputs
		addExperience(title, desc, location, imgurl);
		// We just reset everything to an empty form and hide it.
		document.getElementById("add-exp-form").reset();
		$("#add-exp").hide();
	})

	// The form used to change the interests can be displayed or hidden using a button.
	$("#change-int").click(function(){
		if ($("#change-int-form").is(':hidden')){
			$("#change-int-form").show();
			$("my-profile-menu").css('max-height','80%');
		} else {
			$("#change-int-form").hide();
			$("my-profile-menu").css('max-height','75%');
		}
	})

	// The user can change its interests clicking on a saving button in the "my profile" menu
	$("#change-int-form").submit(function(e){
		e.preventDefault();
		let interests="";
		// we take all the user interests
		$('.interests-c:checked').each(
			function() {
				interests+=$(this).val() + ","
			})
		// we insert them in its respective cookie and change the interests information in "my profile".
		interests = interests.slice(0, -1)
		$("#prf-interests").html(interests);
		var email = getCookie('logged');
		setCookie(email+'_int', interests, 71);
	})

	// The search filter will display the experiences based on what the user writes in the search bar input.
	$("#button-search").click(function() {
		if($("#in-search").val()!== ""){
			var value = $("#in-search").val().toLowerCase();
			// we create the filter for only showing elements that correspond to the user input
		    $(".block .experience").filter(function() {
		      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
			if($(".block .experience:visible").length == 0){
				// if there is not a match in the search an error message will be dispalyed.
			  $("#error-search").show();
				window.alert("No results for this search.");
			} else {
			  $("#error-search").hide();
			}
		} else{
			window.alert("Introduce some text in the seacrh bar input.");
		}
		
	 });

	// The user can choose to change its profile picture in the profile menu
	$("#change-pfp").change(function(){
		// in this case, we take the input and create an url object
		let img = document.getElementById('change-pfp').files[0];
		pfp_img = URL.createObjectURL(img);
		email = getCookie('logged');
		// we change the image in the cookies
		setCookie(email+"_pfp",pfp_img,71);
		// we set the image in the profile picture and the sample image in the "my prfile" menu.
		$("#prf-img").attr('src',pfp_img);
		$("#pfp-img").attr('src',pfp_img);
	})

	// When an experience is clicked its correspondant pop-up will be shown.
	$(".experience").click(function(){
		let exp = $(this).attr('id');
		exp ='#' + exp + '-pop'
		$(exp).css("top", (jQuery(window).height() - $(exp).height() ) / 2+jQuery(window).scrollTop() + "px");
		$(exp).show();
	})

	// all experiences in the bottom section can be sorted with this function
	// we set the helper:'clone' attribute to avoid activating the click handler for the experiences.
	$(".block").sortable({helper:'clone'});

	// After clicking a point in the map or an experience, we have a scrollable image gallery, with
	// right and left buttons
	$(".arr-left").click(function(){
		let art = $(this).parent();
		let imgs = $(art).children('div');
		var img1 = $(imgs).children('.img1');
		var img2 = $(imgs).children('.img2');
		var img3 = $(imgs).children('.img3');
		var img4 = $(imgs).children('.img4');
		var img5 = $(imgs).children('.img5');
		img1.removeClass('img1');
		img2.removeClass('img2');
		img3.removeClass('img3');
		img4.removeClass('img4');
		img5.removeClass('img5');
		img1.addClass('img5');
		img2.addClass('img1');
		img3.addClass('img2');
		img4.addClass('img3');
		img5.addClass('img4');
	})

	$(".arr-right").click(function(){
		let art = $(this).parent();
		let imgs = $(art).children('div');
		var img1 = $(imgs).children('.img1');
		var img2 = $(imgs).children('.img2');
		var img3 = $(imgs).children('.img3');
		var img4 = $(imgs).children('.img4');
		var img5 = $(imgs).children('.img5');
		img1.removeClass('img1');
		img2.removeClass('img2');
		img3.removeClass('img3');
		img4.removeClass('img4');
		img5.removeClass('img5');
		img1.addClass('img2');
		img2.addClass('img3');
		img3.addClass('img4');
		img4.addClass('img5');
		img5.addClass('img1');
	})
})
