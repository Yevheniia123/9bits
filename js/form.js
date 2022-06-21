const tabsNav = document.querySelectorAll(".tabs-nav");
const tabsItem = document.querySelectorAll(".tabs-content ");
const disabledBtn = document.querySelectorAll(".disabled");
const inputName = document.querySelectorAll(".input-name");
const formRef = document.querySelector(".form");
const marketingName = document.querySelector(".marketingName");
const technicalName = document.querySelector(".technicalName");

tabsNav.forEach(onTabClick);

function onTabClick(item) {
  item.addEventListener("click", function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains("active")) {
      tabsNav.forEach(function (item) {
        item.classList.remove("active");
      });

      tabsItem.forEach(function (item) {
        item.classList.remove("active");
      });

      currentBtn.classList.add("active");
      currentTab.classList.add("active");
    }
  });
}
const toggleDisabled = (event) => {
  for (let item of disabledBtn) {
    item.classList.remove("disabled");
  }

  if (
    event.target.value.length === 0 ||
    marketingName.value.length === 0 ||
    technicalName.value.length === 0
  ) {
    for (let item of disabledBtn) {
      item.classList.add("disabled");
    }
  }
};

for (let item of inputName) {
  item.addEventListener("input", toggleDisabled);
}
const orderLocalSt = JSON.parse(localStorage.getItem("order"));
if (localStorage.getItem("order")) {
  marketingName.value = orderLocalSt.marketingName || "";
  technicalName.value = orderLocalSt.technicalName || "";
  if (marketingName.value.length > 0 || technicalName.value.length > 0) {
    for (let item of disabledBtn) {
      item.classList.remove("disabled");
    }
  }
}

const setLocalSt = (event) => {
  const order = {
    ...orderLocalSt,
    [event.target.dataset.name]: event.target.value,
  };

  localStorage.setItem("order", JSON.stringify(order));
};

formRef.addEventListener("input", setLocalSt);
