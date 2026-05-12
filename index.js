const userName = document.getElementById("user-name");

async function bgImage() {
  try {
    const response = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature",
    );
    const data = await response.json();

    console.log(data.urls.regular);

    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    userName.textContent = `Image by: ${data.user.name}`;
  } catch (error) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1555861496-0666c8981751?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`;
    userName.textContent = "Image by: Sarah Kilian";

    console.log(error);
  }
}

bgImage();
