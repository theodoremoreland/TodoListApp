export const handleCheckboxChange = (
    isChecked: boolean, 
    markAsCompletedCountdown : ReturnType<typeof setTimeout>,
    setMarkAsCompletedCountdown : React.Dispatch<React.SetStateAction<NodeJS.Timeout>>,
    updateTask : (task: ITask) => void,
    task : ITask)
    : void => {
    clearTimeout(markAsCompletedCountdown);

    const { id, name, note, dueDate, status } = task;
    
    if (isChecked) {
        // ! Set timeout is used to delay the updating of the task as to allow the checkbox + strikethrough animation to complete
        // ! If a user checks multiple tasks in succession too quickly, the tasks checked first do not update properly
        // ! Because of this, the timeout is set to 500ms to ensure the updates occur quickly enough that the user can't check another task.
        // TODO ^^^ This is not ideal. investigate a better UX solution.
        setMarkAsCompletedCountdown(setTimeout(() => updateTask({id, name, note, dueDate, "status": "complete"}), 500));
    }
    else if (!isChecked && status === "complete"){
        updateTask({id, name, note, dueDate,  "status": "open"});
    }
};