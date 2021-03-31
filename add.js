if(localStorage.getItem("userid")) {
  const baseUrl = "https://backend-test-js-eovio.ondigitalocean.app/";
  const addCourseForm = document.forms.addCourseForm;
  
  addCourseForm.addEventListener("submit", (e) => {
      e.preventDefault();
 
      //logOut button
      document.getElementById("logOut").addEventListener("click", (e)=> {
        logOut();
      })

      //get data
      const userid = localStorage.getItem("userid");
      const title = e.target.elements.name.value.trim();
      const image = e.target.elements.image.value.trim();
      const price = {
          old: Number(e.target.elements.oprice.value),
          new: Number(e.target.elements.nprice.value)
      }
      const length = Number(e.target.elements.vlength.value);
      const params = {
          game: Boolean(e.target.elements.check1.checked),
          beginner: Boolean(e.target.elements.check2.checked),
          cc: Boolean(e.target.elements.check3.checked)
      }
  
      //post data
      fetch(baseUrl + "add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userid, title, image, price, length, params}),
      })
      .then((res) => res.json())
      .then((data) => {
          if (data.status.toLowerCase().includes("ok")) {
              showNotification(data.status);
  
              e.target.elements.name.value = "";
              e.target.elements.image.value = "";
              e.target.elements.oprice.value = "";
              e.target.elements.nprice.value = "";
              e.target.elements.vlength.value = "";
              e.target.elements.check1.checked = false;
              e.target.elements.check2.checked = false;
              e.target.elements.check3.checked = false;
              
          } else {
              showNotification(data.status);   
          }
      });
  })
  
  //=========  F U N C T I O N S  ==========
  function logOut() {
    localStorage.removeItem("userid");
    localStorage.removeItem("fetch-path");
    location.replace("login.html");
  }

  function showNotification(message) {
    //notification box
    const notification = document.getElementById("notification");
    notification.classList.add("notification");
    notification.textContent = message;
    
    //close button
    const span = document.createElement("span");
    span.textContent = "x";
    span.addEventListener("click", removeClass)
  
    //appending
    notification.append(span);
    addCourseForm.prepend(notification);
  }
  
  function removeClass() {
    const item = document.getElementById("notification");
    item.classList.remove("notification");
    item.textContent = "";
  }
} else {
  location.replace("login.html");
}
