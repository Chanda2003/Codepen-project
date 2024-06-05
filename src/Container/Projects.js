


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { deleteProject } from "../Context/Action/ProjectAction";
import { MdBookmark, MdDelete } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/Firebase.config";

function Projects() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state?.projects?.projects);
  const searchTerm = useSelector((state) => state?.searchTerm?.searchTerm ? state?.searchTerm?.searchTerm : "");
  const [filtered, setFiltered] = useState(null);
  const [showAlert, setShowAlert] = useState(false);



  useEffect(() => {
    if (searchTerm.length > 0) {
      setFiltered(
        projects.filter((project) => {
          const lowerCaseTitle = project.title.toLowerCase();
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          return lowerCaseTitle.includes(lowerCaseSearchTerm);
        })
      );
    } else {
      setFiltered(null);
    }
  }, [searchTerm, projects]);

  const handleDelete = async(projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(projectId));
      await deleteDoc(doc(db, 'projects', projectId))
      .then(() => {
        setShowAlert(true)
       
      })
      .catch((err) => {
        setShowAlert({ status: "Error", message: "Failed to delete project." });
        console.log(err);
      });
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
        {showAlert && <div className="absolute top-0 right-0 mt-10 mr-10 bg-green-500 text-white py-2 px-4 rounded-md">Project deleted successfully!</div>}
        {filtered ? (
          filtered.map((project, index) => (
            <div key={index}>
              <ProjectCard project={project} handleDelete={handleDelete} />
            </div>
          ))
        ) : (
          projects && projects.map((project, index) => (
            <div key={index}>
              <ProjectCard project={project} handleDelete={handleDelete} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export const ProjectCard = ({ project, handleDelete }) => {
  return (
    <motion.div
      className="w-full cursor-pointer md:w-[350px] h-[375px] bg-secondary rounded-md p-4 
                flex flex-col items-center justify-center gap-4"
    >
      <div className="bg-primary w-full h-full rounded-md overflow-hidden"
        style={{ overflow: "hidden", height: "100%" }}>
        <iframe
          title="Result"
          srcDoc={project.output}
          style={{ border: "none", width: "100%", height: "100%" }}
        ></iframe>
      </div>
    
      <div className="flex items-center justify-start gap-3 w-full">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-800">
          {project?.user?.photoURL ? (
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={project?.user?.photoURL}
              alt={project?.user?.DisplayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-xl text-white font-semibold capitalize">
              {project?.user?.email[0]}
            </p>
          )}
        </div>
        <Link to={`/savedproject/${project.id}`}>
        <div>
          <p className="text-white text-lg capitalize">{project?.title}</p>
          <p className="text-primaryText text-sm capitalize">
            {project?.user?.displayName ? project?.user?.displayName : `${project?.user?.email.split("@")[0]}`}
          </p>
        </div>
        </Link>
        <motion.div whileTap={{ scale: 0.9 }} className="cursor-pointer ml-auto">
          {/* <MdBookmark className="text-primaryText text-3xl" /> */}
          <MdDelete className=" text-red-700 text-3xl"  onClick={() => handleDelete(project.id)}/>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Projects;































