import React, { useEffect, useState } from 'react'
import SideBar from './components/SideBar'
import Main from './components/Main'
import Footer from './components/Footer'

const App = () => {

  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(false)

  const [showModal,setShowModal]=useState(false)

  function handleToggleModal(){
    setShowModal(!showModal)
  }

  useEffect(()=>{
    async function fetchAPIData(){
      const NASA_KEY=import.meta.env.VITE_NASA_API_KEY
      const url='https://api.nasa.gov/planetary/apod'+`?api_key=${NASA_KEY}`

      const today=(new Date()).toDateString()
      const localKey=`NASA-${today}`
      if(localStorage.getItem(localKey)){
        const apidata=JSON.parse(localStorage.getItem(localKey))
        setData(apidata)
        console.log('fetched from cache today')
        return
      }
      localStorage.clear()



      try{
        const res=await fetch(url)
        const apidata=await res.json()
        localStorage.setItem(localKey,JSON.stringify(apidata))
        setData(apidata)
        console.log('fetched from api today')
        console.log(apidata)
      } catch(err){
        console.log(err.message)

      }
    }

    fetchAPIData();
  },[])
  return (
    <>
   { data ? (<Main  data={data} />):(  
      <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>)}
    { showModal &&(<SideBar  handleToggleModal={handleToggleModal}  data={data} />)}
    { data &&( <Footer handleToggleModal={handleToggleModal}  data={data} />)}

      
    </>
  )
}

export default App
