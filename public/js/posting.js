(function ($) {
  let titleInput = $("#title");
  let descriptionInput = $("#description");
  let locationInput = $("#item_location");
  let postForm = $("#posting-form");
  let submitButton = $("#loginButton");
  let titleAlert = $("#error_title");
  let descriptionAlert = $("#error_description");
  let locationAlert = $("#error_location");

  let submit_check = true;

  titleInput.blur(function (event) {
    var titleStr = titleInput.val();
    if (!titleStr) {
      submit_check = false;
      titleAlert.show();
      titleAlert.html("You must enter a title");
      return;
    } else {
      titleAlert.hide();
    }

    if (titleStr.substring(0, 2) == "  ") {
      submit_check = false;
      titleAlert.show();
      titleAlert.text("Title can not be spaces");
      return;
    } else {
      titleAlert.hide();
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
      passAlert.html("Please enter password");
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
