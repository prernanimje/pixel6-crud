import Form from './Component/Form';
import List from './Component/List';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const[users,setUsers]=useState([]);
  const[modifyIndex,setModifyIndex]=useState(null);

  useEffect(()=>{
    const StoredUsers= localStorage.getItem('users');
    if(StoredUsers){
      setUsers(JSON.parse(StoredUsers));
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem('users',JSON.stringify(users))
  },[users]);

  const addUser=(customer)=>{
    if(modifyIndex!==null){
      const updateUsers=users.map((person,index)=>
      index===modifyIndex? users : person);
      setUsers(updateUsers);
    }else{
      setModifyIndex([...users,customer]);
    }
    setModifyIndex(null);
  };

  
const deleteUser=(index)=>{
  if(window.confirm("Are you Sure you want to delete")){
    const updatedUser= users.filter((_,i)=> i !==index);
    setUsers(updatedUser);
  }
  
}

  return (
    <div className="App">
      <h1>User Form</h1>
      <Form 
      onSubmit={addUser}
      initialData={users[modifyIndex]}
      onCancel={()=>setModifyIndex(null)}
      />
    </div>
  );
}

export default App;
