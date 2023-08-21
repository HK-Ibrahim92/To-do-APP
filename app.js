const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;
        taskList.appendChild(li);

        const deleteBtn = li.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
            showDeleteConfirmation(li);
        });

        const editBtn = li.querySelector(".editBtn");
        const taskSpan = li.querySelector("span");

        editBtn.addEventListener("click", () => {
            showEditPrompt(taskSpan);
        });

        taskInput.value = "";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Write something!",
        });
    }
}

function showEditPrompt(taskSpan) {
    Swal.fire({
        title: "Edit Task",
        input: "text",
        inputValue: taskSpan.textContent,
        showCancelButton: true,
        confirmButtonText: "Save",
    }).then((result) => {
        if (result.isConfirmed) {
            const newTaskText = result.value;
            taskSpan.textContent = newTaskText;
        }
    });
}

function showDeleteConfirmation(li) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            li.remove();
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
        }
    });
}
