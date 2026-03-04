import './App.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './components/home/Home'
import Contact from './components/contact/Contact'
import About from './components/about/About'
import Project from './components/projects/Project'


function App() {

  return (
   <BrowserRouter>
   <nav>
    <Link to='/' >Home</Link>
    <Link to='/' >About</Link>
    <Link to='/' >Projects</Link>
    <Link to='/' >Contact</Link>
   
   </nav>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/projects' element={<Project/>} />
    <Route path='/contacts' element={<Contact/>} />
    <Route path='/about' element={<About/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
