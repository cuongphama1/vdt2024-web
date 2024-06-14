document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:5000/api/students';

    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const studentForm = document.getElementById('studentForm');
    const studentIdInput = document.getElementById('studentId');
    const nameInput = document.getElementById('name');
    const genderInput = document.getElementById('gender');
    const schoolInput = document.getElementById('school');
    const resetFormButton = document.getElementById('resetForm');

    // Fetch and display students
    function fetchStudents() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(students => {
                studentTable.innerHTML = '';
                students.forEach(student => {
                    const row = studentTable.insertRow();
                    row.insertCell(0).textContent = student.name;
                    row.insertCell(1).textContent = student.gender;
                    row.insertCell(2).textContent = student.school;
                    const actionsCell = row.insertCell(3);
                    actionsCell.innerHTML = `
                        <button onclick="editStudent('${student._id}')">Sửa</button>
                        <button onclick="deleteStudent('${student._id}')">Xóa</button>
                        <button onclick="viewStudentDetails('${student._id}')">Chi tiết</button>
                    `;
                });
            });
    }

    // Add or update student
    studentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const studentData = {
            name: nameInput.value,
            gender: genderInput.value,
            school: schoolInput.value
        };

        const method = studentIdInput.value ? 'PUT' : 'POST';
        const url = studentIdInput.value ? `${apiUrl}/${studentIdInput.value}` : apiUrl;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(() => {
            fetchStudents();
            studentForm.reset();
        });
    });

    // Edit student
    window.editStudent = function (id) {
        fetch(`${apiUrl}/${id}`)
            .then(response => response.json())
            .then(student => {
                studentIdInput.value = student._id;
                nameInput.value = student.name;
                genderInput.value = student.gender;
                schoolInput.value = student.school;
            });
    }

    // Delete student
    window.deleteStudent = function (id) {
        if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
            fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            })
            .then(() => fetchStudents());
        }
    }

    // View student details
    window.viewStudentDetails = function (id) {
        window.location.href = `/student-details.html?id=${id}`;
    }

    // Reset form
    resetFormButton.addEventListener('click', function () {
        studentForm.reset();
        studentIdInput.value = '';
    });

    // Initial fetch
    fetchStudents();
});
