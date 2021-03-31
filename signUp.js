const baseUrl = "https://backend-test-js-eovio.ondigitalocean.app/";
const signUpForm = document.forms.signUpForm;

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //get data
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value;

    //post data
    fetch(baseUrl + "register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    })
    .then((res) => res.json())
    .then((data) => {
      showNotification(data.status);

      e.target.elements.email.value = "";
      e.target.elements.password.value = "";
    });
})

//=========  F U N C T I O N S  ==========
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.classList.add("notification");
  notification.textContent = message;
  
  const span = document.createElement("span");
  span.textContent = "x";
  span.addEventListener("click", removeClass)

  notification.append(span);
  signUpForm.prepend(notification);
}

function removeClass() {
  const item = document.getElementById("notification");
  item.classList.remove("notification");
  item.textContent = "";
}