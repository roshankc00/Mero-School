import {  toast } from 'react-toastify';







const config:any= {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    }



export const sucessToast=(message:string)=>{
    toast.success(message,config)
} 

export const warningToast=(message:string)=>{
    toast.warning(message,config)
} 

export const errorToast=(message:string)=>{
    toast.error(message,config)
} 















// export interface tostifyMe {
//     position:string,
//     autoClose: number,
//     hideProgressBar: boolean,
//     closeOnClick: boolean,
//     pauseOnHover: boolean,
//     draggable: boolean,
//     progress: undefined,
//     theme: string,

// }