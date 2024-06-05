// student list page - home screen of class room and on add student form
function displayStudentNames() {
    const studentListDivs = document.getElementsByClassName('student-list');
    for (let div of studentListDivs) {
        div.innerHTML = '';
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

        div.appendChild(ul);
    }
}

// list of behaviors page - page within classroom and on add behavior form
function displayBehaviorList() {
    const behaviorListDivs = document.getElementsByClassName('behavior-list');
    for (let div of behaviorListDivs) {
        div.innerHTML = '';
        const ul = document.createElement('ul');

        listOfBehaviors.forEach(behavior => {
            const li = document.createElement('li');
            li.textContent = `${behavior.behaviorName}`;

            ul.appendChild(li);
        });

        div.appendChild(ul);
    }
}

// go to button group page from the behavior list page
function toGroupEdits() {
    document.getElementById('behavior-list-section').classList.add('hidden');
    document.getElementById('behavior-group-section').classList.remove('hidden');
}

// fills the dropdown menu of the group edit form
function fillDropdown(menuOption) {
    listOfBehaviors.forEach(behavior => {
        const option = document.createElement('option');
        option.value = behavior.behaviorName;
        option.textContent = behavior.behaviorName;
        menuOption.appendChild(option);
    });
}

function displayButtonView(groupName) {
    if (Object.keys(groups).length === 0) { // Checking if the groups object is empty
        alert('No button groups available. Please navigate to the behavior list page to create a group.');
        return;
    }

    document.getElementById('student-profile-section').classList.add('hidden');
    document.getElementById('button-view-section').classList.remove('hidden');

    const buttonsPage = document.getElementById('button-view');
    buttonsPage.innerHTML = ''; // Clear existing buttons

    if (groups[groupName]) {
        let buttons = `<h4>${currFirstName.charAt(0)}${currLastName.charAt(0)}</h4>`;
        buttons += `<div class="button-grid">`;

        const behaviors = groups[groupName];
        behaviors.forEach(item => {
            buttons += `<button class="behavior-group-buttons" style="background-color: ${item.color};" onclick="changeBehaviorCount('${currFirstName}', '${currLastName}', '${item.behavior}', 1)">${item.behavior.charAt(0)}</button>`;
        });
        buttons += '</div>';
        buttons += `<button onclick="goBackToProfile()">Back to Student List</button>`;

        buttonsPage.innerHTML = buttons;
    }
}

function updateButtonView() {
    const selectedGroup = document.getElementById('group-selector').value;
    displayButtonView(selectedGroup);
}

// student profile page - to track a student's behavior
let currFirstName = '';
let currLastName = '';

function displayStudentTracker(firstName, lastName) {
    const studentTrackerDiv = document.getElementById('student-tracker');
    const student = listOfStudents.find(student => student.studentFirstName === firstName && student.studentLastName === lastName);
    currFirstName = firstName;
    currLastName = lastName;

    if (student) {
        let tracker = `<h2>${firstName} ${lastName}</h2>`;
        tracker += `<button onclick="displayButtonView('${Object.keys(groups)[0]}')">Button View</button>`;
        tracker += `<h3>Behaviors</h3>`;
        tracker += `<ul id="${firstName}-${lastName}-behaviors">`;
        tracker += `<li id="table-headers"><span class="behavior-name"><b>Name</b></span><span class="behavior-count"><b>Count</b></span></li>`;

        listOfBehaviors.forEach(behavior => {
            const studentBehaviorCount = student.studentBehaviors.find(sb => sb.behaviorName === behavior.behaviorName);
            const behaviorCount = studentBehaviorCount ? studentBehaviorCount.behaviorCount : 0;

            tracker += `<li id="${firstName}-${lastName}-${behavior.behaviorName}" class="behavior-list-item"> 
            <span class="behavior-name">${behavior.behaviorName}</span>
            <span id="${firstName}-${lastName}-${behavior.behaviorName}-count" class="behavior-count">${behaviorCount}</span> 
            <span class="behavior-buttons">
                <button onclick="changeBehaviorCount('${firstName}', '${lastName}', '${behavior.behaviorName}', 1)">+</button>
                <button onclick="changeBehaviorCount('${firstName}', '${lastName}', '${behavior.behaviorName}', -1)">-</button>
            </span>
            </li>`
        });

        tracker += `<p id="student-notes-${firstName}-${lastName}">Notes: ${student.notes}</p>`;
        tracker += `<input type="text" id="note-input-${firstName}-${lastName}" placeholder="Enter notes">`;
        tracker += `<button onclick="addNoteToStudent('${firstName}', '${lastName}', document.getElementById('note-input-${firstName}-${lastName}'))">Add note</button><br><br>`;
 
        tracker += `<button onclick="displayStudentSummary('${firstName}', '${lastName}')">Student Summary</button>`;
        tracker += `</ul>`;
        studentTrackerDiv.innerHTML = tracker;
    }

    document.getElementById('student-list-section').classList.add('hidden');
    document.getElementById('student-profile-section').classList.remove('hidden');
}

