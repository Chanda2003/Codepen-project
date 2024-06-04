
// import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// import './App.css';
// import Home from './Container/Home';
// import React,{ useEffect, useState } from 'react';
// import { auth, db } from './Config/Firebase.config';
// import {  collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
// import { useDispatch } from 'react-redux';
// import { SET_USER } from './Context/Action/UserAction';
// import Project from './Container/Newproject/NewProject';
// import {  SET_PROJECTS } from './Context/Action/ProjectAction';

// function App() {
// const Navigate=useNavigate()
// const[isLoding,setIsLoding]=useState(true)
// const dispatch=useDispatch()

// useEffect(()=>{
//     const unsubscribe=auth.onAuthStateChanged((userCred)=>{
//       if(userCred){
//         console.log(userCred?.providerData[0])

//         setDoc(doc(db,"users",userCred?.uid),userCred?.providerData[0])
//         .then(()=>{
//           // dispath to redux Store

//           dispatch(SET_USER(userCred?.providerData[0]))
//           Navigate("/home/projects" ,{replace:true})
//         })

//       }
//       else{
//           Navigate("/home/auth" ,{replace:true})
//       }

//       setInterval(()=>{
//        setIsLoding(false)
//       },2000)

//     })
//     // to clen up listener Event
//     return () =>unsubscribe()
//   },[])

// useEffect(()=>{
//   const projectQuery=query(
//     collection(db,"Projects"),
//     orderBy("id","desc")
//   )
//   const unsubscribe=onSnapshot(projectQuery,(querySnaps)=>{
//     const projectsList=querySnaps.docs.map((doc)=>doc.data())
//     dispatch(SET_PROJECTS(projectsList))
//   })
//   return () => unsubscribe

// },[])



//   return (
//     <>
//   {
//     isLoding ?
//     <div className='w-screen h-screen flex items-center justify-center overflow-hidden text-white'> Loding....... </div>
//     :
//     <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>

//     <Routes>
//       <Route path='/home/*' element={<Home/>}></Route>
//       <Route path='/newProject' element={<Project/>}></Route>

// {/* if the route not matching */}

// <Route path='*' element={<Navigate to={"/home"}/>}></Route>
      
//     </Routes>
  
//   </div>
//   }
//     </>
//   );
// }

// export default App;



import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Container/Home';
import React,{ useEffect, useState } from 'react';
import { auth, db } from './Config/Firebase.config';
import {  collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { SET_USER } from './Context/Action/UserAction';
// import Project from './Container/Newproject/NewProject';
import {  SET_PROJECTS } from './Context/Action/ProjectAction';
import NewProject from './Container/Newproject/NewProject';

function App() {
const Navigate=useNavigate()
const[isLoding,setIsLoding]=useState(true)
const dispatch=useDispatch()
const [projects, setProjects] = useState([]);

useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((userCred)=>{
      if(userCred){
        console.log(userCred?.providerData[0])

        setDoc(doc(db,"users",userCred?.uid),userCred?.providerData[0])
        .then(()=>{
          // dispath to redux Store

          dispatch(SET_USER(userCred?.providerData[0]))
          Navigate("/home/projects" ,{replace:true})
        })

      }
      else{
          Navigate("/home/auth" ,{replace:true})
      }

      setInterval(()=>{
       setIsLoding(false)
      },2000)

    })
    // to clen up listener Event
    return () =>unsubscribe()
  },[])



useEffect(() => {
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(SET_PROJECTS(data))
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects: ', error);
    }
  };

  fetchData();
}, []);

console.log(projects)

  return (
    <>
  {
    isLoding ?
    <div className='w-screen h-screen flex items-center justify-center overflow-hidden text-white'> Loding....... </div>
    :
    <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>

    <Routes>
      <Route path='/home/*' element={<Home/>}></Route>
      <Route path='/newProject' element={<NewProject/>}></Route>
      <Route path='/savedproject/:id' element={<NewProject/>}></Route>

{/* if the route not matching */}

<Route path='*' element={<Navigate to={"/home"}/>}></Route>
      
    </Routes>
  
  </div>
  }
    </>
  );
}

export default App;










































