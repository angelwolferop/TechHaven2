var refresh_rate = 300;
var last_user_action = 0;
var has_focus = false;
var has_no_focus = true;
var lost_focus_count = 0;
var focus_margin = 10;

function reset() {
  last_user_action = 0;
  updateVisualTimer('Reset Timer');
}

function updateVisualTimer(value) {
  var element = document.getElementById('refreshTimer');
  if (value) {
    element.value = value
  } else if (has_focus) {
    element.value = 'User has focuse won\'t refresh'
  } else {
    element.value = (refresh_rate - last_user_action);
  }
}

function windowHasFocus() {
  has_focus = true;
}

function windowLostFocus() {
  has_focus = false;
  lost_focus_count++;
  console.log(lost_focus_count + " <~ Lost Focus");
}

setInterval(function() {
  last_user_action++;
  refreshCheck();
  updateVisualTimer();
}, 1000);

function refreshCheck() {
  var focus = window.onfocus;
  if ((last_user_action >= refresh_rate && !has_focus && document.readyState == "complete") || lost_focus_count > focus_margin) {
    window.location.replace('http://127.0.0.1:5000/login');
    alert('Your session has expired after 5 minute due to inactive, you have been logged out and Please login in again to buy our product');
    reset();
  }

}
window.addEventListener("focus", windowHasFocus, false);
window.addEventListener("blur", windowLostFocus, false);
window.addEventListener("click", reset, false);
window.addEventListener("mousemove", reset, false);
window.addEventListener("keypress", reset, false);
window.addEventListener("scroll", reset, false);
document.addEventListener("touchMove", reset, false);
document.addEventListener("touchEnd", reset, false);
