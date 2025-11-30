type ToDoItemProp = {
    toDoID: number
    toDo: string
    completed: boolean
    toggleComplete: (id: number) => void;
    deleteToDo: (id: number) => void;
    updateTitle: (id: number, newTitle: string) => void;
}

export default function ToDoItem({ toDoID, toDo, completed, toggleComplete, deleteToDo, updateTitle }: ToDoItemProp) {
    return (
        <li key={toDoID} className="flex items-center gap-2">

            <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleComplete(toDoID)}
                className="h-4 w-4 accent-blue-500"
            />

            <span className={completed ? "line-through text-gray-400" : ""}>
                {toDo}
            </span>

            <button
                className="text-red-500 hover:text-red-700 ml-2"
                onClick={() => deleteToDo(toDoID)}
            >
                Delete
            </button>

            <button className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                    const newTitle = prompt("Enter new title:", toDo);
                    if (newTitle) updateTitle(toDoID, newTitle);
                }}
            >
                Edit
            </button>

        </li>
    )
}