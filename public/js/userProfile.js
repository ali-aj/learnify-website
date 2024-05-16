function validatePassword() {
    var password = document.getElementById("passwordField").value;
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var existingAlerts = document.querySelectorAll(".alert");

    // Remove existing alerts
    existingAlerts.forEach(function(alert) {
        alert.parentNode.removeChild(alert);
    });

    var alertDiv = document.createElement("div");
    if (!re.test(password)) {
        // alertDiv.className = "alert alert-danger";
        // alertDiv.role = "alert";
        // alertDiv.textContent = "Please choose a strong password!";
        // document.body.insertBefore(alertDiv, document.body.firstChild);
        return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('customFile').addEventListener('change', function(e) {
        var preview = document.getElementById('preview');
        preview.src = URL.createObjectURL(e.target.files[0]);
        preview.onload = function() {
            URL.revokeObjectURL(preview.src);
        }
    });

    document.querySelector('.btn-danger-soft').addEventListener('click', function() {
        document.getElementById('preview').src = '';
    });

    document.getElementById('customFile').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

});
