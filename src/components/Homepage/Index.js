import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosNormal from "axios";
import SearchImageUploader from "../../utils/SearchImageUploader";
import { deleteFromFirebase } from "../../utils/UploadFirebase";
import useAuth from "../hooks/useAuth";
import Loader from "../commons/Loader/Loader";

export default function Homepage() {
  const [imageRef, setImageRef] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [carDetails, setCarDetails] = useState(null);
  const [loader, setLoader] = useState(false);

  const axios = useAxiosPrivate;
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (imageURL != null && imageURL != "") handleCallMLModel();
  }, [imageURL]);

  const handleCallMLModel = async () => {
    setLoader(true);

    axiosNormal({
      method: "POST",
      url: "https://detect.roboflow.com/car-make-and-model-recognition/2",
      params: {
        api_key: "dCHebSvgqtCRFIH1TnvG",
        image: imageURL,
      },
    })
      .then(function (response) {
        setCarDetails(response?.data?.predictions[0]?.class);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error.message);
        setLoader(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      {loader ? <Loader /> : ""}
      <div style={{}}>
        <SearchImageUploader
          setImageURL={setImageURL}
          setImageRef={setImageRef}
        ></SearchImageUploader>
      </div>
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>car Details</h2>
        {imageURL != "" && imageURL != null ? <img src={imageURL} /> : <></>}
        {carDetails ? (
          <div style={{ fontSize: "1.5rem ", fontWeight: "bolder" }}>
            {carDetails}
          </div>
        ) : (
          <>Please Upload an Image</>
        )}
      </div>

      <div>
        {imageURL != null && imageURL != "" ? (
          <button
            onClick={() => {
              deleteFromFirebase(imageRef);
              setImageRef(null);
              setImageURL(null);
              setCarDetails(null);
            }}
          >
            Clear
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
