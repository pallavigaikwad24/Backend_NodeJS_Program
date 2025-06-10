// Save list to localStorage

const taskList = []; // store task list
const todo = (choice, text, position, deleteTask) => {
  do {
    console.log("1. Add Task \n2. Complete Task \n3.Delete Task \n4. Exit");
    if (choice === 1) {
      taskList.push(text);
      saveToLocal();
    } else if (choice === 2) {
      taskList[position] += " - COMPLETE";
    } else if (choice === 3) {
      taskList.splice(deleteTask, 1);
    } else {
      console.log("Wrong entry");
    }
    console.log(taskList);
  } while (choice === 4);
};

const saveToLocal = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.setItem("Todo", JSON.stringify(taskList));
    }, 500);
  });

  return promise;
};

todo(1, "Project of TODO");
todo(1, "Make pizaa");
todo(1, "Walking 45min");
todo(1, "DSA practice");
todo(2, "DSA practice", 3);
todo(3, "DSA practice", 3, 2);
 
