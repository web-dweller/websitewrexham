const SESSION_EXPIRATION_TIME = 3600;

const deleteEvent = async (eventId) => {
  const formData = new FormData();
  formData.append("eventId", eventId);
  return await fetch("../events/remove_event_by_id.php", {
    method: "POST",
    body: formData,
  }).then(() => location.reload());
};

const redirectToLogin = () => {
  window.location.href = "admin_login.html";
};

const checkSession = async () => {
  let sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    console.log("no session id");
    return redirectToLogin();
  }
  console.log(`session_id=${sessionId}`);
  const formData = new FormData();
  formData.append("session_id", sessionId);
  return await fetch("check_session.php", {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status !== 200) {
      console.error(response.status);
      localStorage.removeItem("session_id");
      redirectToLogin();
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  // Generalized function for handling form submissions

  checkSession() &&
    setInterval(async () => {
      await checkSession();
    }, 5000);

  function handleFormSubmission(formId, url, responseDivId) {
    document
      .getElementById(formId)
      .addEventListener("submit", function (event) {
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
            responseDiv.innerHTML =
              "<p style='" +
              (data.status === "success" ? "color: green;" : "color: red;") +
              "'>" +
              data.message +
              "</p>";

            // Clear the form if the submission was successful
            if (data.status === "success") {
              form.reset(); // Reset the form fields
            }

            loadEventsList();
          })
          .catch((error) => {
            console.error("Error:", error);
            var responseDiv = document.getElementById(responseDivId);
            responseDiv.innerHTML =
              "<p style='color: red;'>An error occurred.</p>";
          });
      });
  }

  // Initialize form submission handlers
  handleFormSubmission(
    "addEventForm",
    "../events/add_event.php",
    "addEventResponse"
  );
  handleFormSubmission(
    "sendNewsletterForm",
    "../subscribtion/email_sub.php",
    "sendNewsletterResponse"
  );

  // Function to load and display events list
  function loadEventsList() {
    fetch("../events/list_events.php")
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
                            <td>${event.event_start_time}</td>
                            <td>${event.event_end_time}</td>
                            <td>${event.event_desc}</td>
                            <td>
                                <button 
                                    onclick="deleteEvent(${event.id})" 
                                    style="background-color: red">DELETE
                                </button>
                            </td>
                        </tr>
                    `;
        });
        eventsTable.innerHTML = `
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                        ${eventsTableBody}
                    </table>`;
      })
      .catch((error) => console.error("Error:", error));
  }

  // Function to load and display subscriber count
  function loadSubscriberCount() {
    fetch("../subscribtion/count_subs.php")
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
