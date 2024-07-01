let listOfBehaviors = [];

// Behavior constructor
function Behavior(name, attribute, count) {
    this.behaviorName = name;
    this.behaviorAttribute = attribute;
    this.behaviorCount = count;
}

// add new behavior
function addBehavior(behaviorName, attribute) {
    const behavior = new Behavior(behaviorName, attribute, 0);
    listOfBehaviors.push(behavior);
}

// adjust behavior count for specific student
function changeBehaviorCount(firstName, lastName, behaviorName, adj) {
    const student = listOfStudents.find(student => 
        student.studentFirstName === firstName && student.studentLastName === lastName
    );
    const countHTMLElement = document.getElementById(`${firstName}-${lastName}-${behaviorName}-count`);
   
    if (student) {
        const behavior = student.studentBehaviors.find(a => a.behaviorName === behaviorName);
        if (behavior) {
            behavior.behaviorCount += adj;
            if (behavior.behaviorCount < 0) behavior.behaviorCount = 0;

            countHTMLElement.textContent = `${behavior.behaviorCount}`;
        } else if (adj > 0) {
            const listBehavior = listOfBehaviors.find(b => b.behaviorName === behaviorName);
            const newBehavior = new Behavior(behaviorName, listBehavior.behaviorAttribute, 1);
            student.studentBehaviors.push(newBehavior);
            countHTMLElement.textContent = `${newBehavior.behaviorCount}`;
        }
    }
}

//remove behavior from list
function removeBehavior(behaviorName) {
    const index = listOfBehaviors.findIndex(behavior => behavior.behaviorName === behaviorName);
    if (index !== -1) {
        listOfBehaviors.splice(index, 1);
        return true;
    }
    return false;
}

// behavior list page - page within classroom and on add behavior form
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

// edit mode of behavior list page
function displayBListEditMode() {
    const behaviorListEditDiv = document.getElementById('behavior-list-edit');
        behaviorListEditDiv.innerHTML = '';
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('edit-grid');

        const ul = document.createElement('ul');

        listOfBehaviors.forEach(behavior => {
            const li = document.createElement('li');

            const behaviorName = document.createElement('span');
            behaviorName.classList.add('behavior-name');
            behaviorName.textContent = behavior.behaviorName;
            li.appendChild(behaviorName);
        
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (behavior.behaviorAttribute === 'positive') {
                indicator.classList.add('pos-dot'); 
            } else if (behavior.behaviorAttribute === 'negative') {
                indicator.classList.add('neg-dot');
            } 
            li.appendChild(indicator);
            
            const deleteButton = document.createElement('button');
            deleteButton .textContent = 'Remove';
            deleteButton.addEventListener('click', (e) => {
                e.preventDefault();
                removeBehavior(behavior.behaviorName);
                displayBListEditMode(); 
            });

            li.appendChild(deleteButton);
            ul.appendChild(li);
        });

        gridDiv.appendChild(ul);
        behaviorListEditDiv.appendChild(gridDiv)
}

// student profile page - to track a student's behavior
function displayStudentTracker(firstName, lastName) {
    const studentTrackerDiv = document.getElementById('student-tracker');
    const student = listOfStudents.find(student => student.studentFirstName === firstName && student.studentLastName === lastName);
    currFirstName = firstName;
    currLastName = lastName;

    if (student) {
        let tracker = `<h5>${firstName} ${lastName}</h5>`;
        tracker += `<button onclick="displayButtonView('${Object.keys(groups)[0]}')">Button View</button>`;
        tracker += `<h6>Behaviors</h6>`;
        tracker += `<ul id="${firstName}-${lastName}-behaviors">`;
        tracker += `<li id="table-headers"><span class="name-header"><b>Name</b></span><span class="count-header"><b>Count</b></span></li>`;

        listOfBehaviors.forEach(behavior => {
            const studentBehaviorCount = student.studentBehaviors.find(sb => sb.behaviorName === behavior.behaviorName);
            const behaviorCount = studentBehaviorCount ? studentBehaviorCount.behaviorCount : 0;

            tracker += `<li id="${firstName}-${lastName}-${behavior.behaviorName}" class="behavior-list-item"> 
            <span class="behavior-name">${behavior.behaviorName}</span>
            <span id="${firstName}-${lastName}-${behavior.behaviorName}-count" class="behavior-count">${behaviorCount}</span> 
            <span class="behavior-buttons">
                <button class="plus-min" onclick="changeBehaviorCount('${firstName}', '${lastName}', '${behavior.behaviorName}', 1)">+</button>
                <button class="plus-min" onclick="changeBehaviorCount('${firstName}', '${lastName}', '${behavior.behaviorName}', -1)">-</button>
            </span>
            </li>`
        });

        tracker += `<p id="student-notes-${firstName}-${lastName}">Notes: ${student.notes}</p>`;
        tracker += `<input type="text" id="note-input-${firstName}-${lastName}" placeholder="Enter notes">`;
        tracker += `<button onclick="addNoteToStudent('${firstName}', '${lastName}', document.getElementById('note-input-${firstName}-${lastName}'))">Add note</button><br><br>`;
 
        tracker += `<button onclick="displayStudentSummary('${firstName}', '${lastName}')">View Student Summary</button>`;
        tracker += `</ul>`;
        studentTrackerDiv.innerHTML = tracker;
    }

    document.getElementById('homepage-section').classList.add('hidden');
    document.getElementById('student-profile-section').classList.remove('hidden');
}

// displays button view for behavior tracking
function displayButtonView(groupName) {
    const groupSelector = document.getElementById('group-selector');
    groupSelector.innerHTML = '';
    
    Object.keys(groups).forEach((groupName) => {
        const option = document.createElement('option');
        option.value = groupName;
        option.textContent = groupName;
        groupSelector.appendChild(option);
    });
    
    if (Object.keys(groups).length === 0) { // checking if groups object is empty
        alert('No button groups available. Please navigate to the behavior list page to create a group.');
        return;
    }

    document.getElementById('student-profile-section').classList.add('hidden');
    document.getElementById('button-view-section').classList.remove('hidden');

    const buttonsPage = document.getElementById('button-view');
    buttonsPage.innerHTML = '';

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

// updates button view based on user selection
function updateButtonView() {
    const selectedGroup = document.getElementById('group-selector').value;
    displayButtonView(selectedGroup);
}