import React, { useContext, useEffect } from 'react'
import { Row,Col } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { AddProjectResponseContext } from '../Contexts/ContextShare';

function AddProjects() {

  const {addProjectResponse, setAddProjectResponse} = useContext(AddProjectResponseContext)
  //state to hold value from input box in modal
  const [projectDetails,setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
  })
  const [token,setToken] = useState("")

  //to hold url of image
  const [preview,setPreview] = useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    handleCloseData()
  }
  const handleShow = () => setShow(true);

  

  console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImage){
      //js predefined method - url - createObjectURL - files will be converted into url
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }
  },[])

  console.log(preview);
  console.log(token);



  //fn to clear form when clicking cancel btn on modal
  const handleCloseData =()=>{
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:""
    })
    setPreview("")
  }

  const handleAdd = async(e)=>{
    e.preventDefault()
    const {title,language,github,website,overview,projectImage} = projectDetails

    if(!title || !language || !github || !website || !overview || !projectImage){
      alert('please fill the form completely')
    }
    else{
      //reqBody
      //
      //1) create object for the class form data
      const reqBody = new FormData()
      //2) add value to the formdata - append()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      if(token) {
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          alert('Project successfully added')
          handleClose()
          setAddProjectResponse(result.data)
        }
        else{
          console.log(result);
          alert(result.response.data)
        }
      }
   
    }
  }

  return (
    <>
      <button className='btn btn-success rounded' onClick={handleShow}>Add Project</button>
      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label>
                <input type="file" style={{ display: "none" }}  onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                <img className='img-fluid' src={preview?preview:"https://testersdock.b-cdn.net/wp-content/uploads/2017/09/file-upload.png"} alt="no image" />
              </label>
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column">
              <div className="mb-3 mt-3 w-100">
                <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
              </div>
              <div className="mb-3 w-100">
                <input type="text" className='form-control' placeholder='Language Used' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
              </div>
              <div className="mb-3 w-100">
                <input type="text" className='form-control' placeholder='Github Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />
              </div>
              <div className="mb-3 w-100">
                <input type="text" className='form-control' placeholder='Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />
              </div>
              <div className="mb-3 w-100">
                <textarea type="text" className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseData}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      
    
    </>
  )
}

export default AddProjects