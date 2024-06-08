document.addEventListener("DOMContentLoaded", () => {
  const gearBtn = document.getElementById("gear-btn");
  const formDiv = document.getElementById("form-div");
  const linkForm = document.getElementById("link-form");
  const linksDiv = document.getElementById("links-div");

  // Load stored links on startup
  chrome.storage.sync.get(["links"], (result) => {
    if (result.links) {
      result.links.forEach((link) => {
        addLinkToDOM(link.linkName, link.linkUrl);
      });
    }
  });

  // Add link form submission handler
  linkForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const linkName = document.getElementById("link-name").value;
    const linkUrl = document.getElementById("link-url").value;

    // Add link to storage
    chrome.storage.sync.get(["links"], (result) => {
      const links = result.links || [];
      links.push({ linkName, linkUrl });

      chrome.storage.sync.set({ links }, () => {
        addLinkToDOM(linkName, linkUrl);
        linkForm.reset();
        formDiv.classList.add("hidden");
      });
    });
  });

  // Toggle form visibility
  gearBtn.addEventListener("click", () => {
    formDiv.classList.toggle("hidden");
  });

  // Function to add link to the DOM
  function addLinkToDOM(linkName, linkUrl) {
    const linksElement = document.createElement("div");
    linksElement.className = "flex flex-col items-center w-20";
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${
      new URL(linkUrl).hostname
    }`;
    linksElement.innerHTML = `
      <a href="${linkUrl}" target="_blank">
        <div class="rounded-md border-none w-14 h-14 bg-cover bg-center bg-fixed">
          <img src="${faviconUrl}" alt="${linkName}" class="rounded-md w-full h-full" />
        </div>
        <div class="kanit-medium text-wrap text-center text-lg mt-2">
          <span>${linkName}</span>
        </div>
      </a>
    `;
    linksDiv.appendChild(linksElement);
  }
});

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
    "Saturday",
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

// Fetching quotes (this section doesn't seem to be utilized in the current example, so I commented it out)
// fetch("https://type.fit/api/quotes")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

setInterval(updateTime, 1000);

updateTime();
