document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('report-item-form');
    const btnLost = document.getElementById('btn-mode-lost');
    const btnFound = document.getElementById('btn-mode-found');
    const typeInput = document.getElementById('report-type');

    const dateLabel = document.getElementById('date-label');
    const locationHeading = document.getElementById('location-heading');
    const foundCollectionSection = document.getElementById('section-found-collection');

    // Mode function to change between Lost and Found tabs
    function setReportMode(mode) {
        if (mode === 'lost') {
            typeInput.value = 'lost';
            btnLost.classList.add('active');
            btnLost.setAttribute('aria-checked', 'true');
            btnFound.classList.remove('active');
            btnFound.setAttribute('aria-checked', 'false');

            dateLabel.textContent = 'Date Lost';
            locationHeading.textContent = 'Last-Seen Location';
            foundCollectionSection.classList.add('d-none');

        } else {
            typeInput.value = 'found';
            btnFound.classList.add('active');
            btnFound.setAttribute('aria-checked', 'true');
            btnLost.classList.remove('active');
            btnLost.setAttribute('aria-checked', 'false');

            dateLabel.textContent = 'Date Found';
            locationHeading.textContent = 'Discovery Location';
            foundCollectionSection.classList.remove('d-none');
        }
    }

    btnLost.addEventListener('click', () => setReportMode('lost'));
    btnFound.addEventListener('click', () => setReportMode('found'));

    // Set default today's date in date picker
    const dateInput = document.getElementById('item-date');
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // function to execute on report submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect all form fields
            const reportData = {
                type: typeInput.value,
                title: document.getElementById('item-title').value.trim(),
                category: document.getElementById('item-category').value,
                date: document.getElementById('item-date').value,
                description: document.getElementById('item-desc').value.trim(),
                campus: document.getElementById('item-campus').value,
                building: document.getElementById('item-building').value.trim(),
                room: document.getElementById('item-room').value.trim(),
                handoverMethod: document.querySelector('input[name="handoverMethod"]:checked')?.value || null
            };

            try {
                const response = await fetch('/api/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reportData)
                });

                if (response.ok) {
                    alert('Report submitted successfully to database!');
                    form.reset();

                    // Re-initialize default date after reset
                    if (dateInput) {
                        dateInput.value = new Date().toISOString().split('T')[0];
                    }
                } else {
                    const errData = await response.json().catch(() => ({}));
                    alert('Error submitting report: ' + (errData.message || 'Please check all required fields.'));
                }
            } catch (error) {
                console.error('Error submitting report:', error);
                alert('Network error: unable to reach server.');
            }
        });
    }
});