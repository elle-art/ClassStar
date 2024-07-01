// button to move to roster page
function toRoster() {
    const toRoster = document.getElementsByClassName('to-roster');
    if(listOfBehaviors.length > 0) {
        document.getElementById('first-page-section').classList.add('hidden');
        document.getElementById('homepage-section').classList.remove('hidden');
        displayStudentNames();
    }
    for (let button of toRoster) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('student-roster-setup').classList.add('hidden');
            document.getElementById('student-profile-section').classList.add('hidden');
            document.getElementById('homepage-section').classList.remove('hidden');
            displayStudentNames();
        });
    }
}

// button to move to the edit mode of roster page
function toRosterEdit() {
    document.getElementById('homepage-section').classList.add('hidden');
    document.getElementById('next-to-behaviors').classList.add('hidden');
    document.getElementById('student-roster-setup').classList.remove('hidden');   
    document.getElementById('roster-edit').classList.remove('hidden');   
}

// button to move to behavior list page
function toBList() {
    const toBList = document.getElementsByClassName('to-bList');
    for (let button of toBList) {
        button.addEventListener('click', function() {
                document.getElementById('behavior-group-section').classList.add('hidden');
                document.getElementById('behavior-list-setup').classList.add('hidden');
                document.getElementById('homepage-section').classList.remove('hidden');
                displayBehaviorList();
        });
    }
}

// button to move to the edit mode of behavior list page
function toBListEdit() {
    document.getElementById('homepage-section').classList.add('hidden');
    document.getElementById('finish-setup').classList.add('hidden');
    document.getElementById('behavior-list-setup').classList.remove('hidden');   

    const button = document.querySelector('.to-bList');
    button.classList.remove('hidden');
}

// go to button group page from the behavior list page
function toGroupEdits() {
    document.getElementById('homepage-section').classList.add('hidden');
    document.getElementById('behavior-group-section').classList.remove('hidden');
}

// back to profile button - from student summary page
function goBackToProfile() {
    document.getElementById('student-profile-section').classList.remove('hidden');
    document.getElementById('page-title').classList.remove('hidden');
    document.getElementById('student-summary-section').classList.add('hidden');
    document.getElementById('button-view-section').classList.add('hidden');
}

// loads classroom pages after setup
function finishSetup() {
    // dropdown in create group form
    for (let i = 1; i <= 6; i++) {
        fillDropdown(document.getElementById(`b${i}`));
    }
     
    document.getElementById('page-title').textContent = `ClassStar - ${teacherName}'s Classroom`;
    document.getElementById('behavior-list-setup').classList.add('hidden');
    document.getElementById('homepage-section').classList.remove('hidden');
    displayStudentNames();
    displayBehaviorList();
}

// controls homepage tabs
document.querySelectorAll('li[role="tab"]').forEach(tab => {
    tab.addEventListener('click', function(event) {
      event.preventDefault();
      finishSetup();
      
      document.querySelectorAll('li[role="tab"]').forEach(t => t.setAttribute('aria-selected', 'false'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      
      tab.setAttribute('aria-selected', 'true');
      document.querySelector(tab.querySelector('a').getAttribute('href')).classList.add('active');
    });
  });

  