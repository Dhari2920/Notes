
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Notes from './components/Notes'
import Edit from './components/Edit'
import { Navigate } from 'react-router-dom'
import NotesContext from './components/context/NotesContext'
function App() {
  

  return (
    <>
       <div className='container-fluid'>
          <div className='row'>
              <BrowserRouter>
                   
                   <Routes>
                       <Route  path='/notes'  element={
                       <NotesContext>
                         <Sidebar/>
                         <Notes/>
                        </NotesContext>} />
                      
                        <Route path='/edit/:id' element={
                        <NotesContext>
                          <Sidebar/>
                          <Edit/>
                        </NotesContext>}/>
                        <Route path='/*'   element={<Navigate to='/notes'/>}/>
                       
                   </Routes>
                      
              </BrowserRouter>
                       
                    
          </div>
            
       </div>
    </>
  )
}

export default App