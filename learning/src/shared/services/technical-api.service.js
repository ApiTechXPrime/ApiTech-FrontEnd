import http from "@/technical/http-common";

export class TechnicalApiService{
 getTec(){
     return Promise.all([
         http.get('/technicals')
     ]).then(([technicalResponse ]) => {
         return {
           users:{
               technicals: technicalResponse.data
           }
         };
     })
 }
}