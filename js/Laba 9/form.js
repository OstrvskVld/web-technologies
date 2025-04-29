document.addEventListener("DOMContentLoaded", function () {
  
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const switchToSignup = document.getElementById("switchToSignup");
  const switchToLogin = document.getElementById("switchToLogin");
  const backToLogin = document.getElementById("backToLogin");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");

      
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

    
      tabContents.forEach((content) => content.classList.remove("active"));
      document.getElementById(tabId).classList.add("active");
    });
  });

  switchToSignup.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('.tab[data-tab="signup"]').click();
  });

  switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('.tab[data-tab="login"]').click();
  });

  backToLogin.addEventListener("click", () => {
    document.querySelector('.tab[data-tab="login"]').click();
    document.getElementById("successMessage").style.display = "none";
    document.getElementById("signup").style.display = "block";
  });

 
  document.querySelectorAll(".toggle-password").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const input = document.getElementById(targetId);
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
    });
  });

  
  const countrySelect = document.getElementById("country");
  const citySelect = document.getElementById("city");

  const citiesByCountry = {
    ua: ["Kyiv", "Lviv", "Kharkiv", "Odesa", "Dnipro"],
    pl: ["Warsaw", "Krakow", "Gdansk", "Wroclaw", "Poznan"],
    de: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
    fr: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
  };

  countrySelect.addEventListener("change", function () {
    const selectedCountry = this.value;

    if (selectedCountry) {
      citySelect.disabled = false;
      citySelect.innerHTML = '<option value="">Select city</option>';

      citiesByCountry[selectedCountry].forEach((city) => {
        const option = document.createElement("option");
        option.value = city.toLowerCase();
        option.textContent = city;
        citySelect.appendChild(option);
      });
    } else {
      citySelect.disabled = true;
      citySelect.innerHTML = '<option value="">Select city</option>';
    }
  });

  
  function validateFirstName() {
    const firstName = document.getElementById("firstName").value.trim();
    const errorElement = document.getElementById("firstNameError");

    if (firstName.length < 3 || firstName.length > 15) {
      showError(
        "firstName",
        errorElement,
        "First name must be 3-15 characters"
      );
      return false;
    } else {
      showSuccess("firstName");
      hideError(errorElement);
      return true;
    }
  }

  function validateLastName() {
    const lastName = document.getElementById("lastName").value.trim();
    const errorElement = document.getElementById("lastNameError");

    if (lastName.length < 3 || lastName.length > 15) {
      showError("lastName", errorElement, "Last name must be 3-15 characters");
      return false;
    } else {
      showSuccess("lastName");
      hideError(errorElement);
      return true;
    }
  }

  function validateUsername() {
    const username = document.getElementById("username").value.trim();
    const errorElement = document.getElementById("usernameError");

    if (username.length === 0) {
      showError("username", errorElement, "Please choose a username");
      return false;
    } else {
      showSuccess("username");
      hideError(errorElement);
      return true;
    }
  }

  function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const errorElement = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showError("email", errorElement, "Please provide a valid email");
      return false;
    } else {
      showSuccess("email");
      hideError(errorElement);
      return true;
    }
  }

  function validatePassword() {
    const password = document.getElementById("password").value;
    const errorElement = document.getElementById("passwordError");

    if (password.length < 6) {
      showError(
        "password",
        errorElement,
        "Password must be at least 6 characters"
      );
      return false;
    } else {
      showSuccess("password");
      hideError(errorElement);
      return true;
    }
  }

  function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorElement = document.getElementById("confirmPasswordError");

    if (password !== confirmPassword) {
      showError("confirmPassword", errorElement, "Passwords don't match");
      return false;
    } else if (confirmPassword.length === 0) {
      showError(
        "confirmPassword",
        errorElement,
        "Please confirm your password"
      );
      return false;
    } else {
      showSuccess("confirmPassword");
      hideError(errorElement);
      return true;
    }
  }

  function validatePhone() {
    const phone = document.getElementById("phone").value.trim();
    const errorElement = document.getElementById("phoneError");
    const phoneRegex = /^\+380\d{9}$/;

    if (!phoneRegex.test(phone)) {
      showError(
        "phone",
        errorElement,
        "Please provide a valid Ukrainian phone number (+380...)"
      );
      return false;
    } else {
      showSuccess("phone");
      hideError(errorElement);
      return true;
    }
  }

  function validateBirthDate() {
    const birthDate = document.getElementById("birthDate").value;
    const errorElement = document.getElementById("birthDateError");

    if (!birthDate) {
      showError("birthDate", errorElement, "Please enter your date of birth");
      return false;
    }

    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    if (birthDateObj > today) {
      showError(
        "birthDate",
        errorElement,
        "Date of birth cannot be in the future"
      );
      return false;
    } else if (age < 12) {
      showError(
        "birthDate",
        errorElement,
        "You must be at least 12 years old to register"
      );
      return false;
    } else {
      showSuccess("birthDate");
      hideError(errorElement);
      return true;
    }
  }

  function validateSex() {
    const sexSelected = document.querySelector('input[name="sex"]:checked');
    const errorElement = document.getElementById("sexError");

    if (!sexSelected) {
      showError("male", errorElement, "Please select your sex");
      showError("female", errorElement, "");
      return false;
    } else {
      showSuccess("male");
      showSuccess("female");
      hideError(errorElement);
      return true;
    }
  }

  function validateCountry() {
    const country = document.getElementById("country").value;
    const errorElement = document.getElementById("countryError");

    if (!country) {
      showError("country", errorElement, "Please select a country");
      return false;
    } else {
      showSuccess("country");
      hideError(errorElement);
      return true;
    }
  }

  function validateCity() {
    const city = document.getElementById("city").value;
    const errorElement = document.getElementById("cityError");

    if (!city) {
      showError("city", errorElement, "Please select a city");
      return false;
    } else {
      showSuccess("city");
      hideError(errorElement);
      return true;
    }
  }

  function validateTerms() {
    const termsChecked = document.getElementById("terms").checked;
    const errorElement = document.getElementById("termsError");

    if (!termsChecked) {
      showError("terms", errorElement, "You must agree before submitting");
      return false;
    } else {
      showSuccess("terms");
      hideError(errorElement);
      return true;
    }
  }

  function validateLoginUsername() {
    const username = document.getElementById("loginUsername").value.trim();
    const errorElement = document.getElementById("loginUsernameError");

    if (username.length === 0) {
      showError("loginUsername", errorElement, "Please enter your username");
      return false;
    } else {
      showSuccess("loginUsername");
      hideError(errorElement);
      return true;
    }
  }

  function validateLoginPassword() {
    const password = document.getElementById("loginPassword").value;
    const errorElement = document.getElementById("loginPasswordError");

    if (password.length < 6) {
      showError(
        "loginPassword",
        errorElement,
        "Password must be at least 6 characters"
      );
      return false;
    } else {
      showSuccess("loginPassword");
      hideError(errorElement);
      return true;
    }
  }

  
  function showError(fieldId, errorElement, message) {
    const field = document.getElementById(fieldId);
    field.classList.add("error");
    field.classList.remove("success");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function showSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove("error");
    field.classList.add("success");
  }

  function hideError(errorElement) {
    errorElement.style.display = "none";
  }

  
  document
    .getElementById("firstName")
    .addEventListener("blur", validateFirstName);
  document
    .getElementById("lastName")
    .addEventListener("blur", validateLastName);
  document
    .getElementById("username")
    .addEventListener("blur", validateUsername);
  document.getElementById("email").addEventListener("blur", validateEmail);
  document
    .getElementById("password")
    .addEventListener("blur", validatePassword);
  document
    .getElementById("confirmPassword")
    .addEventListener("blur", validateConfirmPassword);
  document.getElementById("phone").addEventListener("blur", validatePhone);
  document
    .getElementById("birthDate")
    .addEventListener("blur", validateBirthDate);
  document.querySelectorAll('input[name="sex"]').forEach((radio) => {
    radio.addEventListener("change", validateSex);
  });
  document
    .getElementById("country")
    .addEventListener("change", validateCountry);
  document.getElementById("city").addEventListener("change", validateCity);
  document.getElementById("terms").addEventListener("change", validateTerms);
  document
    .getElementById("loginUsername")
    .addEventListener("blur", validateLoginUsername);
  document
    .getElementById("loginPassword")
    .addEventListener("blur", validateLoginPassword);

  
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const isFirstNameValid = validateFirstName();
      const isLastNameValid = validateLastName();
      const isUsernameValid = validateUsername();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      const isConfirmPasswordValid = validateConfirmPassword();
      const isPhoneValid = validatePhone();
      const isBirthDateValid = validateBirthDate();
      const isSexValid = validateSex();
      const isCountryValid = validateCountry();
      const isCityValid = validateCity();
      const isTermsValid = validateTerms();

      if (
        isFirstNameValid &&
        isLastNameValid &&
        isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isPhoneValid &&
        isBirthDateValid &&
        isSexValid &&
        isCountryValid &&
        isCityValid &&
        isTermsValid
      ) {
        
        setTimeout(() => {
          this.reset();
          document.getElementById("signup").style.display = "none";
          document.getElementById("successMessage").style.display = "block";
        }, 1000);
      }
    });

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const isUsernameValid = validateLoginUsername();
    const isPasswordValid = validateLoginPassword();

    if (isUsernameValid && isPasswordValid) {
      
      setTimeout(() => {
        this.reset();
        alert("Login successful!");
      }, 1000);
    }
  });
});
