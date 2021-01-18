import React, {useState, useEffect} from 'react';

import './style.scss';

import axios from 'axios';

export default function ImagePicker() {

    const [imagesPosted, setImagesPosted] = useState<any[]>([]);

    //load the image bank
    useEffect(() => {
        async function loadImageBank() {
            loadDBImages();
        }
        loadImageBank();
      });

    async function loadDBImages(){
        const images = (await axios.get('http://localhost:3000/images')).data;
        setImagesPosted(images);
    }


    return (
        <div>
            <div className="sub-title-container">
                <p className="sub-title"> Image Bank </p>
            </div>
            <div className="image-bank">
                {imagesPosted.map(image => 
                    <div className="image">
                        <img src={`http://localhost:3000/images/${image.ID}`} alt='img' width="200"/>
                    </div>
                )}
            </div>
        </div>
                
    );
};


