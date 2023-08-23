import {useState} from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { readAndCompressImage } from 'browser-image-resizer';
import Divider from '@mui/material/Divider';

function UploadImage({index, setImageForIndex, cover}) {

        // Selected image preview
        const [imagePreview, setImagePreview] = useState();

        const onFileChange = async (event) => {
            // Access the selected file
            const fileToUpload = event.target.files[0];
        
            // Resize and compress the image. Remove this if using something other
            // than an image upload.
            const copyFile = new Blob([fileToUpload], { type: fileToUpload.type, name: fileToUpload.name });
            const resizedFile = await readAndCompressImage(copyFile, {
              quality: 1.0,    // 100% quality
              maxHeight: 1000, // max height of the image
            });
      
          // Limit to specific file types.
          const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      
          // Check if the file is one of the allowed types.
          if (acceptedImageTypes.includes(fileToUpload.type)) {
            // Create a URL that can be used in an img tag for previewing the image
            setImagePreview(URL.createObjectURL(resizedFile));
            setImageForIndex(index, {data: resizedFile, fileName: fileToUpload.name, fileType: fileToUpload.type, cover: cover})
          } else {
            alert('Please select an image');
          }
        }
        return (
            <>
                
                <h3 className="ProjectName">Image:</h3>
                {/* <FileUploadIcon/> */}
                <input 
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    />
                    {
                      imagePreview && (
                        <>
                        {/* <br />
                        <br /> */}
                        <img style={{maxHeight: '100px'}} src={imagePreview} />
                        {/* <p>Preview</p> */}
                        </>
                    )
                  }
                  <Divider variant="middle" sx={{marginTop:'5px'}} />
                    {/* <br /> */}
            </>
        )
}

export default UploadImage