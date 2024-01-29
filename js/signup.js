var $password = $("#password");
var $confirmPassword = $("#confirm_password");

/****************************
 *Check password validity
 *return :
 *   Bool validity
 ***************************/
function isPasswordValid() {
    return $password.val().length > 8;
}

/****************************
 *Check if passwords matches
 *return :
 *   Bool passwordIsMatching 
 ***************************/
function arePasswordsMatching() {
    return $password.val() === $confirmPassword.val();
}

/****************************
 *Determine if the form can be submitted
 *return :
 *   Bool formCanBeSubmitted
 ***************************/
function canSubmit() {
    return isPasswordValid() && arePasswordsMatching();
}

/****************************
 *Handle password validation events
 ***************************/
function passwordEvent() {
    if (isPasswordValid()) {
        $password.next().hide();
    } else {
        $password.next().show();
    }
}

/****************************
 *Handle confirm password validation events
 ***************************/
function confirmPasswordEvent() {
    if (arePasswordsMatching()) {
        $confirmPassword.next().hide();
    } else {
        $confirmPassword.next().show();
    }
}

/****************************
 *Enable or disable the submit button
 ***************************/
function enableSubmitEvent() {
    $("#signup_submit").prop("disabled", !canSubmit());
}

/****************************
 *Handle user sign up
 ***************************/
function signUp() {
    var userData = {
        username: $("#username").val(),
        password: $("#password").val(), // Storing password in localStorage is insecure
        address: $("#address").val(),
        postal_code: $("#postal_code").val(),
        country: $("#country").val(),
        city: $("#city").val()
    };

    // Stores user informations in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    window.location.href = "./map.html";
}

/****************************
 *Handle user log in
 ***************************/
function logIn() {
    var username = $("#login_username").val();
    var password = $("#login_password").val();

    // Retrieve stored credentials
    var storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && username === storedData.username && password === storedData.password) {
        alert("Logged in successfully!");
        window.location.href = "./map.html";
    } else {
        $("#login_form span").show();
    }
}

// redirect to the project website (vitrine)
function redirectToLink() {
    window.location.href = 'https://riotwalk.wixsite.com/poll-urbain';
}

$(document).ready(() => {
    $("#signup_form span, #login_form span").hide();
    $password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);
    $confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);
    enableSubmitEvent();
    $("#signup_form").submit(function (e) {
        e.preventDefault();
        signUp();
    });
    $("#login_form").submit(function (e) {
        e.preventDefault();
        logIn();
    });
});