// back to profile button - from student summary page
function goBackToProfile() {
    document.getElementById('student-profile-section').classList.remove('hidden');
    document.getElementById('page-title').classList.remove('hidden');
    document.getElementById('student-summary-section').classList.add('hidden');
    document.getElementById('button-view-section').classList.add('hidden');
}

// display a student's summary
function displayStudentSummary() {
    const studentSummaryDiv = document.getElementById('student-summary');
    const student = listOfStudents.find(student => student.studentFirstName === currFirstName && student.studentLastName === currLastName);

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
// function printDailySummary() {
//     const dailySummaryDiv = document.getElementById('daily-summary');
//     const groups = createStudentGroups();

//     let summary = '<h2>Daily Summary</h2>';
//     summary += `<p>Squares: ${groups.squares.length}</p>`;
//     summary += `<p>Triangles: ${groups.triangles.length}</p>`;
//     summary += `<p>Circles: ${groups.circles.length}</p>`;
//     summary += `<p>None: ${groups.none.length}</p>`;
    
//     summary += '<h3>All Students</h3>';
//     summary += '<ul>';
//     listOfStudents.forEach(student => {
//         summary += `<li>${student.studentFirstName} ${student.studentLastName}: `;
//         summary += student.studentBehaviors.map(behavior => `${behavior.behaviorName} (${behavior.behaviorCount})`).join(', ');
//         summary += `</li>`;
//     });
//     summary += '</ul>';

//     dailySummaryDiv.innerHTML = summary;
// }

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
    // const studentStatus = document.getElementById('student-status').value || 'none';
    addStudent(firstName, lastName, "", [], "");
    alert(`${firstName} ${lastName} added to the roster.`);
    document.getElementById('add-student-form').reset(); // reset form fields

    displayStudentNames();
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
    displayBehaviorList();
    alert(`Behavior "${behaviorName}" added.`);
    document.getElementById('add-behavior-form').reset(); // Reset the form fields
});

// finish setup button - after behavior list creation
document.getElementById('finish-setup').addEventListener('click', function() {
    // calls function to fill dropdown menus of the group edits form
    fillDropdown(document.getElementById('b1'));
    fillDropdown(document.getElementById('b2'));
    fillDropdown(document.getElementById('b3'));
    fillDropdown(document.getElementById('b4'));

    document.getElementById('page-title').textContent = `${teacherName}'s Classroom Behavior Tracker`;
    document.getElementById('add-behavior-section').classList.add('hidden');
    document.getElementById('student-list-section').classList.remove('hidden');
    displayStudentNames();
});

// button to muve to roster page
const toRoster = document.getElementsByClassName('to-roster');
for (let button of toRoster) {
    button.addEventListener('click', function() {
        document.getElementById('student-list-section').classList.remove('hidden');
        displayStudentNames();
        document.getElementById('behavior-list-section').classList.add('hidden');
        document.getElementById('student-profile-section').classList.add('hidden');

    });
}

const toBList = document.getElementsByClassName('to-bList');
for (let button of toBList) {
    button.addEventListener('click', function() {
        document.getElementById('behavior-list-section').classList.remove('hidden');
        displayBehaviorList();
        document.getElementById('student-list-section').classList.add('hidden');
        document.getElementById('behavior-group-section').classList.add('hidden');
    });
}

// adds information from group edit form to arrays
const groups = {};

document.getElementById('behavior-group-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const groupName = document.getElementById('group-name').value;
    const buttonGroup = [];
        
    for (let i = 1; i <= 4; i++) {
        const behavior = document.getElementById(`b${i}`).value;
        const color = document.getElementById(`color-${i}`).value;
        buttonGroup.push({ behavior, color });
    }

    groups[groupName] = buttonGroup;
    alert(`"${groupName}" has been created.`);

    const groupSelector = document.getElementById('group-selector');
    Object.keys(groups).forEach((groupName, index) => {
        const option = document.createElement('option');
        option.value = groupName;
        option.textContent = groupName;
        groupSelector.appendChild(option);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    displayStudentNames();
});
