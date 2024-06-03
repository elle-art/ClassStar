// student list page - home screen of class room
function displayStudentNames() {
    const studentListDiv = document.getElementById('student-list');
    studentListDiv.innerHTML = '<h2>Student List</h2>';
    const ul = document.createElement('ul');

    listOfStudents.forEach(student => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = `${student.studentFirstName} ${student.studentLastName}`;

        // Add click event to display student summary
        a.addEventListener('click', (e) => {
            e.preventDefault();
            displayStudentTracker(student.studentFirstName, student.studentLastName);
        });

        li.appendChild(a);
        ul.appendChild(li);
    });

    studentListDiv.appendChild(ul);
}

// back to list button - from profile page
function goBackToList() {
    document.getElementById('student-profile-section').classList.add('hidden');
    document.getElementById('student-list-section').classList.remove('hidden');
    displayStudentNames();
}

// student profile page - to track a student's behavior
function displayStudentTracker(firstName, lastName) {
    const studentTrackerDiv = document.getElementById('student-tracker');
    const student = listOfStudents.find(student => student.studentFirstName === firstName && student.studentLastName === lastName);

    if (student) {
        let tracker = `<h2>${student.studentFirstName} ${student.studentLastName}</h2>`;
        tracker += `<h3>Behaviors</h3>`;
        tracker += `<ul id="${firstName}-${lastName}-behaviors">`;

        listOfBehaviors.forEach(behavior => {
            const studentBehaviorCount = student.studentBehaviors.find(sb => sb.behaviorName === behavior.behaviorName);
            const behaviorCount = studentBehaviorCount ? studentBehaviorCount.behaviorCount : 0;

            tracker += `<li id="${firstName}-${lastName}-${behavior.behaviorName}"> 
            ${behavior.behaviorName} <span id="${firstName}-${lastName}-${behavior.behaviorName}-count">${behaviorCount}</span> 
            <button onclick="changeBehaviorCount('${firstName}', '${lastName}', '${behavior.behaviorName}', 1)">+</button>
            <button onclick="changeBehaviorCount('${firstName}', '${lastName}', '${behavior.behaviorName}', -1)">-</button>
            </li>`
        });

        tracker += `<p id="student-notes-${firstName}-${lastName}">Notes: ${student.notes}</p>`;
        tracker += `<input type="text" id="note-input-${firstName}-${lastName}" placeholder="Enter notes">`;
        tracker += `<button onclick="addNoteToStudent('${firstName}', '${lastName}', document.getElementById('note-input-${firstName}-${lastName}'))">Add note</button>`;
 


        tracker += `<button onclick="displayStudentSummary('${firstName}', '${lastName}')">Student Summary</button>`;
        tracker += `<button onclick="goBackToList()">Back to Student List</button>`;
        tracker += `</ul>`;
        studentTrackerDiv.innerHTML = tracker;
    }

    document.getElementById('student-list-section').classList.add('hidden');
    document.getElementById('student-profile-section').classList.remove('hidden');
}

// back to profile button - from student summary page
function goBackToProfile() {
    document.getElementById('student-summary-section').classList.add('hidden');
    document.getElementById('student-profile-section').classList.remove('hidden');
    displayStudentNames();
}

// display a student's summary
function displayStudentSummary(firstName, lastName) {
    const studentSummaryDiv = document.getElementById('student-summary');
    const student = listOfStudents.find(student => student.studentFirstName === firstName && student.studentLastName === lastName);

    if (student) {
        let summary = `<h2>${student.studentFirstName} ${student.studentLastName}</h2>`;
        summary += `<p>Status: ${student.studentStatus}</p>`;
        summary += '<h3>Behaviors</h3>';
        summary += '<ul>';
        student.studentBehaviors.forEach(behavior => {
            summary += `<li>${behavior.behaviorName}: ${behavior.behaviorCount}</li>`;
        });
        summary += '</ul>';

        summary += `<p>Notes: ${student.notes}</p>`;
        summary += `<button onclick="goBackToProfile()">Back to Student Profile</button>`;
        studentSummaryDiv.innerHTML = summary;
    } 

    document.getElementById('student-profile-section').classList.add('hidden');
    document.getElementById('student-summary-section').classList.remove('hidden');
}

// print daily summary of all students
function printDailySummary() {
    const dailySummaryDiv = document.getElementById('daily-summary');
    const groups = createStudentGroups();

    let summary = '<h2>Daily Summary</h2>';
    summary += `<p>Squares: ${groups.squares.length}</p>`;
    summary += `<p>Triangles: ${groups.triangles.length}</p>`;
    summary += `<p>Circles: ${groups.circles.length}</p>`;
    summary += `<p>None: ${groups.none.length}</p>`;
    
    summary += '<h3>All Students</h3>';
    summary += '<ul>';
    listOfStudents.forEach(student => {
        summary += `<li>${student.studentFirstName} ${student.studentLastName}: `;
        summary += student.studentBehaviors.map(behavior => `${behavior.behaviorName} (${behavior.behaviorCount})`).join(', ');
        summary += `</li>`;
    });
    summary += '</ul>';

    dailySummaryDiv.innerHTML = summary;
}

var teacherName = "";
// submission button - teacher name form
document.getElementById('teacher-name-form').addEventListener('submit', function(e) {
    e.preventDefault();
     teacherName = document.getElementById('teacher-name').value;

    document.getElementById('teacher-name-setup').classList.add('hidden');
    document.getElementById('student-roster-setup').classList.remove('hidden');
});

// add students button - class roster form
document.getElementById('add-student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const studentStatus = document.getElementById('student-status').value || 'none';
    addStudent(firstName, lastName, studentStatus, [], "");
    alert(`${firstName} ${lastName} added to the roster.`);
    document.getElementById('add-student-form').reset(); // reset form fields
});

// next section button - from class roster to behavior list
document.getElementById('next-to-behaviors').addEventListener('click', function() {
    document.getElementById('student-roster-setup').classList.add('hidden');
    document.getElementById('add-behavior-section').classList.remove('hidden');
});

// add behaviors button - behavior list form
document.getElementById('add-behavior-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const behaviorName = document.getElementById('behavior-name').value;
    const behaviorAttribute = document.getElementById('attribute-name').value;
    addBehavior(behaviorName, behaviorAttribute);
    alert(`Behavior "${behaviorName}" added.`);
    document.getElementById('add-behavior-form').reset(); // Reset the form fields
});

// finish setup button - after behavior list creation
document.getElementById('finish-setup').addEventListener('click', function() {
    document.getElementById('page-title').textContent = `${teacherName}'s Classroom Behavior Tracker`;
    document.getElementById('add-behavior-section').classList.add('hidden');
    document.getElementById('student-list-section').classList.remove('hidden');
    displayStudentNames();
});


document.addEventListener('DOMContentLoaded', () => {
    displayStudentNames();
});
