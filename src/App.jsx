import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import CreateTodo from './Pages/CreateTodo';
import { useQuery, useQueryClient, QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
     <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
      <Routes>
        <Route path='/create' element={<CreateTodo />}/>
      </Routes>
     </Router>
    </QueryClientProvider>
  )
}

export default App
