import './App.css'
import { useRoutes } from 'react-router-dom';
import List from './components/List';
import Add from './components/Add';
import Edit from './components/Edit';
import Detail from './components/Detail';
function App() {
  const route = useRoutes([
    { path: 'products', Component: List },
    { path: 'products/add', element: <Add></Add> },
    { path: 'products/edit/:id', element: <Edit></Edit> },
    { path: 'products/detail/:id', element: <Detail></Detail> },
  ])
  return route

}

export default App
