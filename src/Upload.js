import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

const Upload = () => {
   const [selectedFile, setSelectedFile] = useState(null);
   const [loading, setLoading] = useState(null);
   const history = useHistory()

   const handleFileChange = (e) => {
     setSelectedFile(e.target.files[0]);
   };

   const sendFile = async () => {
     // Validating File uploaded
     if (!selectedFile) {
       return alert("Please Select JSON File");
     }
     try {
       // Appending File data to send to server
       const fileData = new FormData();
       fileData.append("file", selectedFile);
       const { data } = await axios.post("http://localhost:3010/submitFile", fileData);
       setLoading(true);
       if (data.success === 1) {
         setLoading(false);
         // pass the thermId received to the next component
         history.push(`/displayStats/${data.result.thermId}`);
       }
     } catch (error) {
       alert(error.response.data.message);
     }
   };

   return (
     <div style={{ textAlign: "center", marginTop: "8rem" }}>
       <div>
         <h1>Upload Your JSON File</h1>
         <input type="file" name="file" onChange={handleFileChange} />
         <button onClick={sendFile}>Submit File</button>
       </div>
       <Loader type="ThreeDots" visible={loading} color="#00BFFF" height={100} width={100} />
     </div>
   );
};

export default Upload;
