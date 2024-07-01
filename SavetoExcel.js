const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0");
const yy = String(today.getFullYear()).slice(-2);
const formattedDate = `${mm}-${dd}-${yy}`;

document.getElementById("export-button").addEventListener("click", function () {
  const masterWorkbookName = `${teacherName}_ClassStar_${formattedDate}.xlsx`;

  updateAllTimeBehaviorCounts();
  const workbook = XLSX.utils.book_new();

  // sheet 1: user data
  const userData = XLSX.utils.json_to_sheet([{ teacherName: teacherName }]);
  XLSX.utils.book_append_sheet(workbook, userData, "User");

  // sheet 2: student list
  const studentData = listOfStudents.map((student) => {
    const alltimeBehaviors = student.allTimeBehaviorCounts
      .map((behavior) => `${behavior.behaviorName} (${behavior.behaviorCount})`)
      .join(", ");

    return {
      FirstName: student.studentFirstName,
      LastName: student.studentLastName,
      Behaviors: alltimeBehaviors,
    };
  });
  const studentSheet = XLSX.utils.json_to_sheet(studentData);
  XLSX.utils.book_append_sheet(workbook, studentSheet, "Students");

  // sheet 3: behavior list
  const behaviorData = listOfBehaviors.map((behavior) => ({
    BehaviorName: behavior.behaviorName,
    BehaviorType: behavior.behaviorAttribute,
  }));
  const behaviorSheet = XLSX.utils.json_to_sheet(behaviorData);
  XLSX.utils.book_append_sheet(workbook, behaviorSheet, "Behaviors");

  //sheet 4: groups list
  const groupData = Object.keys(groups).map((groupName) => {
    const behaviors = groups[groupName]
      .map((behavior) => behavior.behavior)
      .join(", ");
    const colors = groups[groupName]
      .map((behavior) => behavior.color)
      .join(", ");

    return {
      GroupName: groupName,
      Behaviors: behaviors,
      Colors: colors,
    };
  });
  const groupSheet = XLSX.utils.json_to_sheet(groupData);
  XLSX.utils.book_append_sheet(workbook, groupSheet, "ButtonGroups");

  XLSX.writeFile(workbook, masterWorkbookName);
});

function processWorkbook(file) {
  console.log("in processWorkbook");
  const reader = new FileReader();

  reader.onload = function (e) {
    console.log("reader accessed");
    const data = new Uint8Array(e.target.result);
    console.log("target accessed");
    const workbook = XLSX.read(data, { type: "array" });
    console.log("workbook accessed");

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      console.log("Reading sheet:", sheetName);

      if (sheetName === "User") {
        const userData = XLSX.utils.sheet_to_json(sheet);
        teacherName = userData[0].teacherName;
      } else if (sheetName === "Students") {
        const studentData = XLSX.utils.sheet_to_json(sheet);

        listOfStudents = studentData.map((student) => ({
          studentFirstName: student.FirstName,
          studentLastName: student.LastName,
          studentBehaviors: [],
          allTimeBehaviorCounts: student.Behaviors.split(",").map(
            (behaviorStr) => {
              const [name, countStr] = behaviorStr.trim().split("(");
              const behaviorName = name.trim();
              const behaviorCount = parseInt(
                countStr.replace(")", "").trim(),
                10
              );

              return {
                behaviorName: behaviorName,
                behaviorCount: behaviorCount,
              };
            }
          ),
          notes: "",
        }));
      } else if (sheetName === "Behaviors") {
        const behaviorData = XLSX.utils.sheet_to_json(sheet);

        behaviorData.forEach((behavior) => {
            addBehavior(behavior.BehaviorName, behavior.BehaviorType);
            const intiializeStudentCounter = new Behavior(behavior.BehaviorName, behavior.BehaviorType, 0); 

            listOfStudents.forEach(student => {
              student.studentBehaviors.push(intiializeStudentCounter);
            });
        });
      } else if (sheetName === "ButtonGroups") {
        const groupData = XLSX.utils.sheet_to_json(sheet);

        groupData.forEach((group) => {
          const behaviors = group.Behaviors.split(",").map(behaviorName => behaviorName.trim());
          const colors = group.Colors.split(",").map(color => color.trim());
          
          const pairs = behaviors.map((behavior, index) => ({
            behavior: behavior,
            color: colors[index]
          }));   
          groups[group.GroupName] = pairs;
        });
      }
    });

    alert("Data successfully uploaded and processed!");
    console.log("Upload complete");
    toRoster();

  };

  reader.readAsArrayBuffer(file);
}
