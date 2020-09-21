import React, {useState, useEffect} from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./CloudinaryService";
import './styles.css';
import Header from "./Header";
import Swal from "sweetalert2";
function App() {
  const [images, setImages] = useState([])
 const Delete=()=>{
   setImages([null]);
 }
const confirm=()=>{
Swal.fire({
title:"Delete Picture?",
showCancelButton:true,
confirmButtonColor:"green",
cancelButtonColor:"red",
confirmButtonText:"Yes",

}).then((result)=>{
if(result.value){
  
  Delete();
Swal.fire(
"Picture Deleted!"
)
}
})
}
  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "glomimage",
      tags: [tag, 'anImage'],
      uploadPreset: "myupload",
      cropping: 'true',
   croppingCoordinatesMode: 'custom',
return_delete_token:'true'
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos);
        if(photos.event === 'success'){
          setImages([...images, photos.info.public_id])
        }
      } else {
        console.log(error);
      }
    })
  }
  useEffect( () => {
    fetchPhotos("image", setImages);
  }, [])

  return (
    <div>
      <Header/>
   <CloudinaryContext cloudName="glomimage">
      <div className="App">
        <button onClick={() => beginUpload("image")}>Upload Image</button>
     <section>
        {images.map(i => <Image style={{width:"190px",height:"150px"}}
              key={i}
              publicId={i}
              fetch-format="auto"
              quality="auto"
            />)}
      </section>
      <button   onClick={() => {
        
          confirm();
        }}>Delete</button>
    </div>
   </CloudinaryContext>
   </div>
  );
}

export default App;