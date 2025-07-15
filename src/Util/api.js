import axios  from "axios";

export const api= axios.create({
    baseURL:"https://quize-app-es62.onrender.com",
});



api.interceptors.request.use((config)=>{

let token= localStorage.getItem("accessToken")
if(token){
    config.headers.Authorization=`Bearer ${token}`
}

let refreshtoken= localStorage.getItem("refreshtoken");
if(refreshtoken){
    config.headers.refreshtoken=`Bearer ${refreshtoken}`
}

return config

})


api.interceptors.response.use((response)=>{

const accessToken=response.headers["new-access-token"]
if(accessToken){
    localStorage.setItem("accessToken", accessToken)
}
return response;
},

(error)=>{
 if(error.response && error.response.status==401)   {
    localStorage.clear();
    window.location.href="/login"
 }
 return Promise.reject(error)
}
)