import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";

function Home() {

    const queryClient = useQueryClient();

    const token = import.meta.env.VITE_API_TOKEN;

    const [deletindgId, setDeletingId] = useState(null);


    const fetchTodos = async () => {
        const res = await fetch('https://stub.muindetuva.com/api/todos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    })


    const toggleCompleted = (id, is_completed) => {
        toggleTodo({ id, is_completed: !is_completed });
    }

    const deleteTodo = async (id) => {
        const res = await fetch(`https://stub.muindetuva.com/api/todos/${id}`, {
          method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) throw new Error('Failed to delete todo');
        return id;
    }

    const updateTodo = async (id, is_completed) => {
        const res = await fetch(`https://stub.muindetuva.com/api/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ is_completed })
        });
        if (!res.ok) throw new Error('Failed to update todo');
        return { id, is_completed };
    }

        const { mutate: toggleTodo } = useMutation({
        mutationFn: ({ id, is_completed }) => updateTodo(id, is_completed),
        onSuccess: ({ id, is_completed }) => {
            queryClient.setQueryData(['todos'], (oldTodos) =>
            oldTodos.map((todo) =>
                todo.id === id ? { ...todo, is_completed } : todo
            )
            );
        },
        });
    
    const { mutate: removeTodo, isPending } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: (deletedId) => {
            queryClient.setQueryData(['todos'], (oldTodos) => 
             oldTodos.filter((todo) => todo.id !== deletedId)
            );
        },
    });

    if (isLoading) {
        return <p className="text-gray-500 font-semibold py-14 text-xl text-center">Loading...</p>
    }
    if (isError) {
        return <p className="text-red-600 font-semibold py-14 text-xl text-center">❌ Sorry couldn't fetch your Todos! Try again.</p>
    }

    return ( 
        <>
            <h1 className="text-4xl text-center py-14 font-semibold text-blue-700">TaskList</h1>
                <div className="max-w-fit mx-auto mt-5 rounded-lg gap-1 flex flex-col space-y-2">
                    {
                        data?.map((todo) => (
                            console.log(todo.title, todo.is_completed),

                            <div key={todo.id} className="w-lg mx-auto cursor-pointer flex items-center justify-between bg-blue-800 text-white font-semibold px-4 py-2.5 rounded ">
                               <div className="flex items-center gap-1">
                                    <input
                                    type="checkbox"
                                    checked={!!todo.is_completed}
                                    onChange={() => toggleCompleted(todo.id, todo.is_completed)}
                                    className="w-6 h-6 accent-blue-600 mr-4 cursor-pointer"       
                                    />
                                    <span className={`text-white font-semibold mb-2 px-2 py-3 rounded ${todo.is_completed ? "line-through text-gray-500" : ""}`}>{todo.title}</span>
                               </div>
                                <button 
                                  onClick={() => {
                                    setDeletingId(todo.id);
                                    removeTodo(todo.id, {
                                        onSettled: () => setDeletingId(null),
                                    })
                                  }}
                                  disabled={deletindgId === todo.id}
                                  className=" text-white font-semibold px-2 py-1.5 mt-2 rounded hover:bg-white cursor-pointer"
                                >
                                  {deletindgId === todo.id ? '...' : '🗑'}
                                </button>
                            </div>
                        ))
                    }   
                </div>
        </>
     );
}

export default Home;