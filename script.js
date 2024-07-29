const inputBox = document.getElementById("input-box");
const taskContainer = document.getElementById("task-container");
let editIndex = null;

function addTask() {
	if (inputBox.value === "") {
		alert("You must write something!");
	} else {
		if (editIndex === null) {
			let li = document.createElement("li");
			li.innerHTML = inputBox.value;
			taskContainer.appendChild(li);

			let editBtn = document.createElement("button");
			editBtn.innerHTML = "Edit";
			li.appendChild(editBtn);

			let span = document.createElement("span");
			span.innerHTML = "\u00d7";
			li.appendChild(span);
		} else {
			const li = taskContainer.children[editIndex];
			li.childNodes[0].nodeValue = inputBox.value;
			editIndex = null;
		}
	}
	inputBox.value = "";
	saveData();
}

taskContainer.addEventListener(
	"click",
	function (e) {
		if (e.target.tagName === "LI") {
			e.target.classList.toggle("checked");
		} else if (e.target.tagName === "SPAN") {
			e.target.parentElement.remove();
		} else if (e.target.tagName === "BUTTON") {
			const li = e.target.parentElement;
			inputBox.value = li.childNodes[0].nodeValue;
			editIndex = Array.prototype.indexOf.call(taskContainer.children, li);
		}
		saveData();
	},
	false
);

function saveData() {
	localStorage.setItem("data", taskContainer.innerHTML);
}

function showTask() {
	taskContainer.innerHTML = localStorage.getItem("data");
}

showTask();
