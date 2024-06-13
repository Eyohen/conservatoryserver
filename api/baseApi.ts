// import { BodyInit } from "node-fetch";

// class BaseApi {
//     baseUrl:string;

//     constructor(url:string) {
//         this.baseUrl = url;
//     }

//     fetch = async(url: string, body?:BodyInit, args?: Record<string, any>, requestInit?: RequestInit) => {
//         try{
//             const urlObj = new URL(url, this.baseUrl);

//             if(args) {
//                 urlObj.search = new URLSearchParams(args).toString();
//             }

//             const requestOptions = {...requestInit, body};

//             const response = await fetch(urlObj.toString(), requestOptions);

//             if(!response.ok){
//                 const errorMessage = await response.text();
//                 throw new Error('Bad one');
//             }

//             return response.json()
//         } catch (e:any){
//             throw new Error(e.message);
//         }
//     }
// }

// export default BaseApi;

