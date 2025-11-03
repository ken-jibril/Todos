import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.config.js';

function CreateTodo() {

  const navigate = useNavigate();

  const [todo, setTodo] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [input, setInput] = useState('');


  // const token = import.meta.env.VITE_API_TOKEN;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todo.trim()) return alert('❌ Task cannot be empty!');

    const newTodo = {
      title: todo,
      text: input,
      is_completed: isCompleted,
      createdAt: new Date()
    };

    try {
      await addDoc(collection(db, 'todos'), newTodo);
      
      setTodo('');
      setIsCompleted(false);
      setInput('');
      navigate('/');
      
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to add task. Please try again.');
    }
  }

return (
  <div className="flex items-center justify-center flex-col">
      <form onSubmit={handleSubmit} className='shadow-xl max-w-fit mx-auto mt-10 rounded-lg p-6 flex flex-col gap-4 '>
          <label htmlFor="task" className='font-semibold'>Enter New Task</label>
          <input
          type="text"
          placeholder='Create a new task'
           value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className='w-lg px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
          
          <button type='submit' className='bg-blue-800 p-2 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 cursor-pointer'>Add Todo</button>
      </form>
    </div>
  )
}

export default CreateTodo;