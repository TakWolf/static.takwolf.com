const root = document.documentElement;
const sizeInput = document.querySelector("#size");
const sizeOutput = document.querySelector("#size-output");
const leadingInput = document.querySelector("#leading");
const leadingOutput = document.querySelector("#leading-output");
const marksInput = document.querySelector("#marks");
const resetButton = document.querySelector("#reset");
const comparisonInput = document.querySelector("#comparison-input");
const comparisonSamples = document.querySelectorAll(".sync-text");
const readingCopy = document.querySelector("#reading-copy");
const fontTabs = document.querySelectorAll(".font-tab");

const updateSize = () => {
  const value = `${sizeInput.value}px`;
  root.style.setProperty("--display-size", value);
  sizeOutput.value = value;
};

const updateLeading = () => {
  const value = (Number(leadingInput.value) / 10).toFixed(1);
  root.style.setProperty("--display-leading", value);
  leadingOutput.value = value;
};

const updateMarks = () => {
  document.body.classList.toggle("marks-hidden", !marksInput.checked);
};

const updateComparison = () => {
  comparisonSamples.forEach((sample) => {
    sample.textContent = comparisonInput.value;
  });
};

const selectReadingFont = (selectedTab) => {
  fontTabs.forEach((tab) => tab.classList.toggle("active", tab === selectedTab));
  readingCopy.classList.remove("font-juha", "font-noto-sans", "font-noto-naskh", "font-noto-kufi", "font-system");
  readingCopy.classList.add(`font-${selectedTab.dataset.readingFont}`);
};

const resetControls = () => {
  sizeInput.value = "32";
  leadingInput.value = "15";
  marksInput.checked = true;
  updateSize();
  updateLeading();
  updateMarks();
};

sizeInput.addEventListener("input", updateSize);
leadingInput.addEventListener("input", updateLeading);
marksInput.addEventListener("change", updateMarks);
comparisonInput.addEventListener("input", updateComparison);
resetButton.addEventListener("click", resetControls);
fontTabs.forEach((tab) => tab.addEventListener("click", () => selectReadingFont(tab)));

updateSize();
updateLeading();
updateMarks();
updateComparison();
