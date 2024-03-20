const form = document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');
const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.top-banner .cities');

const apiKey = "d085d2a40b9786cac534ac5ba19d6ac3";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

const listItems = list.querySelectorAll('.ajax-section .city');
const listItemsArray = Array.from(listItems);

if (listItemsArray.length > 0){
    const filteredArray = listItemsArray.filter(el => {
        let content = "";
        //Athens,gr
        if(inputVal.split(",")){
            if(inputVal.split(",")[1].length > 2){
                inputVal = inputVal.split(",")[0];
                content = el
                .querySelector(".city-name span")
                .textContent.toLocaleLowerCase();
            } else {
                content = el.querySelector(".city-name").CDATA_SECTION_NODE.name.toLocaleLowerCase();
            }
            return content == inputVal.toLocaleLowerCase()
        }
    });
    if(filteredArray.length > 0){
        msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent} ...otherwise be more specific by providing the country code as well🥱`;
        form.reset();
        input.focus();
        return;
    }
}

const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
//const url = https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});
