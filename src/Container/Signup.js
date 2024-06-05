import { useState } from "react"
import Userauth from "../Components/Userauth"
import { FaEnvelope, FaGithub } from "react-icons/fa6"
import { MdPassword } from "react-icons/md"
import { motion ,AnimatePresence } from "framer-motion"
import { FcGoogle } from "react-icons/fc"
import { signinwithGitHub, signinwithGoogle } from "../utils/helpers"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Config/Firebase.config"
import { fadeInOut } from "../Animations/Animations"


function Signup(){
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[getEmailValid,setEmailvalid]=useState(false)
    const[isLogin,setIsLogin]=useState(false)
    const[alert,setAlert]=useState(false)
    const[alretMsg,setAlertMsg]=useState("")


    const createnewUser=async()=>{
        if(setEmailvalid){
            await createUserWithEmailAndPassword(auth,email,password)
            .then((userCred)=>{
                if(userCred){
                    console.log(userCred)
                }

            })
            .catch((err)=>console.log(err))
        }
    }

    const LoginwithEmailandPass=async()=>{
        if(setEmailvalid){
            await signInWithEmailAndPassword(auth,email,password)
            .then((userCred)=>{
                if(userCred){
                    console.log(userCred)
                }
            })
            .catch((err)=>{
                console.log(err.message)
                if(err.message.includes("invalid-credential")){
                    setAlert(true)
                    setAlertMsg("Invaild id : User not found")

                }
                else if(err.message.includes("wrong-password")){
                    setAlert(true)
                    setAlertMsg("Invaild Password : Wrong Password")
                }
                else{
                    setAlert(true)
                    setAlertMsg("Temporarily disabled due to many failed login")
                }

                setInterval(()=>{
                    setAlert(false)

                },4000)
            })
        }
    }

    return(
        <>
       <div className="w-full py-4">

        <img src="https://codepenclone-6d515.web.app/static/media/logo.5615535cb11113a0fbb4.webp" alt="logo"
                className="object-contain w-40 h-auto">
        </img>

        <div className="w-full flex flex-col items-center justify-center py-1">
            <p className="py-12 text-2xl text-primaryText">Join With Us</p>

            <div className="px-8 w-full md:w-auto py-1 rounded-xl bg-secondary shadow-md
             flex flex-col items-center justify-center gap-8">

                  {/* email */}
                <Userauth label="Email" placeholder="Email" isPass={false} key="Email" setStateFunction={setEmail} Icon={FaEnvelope} setEmailvalid={setEmailvalid}/>
 
                  {/* password */}
                  <Userauth label="Password" placeholder="Password" isPass={true} key="Password" setStateFunction={setPassword} Icon={MdPassword}/>
                
                
                  {/* alret */}

                  <AnimatePresence>
                    {alert && (
                        <motion.p key={"AlretMessage"}
                  {...fadeInOut}
                  className="text-red-500"
                  >
                    {alretMsg}

                  </motion.p>


                    )}
                  </AnimatePresence>

                  


                  {/* login button */}
                {
                    !isLogin ?
                    <motion.div onClick={createnewUser} whileTap={{scale:0.9}} className="flex items-center justify-center gap-3">
                            
                    <p className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer
                   hover:bg-emerald-700">
                     Sign UP</p>
                 </motion.div> 
                 :
                 <motion.div onClick={LoginwithEmailandPass} whileTap={{scale:0.9}} className="flex items-center justify-center gap-3">
                            
                 <p className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer
                hover:bg-emerald-700">
                  Login</p>
              </motion.div> 
                }

                  {/* account text section */}


              {
                !isLogin ?
                <p className="text-5m text-primaryText flex items-center justify-center gap-3">
                Already Have an Account !{" "}
                <span onClick={()=>setIsLogin(!isLogin)} className=" text-emerald-500 cursor-pointer">Login Here</span>
            </p>
            :
            <p className="text-5m text-primaryText flex items-center justify-center gap-3">
            Doesn't Have an Account !{" "}
            <span onClick={()=>setIsLogin(!isLogin)} className=" text-emerald-500 cursor-pointer">Create Here</span>
                </p>
              }


                

                  {/* or section */}
                  <div className=" flex items-center justify-center gap-12 ">
                    <div className=" h-[1px] rounded-md w-24  bg-slate-400"></div>
                    <p className=" text-sm">OR</p>
                    <div className=" h-[1px] rounded-md w-24  bg-slate-400"></div>
                  </div>

                  {/* sign in with goole */}

                  <motion.div onClick={signinwithGoogle} className="flex items-center justify-center gap-3 backdrop-blur-md w-full py-1 rounded-xl
                   cursor-pointer bg-slate-600 hover:bg-slate-800" whileTap={{scale:0.9}}>
                    <FcGoogle className=" text-2xl"/>
                    <p className=" text-xl text-white">Sign in with Google</p>
                  </motion.div>

                  {/* or section */}

                  <div className=" flex items-center justify-center gap-12">
                    <div className=" h-[1px] rounded-md w-24 bg-slate-400"></div>
                    <p className=" text-sm">OR</p>
                    <div className=" h-[1px] rounded-md w-24  bg-slate-400"></div>
                  </div>

                  {/* sign in with github */}

                  <motion.div onClick={signinwithGitHub} className="flex items-center justify-center gap-3 backdrop-blur-md w-full py-1 rounded-xl
                   cursor-pointer bg-slate-600 hover:bg-slate-800" whileTap={{scale:0.9}}>
                    <FaGithub className=" text-2xl text-white"/>
                    <p className=" text-xl text-white">Sign in with Github</p>
                  </motion.div>
                  <div>
                <p>
                Default to Login
                </p>
                <p>
                Email: venu1234@gmail.com
                </p>
                <p>
             Password: Venu@1234
             </p>
              </div>


            </div>

        </div>

       </div>
        </>
    )
}
export default Signup