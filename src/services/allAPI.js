import { base_url } from "./baseurl"
import { commonAPI } from "./commonAPI"



//register api
export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${base_url}/user/register`,user,"")
}

//login api
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${base_url}/user/login`,user,"")
}

//add project
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${base_url}/project/add`,reqBody,reqHeader)
}

//home project
export const homeProjectAPI = async()=>{
    return await commonAPI("GET",`${base_url}/projects/home-project`)
}

//all project
export const allProjectAPI = async(searchKey,reqHeader)=>{
    //query parameter ==>  path?key=value 
    return await commonAPI("GET",`${base_url}/projects/all-project?search=${searchKey}`,"",reqHeader)
}


//user project
export const allUserProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${base_url}/user/all-project`,"",reqHeader)
}