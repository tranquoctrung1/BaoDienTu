$(".txtbox input").on("focus", function() {
    $(this).addClass("focus");

});

$(".txtbox input").on("blur", function() {
    if ($(this).val() == "")
        $(this).removeClass("focus");

});