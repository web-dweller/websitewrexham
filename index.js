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
            data.status === "success"
              ? "color: green;"
              : data.status === "duplicate"
              ? "color: yellow;"
              : "color: red;"
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
        // Assuming 'data' is an array of events
        data.forEach((event) => {
          // Modify this template to match your data structure and desired HTML format
          contentHtml += `<p>${event.event_name} - ${event.event_date}</p>`;
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


/*********************************************************************************/
/* Carousel Logic                                                                */
/*********************************************************************************/

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
