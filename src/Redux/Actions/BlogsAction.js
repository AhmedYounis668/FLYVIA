import { useinsertdatawithoutimage } from "../../Hooks/usePostData"
import { Add_Blog, Get_All_Blogs, Get_Error, Get_one_Blog } from "../Types"

import usegetdata from "../../Hooks/useGetData"




export const Add_blog_Action=(body)=>async(dispatch)=>{
    try{
const res=await useinsertdatawithoutimage(`/api/v1/blogs`,body)

dispatch({
    type:Add_Blog,
    payload:res,
})
    }
    catch(e)
    {
        dispatch({
            type:Get_Error,
            payload:e.res,
        })
    }
}




export const Get_All_Blogs_Action=(quarystring)=>async(dispatch)=>{
    try{
const res=await usegetdata(`/api/v1/blogs?${quarystring}`)

dispatch({
    type:Get_All_Blogs,
    payload:res,
})
    }
    catch(e)
    {
        dispatch({
            type:Get_Error,
            payload:e.res,
        })
    }
}









export const Get_one_Blog_Action=(id)=>async(dispatch)=>{
    try{
const res=await usegetdata(`/api/v1/blogs/${id}`)

dispatch({
    type:Get_one_Blog,
    payload:res,
})
    }
    catch(e)
    {
        dispatch({
            type:Get_Error,
            payload:e.res,
        })
    }
}