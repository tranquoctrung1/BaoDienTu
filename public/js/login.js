function KiemTra() {
    if (username.value == '' || username.value == null) {
        alert("Tên đăng nhập không được trống!");
        username.focus();
        return false;
    }
    if (password.value == '' || password.value == null) {
        alert("Mật khẩu không được để trống");
        password.focus();
        return false;
    }
    return true;
}
$(".txtbox input").on("focus", function() {
    $(this).addClass("focus");

});

$(".txtbox input").on("blur", function() {
    if ($(this).val() == "")
        $(this).removeClass("focus");

});

$('#googlehref').click(function() {
    window.location.replace("/login/auth/google");
});
$('#facebookhref').click(function() {
    window.location.replace("/login/auth/facebook");
});