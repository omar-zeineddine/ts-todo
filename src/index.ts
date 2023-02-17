import { v4 as uuidv4 } from "uuid";
// console.log(uuidv4());

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// <> is a type assertion
const list = document.querySelector<HTMLUListElement>("#list");
// const form = document.querySelector<HTMLFormElement>("#new-task-form");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks: Task[] = [];

// event listener
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  // ensure that input exists
  if (input?.value == "" || input?.value == null) return;

  // type is no longer null
  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);

  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    console.log(tasks);
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}
