const tableWrapper = document.querySelector(".table-wrapper");
const switchInputs = document.querySelectorAll(".switch-wrapper input");
const prices = tableWrapper.querySelectorAll(".price");
const toggleClass = "hide";

for (const switchInput of switchInputs) {
  switchInput.addEventListener("input", function () {
    for (const price of prices) {
      price.classList.add(toggleClass);
    }
    const activePrices = tableWrapper.querySelectorAll(
      `.price.${switchInput.id}`
    );
    for (const activePrice of activePrices) {
      activePrice.classList.remove(toggleClass);
    }
  });
}

function activate(box) {
  var boxes = document.querySelectorAll(".heading");
  boxes.forEach(function (box) {
    box.classList.remove("active");
  });
  box.classList.add("active");
}

document.getElementById("nextBtn").addEventListener('click', ()=>{
  const activeDiv = document.querySelector('heading.active');

  if(activeDiv){
    const plan = activeDiv.innerHTML;

    axios.post(`/subscribe/${plan}`)
    .then(response => {
      window.location.href = '/dashboard';
    })
    .catch(error => {
      console.error('Plan Change Failed', error);
    });
  }
})