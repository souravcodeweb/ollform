const steps = document.querySelectorAll(".form-step");
const navItems = document.querySelectorAll(".nav-item");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const overviewContent = document.getElementById("overviewContent");

let currentStep = 0;

// Form data object to store user input
const formData = {
    schoolName: "",
    schoolLocation: "",
    email: "",
    principalProfile: "",
    missionValues: "",
};

// Update the displayed form and navigation bar
function updateStep() {
    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });

    navItems.forEach((item, index) => {
        item.classList.toggle("active", index === currentStep);
    });

    // Toggle button visibility
    prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";
    nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Submit";

    // If on the overview step, populate the data
    if (currentStep === steps.length - 1) {
        populateOverview();
    }
}

// Populate the overview section with user input
function populateOverview() {
    overviewContent.innerHTML = `
        <p><strong>School Name:</strong> ${formData.schoolName || "Not Provided"}</p>
        <p><strong>School Location:</strong> ${formData.schoolLocation || "Not Provided"}</p>
        <p><strong>Email ID:</strong> ${formData.email || "Not Provided"}</p>
        <p><strong>Principal's Profile:</strong> ${formData.principalProfile || "Not Provided"}</p>
        <p><strong>Mission and Values:</strong> ${formData.missionValues || "Not Provided"}</p>
    `;
}

// Validate inputs for the current step
function validateInputs() {
    const currentForm = steps[currentStep];
    const inputs = currentForm.querySelectorAll("input, textarea");
    let isValid = true;

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add("error"); // Highlight the empty field
        } else {
            input.classList.remove("error");
        }
    });

    return isValid;
}

// Initialize the form navigation
updateStep();

// Next button functionality
nextBtn.addEventListener("click", () => {
    // Validate inputs before proceeding
    if (!validateInputs()) {
        alert("Please fill in all required fields before proceeding.");
        return;
    }

    // Save form data before moving to the next step
    if (currentStep === 0) {
        formData.schoolName = document.getElementById("schoolName").value.trim();
        formData.schoolLocation = document.getElementById("schoolLocation").value.trim();
        formData.email = document.getElementById("email").value.trim();
        formData.principalProfile = document.getElementById("principalProfile").value.trim();
        formData.missionValues = document.getElementById("missionValues").value.trim();
    }

    // Navigate to the next step
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateStep();
    }
});

// Previous button functionality
prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        updateStep();
    }
});
