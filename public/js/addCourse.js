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

    document.getElementById('module-btn').addEventListener('click', function() {
        // Get the container for all modules
        const container = document.getElementById('modules-container');

        // Clone the first module
        const newModule = container.firstElementChild.cloneNode(true);

        // Increment module count
        const moduleCount = container.children.length + 1;
        newModule.querySelector('h5').innerText = `Module ${moduleCount}`;

        // Clear the input values in the cloned module
        newModule.querySelectorAll('input, textarea').forEach(input => input.value = '');

        // Append the new module to the container
        container.appendChild(newModule);
    });

    document.getElementById('delete-module-btn').addEventListener('click', function() {
        // Get the container for all modules
        const container = document.getElementById('modules-container');

        // Allow deletion only if more than one module exists
        if (container.children.length > 1) {
            container.removeChild(container.lastElementChild);
        }
    });

});
