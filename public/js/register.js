$(".txtb input").on("focus", function() {
    $(this).addClass("focus");
});

$(".txtb input").on("blur", function() {
    if ($(this).val() == "")
        $(this).removeClass("focus");

});
var today = new Date();

var namhientai = today.getFullYear();

var yyyynam = document.querySelector('.yyyynam');
for (let index = 1970; index <= namhientai; index++) {
    var option = document.createElement('option');
    option.setAttribute('value', index);
    option.innerText = index;
    yyyynam.append(option);
}

var mmthang = document.querySelector('.mmthang');
for (let index = 1; index <= 12; index++) {
    var option = document.createElement('option');
    option.setAttribute('value', index);
    option.innerText = index;
    mmthang.append(option);
}

var ddngay = document.querySelector('.ddngay');
for (let index = 1; index <= 31; index++) {
    var option = document.createElement('option');
    option.setAttribute('value', index);
    option.innerText = index;
    ddngay.append(option);
}

// mảng các tỉnh/thành phố
// var arr = ["Thành phố Hà Nội", "Tỉnh Hà Giang", "Tỉnh Cao Bằng", "Tỉnh Bắc Kạn", "Tỉnh Tuyên Quang", "Tỉnh Lào Cai", "Tỉnh Điện Biên", "Tỉnh Lai Châu", "Tỉnh Sơn La", "Tỉnh Yên Bái", "Tỉnh Hoà Bình", "Tỉnh Thái Nguyên", "Tỉnh Lạng Sơn", "Tỉnh Quảng Ninh", "Tỉnh Bắc Giang", "Tỉnh Phú Thọ", "Tỉnh Vĩnh Phúc", "Tỉnh Bắc Ninh", "Tỉnh Hải Dương", "Thành phố Hải Phòng", "Tỉnh Hưng Yên", "Tỉnh Thái Bình", "Tỉnh Hà Nam", "Tỉnh Nam Định", "Tỉnh Ninh Bình", "Tỉnh Thanh Hóa", "Tỉnh Nghệ An", "Tỉnh Hà Tĩnh", "Tỉnh Quảng Bình", "Tỉnh Quảng Trị", "Tỉnh Thừa Thiên Huế", "Thành phố Đà Nẵng", "Tỉnh Quảng Nam", "Tỉnh Quảng Ngãi", "Tỉnh Bình Định", "Tỉnh Phú Yên", "Tỉnh Khánh Hòa", "Tỉnh Ninh Thuận", "Tỉnh Bình Thuận", "Tỉnh Kon Tum", "Tỉnh Gia Lai", "Tỉnh Đắk Lắk", "Tỉnh Đắk Nông", "Tỉnh Lâm Đồng", "Tỉnh Bình Phước", "Tỉnh Tây Ninh", "Tỉnh Bình Dương", "Tỉnh Đồng Nai", "Tỉnh Bà Rịa - Vũng Tàu", "Thành phố Hồ Chí Minh", "Tỉnh Long An", "Tỉnh Tiền Giang", "Tỉnh Bến Tre", "Tỉnh Trà Vinh", "Tỉnh Vĩnh Long", "Tỉnh Đồng Tháp", "Tỉnh An Giang", "Tỉnh Kiên Giang", "Thành phố Cần Thơ", "Tỉnh Hậu Giang", "Tỉnh Sóc Trăng", "Tỉnh Bạc Liêu", "Tỉnh Cà Mau"];


// var thanhpho = document.querySelector('.thanhpho')
// for (let index = 0; index < arr.length; index++) {
//     var option = document.createElement('option');
//     option.setAttribute('value', arr[index]);
//     option.innerText = arr[index];
//     thanhpho.append(option);

// }

const userdangnhap = document.getElementById('userdangnhap');
const passworddangnhap = document.getElementById('passworddangnhap');
const kiemtrapassworddangnhap = document.getElementById('kiemtrapassworddangnhap');
const hoten = document.getElementById('hoten');
const ngay = document.getElementById('ddngay');
const thang = document.getElementById('mmthang');
const nam = document.getElementById('yyyynam');
const loaiuser = document.getElementById('thanhpho');
const email = document.getElementById('email');
const phone = document.getElementById('phone');





function KiemtraDangKy() {
    var check = 1;
    if (isNaN(parseInt(ngay.value))) {
        alert("Mời bạn chọn thành ngày!");
        ngay.focus();
        check = 0;
    } else if (isNaN(parseInt(thang.value))) {
        alert("Mời bạn chọn thành tháng!");
        thang.focus();
        check = 0;
    } else if (isNaN(parseInt(nam.value))) {
        alert("Mời bạn chọn thành năm!");
        nam.focus();
        check = 0;
    } else if (hoten.value == '' || hoten.value == null) {
        alert("Họ tên không được để trống!");
        hoten.focus();
        check = 0;
    } else if (userdangnhap.value == '' || userdangnhap.value == null) {
        alert("Tên đăng nhập không được để trống!");
        userdangnhap.focus();
        check = 0;
    } else if (passworddangnhap.value == '' || passworddangnhap.value == null) {
        alert("Mật khẩu không được để trống!");
        passworddangnhap.focus();
        check = 0;
    } else if (kiemtrapassworddangnhap.value == '' || kiemtrapassworddangnhap.value == null) {
        alert("Nhập lại mật khẩu không được để trống!");
        kiemtrapassworddangnhap.focus();
        check = 0;
    } else if (kiemtrapassworddangnhap.value !== passworddangnhap.value) {
        alert("Xác nhận mật khẩu không trùng với mật khẩu!");
        check = 0;
    } else if (email.value == '') {
        alert("Email không được để trống!");
        check = 0;
    } else if (phone.value == '') {
        alert("Điện Thoại không được để trống!");
        check = 0;
    } else {
        var abc = userdangnhap.value;
        $.ajax({
            url: `/login/check?UserName=${abc}`,
            type: 'get',
            async: false,
            success: function(data) {
                if (data === false) {
                    alert("User Trùng rồi!");
                    check = 0;
                }
            }
        });
    }

    if (check == 0) {
        return false;
    } else {
        return true;
    }

}


$('.thanhpho').on('change', function() {
    var abc = $("#loaiuser").val();
    if (abc == 3) {
        $('.penname').addClass('pennameactive');
    } else {
        $('.penname').removeClass('pennameactive');
    }
});