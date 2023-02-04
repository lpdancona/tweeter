$(document).ready(function () {
  console.log("Hello Client");
  $("textarea").keyup(function () {
    const textLength = $(this).val().length;
    $("output").val(140 - textLength);
    if (textLength > 140) {
      $("output").css({ color: "red" });
    } else {
      $("output").css({ color: "inherit" });
    }
  });
});
