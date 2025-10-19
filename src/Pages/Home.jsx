import { useQueryClient, useQuery } from "@tanstack/react-query";

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
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    })

    if (isLoading) {
        return <p className="text-gray-500 font-semibold py-14 text-xl text-center">Loading...</p>
    }
    if (isError) {
        return <p className="text-red-600 font-semibold py-14 text-xl text-center">❌ Sorry couldn't fetch your Todos! Try again.</p>
    }

    return ( 
        <>
            <h1 className="text-4xl text-center py-14 font-semibold text-blue-700">TaskList</h1>
                <div className="max-w-fit mx-auto mt-8 rounded-lg">
                    {
                        data?.map((todo) => (
                            <div key={todo.id} className="w-lg mx-auto cursor-pointer">
                                <p className="text-white font-semibold mt-2 shadow-xl bg-blue-800 px-2 py-3.5 rounded">{todo.title}</p>
                            </div>
                        ))
                    }   
                </div>
        </>
     );
}

export default Home;