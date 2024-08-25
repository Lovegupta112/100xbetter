import chalk from "chalk";
import fs, { link } from "fs";
import path from "path";

const args = process.argv;
const filePath = path.join("./todo.json");

const checkIfTodoListExist = () => {
  fs.closeSync(fs.openSync(filePath, "a"));
};
const showTodoList = () => {
  //  const isExist=fs.existsSync(filePath);
  checkIfTodoListExist();
  let data = fs.readFileSync(filePath, "utf-8");
  data = data && JSON.parse(data);
  const todo =
    (data.todo && data.todo.map((list) => ` ${list.id}-${list.title}`)) || 0;
  const completed =
    (data.completed &&
      data.completed.map((list) => ` ${list.id}-${list.title}`)) ||
    0;
  console.log(
    `${chalk.magenta.bold("List")} : \n  ${chalk
      .hex("#4169E1")
      .bold("Todo")} : ${chalk.yellow(todo)} \n  ${chalk.greenBright.bold(
      "Completed"
    )}: ${chalk.hex("#9ee141")(completed)}`
  );
};

const addTodo = async () => {
  try {
    checkIfTodoListExist();
    let list = await fs.promises.readFile(filePath, "utf-8");
    const newTodo = args[3];
    if (list) {
      list = JSON.parse(list);
      const todoList = list.todo;
      const completeTodoList = list.completed || [];

      const todoMax=Math.max(...todoList.map((list)=>list.id));
      const completedMax=Math.max(...completeTodoList.map((list)=>list.id));
      const maxId=Math.max(todoMax,completedMax)
      
      const todo = { id:maxId+1, title: newTodo };
      todoList.push(todo);
      list.todo = todoList;
      await fs.promises.writeFile(filePath, JSON.stringify(list), "utf-8");
      console.log(chalk.yellow.bold(`Todo  ${todo.id}-${newTodo} is added !`));
    } else {
      if (!newTodo) {
        console.log("Please specify todo name !");
        return;
      }
      const newlist = {
        todo: [{ id: 1, title: newTodo }],
      };
      await fs.promises.writeFile(filePath, JSON.stringify(newlist), "utf-8");
      console.log(chalk.yellow.bold(`Todo  1-${newTodo} is added !`));
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

const completeTodo = async () => {
  checkIfTodoListExist();
  let list = await fs.promises.readFile(filePath, "utf-8");
  const completedTodoId = args[3];
  if (!list) {
    console.log("Currently no todo exist in your Todo list !");
    return;
  } else {
    if (!completedTodoId) {
      console.log("Please specify todo Id !");
      return;
    }
    list = JSON.parse(list);
    const todolist = list.todo;
    const completeTodoList = list.completed || [];
    let completedTodo;
    let updatedTodoList = todolist.filter((list) => {
      if (list.id !== Number(completedTodoId)) {
        return true;
      } else {
        completedTodo = list;
        console.log(
          chalk.green.bold(`Todo  ${list.id}-${list.title} is completed !`)
        );
        return false;
      }
    });
    const updatedList = {
      todo: updatedTodoList,
      completed: [...completeTodoList, completedTodo],
    };
    await fs.promises.writeFile(filePath, JSON.stringify(updatedList), "utf-8");
  }
};

const deleteTodo = async () => {
  checkIfTodoListExist();
  let list = await fs.promises.readFile(filePath, "utf-8");
  const deteteTodoId = args[3];
  if (!list) {
    console.log("Currently no todo exist in your Todo list !");
    return;
  } else {
    if (!deteteTodoId) {
      console.log("Please specify todo Id !");
      return;
    }
    list = JSON.parse(list);
    const todolist = list.todo;
    const completedList=list.completed;
    let updatedTodoList = todolist.filter((list) => {
      if (list.id !== Number(deteteTodoId)) {
        return true;
      } else {
        console.log(
          chalk.red.bold(`Todo  ${list.id}-${list.title} is deleted !`)
        );
      }
    });
    let updatedCompletedTodoList=completedList.filter((list) => {
        if (list.id !== Number(deteteTodoId)) {
          return true;
        } else {
          console.log(
            chalk.red.bold(`Todo  ${list.id}-${list.title} is deleted !`)
          );
        }
      });
    const updatedList = {
      todo: updatedTodoList,
      completed:updatedCompletedTodoList
    };
    await fs.promises.writeFile(filePath, JSON.stringify(updatedList), "utf-8");
  }
};

if (args[2] === "add") {
  addTodo();
} else if (args[2] === "delete") {
  deleteTodo();
} else if (args[2] === "done") {
  completeTodo();
} else if (args[2] === "show") {
  showTodoList();
}
