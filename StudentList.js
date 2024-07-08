let listOfStudents = [];
let currFirstName = '';
let currLastName = '';

//Student constructor
function Student(first, last, behaviors, notes) {
    this.studentFirstName = first;
    this.studentLastName = last;
    this.studentBehaviors = behaviors || [];
    this.allTimeBehaviorCounts = [];
    this.notes = notes || "";
}

//add student to the student list
function addStudent(first, last, behaviors) {
    const student = new Student(first, last,
        behaviors || [], "");
        listOfStudents.push(student);
}

//add note to student
function addNoteToStudent(first, last, noteInput) {
    const note = noteInput.value;
    const student = listOfStudents.find(student => 
        student.studentFirstName === first && student.studentLastName === last);
    if (student) {
        if (student.notes === "") {
            student.notes += note;
        } else {
            student.notes += `; ` + note;
        }
        const notesElement = document.getElementById(`student-notes-${first}-${last}`);
        if (notesElement) {
                notesElement.innerHTML = `Notes: ${student.notes}`;
        }
        noteInput.value = "";
        return true;
    }
    return false;
}

//remove student by name
function removeStudent(first, last) {
    const index = listOfStudents.findIndex(student => 
        student.studentFirstName === first && student.studentLastName === last);
    if (index !== -1) {
        listOfStudents.splice(index, 1);
        return true;
    }
    return false;
}

// roster page - home screen of class room and on add student form
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

            // Add click event to display student profile
            li.addEventListener('click', (e) => {
                e.preventDefault();
                displayStudentTracker(student.studentFirstName, student.studentLastName);
            });

            li.appendChild(a);
            ul.appendChild(li);
        });

        div.appendChild(ul);
    }
}

// edit mode of roster page
function displayRosterEditMode() {
    const studentListEditDiv = document.getElementById('student-list-edit');
        studentListEditDiv.innerHTML = '';
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('edit-grid');
        
        const ul = document.createElement('ul');

        listOfStudents.forEach(student => {
            const li = document.createElement('li');
            const studentName = document.createElement('a');
            studentName.href = '#';
            studentName.textContent = `${student.studentFirstName} ${student.studentLastName}`;
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remove';
            deleteButton.addEventListener('click', (e) => {
                e.preventDefault();
                removeStudent(student.studentFirstName, student.studentLastName);
                displayRosterEditMode();
            });
    
            li.appendChild(studentName);
            li.appendChild(deleteButton);
            ul.appendChild(li);
        });
    
        gridDiv.appendChild(ul);
        studentListEditDiv.appendChild(gridDiv);
}

// function to update all students' allTimeBehaviorCounts
function updateAllTimeBehaviorCounts() {
    listOfStudents.forEach(student => {
        const allTimeCounts = {};
        student.studentBehaviors.forEach(behavior => {
            if (allTimeCounts[behavior.behaviorName]) {
                allTimeCounts[behavior.behaviorName] += behavior.behaviorCount;
            } else {
                allTimeCounts[behavior.behaviorName] = behavior.behaviorCount;
            }
        });
        student.allTimeBehaviorCounts = Object.entries(allTimeCounts).map(([name, count]) => ({ behaviorName: name, behaviorCount: count }));
    });
}

// display a student's summary
function displayStudentSummary() {
    const studentSummaryDiv = document.getElementById('student-summary');
    const student = listOfStudents.find(student => student.studentFirstName === currFirstName && student.studentLastName === currLastName);

    if (student) {
        let summary = `<h5>${student.studentFirstName} ${student.studentLastName}</h5>`;
        if (student.studentBehaviors.length > 0) {
            summary += '<h6>Behaviors</h6>';
            summary += '<ul>';
            student.studentBehaviors.forEach(behavior => {
                summary += `<li>${behavior.behaviorName}: ${behavior.behaviorCount}</li>`;
            });
        summary += '</ul>';
        }

        summary += `<p>Notes: ${student.notes}</p>`;
        summary += `<button onclick="goBackToProfile()">Back to Student Profile</button>`;
        studentSummaryDiv.innerHTML = summary;
    } 

    document.getElementById('student-profile-section').classList.add('hidden');
    document.getElementById('student-summary-section').classList.remove('hidden');
}
