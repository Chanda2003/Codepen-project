



import React, { useEffect, useState } from 'react';
import { FaCss3, FaHtml5, FaJs } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css as cssLang } from '@codemirror/lang-css';
import { useSelector } from 'react-redux';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import Alret from '../../Components/Alret';
import { db } from '../../Config/Firebase.config';
import './Newproject.css'; // Ensure you have this file for styling
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdCheck, MdDelete, MdEdit } from "react-icons/md";
import UserauthProfile from "../../Components/UserAuthProfile";
// import {useHistory} from "react-router-dom"

const TabContent = ({ id, activeTab, children }) => {
  return (
    <div id={id} className={`tab-content ${activeTab === id ? 'active-tab' : ''}`}>
      {children}
    </div>
  );
};

const NewProject = () => {
  const [activeTab, setActiveTab] = useState('html');
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [jsContent, setJsContent] = useState('');
  const [output, setOutput] = useState('');
  const [alert, setAlert] = useState(false);
  const [title, setTitle] = useState('untitled');
  const [isTitle, setIsTitle] = useState('');

  const user = useSelector((state) => state.user?.user);
  const projects = useSelector((state) => state?.projects?.projects);
  const projectdata = useParams();
  const history = useNavigate();
// console.log(projects)
  useEffect(() => {
    projects.map((data) => {
      if (projectdata.id === data.id) {
        setHtmlContent(data.html);
        setCssContent(data.css);
        setJsContent(data.js);
        setTitle(data.title);
      }
    });
  }, [projectdata.id, projects]);

  useEffect(() => {
    const updateOutput = () => {
      const combinedOutput = `
        <html>
          <head>
            <style>${cssContent}</style>
          </head>
          <body>
            ${htmlContent}
            <script>${jsContent}</script>
          </body>
        </html>
      `;
      setOutput(combinedOutput);
    };

    updateOutput();
  }, [htmlContent, cssContent, jsContent]);

  const saveProgram = async () => {
    const id = `${Date.now()}`;

    const docu = {
      id: id,
      title: title,
      html: htmlContent,
      css: cssContent,
      js: jsContent,
      output: output,
      user: user,
    };

    await setDoc(doc(db, 'projects', id), docu)
      .then(() => {
        setAlert(true);
        history('/home/projects')
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };


  const deleteProject = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      await deleteDoc(doc(db, 'projects', projectdata.id))
        .then(() => {
          setAlert({ status: "Success", alretMsg: "Project deleted successfully." });
          history('/home/projects'); // Navigate to projects list after deletion
        })
        .catch((err) => {
          setAlert({ status: "Error", message: "Failed to delete project." });
          console.log(err);
        });
  
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };
  

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start">
        {/* alert section */}
        {alert && <Alret status={"Success"} alretMsg={"Project Saved...."} />}

        {/* header section */}
        <div className=' mt-4'>
        <Link to={"/home/projects"}>
              <img
                src="https://codepenclone-6d515.web.app/static/media/logo.5615535cb11113a0fbb4.webp"
                alt="logo"
                className="object-contain w-36 h-auto"
              />
            </Link>
            </div>
        <header className="w-full flex items-center justify-between px-0 py-4 -mt-4">
          <div className="flex items-center justify-center gap-6">
           

            <div className="flex flex-col items-start justify-start">
              <div className="flex items-center justify-center gap-3">
                {isTitle ? (
                  <motion.input
                    key={"TitleInput"}
                    type="text"
                    placeholder="Your Title"
                    className="px-2 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <motion.p
                    key={"titleLabel"}
                    className="px-2 py-2 text-white text-lg"
                  >
                    {title}
                  </motion.p>
                )}

                {isTitle ? (
                  <motion.div
                    key={"MdCheck"}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                    onClick={() => setIsTitle(false)}
                  >
                    <MdCheck className="text-2xl text-emerald-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key={"MdEdit"}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                    onClick={() => setIsTitle(true)}
                  >
                    <MdEdit className="text-2xl text-primaryText" />
                  </motion.div>
                )}
              </div>

              <div className="flex items-center justify-center px-3 -mt-2 gap-2">
                <p className="text-primaryText text-sm">
                  {user?.displayName ? user?.displayName : `${user?.email.split("@")[0]}`}
                </p>
              </div>
            </div>
          </div>

          {user && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={saveProgram}
                whileTap={{ scale: 0.9 }}
                className="px-1 py-1 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
              >
                Save
              </motion.button>
              <motion.button
                onClick={deleteProject}
                whileTap={{ scale: 0.9 }}
                className="px-0 py-1 bg-slate-200 cursor-pointer text-base text-white font-semibold rounded-md"
              >
                {/* Delete */}
                <MdDelete className=" text-red-700 text-3xl"/>
              </motion.button>
              <UserauthProfile />
            </div>
          )}
        </header>

        {/* coding section */}
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="me-2">
            <a
              href="#html"
              className={`inline-block p-2 ${activeTab === 'html' ? 'text-blue-600 bg-gray-400 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-slate-500 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('html'); }}
            >
              <div className="w-full flex items-center justify-between">
                <div className=" bg-secondary px-2 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500 rounded-md">
                  <FaHtml5 className="text-xl text-red-500" />
                  <p className=" text-primaryText font-semibold">HTML</p>
                </div>
              </div>
            </a>
          </li>
          <li className="me-2">
            <a
              href="#css"
              className={`inline-block p-2 ${activeTab === 'css' ? 'text-blue-600 bg-gray-400 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('css'); }}
            >
              <div className="w-full flex items-center justify-between">
                <div className=" bg-secondary px-2 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500 rounded-md">
                  <FaCss3 className="text-xl text-sky-500" />
                  <p className=" text-primaryText font-semibold">CSS</p>
                </div>
              </div>
            </a>
          </li>
          <li className="me-2">
            <a
              href="#javascript"
              className={`inline-block p-2 ${activeTab === 'javascript' ? 'text-blue-600 bg-gray-400 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('javascript'); }}
            >
              <div className="w-full flex items-center justify-between">
                <div className=" bg-secondary px-2 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500 rounded-md">
                  <FaJs className="text-xl text-yellow-500" />
                  <p className=" text-primaryText font-semibold">JS</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div className="flex-grow w-full overflow-scroll h-80">
          <TabContent id="html" activeTab={activeTab}>
            {/* <div className="flex-grow w-full h-80"> */}
              <CodeMirror
                value={htmlContent}
                height="400px"
                extensions={[html()]}
                theme={"dark"}
                onChange={(value) => setHtmlContent(value)}
              />
            {/* </div> */}
          </TabContent>
          <TabContent id="css" activeTab={activeTab}>
            {/* <div className="flex-grow w-full h-80"> */}
              <CodeMirror
                value={cssContent}
                height="400px"
                extensions={[cssLang()]}
                theme={"dark"}
                onChange={(value) => setCssContent(value)}
              />
            {/* </div> */}
          </TabContent>
          <TabContent id="javascript" activeTab={activeTab}>
            {/* <div className="flex-grow w-full h-80"> */}
              <CodeMirror
                value={jsContent}
                height="400px"
                extensions={[javascript({ jsx: true })]}
                theme={"dark"}
                onChange={(value) => setJsContent(value)}
              />
            {/* </div> */}
          </TabContent>
        </div>
        <div className="bg-white w-full" style={{ height: '50%' }}>
          <iframe
            title="Result"
            srcDoc={output}
            style={{ border: 'none', width: '100%', height: '100%' }}
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default NewProject;










































