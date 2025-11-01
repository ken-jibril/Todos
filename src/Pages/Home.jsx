import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { use } from "react";

function Home() {

    const queryClient = useQueryClient();

    const token = import.meta.env.VITE_API_TOKEN;


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
                            <div key={todo.id} className="w-lg mx-auto cursor-pointer flex items-center justify-between bg-blue-800 text-white font-semibold px-4 py-2.5 rounded ">
                                <span className="text-white font-semibold mb-2 px-2 py-3 rounded">{todo.title}</span>
                                <button 
                                  onClick={() => removeTodo(todo.id)}
                                  disabled={isPending}
                                  className=" text-white font-semibold px-2 py-1.5 mt-2 rounded hover:bg-red-400 transition-all duration-300 cursor-pointer"
                                >
                                  {isPending ? '...' : '🗑'}
                                </button>
                            </div>
                        ))
                    }   
                </div>
        </>
     );
}

export default Home;