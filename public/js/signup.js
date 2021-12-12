(function ($) {
  let usernameInput = $("#username");
  let password1Input = $("#password1");
  let password2Input = $("#password2");
  let emailInput = $("#email");
  let genderInput = $("#genderSelect");
  let cityInput = $("#city");
  let signupForm = $("#signup-form");
  let submitButton = $("#loginButton");
  let formAlert = $("#error_username");
  let pass1Alert = $("#error_password1");
  let pass2Alert = $("#error_password2");
  let genderAlert = $("#error_gender");
  let emailAlert = $("#error_email");
  let cityAlert = $("#error_city");

  let submit_check = true;

  usernameInput.blur(function (event) {
    var userNameStr = usernameInput.val();
    if (!userNameStr) {
      submit_check = false;
      formAlert.show();
      formAlert.html("Please enter username");
      return;
    } else {
      formAlert.hide();
    }

    if (/\s/.test(userNameStr)) {
      submit_check = false;
      formAlert.show();
      formAlert.text("Username has spaces");
      return;
    } else {
      formAlert.hide();
    }

    if (!userNameStr.match(/^[a-z0-9]+$/i)) {
      submit_check = false;
      formAlert.show();
      formAlert.text("Only alphanueric values allowed for username");
      return;
    } else {
      formAlert.hide();
    }

    if (userNameStr.length > 15) {
      submit_check = false;
      formAlert.show();
      formAlert.html("Username is too long");
      return;
    } else {
      formAlert.hide();
    }
  });

  password1Input.blur(function (event) {
    var password1Str = password1Input.val();
    if (!password1Str) {
      submit_check = false;
      pass1Alert.show();
      pass1Alert.html("Please enter password");
      return;
    } else {
      pass1Alert.hide();
    }

    if (/\s/.test(password1Str)) {
      submit_check = false;
      pass1Alert.show();
      pass1Alert.text("Password has spaces");
      return;
    } else {
      pass1Alert.hide();
    }

    if (password1Str.length > 15) {
      submit_check = false;
      formAlert.show();
      formAlert.html("Password is too long");
      return;
    } else {
      formAlert.hide();
    }
  });

  password2Input.blur(function (event) {
    var password1Str = password1Input.val();
    var password2Str = password2Input.val();
    if (!password2Str) {
      submit_check = false;
      pass2Alert.show();
      pass2Alert.html("Please enter password again");
      return;
    } else {
      pass1Alert.hide();
    }

    if (/\s/.test(password2Str)) {
      submit_check = false;
      pass2Alert.show();
      pass2Alert.text("Password has spaces");
      return;
    } else {
      pass2Alert.hide();
    }

    if (password1Str !== password2Str) {
      submit_check = false;
      pass2Alert.show();
      pass2Alert.text("Passwords don't match!");
      return;
    } else {
      pass2Alert.hide();
    }
  });

  emailInput.blur(function (event) {
    var myreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var emailStr = emailInput.val();
    if (!emailStr) {
      submit_check = false;
      emailAlert.show();
      emailAlert.html("Please enter email");
      return;
    }
    if (!emailStr.match(myreg)) {
      submit_check = false;
      emailAlert.show();
      emailAlert.text("Please enter a valid email");
      return;
    } else {
      emailAlert.hide();
    }

    if (/\s/.test(emailStr)) {
      submit_check = false;
      emailAlert.show();
      emailAlert.text("Email has spaces");
      return;
    } else {
      emailAlert.hide();
    }

    // if (myreg.test(emailStr)) {
    //   submit_check = false;
    //   emailAlert.show();
    //   emailAlert.text("invalid email!");
    //   return;
    // } else {
    //   emailAlert.hide();
    // }
  });

  cityInput.blur(function (event) {
    var cityStr = cityInput.val();
    if (!cityStr) {
      submit_check = false;
      cityAlert.show();
      cityAlert.html("Please enter your city");
      return;
    } else {
      cityAlert.hide();
    }

    if (/\s/.test(cityStr)) {
      submit_check = false;
      cityAlert.show();
      cityAlert.text("City input has spaces");
      return;
    } else {
      cityAlert.hide();
    }
  });

  signupForm.submit(function (event) {
    if (submit_check === false) {
      event.preventDefault();
    } else {
      signupForm.unbind().submit();
    }
  });
})(window.jQuery);
