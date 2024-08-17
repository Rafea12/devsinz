let courses = [];
let editIndex = -1;

function saveCourse() {
    const title = document.getElementById('courseTitle').value;
    const category = document.getElementById('courseCategory').value;
    const description = document.getElementById('courseDescription').value;
    const video = document.getElementById('courseVideo').value;
    const pdf = document.getElementById('coursePDF').files[0];

    if (title && category && description) {
        const course = {
            title,
            category,
            description,
            video,
            pdf: pdf ? URL.createObjectURL(pdf) : ''
        };

        if (editIndex === -1) {
            courses.push(course);
        } else {
            courses[editIndex] = course;
            editIndex = -1;
        }

        renderCourses();
        clearForm();
    } else {
        alert('Please fill out all required fields.');
    }
}

function renderCourses() {
    const tbody = document.querySelector('#courseList tbody');
    tbody.innerHTML = '';

    courses.forEach((course, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.title}</td>
            <td>${course.category}</td>
            <td>${course.description}</td>
            <td>${course.video ? `<a href="${course.video}" target="_blank">Video</a>` : ''}</td>
            <td>${course.pdf ? `<a href="${course.pdf}" target="_blank">PDF</a>` : ''}</td>
            <td>
                <button class="edit" onclick="editCourse(${index})">Edit</button>
                <button class="delete" onclick="deleteCourse(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteCourse(index) {
    courses.splice(index, 1);
    renderCourses();
}

function editCourse(index) {
    const course = courses[index];

    document.getElementById('courseTitle').value = course.title;
    document.getElementById('courseCategory').value = course.category;
    document.getElementById('courseDescription').value = course.description;
    document.getElementById('courseVideo').value = course.video;
    document.getElementById('coursePDF').value = '';

    editIndex = index;
    document.getElementById('saveButton').innerText = 'Update Course';
}

function clearForm() {
    document.getElementById('courseTitle').value = '';
    document.getElementById('courseCategory').value = '';
    document.getElementById('courseDescription').value = '';
    document.getElementById('courseVideo').value = '';
    document.getElementById('coursePDF').value = '';
}
