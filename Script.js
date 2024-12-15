document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const responseMessage = document.getElementById('responseMessage');

    // Form submission event listener
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting normally

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate form data
        if (name === '' || email === '' || message === '') {
            responseMessage.innerHTML = '<p style="color: red;">All fields are required. Please fill in all fields.</p>';
            return;
        }

        // You can replace this part with actual form submission via AJAX or other methods
        // Here, we'll just simulate a successful submission
        responseMessage.innerHTML = `<p style="color: green;">Thank you for reaching out, ${name}! We will get back to you soon.</p>`;

        // Clear form fields after submission
        form.reset();
    });
});