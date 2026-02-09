import { Add_Blog, Get_All_Blogs, Get_Error, Get_one_Blog } from "../Types";


const intial={
    Blog:[],
    // updateclient:[],
    loading:true,
}


const BlogsReducer = (state=intial,action) => {
 
    switch(action.type)
    {
        case Add_Blog:
            return{
                ...state,
                Blog:action.payload,
                loading:false,
            } 
            case Get_All_Blogs:
            return{
                ...state,
                Blog:action.payload,
                loading:false,
            } 


             case Get_one_Blog:
            return{
                ...state,
                Blog:action.payload,
                loading:false,
            } 
            
      
                                                                
            case Get_Error:
                return{
                    loading:true,
                    Region:action.payload,
                }
                default:
                    return state;
    }
}

export default BlogsReducer

