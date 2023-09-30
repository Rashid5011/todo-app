import React, { useState } from 'react'

const ImageUpload = () => {
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');


    const uploadImage = () => {
        //upload this image to cloudinary
        const data = new FormData(); data.append('file', image);
        data.append(
            'upload_preset', 'cloudinaryTutorial'
        );
        data.append('cloud_name', '');
        fetch('https://api.cloudinary.com/v1 1/dwtu2bfie/image/upload',
            {
                method: 'post',
                body: data
            })
            .then((response) => response.json())
            .then((data) => setUrl(data.url));


        return (
            <>
                <div>
                    <h1>rashjid</h1>
                    {/* <input type="file" onChange={(e) => { e.target.files[0] }} />
                    <button onClick={uploadImage}></button> */}
                </div>
            </>

        )
    }
}
export default ImageUpload