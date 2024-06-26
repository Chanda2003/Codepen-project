import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa6"


function Userauth({label, placeholder, isPass, setStateFunction, Icon,setEmailvalid}){
    const[value,setValue]=useState("")
    const [showPass,setShowPass]=useState(true)
    const[isEmailValid,setIsEmailValid]=useState(false)
  

    const HandleTextChange=(e)=>{
        setValue(e.target.value)
        setStateFunction(e.target.value)

        if(placeholder==="Email"){
            const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status=emailRegex.test(value)
            setIsEmailValid(status)
            setEmailvalid(status)
        }
    }
    return(
        <>
    <div className="flex flex-col justify-start items-start gap-1">
 
  {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm "> */}
    <form>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-primaryText"
        >
          {label}:
        </label>
        <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
            !isEmailValid &&
            placeholder==="Email" &&
            value.length>0 &&
            "border-4 border-red-500"
        }`}>
            <Icon className="text-text555 text-2xl"/>
          <input
           placeholder={placeholder}
            type={isPass && showPass ? "password" :"email"}
            autoComplete="email"
            required=""
            value={value}
            onChange={HandleTextChange}
            className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {
            isPass &&(
                <div className=" cursor-pointer" onClick={()=>setShowPass(!showPass)}>
            {showPass ?
                <FaEye className=" text-text555 text-2xl"></FaEye>
                :
                <FaEyeSlash className=" text-text555 text-2xl"/>
            }
          </div>
            )
          }
        </div>
      </div>
    </form>
    </div>

        </>
    )
}
export default Userauth





















