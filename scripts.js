window.addEventListener("DOMContentLoaded", (e) => {
  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");

  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(document.querySelectorAll("#navbarResponsive .nav-link"));

  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // Handle form submission
  const form = document.querySelector("#form");
  const resultsEl = document.querySelector("#results");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fields = e.currentTarget.querySelectorAll("input");
    const enteredValues = [...fields].map((field) => +field.value);
    const results = calcResults(enteredValues);

    addValuesToView(results);

    resultsEl.classList.remove("d-none");
  });
});

function calcResults(values = []) {
  const max = calcMaximum(values);
  const min = calcMinimum(values);
  const mean = calcMean(values);
  const median = calcMedian(values);
  const range = max - min;

  return [max, min, mean, median, range];
}

function calcMaximum(values = []) {
  return Math.max(...values);
}

function calcMinimum(values = []) {
  return Math.min(...values);
}

function calcMean(values = []) {
  const mean = values.reduce((prevVal, currVal) => prevVal + currVal, 0) / values.length;
  return mean;
}

function calcMedian(values = []) {
  const sorted = values.sort((a, b) => a - b);
  let median;

  if (sorted.length % 2 === 0) {
    const [a, b] = [sorted.length / 2, sorted.length / 2 - 1];
    median = (sorted[a] + sorted[b]) / 2;
  } else {
    median = sorted[(sorted.length - 1) / 2];
  }

  return median;
}

function addValuesToView(results) {
  const [max, min, mean, median, range] = results;

  document.querySelector("[data-max]").innerText = `Max = ${max}`;
  document.querySelector("[data-min]").innerText = `Min = ${min}`;
  document.querySelector("[data-mean]").innerText = `Mean = ${roundToNearestTenth(mean)}`;
  document.querySelector("[data-median]").innerText = `Median = ${roundToNearestTenth(median)}`;
  document.querySelector("[data-range]").innerText = `Range = ${range}`;
}

function roundToNearestTenth(num) {
  const isInteger = Number.isInteger(num);

  return isInteger ? num : num.toFixed(1);
}
