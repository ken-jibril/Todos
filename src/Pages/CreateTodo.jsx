import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.config.js';

function CreateTodo() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [input, setInput] = useState('');

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
    <div className="flex items-center justify-center flex-col px-4 sm:px-6 md:px-8">
      <form onSubmit={handleSubmit} className='shadow-xl max-w-md w-full mx-auto mt-10 rounded-lg p-6 flex flex-col gap-4'>
          <label htmlFor="task" className='font-semibold'>Enter New Task</label>
          <input
              type="text"
              placeholder='Create a new task'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
          
          <button type='submit' className='bg-blue-800 p-2 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto'>
              Add Todo
          </button>
      </form>
    </div>
  )
}

export default CreateTodo;
