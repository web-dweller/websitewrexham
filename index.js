document.addEventListener("DOMContentLoaded", function () {

    // Function to handle newsletter signup submission
    function handleNewsletterSignup() {
        var form = document.querySelector('.newsletter-signup-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var formData = new FormData(form);
            fetch('your_backend_file.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // You can add more code here to handle the response
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }

    // Function to load and display upcoming events
    function loadUpcomingEvents() {
        fetch("path_to_your_php_file.php")
            .then(response => response.json())
            .then(data => {
                const contentDiv = document.getElementById("upcomingEventsContent");
                let contentHtml = "";
                // Assuming 'data' is an array of events
                data.forEach(event => {
                    // Modify this template to match your data structure and desired HTML format
                    contentHtml += `<p>${event.name} - ${event.date}</p>`;
                });
                contentDiv.innerHTML = contentHtml;
            })
            .catch(error => {
                console.error("Error:", error);
                document.getElementById("upcomingEventsContent").innerHTML = "<p>An error occurred while loading events.</p>";
            });
    }

    // Load upcoming events on page load
    loadUpcomingEvents();

    // Initialize the newsletter signup form handler
    handleNewsletterSignup();
});