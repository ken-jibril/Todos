import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import { useQuery, useQueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryClient = new useQueryClient();

function App() {
  

  return (
    <QueryClientProvider client={QueryClient}>
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
