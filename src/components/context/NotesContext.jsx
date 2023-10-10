import React from 'react'
export const NotesDataContext=React.createContext(null);

   let API_URL='https://651666a009e3260018c9b7e2.mockapi.io/notes'
function NotesContext({children}) {
  return (
    <>
       <NotesDataContext.Provider  value={{API_URL}}>
         {children}
       </NotesDataContext.Provider>
    </>
  )
}

export default NotesContext