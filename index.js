document.addEventListener("DOMContentLoaded", function () {
  // Function to handle newsletter signup submission
  function handleNewsletterSignup() {
    var form = document.querySelector(".newsletter-signup-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(form);
      fetch("subscribe.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let responseDiv = document.getElementById("addEventResponse");
          responseDiv.innerHTML = `<p style="${
            data.status === "success" ? "color: green;" : "color: red;"
          }">
          ${data.message}</p>`;

          // Clear the form if the submission was successful
          if (data.status === "success") {
            form.reset(); // Reset the form fields
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  // Function to load and display upcoming events
  function loadUpcomingEvents() {
    fetch("list_events.php")
      .then((response) => response.json())
      .then((data) => {
        const contentDiv = document.getElementById("upcomingEventsContent");
        let contentHtml = "";
        data = data.sort((ev1, ev2) => {
          let dateA = new Date(ev1.event_date);
          let dateB = new Date(ev2.event_date);
          return dateA - dateB;
        });
        let today = new Date().toISOString().slice(0, 10);
        data.forEach((event) => {
          contentHtml += `<p style="${
            event.event_date === today ? "color: green;" : "color: black;"
          }">${event.event_name} - ${event.event_date}</p>`;
        });
        contentDiv.innerHTML = contentHtml;
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("upcomingEventsContent").innerHTML =
          "<p>An error occurred while loading events.</p>";
      });
  }

  // Load upcoming events on page load
  loadUpcomingEvents();

  // Initialize the newsletter signup form handler
  handleNewsletterSignup();
});
