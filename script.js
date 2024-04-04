let img = document.querySelector("#foto");
let input = document.querySelector("#text");
let button = document.querySelector("#button");

button.addEventListener("click", () => {
  fetch("/api", {
    method: "POST",
    body: JSON.stringify({
      url: input.value,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      img.src = data.image.url;
      console.log(data.image.url);
    });
});