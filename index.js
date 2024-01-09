document.addEventListener("DOMContentLoaded", function () {
    // Function to handle newsletter signup submission
    function handleNewsletterSignup() {
        var form = document.querySelector(".newsletter-signup-form");
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var formData = new FormData(form);
            fetch("subscribtion/subscribe.php", {
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
        fetch("events/list_events.php")
            .then((response) => response.json())
            .then((data) => {
                const contentDiv = document.getElementById("upcomingEventsContent");
                contentDiv.innerHTML = ""; // Clear existing content

                data = data.sort((ev1, ev2) => new Date(ev1.event_date) - new Date(ev2.event_date));
                let today = new Date().toISOString().slice(0, 10);

                data.forEach((event, index) => {
                    const accordionItem = document.createElement("div");
                    accordionItem.className = "accordion-item";

                    const title = `<h4>${event.event_name} - ${event.event_date} at ${event.event_start_time.slice(0, -3)}-${event.event_end_time.slice(0, -3)}</h4>`;
                    const arrow = `<span class="arrow">&#9660;</span>`;
                    accordionItem.innerHTML = `<div class="accordion-title" onclick="toggleAccordion(event, ${index})">${title}${arrow}</div>`;

                    const content = document.createElement("div");
                    content.className = "accordion-content";
                    content.innerHTML = `<p>${event.event_desc}</p>`;
                    accordionItem.appendChild(content);

                    contentDiv.appendChild(accordionItem);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
                document.getElementById("upcomingEventsContent").innerHTML = "<p>An error occurred while loading events.</p>";
            });
    }

    // Load upcoming events on page load
    loadUpcomingEvents();

    // Initialize the newsletter signup form handler
    handleNewsletterSignup();
});

/* Accordion button logic */

function toggleAccordion(event, index) {
    const content = event.currentTarget.parentElement.querySelector(".accordion-content");
    content.style.display = content.style.display === "block" ? "none" : "block";

    const arrow = event.currentTarget.querySelector('.arrow');
    arrow.style.transform = content.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
}

/*********************************************************************************/
/* Carousel Logic                                                                */
/*********************************************************************************/

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
