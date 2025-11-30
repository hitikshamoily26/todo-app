import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get("/api/todos", () => {
        return HttpResponse.json([
            { id: 1, title: "Learn React", completed: false },
            { id: 2, title: "Build a project", completed: true },
        ]);
    }),

    http.delete("/api/todos/:id", async ({ request, params }) => {
        const id = Number(params.id);
        const { todos } = await request.json();
        const updatedTodos = todos.filter((t) => t.id !== id);
        return HttpResponse.json(updatedTodos);
    }),

    http.post("/api/todos", async ({ request }) => {
        const { todos, title } = await request.json();
        const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
        const newTodo = { id: newId, title, completed: false };
        return HttpResponse.json([...todos, newTodo]);
    }),

    http.patch("/api/todos/:id", async ({ request, params }) => {
        const id = Number(params.id);
        const { todos, updates } = await request.json();
        const updatedTodos = todos.map((t) =>
            t.id === id ? { ...t, ...updates } : t
        );
        return HttpResponse.json(updatedTodos);
    }),
];