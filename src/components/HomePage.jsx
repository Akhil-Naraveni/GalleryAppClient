import React, { useState, useEffect } from "react"
import axios from "axios"
import "./homepage.css"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import AddPhotoCard from "./AddPhotoCard"

export const GalleryContext = React.createContext()


const HomePage = () => {
    const [data, setData] = useState([])
    const [invkCard, setInvkCard] = useState(false)
    const [hover, setHover] = useState(false)

    useEffect(() => {
        fetchGallery()
    }, [])
    const fetchGallery = () => {
        axios.get("http://localhost:5000/api/v1/gallery/")
            .then((res) => {
                // console.log(res.data.gallerydata)
                const result = res.data.gallerydata
                console.log(result.reverse())
                setData(result)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    console.log(data)
    const handleDelete = (val) =>{
        axios(`http://localhost:5000/api/v1/gallery/${val._id}`, {
                method: "delete"
            }).then((result) => {
                console.log(result.data.data)
                fetchGallery()
            }).catch((e) => {
                console.log(e)
            })
    }

    const hanldeSearch = (val) => {
        // if(val){
        // console.log(val)
        // const tempArr = data.filter((d) => { return d.label.toLowerCase().includes(val.toLowerCase())})
        // setData(tempArr)
        // }else{
        //     fetchGallery()
        // }
        // e.preventDefault()
        val = val.toLowerCase()
        if (val === "") {
            fetchGallery()
        }
        else {
            axios(`http://localhost:5000/api/v1/gallery/${val}`, {
                method: "get"
            }).then((result) => {
                console.log(result.data.data)
                setData(result.data.data)
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    const handleAddPhoto = () => {
        setInvkCard(true)
    }
    const handleMouseOver = (img) => {
        console.log(img._id)
        setHover(img)
    }
    const handleMouseOut = (img) => {
        setHover(false)
    }


    return (
        <GalleryContext.Provider value={{ fetchGallery, invkCard, setInvkCard }}>
            <div>
                <div className="navcontainer">
                    {/* <span> <AccessAlarmsIcon /></span> */}

                    <span className="material-icons-round icon">person</span>
                    <div className="nameCont">
                        <span className="boldHead">My Unsplash</span>
                        <span>challenges.io</span>
                    </div>
                    <div className="searchCont">
                        <input onChange={(e) => { hanldeSearch(e.target.value) }} type="text" placeholder="search" />
                    </div>
                    <div className="buttonCont">
                        <button onClick={handleAddPhoto}>Add Photo</button>
                    </div>
                </div>
                <div className="imgcontainer">
                    <Masonry columnsCount={3}>
                        {data.map((img) => {
                            return (
                                <div key={img._id} style={{ position: 'relative', padding:"4px"}} onMouseOver={() => { handleMouseOver(img) }}
                                    onMouseOut={() => { handleMouseOut(img) }} >
                                    <img key={img._id} src={img.url} />
                                    {hover === img && <div >
                                        <span style={{ position: 'absolute', bottom: "22px", left: "6.5em",  color: 'white', padding: '4px',fontWeight:"bold", fontSize:"24px" }}>{img.label}</span>
                                        <button onClick={() =>{handleDelete(img)}} style={{ position: 'absolute', top: "18px", left: "22em", backgroundColor: 'transparent',width:"62px", color: 'red', padding: '3px',borderRadius:"10px", border:"1px solid red" }}>Delete</button>
                                    </div>}
                                    

                                </div>
                            )
                        })}
                    </Masonry>


                </div>
                {invkCard && <div className="cardcont" > <AddPhotoCard /></div>}
            </div>
        </GalleryContext.Provider>
    )
}
export default HomePage;