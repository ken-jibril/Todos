import { useQueryClient, useQuery } from "@tanstack/react-query";

function Home() {

    const queryClient = useQueryClient();

    const fetchTodos = async () => {
        const res = await fetch('https://stub.muindetuva.com/api/todos', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 25|z098DRg1OmjYpQPKexZHjxEmM1o0ZVKaPYa2NDgcd3f09ba7',
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
        <div className="">
            <h1 className="text-4xl text-center py-14 font-semibold text-blue-700">TaskList</h1>
            {
                data?.map((todo) => (
                    <div key={todo.id} className="w-lg  mx-auto border-gray-300 py-4 px-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                        <p className="text-black font-semibold mt-2">{todo.title}</p>
                    </div>
                ))
            }
            
        </div>
     );
}

export default Home;