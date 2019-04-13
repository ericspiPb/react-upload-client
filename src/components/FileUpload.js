import React, { Fragment, useState } from 'react'
import Message from './Message'
import ProgressBar from './ProgressBar'
import axios from 'axios'

const FileUpload = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadedFile, setUploadedFile] = useState({});

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },

        onUploadProgress: ProgressEvent => {
          setUploadPercentage(parseInt(Math.round(ProgressEvent.loaded * 100 / ProgressEvent.total)))
          setTimeout(() => { setUploadPercentage(0)}, 10000)
        }
      })

      const {filename, filepath} = res.data;

      setUploadedFile({filename, filepath});
      setMessage("File Uploaded");
    } catch(err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server")
      } else {
        setMessage(err.response.data.msg);
      }
      console.error("message here")
    }
  }

  return (
    <Fragment>
      {message && <Message msg={message}/>}
      <form onSubmit={handleSubmit}>
        <div className="custom-file">
          <input type="file" className="custom-file-input" name="file" onChange={handleChange}/>
          <label className="custom-file-label" htmlFor="customFile">{filename}</label>
        </div>
        <ProgressBar percentage={uploadPercentage}/>
        <input type="submit" className="btn btn-primary btn-block mt-4" value="Upload"/>
      </form>
      {
        uploadedFile &&
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.filename}</h3>
            <img style={{width: "100%"}} src={uploadedFile.filepath} alt={uploadedFile.filepath}/>
          </div>
        </div>
      }
    </Fragment>
  )
}

export default FileUpload
