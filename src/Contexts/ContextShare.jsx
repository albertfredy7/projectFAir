import React, { useState, createContext } from 'react'

export const AddProjectResponseContext = createContext()
export const EditProjectResponseContext = createContext()

function ContextShare({children}) {
  const [addProjectResponse, setAddProjectResponse] = useState({})
  const [editProjectResponse, setEditProjectResponse] = useState({})
  return (
    <AddProjectResponseContext.Provider value={{addProjectResponse , setAddProjectResponse}}>
      <EditProjectResponseContext.Provider value={{editProjectResponse, setEditProjectResponse}}>{children}</EditProjectResponseContext.Provider>
    </AddProjectResponseContext.Provider> 
  )
}

export default ContextShare