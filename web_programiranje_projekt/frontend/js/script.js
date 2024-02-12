document.addEventListener("DOMContentLoaded", function() {
  const registrationForm = document.getElementById("registration-form");
  const loginForm = document.getElementById("login-form");
  
  if (registrationForm) {
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      const formData = new FormData(registrationForm);

      const userData = {};
      formData.forEach((value, key) => {
        userData[key] = value;
      });
      
      
      fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById("message").textContent = data.message;
        window.location.href = "./login";
      })
      .catch(error => console.error("Error:", error));
    });
  }
  
  if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault(); 
      
      const formData = new FormData(loginForm);

      const userData = {};
      formData.forEach((value, key) => {
        userData[key] = value;
      });
      
      
      fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById("message").textContent = data.message;
        window.location.href = "./index"; 
      })
      .catch(error => console.error("Error:", error));
    });
  }

  const travelListContainer = document.getElementById("travel-list");

  if (travelListContainer) {
      fetch("http://localhost:5000/api/travels")
          .then(response => response.json())
          .then(travels => {
              travels.forEach(travel => {
                  const categoryId = travel.category.toString(); 
                  const fetchLink = `http://localhost:5000/api/categories/${categoryId}`;
                  const travelItem = document.createElement("div");
                  
                  fetch(fetchLink)
                      .then(response => response.json())
                      .then(category => {
                          travelItem.innerHTML = `
                              <h2>${travel.destination}</h2>
                              <p><strong>Location:</strong> ${travel.destination}</p>
                              <p><strong>Category:</strong> ${category.name}</p>
                          `;
                          
                          travelListContainer.appendChild(travelItem);
                      })
                      .catch(error => console.error("Error fetching category details:", error));
              });
          })
          .catch(error => console.error("Error fetching travel list:", error));
  }
});
