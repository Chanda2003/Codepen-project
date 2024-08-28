import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Config/Firebase.config.js";
import { GithubAuthProvider } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';



const googleProvider=new GoogleAuthProvider()
const githubProvider=new GithubAuthProvider()

export const signinwithGoogle= async()=>{

    // await signInWithRedirect(auth,googleProvider).then(userCred =>{
    //     window.location.reload()
    // })
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log("Google user signed in:", user);
        // You can redirect the user or do further processing here
    } catch (error) {
        console.error("Google sign-in error:", error);
    }
}

export const signinwithGitHub= async()=>{

    // await signInWithRedirect(auth,githubProvider).then(userCred =>{
    //     window.location.reload()
    // })
    try {
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;
        console.log("GitHub user signed in:", user);
        // You can redirect the user or do further processing here
    } catch (error) {
        console.error("GitHub sign-in error:", error);
    }
}

export const Menus=[
    {id:uuidv4(), name: "Projects", uri: "/home/projects"},
    {id:uuidv4(), name: "Collections", uri: "/home/collections"},
    {id:uuidv4(), name: "Profile", uri: "/home/profile"},
]

export const signOutAction= async()=>{
    await auth.signOut().then(()=>{
        window.location.reload()
    })
}


