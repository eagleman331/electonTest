import React, { createContext, useState } from 'react'

export const TaskContext = createContext();

const TaskContextProvider = (props) => {

    const [completeWork, setCompleteWOrk] = useState({
        "primaryData": "",
        "first": "",
        "second": "",
        "final": "",
        "targetdata": "",
    });
    const [knownUser, setKnownUser] = useState({
        "name": "",
        "email": "",
        "group": '',
        "roles": null,
        "timestamp": null
    });
    const [className, setClassName] = useState("")



    return (
        <TaskContext.Provider value={{
        completeWork, setCompleteWOrk,knownUser, setKnownUser,className, setClassName
            
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider;
