import {useState,useEffect} from 'react'


export default httpClient=>{


    const [error, setError] = useState(null);



    const reqInter = httpClient.interceptors.request.use(req => {
        console.log("reqInt")

        setError(null)
        return req
    })

    const resInter = httpClient.interceptors.response.use(res => res, err => {
        console.log("resInt")
        setError(err)
    })


  

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInter)
            httpClient.interceptors.request.eject(resInter)
        }

    }, [reqInter,resInter,httpClient]);



  const  errorConfirmHandler = () => {
       setError(null)
    }


    return [error,errorConfirmHandler]

}