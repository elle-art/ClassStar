const listOfBehaviors = [];

//Behavior constructor
function Behavior(name, attribute, count) {
    this.behaviorName = name;
    this.behaviorAttribute = attribute;
    this.behaviorCount = count;
}

//add new behavior
function addBehavior(behaviorName, attribute) {
    const behavior = new Behavior(behaviorName, attribute, 0);
    listOfBehaviors.push(behavior);
}

//adjust behavior count for specific student
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

function removeBehavior(behaviorName) {
    const index = listOfBehaviors.findIndex(behavior => behavior.behaviorName === behaviorName);
    if (index !== -1) {
        listOfBehaviors.splice(index, 1);
        return true;
    }
    return false;
}