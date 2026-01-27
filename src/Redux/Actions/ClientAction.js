import { useinsertdatawithoutimage } from "../../Hooks/usePostData"
import { Add_Client, Get_Error } from "../Types"

import usegetdata from "../../Hooks/useGetData"




export const Add_Client_Action=(body)=>async(dispatch)=>{
    try{
const res=await useinsertdatawithoutimage(`/api/v1/clients`,body)

dispatch({
    type:Add_Client,
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




export const Get_All_Client_Action=(quarystring)=>async(dispatch)=>{
    try{
const res=await usegetdata(`/api/v1/clients?${quarystring}`)

dispatch({
    type:Add_Client,
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