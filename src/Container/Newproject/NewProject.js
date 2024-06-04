

// import React from "react";
// import { FaCss3, FaHtml5, FaJs } from "react-icons/fa6"
// import SplitPane from "react-split-pane"
// import CodeMirror from '@uiw/react-codemirror';
// import { javascript } from '@codemirror/lang-javascript';
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { MdCheck, MdEdit } from "react-icons/md";
// import { useSelector } from "react-redux";
// import UserauthProfile from "../../Components/UserAuthProfile";
// import { doc, setDoc } from "firebase/firestore";
// import Alret from "../../Components/Alret";
// import { db } from "../../Config/Firebase.config";
// import Accordion from 'react-bootstrap/Accordion';

// function NewProject(){
//   const [html,setHtml]=useState("")
//   const [css,setCss]=useState("")
//   const [js,setJs]=useState("")
//   const [output,setOutput]=useState("")
//   const [alret,setAlret]=useState(false)

//   const [title,setTitle]=useState("untitled")
//   const [istitle,setIstile]=useState("")

//   const projectdata=useParams()
//   // console.log(projectdata.id)
//   const user=useSelector((state)=>state.user?.user)

//   const projects = useSelector((state) => state?.projects?.projects);

//   // console.log(projects)
//   useEffect(()=>{
 
//    projects.map((data)=>{


//     if(projectdata.id === data.id){
//       console.log(true)
//       setHtml(data.html)
//       setCss(data.css)
//       setJs(data.js)
//       setTitle(data.title)
  
//      } 
//   })
//     // console.log(saved == projectdata.id)


//   },[projectdata.id])

// useEffect(()=>{

//     updatedOutput()

//   },[html,css,js])

// const updatedOutput=()=>{
//   const combinedOutput=`
//   <html>
//   <head>
//     <style>${css}</style>
//     </head>
//     <body>
//     ${html}
//     <script>${js}</script>
//     </body>
//     </html>
//   `;
//   setOutput(combinedOutput)
// }

// const saveProgram=async()=>{
//   const id=`${Date.now()}`

//   const docu={
//     id:id,
//     title:title,
//     html:html,
//     css:css,
//     js:js,
//     output:output,
//     user:user,
//   }

//   await setDoc(doc(db,"projects",id),docu).then((res)=>{
//     setAlret(true)
//   }).catch((err)=>console.log(err))

//   setInterval(() => {
//     setAlret(false)
//   }, 2000);
// }


//     return(
//         <>
//         <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">

//             {/* alret section */}
//             {
//               alret && <Alret status={"Success"} alretMsg={"Project Saved...."}/>
//             }

            
//             {/* header section */}

//             <header className="w-full flex items-center justify-between px-12 py-4">
//               <div className=" flex items-center justify-center gap-6">
//               <Link to={"/home/projects"}>
//                 <img src="https://codepenclone-6d515.web.app/static/media/logo.5615535cb11113a0fbb4.webp" alt="logo"
//                 className="object-contain w-32 h-auto"></img>
//                 </Link>

//                 <div className=" flex flex-col items-start justify-start">
//                   {/* title */}
//                   <div className=" flex items-center justify-center gap-3">
//                   {
//                     istitle ? <>
//                     <motion.input
//                     key={"TitleInput"}
//                     type="text"
//                     placeholder="Your Title"
//                     className=" px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
//                     value={title}
//                     onChange={(e)=>setTitle(e.target.value)}
//                     >
//                     </motion.input>
//                     </> :<> 
//                     <motion.p
//                     key={"title Label"}
//                     className="px-3 py-2 text-white text-lg"
//                     >
//                       {title}

//                     </motion.p>
//                     </>
//                   }
              
             
//                   {
//                     istitle ? <>
//                     <motion.div
//                    key={"MdCheck"}
//                    whileTap={{scale:0.9}}
//                    className=" cursor-pointer"
//                    onClick={()=>setIstile(false)}
//                     >
//                       <MdCheck className=" text-2xl text-emerald-500"></MdCheck>
//                     </motion.div>
//                     </> :<> 
//                     <motion.div
//                    key={"MdCheck"}
//                    whileTap={{scale:0.9}}
//                    className=" cursor-pointer"
//                    onClick={()=>setIstile(true)}
//                     >
//                       <MdEdit className=" text-2xl text-primaryText"></MdEdit>
//                     </motion.div>
//                     </>
//                   }
//                 </div>
//                 {/* follow */}

