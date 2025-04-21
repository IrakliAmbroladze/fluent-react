const likeButton = document.getElementById("likeButton");
likeButton.addEventListener("click", () => {
  const liked = likeButton.getAttribute("data-liked") === "true";
  const isPending = likeButton.getAttribute("data-pending") === "true";

  likeButton.setAttribute("data-pending", "true");
  likeButton.setAttribute("disabled", "true");

  fetch("/like", {
    method: "POST",
    body: JSON.stringify({ liked: !liked }),
  })
    .then(() => {
      likeButton.setAttribute("data-liked", !liked);
      likeButton.textContent = liked ? "Like" : "Liked";
      likeButton.removeAttribute("disabled");
    })
    .catch(() => {
      likeButton.setAttribute("data-failed", "true");
      likeButton.textContent = "Failed";
    })
    .finally(() => {
      likeButton.setAttribute("data-pending", "false");
    });
});
