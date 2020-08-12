const newPassword = document.getElementById("newPassword");
const repeatNewPassword = document.getElementById("repeatNewPassword");
const err = document.getElementById("err");

function check() {
  if (newPassword.value == "") {
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
