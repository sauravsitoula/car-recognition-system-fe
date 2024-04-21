import { useCallback, useState } from "react";
import React from "react";
import { useDropzone } from "react-dropzone";
import "./SearchImageUploader.css";
import Loader from "../components/commons/Loader/Loader";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./Firebase";

const ImageUploader = ({ setImageURL, setImageRef }) => {
  const [loader, setLoader] = useState(false);

  const uploadToFirebase = async (image) => {
    let downloadingURL = "";
    const imageRef = ref(storage, v4());
    setImageRef(imageRef);
    try {
      const snapshot = await uploadBytes(imageRef, image);
      downloadingURL = await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setImageURL(downloadingURL);
    return downloadingURL;
  };

  const uploadImage = async (image) => {
    if (image) {
      setLoader(true);
      await uploadToFirebase(image);
      setLoader(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    await uploadImage(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <div className="container">
      {loader ? <Loader /> : ""}
      <div {...getRootProps({ className: "search-dropzone" })}>
        <input {...getInputProps()} />
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Drag 'n' drop an image here, or click to select an image
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
