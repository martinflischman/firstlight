const userName = document.getElementById("user-name");

async function bgImage() {
  const response = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature",
  );
  const data = await response.json();

  document.body.style.backgroundImage = `url(${data.urls.regular})`;

  userName.textContent = `Photo by: ${data.user.name}`;

  console.log(data);
}

bgImage();