//                 <div className=" flex items-center justify-center px-3 -mt-2 gap-2">

//                   <p className=" text-primaryText text-sm">
//                     {
//                       user?.displayName ? user?.displayName :`${user?.email.split("@")[0]}`
//                     }


//                   </p>

//                 </div>

//               </div>
//               </div>

//               {/* user section */}

//               {
//                 user &&(
//                   <div className=" flex items-center justify-center gap-4">
                
//                 <motion.button onClick={saveProgram} whileTap={{scale:0.9}} className=" px-6 py-4 bg-primaryText cursor-pointer text-base
//                  text-primary font-semibold rounded-md">
//                   Save
//                 </motion.button>
//                 <UserauthProfile/>

//               </div>
//                 )
//               }


//             </header>

//             {/* coding section */}

//             <div>
//                 {/* horizontal */}\
//                 <SplitPane
//                 split="horizontal"
//                 minSize={100}
//                 maxSize={-100}
//                 defaultSize={"50%"}
//                 >

//                 {/* top coding section */}
//                 <SplitPane split="vertical" minSize={500}>
//                     {/* html code */}
//    {/* ---------------- */}
//                     <div className="w-full h-full flex flex-col items-start justify-start overflow-y-scroll">
//                         <div className="w-full flex items-center justify-between">
//                             <div className=" bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
//                                 <FaHtml5 className="text-xl text-red-500"/>
//                                 <p className=" text-primaryText font-semibold">HTML</p>

//                             </div>

//                         </div>
//                         <div className=" w-full px-2">
//                         <CodeMirror value={html}
//                          height="600px" 
//                          extensions={[javascript({ jsx: true })]} 
//                          theme={"dark"}
//                          onChange={(value,viewUpdate)=>{
//                           setHtml(value)
//                          }} />
//                         </div>





//                     </div>
// {/* --------------------------- */}
//                     <SplitPane split="vertical" minSize={500}>
//                         {/* css code */}
//   {/* ------------------------                       */}
//                         <div className="w-full h-full flex flex-col items-start justify-start overflow-y-scroll">
//                         <div className="w-full flex items-center justify-between">
//                             <div className=" bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
//                                 <FaCss3 className="text-xl text-sky-500"/>
//                                 <p className=" text-primaryText font-semibold">CSS</p>

//                             </div>

//                         </div>
//                         <div className=" w-full px-2">
//                         <CodeMirror value={css}
//                          height="600px" 
//                          extensions={[javascript({ jsx: true })]} 
//                          theme={"dark"}
//                          onChange={(value,viewUpdate)=>{
//                           setCss(value)
//                          }} />
//                         </div>

                        
//                     </div>
// {/* ------------------------------- */}
//                            {/* js code */}
//                            <div className="w-full h-full flex flex-col items-start justify-start overflow-y-scroll">
//                         <div className="w-full flex items-center justify-between">
//                             <div className=" bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
//                                 <FaJs className="text-xl text-yellow-500"/>
//                                 <p className=" text-primaryText font-semibold">JS</p>

//                             </div>

//                         </div>
//                         <div className=" w-full px-2">
//                         <CodeMirror value={js}
//                          height="600px" 
//                          extensions={[javascript({ jsx: true })]} 
//                          theme={"dark"}
//                          onChange={(value,viewUpdate)=>{
//                           setJs(value)
//                          }} />
//                         </div>
                       

//                     </div>
//    {/* ----------------------                  */}

//                     </SplitPane>
//                 </SplitPane>
               

//                 {/* bottom result section */}
//                 <div className=" bg-white"
//                 style={{overflow:"hidden",height:"100%"}}>
//                   <iframe
//                   title="Result"
//                   srcDoc={output}
//                   style={{border:"none",width:"100%",height:"100%"}}
//                   ></iframe>

