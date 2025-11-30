import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import "./index.css";

type toDoProps = {
  id: number
  title: string
  completed: boolean
}

export default function App() {
  const [toDo, setToDo] = useState<toDoProps[]>([])
  const [loading, setLoading] = useState(true)
  const [newToDo, setNewToDo] = useState<string>('')

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data: toDoProps[]) => {
        setToDo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch todo's", error)
        setLoading(false);
      })
  }, [])

  const deleteToDo = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todos: toDo }) // send full list
    });

    const updated = await res.json();
    setToDo(updated);
  };

  const addToDo = async () => {
    if (newToDo.trim() === "") {
      alert("Please enter a todo")
      return;
    }

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todos: toDo, title: newToDo }),
    });

    const updated = await res.json();
    setToDo(updated);
    setNewToDo("");
  }

  const toggleComplete = async (id: number) => {
    const todo = toDo.find(t => t.id === id);
    if (!todo) return;

    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todos: toDo,
        updates: { completed: !todo.completed }
      }),
    });

    const updated = await res.json();
    setToDo(updated);
  };

  const updateTitle = async (id: number, newTitle: string) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todos: toDo, updates: { title: newTitle } }),
    });

    const updated = await res.json();
    setToDo(updated);
  };

  if (loading) {
    return <h2 className="text-center mt-10">"Loading todos.."</h2>
  }

  return (<div className="p-6">
    <h2 className="flex gap-2 mb-4">To do list: </h2>
    <div className="flex flex-col mb-8">
      <div className="w-1/2">

        <Input
          placeholder="Add a new todo"
          value={newToDo}
          onChange={(e) => setNewToDo(e.target.value)}
          className="w-full border-0"
        />

      </div>
      <div style={{ marginTop: "3px" }}>

        <Button onClick={addToDo} className="font-bold text-blue-800 text-lg">
          Add
        </Button>

      </div>
    </div>

    <ul className="space-y-1">
      {toDo?.map((toDo, key) =>
        (<ToDoItem key={key} toDoID={toDo.id} toDo={toDo.title} completed={toDo.completed} toggleComplete={toggleComplete} deleteToDo={deleteToDo} updateTitle={updateTitle}></ToDoItem>)
      )}
    </ul>
  </div>)
}