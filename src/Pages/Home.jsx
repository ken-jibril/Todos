import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config.js';

function Home() {
    const queryClient = useQueryClient();

    const [deletindgId, setDeletingId] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);

    const fetchTodos = async () => {
        const querySnapshot = await getDocs(collection(db, 'todos'));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    });

    const toggleCompleted = (id, is_completed) => {
        toggleTodo({ id, is_completed: !is_completed });
    }

    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
        return id;
    }

    const updateTodo = async (id, is_completed) => {
        await updateDoc(doc(db, 'todos', id), { is_completed });
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
            if (is_completed) {
                setIsSuccessful(true);
                setTimeout(() => setIsSuccessful(false), 2000);
            }
        },
    });

    const { mutate: removeTodo, isPending } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: (deletedId) => {
            queryClient.setQueryData(['todos'], (oldTodos) => 
             oldTodos.filter((todo) => todo.id !== deletedId)
            );
            if (deletedId) {
                setIsRemoved(true);
                setTimeout(() => setIsRemoved(false), 2000);
            }
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
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center py-14 font-semibold text-blue-700">TaskList</h1>

            {/* Success / Remove Notifications */}
            {isSuccessful && (
                <p className="fixed top-4 left-1/2 transform -translate-x-1/2 rounded-md border-l-4 border-green-500 shadow-md bg-white text-green-600 font-semibold py-3 px-4 z-50 transition-all duration-500">
                    ✅ Task completed successfully!
                </p>
            )}
            {isRemoved && (
                <p className="fixed top-4 left-1/2 transform -translate-x-1/2 rounded-md border-l-4 border-green-500 shadow-md bg-white text-green-600 font-semibold py-3 px-4 z-50 transition-all duration-500">
                    🗑️ Task removed successfully!
                </p>
            )}

            {/* Todos List Container */}
            <div className="max-w-xl w-full mx-auto mt-5 rounded-lg flex flex-col gap-2 px-4 sm:px-6">
                {data?.map((todo) => (
                    <div key={todo.id} className="w-full flex flex-col sm:flex-row items-center sm:justify-between bg-blue-800 text-white font-semibold px-4 py-3 rounded">
                        {/* Checkbox + Title */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <input
                                type="checkbox"
                                checked={!!todo.is_completed}
                                onChange={() => toggleCompleted(todo.id, todo.is_completed)}
                                className="w-5 h-5 accent-blue-600 mr-2"
                            />
                            <span className={`text-white ${todo.is_completed ? "line-through text-gray-300" : ""}`}>
                                {todo.title}
                            </span>
                        </div>

                        {/* Delete Button */}
                        <button 
                          onClick={() => {
                            setDeletingId(todo.id);
                            removeTodo(todo.id, {
                                onSettled: () => setDeletingId(null),
                            })
                          }}
                          disabled={deletindgId === todo.id}
                          className="text-white px-2 py-1 mt-2 sm:mt-0 rounded hover:bg-white hover:text-blue-800 transition-all"
                        >
                          {deletindgId === todo.id ? '...' : '🗑'}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
