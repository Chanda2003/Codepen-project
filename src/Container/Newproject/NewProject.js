
import React, { useEffect, useState } from "react";
import { FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {  useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Alret from "../../Components/Alret";
import Accordion from 'react-bootstrap/Accordion';
import Header from "./Header";

function NewProject() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [alert, setAlert] = useState(false);

  const [title, setTitle] = useState("untitled");


  const projectData = useParams();
 

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










