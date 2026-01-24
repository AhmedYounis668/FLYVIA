import { Add_Client, Get_All_Clients, Get_Error } from "../Types"


const intial={
    client:[],
    updateclient:[],
    loading:true,
}


const ClientReducer = (state=intial,action) => {
 
    switch(action.type)
    {
        case Add_Client:
            return{
                ...state,
                client:action.payload,
                loading:false,
            } 
            case Get_All_Clients:
            return{
                ...state,
                client:action.payload,
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

export default ClientReducer

