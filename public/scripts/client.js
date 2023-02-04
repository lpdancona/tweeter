const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  $(".tweet-container").empty();
  for (let obj of tweets) {
    const $tweet = createTweetElement(obj);
    $(".tweet-container").prepend($tweet);
  }
};
// sanitize does not allow users to add code through textareas
const sanitize = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const createTweetElement = function (obj) {
  let $tweet = `
  <article class="users-tweet">
      <header class="user-tweet-header">
        <div class="avatar-info">
<div class="avatar-name">
        <img class="avatar"src=${obj.user.avatars} />
        <p class="username">${obj.user.name}</p>
      </div>
      <p class="userId">${obj.user.handle}</p>
    </div>
        <p class="info-avatar">${sanitize(obj.content.text)}</p>
      </header>
      <div class="line"></div>
      <footer class="user-tweet-footer">
        <p>${timeago.format(obj.created_at)}</p>
        <div class="symbols">
  <i class="fa-solid fa-flag"></i>
  <i class="fa-solid fa-retweet"></i>
  <i class="fa-solid fa-heart"></i>
</div>
      </footer>
    </article>
  `;
  return $tweet;
};
$(document).ready(function () {
  console.log("ready!");
  loadTweets();
  $("#create-tweet").on("submit", submit);
});
// get route with ajax
const loadTweets = function () {
  $.ajax({
    dataType: "json",
    url: "/tweets/",
    success: function (returnData) {
      console.log("success tweet fetched", returnData);
      renderTweets(returnData);
    },
  });
};

const submit = function (event) {
  event.preventDefault();
  $("#error").hide();
  if ($(this).find("textarea").val() == "") {
    return $("#error").text("The textarea is empty!").show();
  }
  if ($(this).find(".counter").val() < 0) {
    return $("#error")
      .text("The tweet excceds the limit of characters!")
      .show();
  }
  // Post route with ajax
  $.ajax({
    type: "POST",
    url: "/tweets/",
    data: $("#tweet-text").serialize(),
    success: function (returnData) {
      console.log("success tweet posted", returnData);
      $("textarea").val("");
      $("output").val("140");
      loadTweets();
    },
    error: function (result) {
      alert("Something went wrong");
    },
  });
};
const form = document.getElementById("form");

form.addEventListener("submit", function handleSubmit(event) {
  event.preventDefault();
  form.reset();
});
