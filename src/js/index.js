function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));

    // Update status in db.json
    let newStatus = event.target.id;
    updateStatusInDb(data, newStatus);
}

function createTask() {
    let taskName = document.getElementById("taskInput").value;
    if (taskName) {
        // Create div element
        let taskDiv = document.createElement("div");
        taskDiv.textContent = taskName;
        taskDiv.draggable = true;
        taskDiv.ondragstart = drag;
        
        // Assign a random ID for simplicity
        let randomId = 'task_' + Math.random().toString(36).substr(2, 9);
        taskDiv.id = randomId;

        document.getElementById("open").appendChild(taskDiv);
        
        // Save to db.json
        saveToDb(taskName, randomId);
    }
}

function saveToDb(taskName, id) {
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: taskName,
            id: id,
            status: "open"
        })
    });
}

function updateStatusInDb(id, newStatus) {
    fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: newStatus
        })
    });
}
