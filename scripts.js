function updateTime() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Display Clock
  const clock = document.getElementById("time-now");
  clock.textContent = `${hours} : ${minutes} ${ampm}`;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[now.getMonth()];

  const dateNow = document.getElementById("date-day");
  dateNow.textContent = `${day} ${month} ${date}`;

  const greeting = document.getElementById("greeting");
  const currentTime = now.getHours();
  let greetingMessage;

  if (currentTime < 12) {
    greetingMessage = "Good Morning, Danny!";
  } else if (currentTime < 18) {
    greetingMessage = "Good Afternoon, Danny!";
  } else {
    greetingMessage = "Good Evening, Danny!";
  }

  greeting.textContent = greetingMessage;
}

setInterval(updateTime, 1000);

updateTime();
