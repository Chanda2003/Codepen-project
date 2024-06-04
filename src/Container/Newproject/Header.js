
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdCheck, MdEdit } from "react-icons/md";
import UserauthProfile from "../../Components/UserAuthProfile";
import { doc, setDoc } from "firebase/firestore";
import Alret from "../../Components/Alret";
import { db } from "../../Config/Firebase.config";
import { useSelector } from "react-redux";



function Header(){

    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [output, setOutput] = useState("");
    const [title, setTitle] = useState("untitled");
    const [isTitle, setIsTitle] = useState("");
    const [alert, setAlert] = useState(false);

    const user = useSelector((state) => state.user?.user);


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

    return(
        <>
          <header className="w-full flex items-center justify-between px-12 py-4">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/home/projects"}>
              <img
                src="https://codepenclone-6d515.web.app/static/media/logo.5615535cb11113a0fbb4.webp"
                alt="logo"
                className="object-contain w-32 h-auto"
              />
            </Link>

            <div className="flex flex-col items-start justify-start">
              <div className="flex items-center justify-center gap-3">
                {isTitle ? (
                  <motion.input
                    key={"TitleInput"}
                    type="text"
                    placeholder="Your Title"
                    className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <motion.p
                    key={"titleLabel"}
                    className="px-3 py-2 text-white text-lg"
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
                className="px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
              >
                Save
              </motion.button>
              <UserauthProfile />
            </div>
          )}
        </header>
        </>
    )
}

export default Header















