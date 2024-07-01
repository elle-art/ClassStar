let groups = {};
var teacherName = "";

// file import form submission button
document.getElementById('file-input-form').addEventListener('submit', function(e) {
    console.log('Upload Save clicked');

    e.preventDefault();
    const fileInput = document.getElementById('imported-file');
    const file = fileInput.files[0];
    
    if (file) {
        console.log('processing file');
        processWorkbook(file);
    } else {
        alert('Please select a file.');
    }

    document.getElementById('to-teacher-setup').classList.add('hidden');
});

// next section button - from class roster to behavior list
document.getElementById('to-teacher-setup').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('teacher-name-setup').classList.remove('hidden');
    document.getElementById('first-page-section').classList.add('hidden');
});

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
    addStudent(firstName, lastName, [], "");
    alert(`${firstName} ${lastName} added to the roster.`);
    document.getElementById('add-student-form').reset(); // reset form fields

    displayRosterEditMode();
});

// next section button - from class roster edit to behavior list edit
document.getElementById('next-to-behaviors').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('behavior-list-setup').classList.remove('hidden');
    document.getElementById('student-roster-setup').classList.add('hidden');
});

// add behaviors button - behavior list form
document.getElementById('add-behavior-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const behaviorName = document.getElementById('behavior-name').value;
    const behaviorAttribute = document.getElementById('attribute-name').value;
    addBehavior(behaviorName, behaviorAttribute);
    displayBListEditMode();
    alert(`Behavior "${behaviorName}" added.`);
    document.getElementById('add-behavior-form').reset();
});

// done editing button - updates dropdown
document.getElementById('done-editing').addEventListener('click', function() {
    // calls function to fill dropdown menus of the group edits form
    for (let i = 1; i <= 6; i++) {
        fillDropdown(document.getElementById(`b${i}`));
    }
});

// adds information from group edit form to arrays
document.getElementById('behavior-group-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const groupName = document.getElementById('group-name').value;
    const buttonGroup = [];
        
    for (let i = 1; i <= 6; i++) {
        const behavior = document.getElementById(`b${i}`).value;
        const color = document.getElementById(`color-${i}`).value;
        if (behavior != 'none')
            buttonGroup.push({ behavior, color });
    }

    groups[groupName] = buttonGroup;
    alert(`"${groupName}" has been created.`);
});

// fills the dropdown menu of the group edit form
function fillDropdown(menuOption) {
    menuOption.innerHTML = '';

    const dOption = document.createElement('option');
    dOption.value = 'none';
    dOption.textContent = 'N/A';
    menuOption.appendChild(dOption);

    listOfBehaviors.forEach(behavior => {
        const option = document.createElement('option');
        option.value = behavior.behaviorName;
        option.textContent = behavior.behaviorName;
        menuOption.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayStudentNames();
    toRoster(); 
    toBList();

    // minimize button
    const minimizeButtons = document.querySelectorAll('.minimize-button');
    minimizeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const windowBody = button.closest('.window').querySelector('.window-body');
            if (windowBody) {
                windowBody.classList.add('hidden');
            }
        });
    });

    // maximize button
    const maximizeButtons = document.querySelectorAll('.maximize-button');
    maximizeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const windowBody = button.closest('.window').querySelector('.window-body');
            if (windowBody) {
                windowBody.classList.remove('hidden');
            }
        });
    });
});