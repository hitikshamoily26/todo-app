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
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
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

  const toggleComplete = (id: number) => {
    setToDo(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteToDo = (id: number) => {
    setToDo(prev => prev.filter(todo => todo.id !== id));
  };

  const addToDo = () => {
    if (newToDo.trim() === "") {
      alert("Please enter a todo")
      return;
    }
    const newToDOItem: toDoProps = {
      id: toDo.length + 1,
      title: newToDo,
      completed: false
    }
    setToDo([...toDo, newToDOItem]);
    setNewToDo("");
  }

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
        (<ToDoItem key={key} toDoID={toDo.id} toDo={toDo.title} completed={toDo.completed} toggleComplete={toggleComplete} deleteToDo={deleteToDo}></ToDoItem>)
      )}</ul>
  </div>)
}