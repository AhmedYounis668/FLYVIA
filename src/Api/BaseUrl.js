// import axios from 'axios'

// // const baseurl=axios.create({baseURL:"http://127.0.0.1:8000"})
    
// // when uploade crm and database this will be the url
// const baseurl=axios.create({baseURL:"https://apirender8.onrender.com/"})



// // إضافة interceptor
// baseurl.interceptors.response.use(
//   response => response,
//   error => {
//    if (error.response && error.response.status === 401) {
//   localStorage.removeItem('token');  // لو بتخزن التوكن في localStorage
//   window.location.href = '/login';   // إعادة توجيه لصفحة تسجيل الدخول
// }
// return Promise.reject(error);
// );

// export default baseurl




import axios from 'axios'

// const baseurl=axios.create({baseURL:"http://127.0.0.1:8000"})




// when uploade crm and database this will be the url
// const baseurl = axios.create({ baseURL: "https://apirender-3.onrender.com" })


export const db_url = "https://apirender-3.onrender.com/";
const baseurl = axios.create({ baseURL: db_url })



// إضافة interceptor
// baseurl.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// baseurl.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       const userRole = JSON.parse(localStorage.getItem('userRole'));
      
//       if (userRole?.data?.role !== 'Admin') {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         localStorage.removeItem('userRole');
//         window.location.href = '#/login';
//       }
//               // console.log(JSON.parse(userRole,"userrole"))

//       // لو Admin، لا تفعل شيء حتى لا تخرجوه
//     }
//     return Promise.reject(error);
  
//   }

// );

export default baseurl;
