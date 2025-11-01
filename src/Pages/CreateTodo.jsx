import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTodo() {

  const navigate = useNavigate();

  const [todo, setTodo] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [input, setInput] = useState('');

  const token = import.meta.env.VITE_API_TOKEN;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo.trim()) return alert('❌ Task cannot be empty!');

    const newTodo = {
      title: todo,
      text: input,
      is_completed: isCompleted
    };

    fetch('https://stub.muindetuva.com/api/todos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('✅ Task added successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('❌ Failed to add task. Please try again.');
    });

    setTodo('');
    setIsCompleted(false);
    setInput('');

    navigate('/');

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