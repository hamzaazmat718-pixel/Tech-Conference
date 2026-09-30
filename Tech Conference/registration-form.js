(function() {
    // Get form and message div
    const form = document.getElementById('registrationForm');
    const messageDiv = document.querySelector('.message');

    // Helper function to validate email format
    function validateEmail(email) {
        // Corrected regex with single backslashes
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return re.test(email);
    }

    // Function to display an error message for a specific field
    function displayError(fieldElement, message) {
        // First, remove any existing error for this field to avoid duplicates
        const existingError = fieldElement.parentNode.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }

        const errorElem = document.createElement('div');
        errorElem.className = 'error';
        errorElem.textContent = message;
        // Insert error message after the input field
        fieldElement.parentNode.insertBefore(errorElem, fieldElement.nextSibling);
    }

    // Function to clear an error message for a specific field
    function clearError(fieldElement) {
        const existingError = fieldElement.parentNode.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous messages and all errors
        messageDiv.textContent = '';
        messageDiv.style.color = ''; // Reset message color
        form.querySelectorAll('.error').forEach(el => el.remove());

        let hasErrors = false; // Flag to track if any errors exist

        // Get and trim values from form fields
        const fullName = form.fullName.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const organization = form.organization.value.trim();
        const jobTitle = form.jobTitle.value.trim();
        const track = form.track.value;

        // --- Validation Logic ---

        // Full Name validation
        if (!fullName) {
            displayError(form.fullName, 'Full Name is required.');
            hasErrors = true;
        } else {
            clearError(form.fullName);
        }

        // Email Address validation
        if (!email) {
            displayError(form.email, 'Email Address is required.');
            hasErrors = true;
        } else if (!validateEmail(email)) {
            displayError(form.email, 'Please enter a valid Email Address.');
            hasErrors = true;
        } else {
            clearError(form.email);
        }

        // Conference Track validation
        if (!track) {
            displayError(form.track, 'Please select a Conference Track.');
            hasErrors = true;
        } else {
            clearError(form.track);
        }

        // --- Handle Errors or Submit Form ---

        if (hasErrors) {
            // If there are errors, focus on the first invalid field for better UX
            const firstErrorField = form.querySelector('.error').previousElementSibling;
            if (firstErrorField) {
                firstErrorField.focus();
            }
            return; // Stop form submission
        }

        // If no errors, proceed with form submission logic
        // In a real application, you would send this data to your Java backend
        // using fetch() or XMLHttpRequest.

        // Collect all form data for potential backend submission or local storage
        const formData = {
            fullName: fullName,
            email: email,
            phone: phone, // Optional field, will be empty string if not filled
            organization: organization, // Optional field
            jobTitle: jobTitle, // Optional field
            track: track
        };

        console.log('Form Data to be submitted:', formData); // Log data for debugging

        // Simulate successful form submission
        messageDiv.textContent = `Thank you for registering, ${fullName}! We look forward to seeing you at the conference.`;
        messageDiv.style.color = 'var(--form-success-color)'; // Apply success color

        form.reset(); // Clear the form fields

        // In a real scenario, after a successful backend response, you might redirect
        // or show a success modal. For this example, we just show the message.

        // Move focus to message for screen readers
        messageDiv.focus();

        // Example of sending data via fetch (uncomment and adapt for actual backend integration)
        /*
        fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json', // Or 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(formData) // For JSON payload
            // body: new URLSearchParams(formData).toString() // For URL-encoded payload
        })
        .then(response => {
            if (!response.ok) {
                // Handle HTTP errors
                return response.text().then(text => { throw new Error(text) });
            }
            return response.text(); // Or response.json() if your backend sends JSON
        })
        .then(data => {
            console.log('Backend response:', data);
            messageDiv.textContent = `Registration successful! ${fullName}.`;
            messageDiv.style.color = 'var(--form-success-color)';
            form.reset();
            messageDiv.focus();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            messageDiv.textContent = 'Registration failed. Please try again.';
            messageDiv.style.color = 'var(--form-error-color)'; // Apply error color
            messageDiv.focus();
        });
        */
    });

    // Optional: Add real-time validation feedback on input blur/change
    const fieldsToValidateOnBlur = [form.fullName, form.email, form.track];
    fieldsToValidateOnBlur.forEach(field => {
        field.addEventListener('blur', () => {
            // Re-run the specific validation for this field on blur
            if (field.id === 'fullName') {
                if (!field.value.trim()) {
                    displayError(field, 'Full Name is required.');
                } else {
                    clearError(field);
                }
            } else if (field.id === 'email') {
                if (!field.value.trim()) {
                    displayError(field, 'Email Address is required.');
                } else if (!validateEmail(field.value.trim())) {
                    displayError(field, 'Please enter a valid Email Address.');
                } else {
                    clearError(field);
                }
            } else if (field.id === 'track') {
                if (!field.value) { // For select, value is empty string if 'Select a track' is chosen
                    displayError(field, 'Please select a Conference Track.');
                } else {
                    clearError(field);
                }
            }
        });
    });

})();
