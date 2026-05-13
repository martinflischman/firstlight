const userName = document.getElementById("user-name");
const cryptoStats = document.getElementById("crypto-stats");
const currentTime = document.getElementById("current-time");
const weatherIcon = document.getElementById("weather-icon");
const weatherTemp = document.getElementById("weather-temp");
const weatherCity = document.getElementById("weather-city");

// background image
try {
  const response = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature",
  );
  const data = await response.json();
  document.body.style.backgroundImage = `url(${data.urls.full})`;
  userName.textContent = `Image by: ${data.user.name}`;
} catch (error) {
  document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1555861496-0666c8981751?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`;
  userName.textContent = "Image by: Sarah Kilian";
  console.log(error);
}

// crypto
try {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/dogecoin",
  );
  if (!response.ok) throw Error("Something went wrong");
  const data = await response.json();
  cryptoStats.innerHTML = `
    <div class="flex gap-2 pb-2 items-center">
      <img src="${data.image.small}" alt="Crypto logo">
      <h1 class="text-2xl">${data.name}</h1>
    </div>
    <p class="text-xl">🎯: $${data.market_data.current_price.usd}</p>
    <p class="text-xl">👆: $${data.market_data.high_24h.usd}</p>
    <p class="text-xl">👇: $${data.market_data.low_24h.usd}</p>
  `;
} catch (error) {
  console.log(error);
}

// time
function getTime() {
  const date = new Date();
  currentTime.textContent = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

getTime();
setInterval(getTime, 1000);

// weather
const getPosition = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject),
  );

try {
  const position = await getPosition();
  const response = await fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`,
  );
  if (!response.ok) throw Error("Weather data not available");
  const data = await response.json();
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  weatherTemp.textContent = `${Math.round(data.main.temp)}°`;
  weatherCity.textContent = data.name;
} catch (error) {
  console.error(error);
}
