$(document).ready(function () {
  console.log("Hello Client");
  $("textarea").keyup(function () {
    const textLength = $(this).val().length;
    $(".counter").val(140 - textLength);
    if (textLength > 140) {
      $(".counter").css({ color: "red" });
    } else {
      $(".counter").css({ color: "inherit" });
    }
  });
});
