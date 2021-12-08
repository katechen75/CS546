(function ($) {
 
  let usernameInput = $('#username');
  let passwordInput = $('#password');
  let emailInput = $('#email');
  let genderInput = $('#genderSelect');
  let cityInput = $('#city');
  let signupForm = $('#signup-form')
  let submitButton = $('#loginButton');
  let formAlert = $('#error_username')
  let passAlert = $('#error_password')
  let emailAlert = $('#error_email')
  let cityAlert = $('#error_city')


 let submit_check = true

 usernameInput.blur(function(event){
  var userNameStr = usernameInput.val()
  if(!userNameStr){
    submit_check = false
    formAlert.show() 
    formAlert.html('You must enter username')
      return
 }
  else{
    formAlert.hide()
  }

 if (/\s/.test(userNameStr)) {
     submit_check = false   
     formAlert.show()
     formAlert.text('Username has spaces')
     return
 }
 else{
  formAlert.hide()
}
 
 if (!userNameStr.match(/^[a-z0-9]+$/i)) {
     submit_check = false    
     formAlert.text('Only alphanueric values allowed for username')
     formAlert.removeClass('hidden')
    usernameInput.focus()
      return
  }
  else{
    formAlert.hide()
  }
});

passwordInput.blur(function(event){
  var passwordStr = passwordInput.val()
  if(!passwordStr){
    submit_check = false
      passAlert.show()
      passAlert.html('Please enter password')
      return
  }
  else{
    passAlert.hide()
}

  if (/\s/.test(passwordStr)) {
    submit_check = false   
    passAlert.show()
    passAlert.text('Username has spaces')
    return
}
else{
    passAlert.hide()
}
});

emailInput.blur(function(event){
var myreg =/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
var emailStr = emailInput.val()
if(!emailStr){
  submit_check = false
  emailAlert.show() 
  emailAlert.html('You must enter email')
    return
}
else{
  emailAlert.hide()
}

if (/\s/.test(emailStr)) {
  submit_check = false   
  emailAlert.show()
  emailAlert.text('Username has spaces')
  return
}
else{
  emailAlert.hide()
}

if (!myreg.test(emailStr)) {
   submit_check = false   
   emailAlert.show()
   emailAlert.text('invalid email!')
   return
}
else{
   emailAlert.hide()
}
});

cityInput.blur(function(event){
var myreg =/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
var emailStr = emailInput.val()
var cityList = []
var cityStr = cityInput.val()
if(!cityStr){
  submit_check = false
  cityAlert.show() 
  cityAlert.html('You must enter email')
    return
}
else{
  cityAlert.hide()
}

if (/\s/.test(cityStr)) {
  submit_check = false   
  cityAlert.show()
  cityAlert.text('Username has spaces')
  return
}
else{
  cityAlert.hide()
}

if (!myreg.test(emailStr)) {
submit_check = false   
emailAlert.show()
emailAlert.text('invalid email!')
return
}
else{
emailAlert.hide()
}
});

signupForm.submit(function (event) {
if(submit_check===false)
{
  event.preventDefault();
}
else{
  signupForm.unbind().submit();
}
})

})(window.jQuery);
