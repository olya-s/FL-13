function Student(name, email) {
  const _name = name;
  const _email = email;
  const _homeworkResults = [];

  this.getName = () => _name;
  this.getEmail = () => _email;
  this.addHomeworkResult = (topic, success) => {
    _homeworkResults.push({ topic, success });
  };
  this.getHomeworkResults = () => _homeworkResults;
}

function FrontendLab(listOfStudents, failedHomeworksLimit) {
  const _studentsList = listOfStudents.map(
    student => new Student(student.name, student.email)
  );

  this.printStudentsList = () =>
    _studentsList.forEach(student =>
      console.log(
        `name: ${student.getName()}, email: ${student.getEmail()}`,
        student.getHomeworkResults()
      )
    );
  this.addHomeworkResults = (homeworkResults) => {
    const topic = homeworkResults.topic;
    _studentsList.forEach(student => {
      const studentResult = homeworkResults.results.find(
        result => result.email === student.getEmail()
      );
      student.addHomeworkResult(topic, studentResult.success);
    });
  };
  this.printStudentsEligibleForTest = () => {
    _studentsList.forEach(student => {
      const isEligible =
        student
          .getHomeworkResults()
          .filter(result => result.success === false).length <=
        failedHomeworksLimit;
      if (isEligible) {
        console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
      }
    });
  };
}
