document.addEventListener("DOMContentLoaded", function () {
    // Generalized function for handling form submissions
    function handleFormSubmission(formId, url, responseDivId) {
        document.getElementById(formId).addEventListener("submit", function (event) {
            event.preventDefault();
            var formData = new FormData(this);
            var form = this; // Reference to the form element

            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    var responseDiv = document.getElementById(responseDivId);
                    responseDiv.innerHTML = "<p style='" + (data.status === 'success' ? "color: green;" : "color: red;") + "'>" + data.message + "</p>";

                    // Clear the form if the submission was successful
                    if (data.status === 'success') {
                        form.reset(); // Reset the form fields
                    }

                    loadEventsList();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    var responseDiv = document.getElementById(responseDivId);
                    responseDiv.innerHTML = "<p style='color: red;'>An error occurred.</p>";
                });
        });
    }

    // Initialize form submission handlers
    handleFormSubmission("addEventForm", "add_event.php", "addEventResponse");
    handleFormSubmission("removeEventForm", "remove_event_by_id.php", "removeEventResponse");
    handleFormSubmission("sendNewsletterForm", "email_sub.php", "sendNewsletterResponse");


    // Function to load and display events list
    function loadEventsList() {
        fetch("list_events.php")
            .then((response) => response.json())
            .then((data) => {
                var eventsListDiv = document.getElementById("eventsList");
                eventsListDiv.innerHTML = ""; // Clear current list
                data.forEach((event) => {
                    eventsListDiv.innerHTML +=
                        "<p>" +
                        "id:" +
                        event.id +
                        ",  " +
                        event.event_name +
                        " on " +
                        event.event_date +
                        ', Description: "' +
                        event.event_desc +
                        '"' +
                        "</p>"; // Append each event
                });
            })
            .catch((error) => console.error("Error:", error));
    }

    // Function to load and display subscriber count
    function loadSubscriberCount() {
        fetch("count_subs.php")
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("subscriberCount").textContent = data.row_count;
            })
            .catch((error) => console.error("Error:", error));
    }

    // Load these lists on page load
    loadEventsList();
    loadSubscriberCount();
});