//                 </div>
//                 </SplitPane>
//             </div>

//         </div>
    
//         </>
//     )
// }
// export default NewProject



































import React, { useEffect, useState } from "react";
import { FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html'; // Corrected import
import { css } from '@codemirror/lang-css'; // Corrected import
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import UserauthProfile from "../../Components/UserAuthProfile";
import { doc, setDoc } from "firebase/firestore";
import Alret from "../../Components/Alret";
import { db } from "../../Config/Firebase.config";
import Accordion from 'react-bootstrap/Accordion';
import Header from "./Header";

function NewProject() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [alert, setAlert] = useState(false);

  const [title, setTitle] = useState("untitled");
  const [isTitle, setIsTitle] = useState("");

  const projectData = useParams();
  const user = useSelector((state) => state.user?.user);

  const projects = useSelector((state) => state?.projects?.projects);

  useEffect(() => {
    projects.forEach((data) => {
      if (projectData.id === data.id) {
        setHtml(data.html);
        setCss(data.css);
        setJs(data.js);
        setTitle(data.title);
      }
    });
  }, [projectData.id, projects]);

  useEffect(() => {
    const updateOutput = () => {
      const combinedOutput = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;
      setOutput(combinedOutput);
    };

    updateOutput();
  }, [html, css, js]);

  const saveProgram = async () => {
    const id = `${Date.now()}`;

    const docu = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };

    await setDoc(doc(db, "projects", id), docu)
      .then(() => {
        setAlert(true);
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-scroll ">
        {alert && <Alret status={"Success"} alertMsg={"Project Saved...."} />}
      
       <Header/>

        
        <div className="flex-grow w-full overflow-auto  h-96">

        <Accordion defaultActiveKey={['0']}>
            <Accordion.Item eventKey="0">
              <Accordion.Header className=" bg-white">
                <FaHtml5 className="text-xl text-red-500 mr-2  bg-white" />
               <h1 className=" text-black">HTML</h1>
              </Accordion.Header>
              <Accordion.Body className=" bg-secondary ">
                <CodeMirror value={html}
                  height="400px"
                  extensions={[javascript({ jsx: true })]}
                  theme={"dark"}
                  onChange={(value) => setHtml(value)} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header  className=" bg-white">
                <FaCss3 className="text-xl text-sky-500 mr-2 bg-black" />
                <h1 className=" text-black">CSS</h1>
              </Accordion.Header>
              <Accordion.Body className="bg-secondary">
                <CodeMirror value={css}
                  height="400px"
                  extensions={[javascript({ jsx: true })]}
                  theme={"dark"}
                  onChange={(value) => setCss(value)} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className=" bg-white">
                <FaJs className="text-xl text-yellow-500 mr-2 bg-black" />
                <h1 className=" text-black">JS</h1>
              </Accordion.Header>
              <Accordion.Body className="bg-secondary">
                <CodeMirror value={js}
                  height="400px"
                  extensions={[javascript({ jsx: true })]}
                  theme={"dark"}
                  onChange={(value) => setJs(value)} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        <div className="bg-white w-full" style={{ height: "50%" }}>
          <iframe
            title="Result"
            srcDoc={output}
        style={{ border: "none", width: "100%", height: "100%"}}

          ></iframe>
        </div>


      </div>

      
  </>
  );
}

export default NewProject;































// import React, { useEffect, useState } from "react";
// import { FaCss3, FaHtml5, FaJs } from "react-icons/fa";
// import CodeMirror from '@uiw/react-codemirror';
// import { javascript } from '@codemirror/lang-javascript';
// import { html as htmlLang } from '@codemirror/lang-html'; // Renamed to avoid conflict
// import { css as cssLang } from '@codemirror/lang-css'; // Renamed to avoid conflict
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { doc, setDoc } from "firebase/firestore";
// import Alret from "../../Components/Alret";
// import { db } from "../../Config/Firebase.config";
// import Accordion from 'react-bootstrap/Accordion';
// import Header from "./Header";

// function NewProject() {
//   const [html, setHtml] = useState("");
//   const [css, setCss] = useState("");
//   const [js, setJs] = useState("");
//   const [output, setOutput] = useState("");
//   const [alert, setAlert] = useState(false);
//   const [activeAccordion, setActiveAccordion] = useState("0");

//   const [title, setTitle] = useState("untitled");
//   const [isTitle, setIsTitle] = useState("");

//   const projectData = useParams();
//   const user = useSelector((state) => state.user?.user);
//   const projects = useSelector((state) => state?.projects?.projects);

//   useEffect(() => {
//     projects.forEach((data) => {
//       if (projectData.id === data.id) {
//         setHtml(data.html);
//         setCss(data.css);
//         setJs(data.js);
//         setTitle(data.title);
//       }
//     });
//   }, [projectData.id, projects]);

//   useEffect(() => {
//     const updateOutput = () => {
//       const combinedOutput = `
//         <html>
//           <head>
//             <style>${css}</style>
//           </head>
//           <body>
//             ${html}
//             <script>${js}</script>
//           </body>
//         </html>
//       `;
//       setOutput(combinedOutput);
//     };

//     updateOutput();
//   }, [html, css, js]);

//   const handleAccordionToggle = (eventKey) => {
//     setActiveAccordion(eventKey === activeAccordion ? null : eventKey);
//   };

//   const saveProgram = async () => {
//     const id = `${Date.now()}`;

//     const docu = {
//       id: id,
//       title: title,
//       html: html,
//       css: css,
//       js: js,
//       output: output,
//       user: user,
//     };

//     await setDoc(doc(db, "projects", id), docu)
//       .then(() => {
//         setAlert(true);
//       })
//       .catch((err) => console.log(err));

//     setTimeout(() => {
//       setAlert(false);
//     }, 2000);
//   };

//   return (
//     <>
//       <div className="w-screen h-screen flex flex-col items-start justify-start overflow-scroll">
//         {alert && <Alret status={"Success"} alertMsg={"Project Saved...."} />}
        
//         <Header/>

//         <div className="flex-grow w-full overflow-auto h-96">
//           <Accordion activeKey={activeAccordion} onSelect={handleAccordionToggle}>
//             <Accordion.Item eventKey="0">
//               <Accordion.Header>
//                 <FaHtml5 className="text-xl text-red-500 mr-2" />
//                 <h1 className="text-black">HTML</h1>
//               </Accordion.Header>
//               <Accordion.Body>
//                 <CodeMirror 
//                   value={html}
//                   height="400px"
//                   extensions={[htmlLang()]}
//                   onChange={(value) => setHtml(value)}
//                 />
//               </Accordion.Body>
//             </Accordion.Item>
//             <Accordion.Item eventKey="1">
//               <Accordion.Header>
//                 <FaCss3 className="text-xl text-sky-500 mr-2" />
//                 <h1 className="text-black">CSS</h1>
//               </Accordion.Header>
//               <Accordion.Body>
//                 <CodeMirror 
//                   value={css}
//                   height="400px"
//                   extensions={[cssLang()]}
//                   onChange={(value) => setCss(value)}
//                 />
//               </Accordion.Body>
//             </Accordion.Item>
//             <Accordion.Item eventKey="2">
//               <Accordion.Header>
//                 <FaJs className="text-xl text-yellow-500 mr-2" />
//                 <h1 className="text-black">JS</h1>
//               </Accordion.Header>
//               <Accordion.Body>
//                 <CodeMirror 
//                   value={js}
//                   height="400px"
//                   extensions={[javascript({ jsx: true })]}
//                   onChange={(value) => setJs(value)}
//                 />
//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>
//         </div>

//         <div className="bg-white w-full" style={{ height: "50%" }}>
//           <iframe
//             title="Result"
//             srcDoc={output}
//             style={{ border: "none", width: "100%", height: "100%" }}
//           ></iframe>
//         </div>
//       </div>
//     </>
//   );
// }

// export default NewProject;


























































































































































