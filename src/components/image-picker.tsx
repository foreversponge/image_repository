import React, {useState} from 'react';

import './style.scss';

import ImageUploading, { ImageListType }  from 'react-images-uploading';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default function ImagePicker() {

    const [imagesUploaded, setImagesUploaded] = useState<any[]>([]);

    const onChange = (
        imageList: ImageListType,
      ) => {
        // data for submit
        setImagesUploaded(imageList as never[]);
      };

    async function onSubmit(files:any) {
        const imagesArray = imagesUploaded.map(o => o.file);
        const data = new FormData();
        const url = 'http://localhost:3000/images/upload';
        imagesArray.forEach((image, index) => data.append(`images[${index}]`, image));
        await axios.post(url, data);
    }

    return (
        <div> 
            <div>
                <ImageUploading
                    multiple
                    value={imagesUploaded}
                    onChange={onChange}
                    maxNumber={1000000000000}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                    <div>
                        <div className="upload-image-wrapper">
                        <button
                        className="drag-n-drop"
                        style={isDragging ? { backgroundColor: 'grey' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        >
                        Drag & Drop / Click Here
                        </button>
                        </div>
                        &nbsp;
                        <div className="image-upload-wrapper">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="200" />
                                    <div className="button-wrapper">
                                        <button className="update-btn" onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className="remove-btn" onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="buttons-container">
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                startIcon={<PublishIcon />}
                                onClick={() => {
                                    onSubmit(imageList);
                                    onImageRemoveAll();}}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={onImageRemoveAll}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                    )}
                </ImageUploading>
            </div>
        </div>
    );
};


