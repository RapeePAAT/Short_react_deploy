import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import QRCode from "qrcode.react";


const App = () => {
  const  [url,setUrl] = useState('')
  const  [onerow,setOneRow] = useState('')
  const  [click,setClick] = useState(0);
  
  const handleUpdateClick = async (id) => {
    try {
      const res = await fetch(`https://url-postgres-1041xuobg-rapeepaat.vercel.app/update/${onerow.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (res.status === 200) {
       console.log("ok")
       setClick(click+1)
        
      } else if (res.status === 404) {
        console.log("error")
      } 
    } catch (error) {
      console.error(error);
    }
  }
  const getOneRow  = async (Url)=>{
      const resRow = await fetch("https://url-postgres-1041xuobg-rapeepaat.vercel.app/api/get-one-row",{
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orginal_url: Url }), 

      })
      const data = await resRow.json()
      setClick(data.click)
      console.log(data)
      setOneRow(data)

    }
  const handleSubmit = async ()=>{
    if(url===''){
      alert("Pls fill some Thing");

      return;
    }
    else{
      const res = await fetch("https://url-postgres-1041xuobg-rapeepaat.vercel.app/api/creat-short-url", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orginal_url: url }), 
      });
      console.log(await res.json()); 
      setUrl('')
      await getOneRow(url)
    }
    
     
  }
  return (
    <div className="App">
      <header className='mt-5 mb-5'>
          <div className='text-center'>
            <h3 className='mb-5 text-center'>
              SHORT URL
            </h3>
          </div>
          <p className='text-center'>Wait 5 second to generate</p>
          <div className='ms-5 mx-5'>
          <form>
            <div className='col-12'>
                <div className='input-group'>
                  <input type="text" className="form-control" placeholder="Enter your URL need to change" onChange={(e)=>{setUrl(e.target.value)}} />
                  <button type="button" className="btn btn-info" onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </form>
           <div>
            </div> 
           
          </div>
      </header>
      <table className="table ms-5 mx-5" style={{marginLeft:50}}>
            <thead className='ms-2 mx-2'>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Original URL</th>
            <th scope="col">Short URL</th>
            <th scope="col">Clicks</th>
          </tr>
        </thead>
        <tbody>
            {onerow && (
              <tr>
               <td>{onerow.id}</td>
              <td>{onerow.orginal_url}</td>
              <td> <a
    href={`https://url-postgres-1041xuobg-rapeepaat.vercel.app/${onerow.short_url}`} target="_blank" onClick={handleUpdateClick}>{`https://url-postgres-1041xuobg-rapeepaat.vercel.app/${onerow.short_url}`}
  </a></td>
              <td>{click}</td>
              </tr>
            )}
        </tbody>
      </table>
      {onerow && (
          <div className='text-center mt-5'>
            <QRCode
              value={`https://url-postgres-1041xuobg-rapeepaat.vercel.app/${onerow.short_url}`}size={248} />
            <p>Scan here</p>
          </div>
        )}

    </div>
  )
}

export default App