const deleteEvent = async (eventId) => {
    const formData = new FormData();
    formData.append("eventId", eventId);
    return await fetch("remove_event_by_id.php", {
        method: "POST",
        body: formData,
    }).then(()=> location.reload())
}

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
    handleFormSubmission("sendNewsletterForm", "email_sub.php", "sendNewsletterResponse");


    // Function to load and display events list
    function loadEventsList() {
        fetch("list_events.php")
            .then((response) => response.json())
            .then((data) => {
                const eventsTable = document.getElementById("eventsList");
                let eventsTableBody = "";
                eventsTable.innerHTML = "Loading data..."; // Clear current list
                data.forEach((event) => {
                    eventsTableBody += `
                        <tr>
                            <td>${event.id}</td>
                            <td>${event.event_name}</td>
                            <td>${event.event_date}</td>
                            <td>${event.event_desc}</td>
                            <td>
                                <button 
                                    onclick="deleteEvent(${event.id})" 
                                    style="background-color: red">DELETE
                                </button>
                            </td>
                        </tr>
                    `
                });
                eventsTable.innerHTML = `
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                        ${eventsTableBody}
                    </table>`
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