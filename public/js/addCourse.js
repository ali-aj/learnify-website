document.addEventListener("DOMContentLoaded", function () {

    document.querySelector('.btn-danger-soft').addEventListener('click', function() {
        document.getElementById('preview').src = '';
        document.getElementById('customFile').value = '';
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

    // Handle clear button click to reset the form
    document.getElementById('clear-btn').addEventListener('click', function() {
        var form = document.querySelector('.file-upload');
        form.reset();

        // Clear image preview
        var preview = document.getElementById('preview');
        preview.src = '';
        document.getElementById('customFile').value = '';
    });

});
