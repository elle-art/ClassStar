const listOfStudents = [];

//Student constructor
function Student(first, last, stat, behaviors, notes) {
    this.studentFirstName = first;
    this.studentLastName = last;
    this.studentStatus = stat || "none";
    this.studentBehaviors = behaviors || [];
    this.notes = notes || "";
}

//add student to the student list
function addStudent(first, last, stat, behaviors) {
    const student = new Student(first, last, stat,
        behaviors || [], "");
        listOfStudents.push(student);
}

//add note to student
function addNoteToStudent(first, last, noteInput) {
    const note = noteInput.value;
    const student = listOfStudents.find(student => 
        student.studentFirstName === first && student.studentLastName === last);
    if (student) {
        student.notes += note + `<br>`;
        const notesElement = document.getElementById(`student-notes-${first}-${last}`);
        if (notesElement) {
            notesElement.innerHTML = `Notes: ${student.notes}`;
        }
        noteInput.value = "";
        return true;
    }
    return false;
}

//create student groups based on student status
function createStudentGroups() {
    const squares = [];
    const triangles = [];
    const circles = [];
    const none = [];

    for (let student of listOfStudents) {
        if (student.studentStatus === "square") {
            squares.push(Student);
        } else if (student.studentStatus === "triangle") {
            triangles.push(Student);
        } else if (student.studentStatus = "circle") {
            circles.push(Student);
        } else if (student.studentStatus = "none") {
            none.push(Student);
        }
    }

    return {squares, triangles, circles, none};
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

//get summary for student using name
function getStudentSummary(first, last) {
    const student = listOfStudents.find(student => 
        student.studentFirstName === first && student.studentLastName === last
    );
    if (student) {
        let summary = `Name: ${student.studentFirstName} ${student.studentLastName}\nClass: ${student.className}\nStatus: ${student.studentStatus}\nNotes: ${student.notes}\nBehaviors:\n`;
        student.studentBehaviors.forEach(behavior => {
            summary += `${behavior.behaviorName}: ${behavior.behaviorCount}\n`;
        });
        return summary;
    }
    return "Student not found";
}

