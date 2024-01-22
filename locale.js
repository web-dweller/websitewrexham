document.addEventListener("DOMContentLoaded", function () {
  function loadLanguage(lang) {
    fetch(`languages/${lang}.php`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("home").textContent = data.home;
        document.getElementById("the_centre").textContent = data.the_centre;
        document.getElementById("contact").textContent = data.contact;
        document.getElementById("supporters").textContent = data.supporters;
        document.getElementById("about_us").textContent = data.about_us;
        document.getElementById("the_pub").textContent = data.the_pub;
        document.getElementById("board").textContent = data.board;
        switch (window.location.pathname) {
          case "/SaithSerenWebsite/":
          case "/SaithSerenWebsite/index.html": {
            document.getElementById("welcome").textContent = data.welcome;
            document.getElementById("welcome_text").textContent =
              data.welcome_text;
            document.getElementById("support_seith_seren").textContent =
              data.support_seith_seren;
            document.getElementById("support_seith_seren_text").textContent =
              data.support_seith_seren_text;
            document.getElementById("sup_cont_btn").textContent =
              data.sup_cont_btn;
            document.getElementById("opening_hours").textContent =
              data.opening_hours;
            document.getElementById("hours").innerHTML =
              data.hours.join("<br>");
            document.getElementById("upcoming_events").textContent =
              data.upcoming_events;
            document.getElementById("newsletter_signup").textContent =
              data.newsletter_signup;
            document.getElementById("firstName").placeholder = data.firstName;
            document.getElementById("lastName").placeholder = data.lastName;
            document.getElementById("email").placeholder = data.email;
            document.getElementById("signup").value = data.signup;
            break;
          }
          case "/SaithSerenWebsite/the-centre.html": {
            document.getElementById("welsh_centre").textContent =
              data.welsh_centre;
            document.getElementById("welsh_centre_text").textContent =
              data.welsh_centre_text;
            document.getElementById("support_seith_seren").textContent =
              data.support_seith_seren;
            document.getElementById("support_seith_seren_text").textContent =
              data.support_seith_seren_text;
            document.getElementById("sup_cont_btn").textContent =
              data.sup_cont_btn;
            document.getElementById("hours_centre").innerHTML =
              data.hours_centre.join("<br>");
            document.getElementById("opening_hours").textContent =
              data.opening_hours;
            document.getElementById("rooms_text").innerHTML =
              data.rooms_text.join("<br>");
            document.getElementById("rooms").textContent = data.rooms;

            document.getElementById("centre_photo1").textContent =
              data.centre_photo1;
            document.getElementById("centre_photo2").textContent =
              data.centre_photo2;
            break;
          }
          case "/SaithSerenWebsite/about-us.html": {
            document.getElementById("about_us1").textContent = data.about_us1;
            document.getElementById("about_us1").innerHTML = document
              .getElementById("about_us1")
              .innerHTML.replace("Saith Seren", "<b>Saith Seren</b>");
            document.getElementById("about_us2").textContent = data.about_us2;
            document.getElementById("about_us3").textContent = data.about_us3;
            document.getElementById("about_us4").textContent = data.about_us4;
            document.getElementById("about_us5").textContent = data.about_us5;
            break;
          }
          case "/SaithSerenWebsite/contact.html": {
            document.getElementById("contact1").textContent = data.contact;
            break;
          }
          case "/SaithSerenWebsite/supporters.html": {
            document.getElementById("supporters_text").textContent =
              data.supporters_text;
            break;
          }
        }
      });
  }

  function changeLanguage() {
    const currentLang = localStorage.getItem('preferredLang') || 'en';
    const newLang = currentLang === 'en' ? 'cy' : 'en';
    localStorage.setItem('preferredLang', newLang);
    updateLanguageIcon(newLang);
    loadLanguage(newLang);
  }

  function updateLanguageIcon(lang) {
    const langIcon = document.getElementById('currentLangIcon');
    if (lang === 'en') {
      langIcon.src = 'images/icons/united-kingdom.png';
      langIcon.alt = 'EN';
    } else {
      langIcon.src = 'images/icons/welsh-flag.jpg';
      langIcon.alt = 'CY';
    }
  }

  const defaultLang = "cy";
  const savedLang = localStorage.getItem('preferredLang') || defaultLang;
  updateLanguageIcon(savedLang);
  loadLanguage(savedLang);

  document.getElementById('langSwitch').addEventListener('click', changeLanguage);
});
