const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");
const repeatNewPassword = document.getElementById("repeatNewPassword");
const changePasswordForm = document.getElementById("changePasswordForm");
const err = document.getElementById("err");

function checkFormChangePassword() {
  if (oldPassword.value == "") {
    err.innerHTML = "Mật khẩu cũ trống !";
    return false;
  } else if (newPassword.value == "") {
    err.innerHTML = "Mật khẩu mới trống !";
    return false;
  } else if (newPassword.value == "") {
    err.innerHTML = "Nhập lại mật khẩu mới trống !";
    return false;
  } else if (newPassword.value !== repeatNewPassword.value) {
    err.innerHTML = "Mật khẩu mới và nhập lại mật khẩu mới không trùng khớp !";
    return false;
  } else if (
    oldPassword.value !== "" &&
    newPassword.value !== "" &&
    newPassword.value !== "" &&
    newPassword.value == repeatNewPassword.value
  )
    return true;

  return false;
}
