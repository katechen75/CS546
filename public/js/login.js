(function ($) {
  let usernameInput = $("#username");
  let passwordInput = $("#password");
  let loginForm = $("#login-form");
  let submitButton = $("#loginButton");
  let formAlert = $("#error_username");
  let passAlert = $("#error_password");

  let submit_check = true;

  usernameInput.blur(function (event) {
    var userNameStr = usernameInput.val();
    if (!userNameStr) {
      submit_check = false;
      formAlert.show();
      formAlert.html("You must enter username");
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
      formAlert.text("Only alphanumeric values allowed for username");
      formAlert.removeClass("hidden");
      usernameInput.focus();
      return;
    } else {
      formAlert.hide();
    }
  });

  passwordInput.blur(function (event) {
    var passwordStr = passwordInput.val();
    if (!passwordStr) {
      submit_check = false;
      passAlert.show();
      passAlert.html("You must enter password");
      return;
    } else {
      passAlert.hide();
    }
  });

  loginForm.submit(function (event) {
    if (submit_check === false) {
      event.preventDefault();
    } else {
      loginForm.unbind().submit();
    }
  });
})(window.jQuery);
