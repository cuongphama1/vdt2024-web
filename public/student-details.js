document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://172.31.11.214:30002/api/students';
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');

    const detailName = document.getElementById('detailName');
    const detailGender = document.getElementById('detailGender');
    const detailSchool = document.getElementById('detailSchool');

    if (studentId) {
        fetch(`${apiUrl}/${studentId}`)
            .then(response => response.json())
            .then(student => {
                detailName.textContent = student.name;
                detailGender.textContent = student.gender;
                detailSchool.textContent = student.school;
            });
    }
});
