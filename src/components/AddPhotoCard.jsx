import React, { useContext, useState } from "react"
import axios from "axios"
import { GalleryContext } from "./HomePage"
import "./AddPhoto.css"

const AddPhotoCard = () =>{
    const [postData, SetPostData] = useState({label : "", url : ""})
    const {fetchGallery, invkCard, setInvkCard} = useContext(GalleryContext)
    const handleCancel = () =>{
        setInvkCard(false)

    }
    const handlepost = (e) =>{
        e.preventDefault()
        axios('https://galleryappserverakhil.onrender.com/api/v1/gallery/',{
            method:"post",
            data: postData

        })
        .then((res)=>{
            console.log(res)
            // fetchData()
            if(res){
                setInvkCard(false)
            }
            fetchGallery()
            
        }).catch(e=>{
            console.log(e)
        })
    }
    return(
        <div >
                <h3>Add a new Photo</h3>
                <p>Label</p>
                <input placeholder="Ex: Beach" type="text" onChange={(e) =>{SetPostData({...postData, label:e.target.value.toLocaleLowerCase()})}} />
                <p>Photo Url</p>
                <input placeholder="https://images.unsplash.org.in/" id="textarea" type="textarea" onChange={(e) =>{SetPostData({...postData, url:e.target.value})}} /> <br/>
                <div className="btnCont">
                <button className="cancelBtn" onClick={handleCancel}>Cancel</button>
                <button className="submitBtn" id="btn" onClick={handlepost}>Submit</button>
                </div>
                
        </div>
    )
}

export default AddPhotoCard;