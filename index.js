let isDOBOpen = false;
let DOB;
const settingCog = document.querySelector(".fa-cog");
const settingContentEl = document.querySelector(".settingContent");
const initialTextel = document.querySelector("#initial");
const afterTextEl = document.querySelector("#after");
const dobButton = document.querySelector("#dobButton");
const dobInput = document.querySelector("#dobInput");

const yearEl = document.querySelector("#years");
const monthEl = document.querySelector("#months");
const dayEl = document.querySelector("#days");
const hourEl = document.querySelector("#hours");
const minuteEl = document.querySelector("#minutes");
const secondEl = document.querySelector("#seconds");

const makeTwoDigitNum = (num) => {
  return num > 9 ? num : `0${num}`;
};

const toggleDateOfBirthSelector = () => {
  if (isDOBOpen) {
    settingContentEl.classList.add("hide");
  } else {
    settingContentEl.classList.remove("hide");
  }
  isDOBOpen = !isDOBOpen;
  console.log(isDOBOpen);
};

const updateAge = () => {
  const currentDate = new Date();
  // console.log(currentDate);
  //const dateDiff = currentDate - DOB;
  // console.log(dateDiff);
  // const year = Math.floor(dateDiff/(1000*60*60*24*365.2425));
  // const month = Math.floor((dateDiff/(1000*60*60*24*365.2425))%12);
  // const day = Math.floor(dateDiff/(1000*60*60*24))%30;
  // const hour = Math.floor(dateDiff/(1000*60*60))%24;
  // const minute = Math.floor(dateDiff/(1000*60))%60;
  // const second = Math.floor(dateDiff/1000)%60;

  let year = currentDate.getFullYear() - DOB.getFullYear();
  let month = currentDate.getMonth() - DOB.getMonth();
  let day = currentDate.getDate() - DOB.getDate();
  let hour = currentDate.getHours() - DOB.getHours();
  let minute = currentDate.getMinutes() - DOB.getMinutes();
  let second = currentDate.getSeconds() - DOB.getSeconds();

  // Adjust for negative days
  if (second < 0) {
    second += 60;
    minute--;
  }

  if (minute < 0) {
    minute += 60;
    hour--;
  }

  if (hour < 0) {
    hour += 24;
    day--;
  }

  if (day < 0) {
    // Handle month rollover for days
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    day += previousMonth.getDate();
    month--;
  }

  if (month < 0) {
    month += 12;
    year--;
  }

  yearEl.innerHTML = makeTwoDigitNum(year);
  monthEl.innerHTML = makeTwoDigitNum(month);
  dayEl.innerHTML = makeTwoDigitNum(day);
  hourEl.innerHTML = makeTwoDigitNum(hour);
  minuteEl.innerHTML = makeTwoDigitNum(minute);
  secondEl.innerHTML = makeTwoDigitNum(second);
};
const setDOBHandler = () => {
  const dateString = dobInput.value;
  DOB = dateString ? new Date(dateString) : null;
  if (DOB) {
    setInterval(() => {
      updateAge();
    }, 1000);
    initialTextel.classList.add("hide");
    afterTextEl.classList.remove("hide");
  } else {
    afterTextEl.classList.add("hide");
    initialTextel.classList.remove("hide");
  }
};
setDOBHandler();

settingCog.addEventListener("click", toggleDateOfBirthSelector);
dobButton.addEventListener("click", setDOBHandler);
