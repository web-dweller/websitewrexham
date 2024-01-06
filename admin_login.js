document.addEventListener("DOMContentLoaded", function () {
  // Function to handle login form submission
  function handleLoginSubmission() {
    var loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
      var formData = new FormData(this);

      fetch("check_admin.php", {
        // Replace 'login.php' with the actual PHP file that handles login
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Assuming the data object contains a 'status' and 'message'
          if (data.status === "success") {
            // Redirect to the admin panel or another page upon successful login
            window.location.href = "admin_panel.html"; // Replace with the correct URL
          } else {
            // Show the error message
            alert(data.message); // Or you can use a div to show messages
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while logging in.");
        });
    });
  }

  // Initialize login form submission handler
  handleLoginSubmission();
});
