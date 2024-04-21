// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCt4niwjkauJ-o-K3xjQQW1EfwDXHrjWfE",
//   authDomain: "postings-19356.firebaseapp.com",
//   projectId: "postings-19356",
//   storageBucket: "postings-19356.appspot.com",
//   messagingSenderId: "371284961715",
//   appId: "1:371284961715:web:758d4afe5c67c4a9bdc3c6",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBjbmbvRWc7ZJW5KkSMwOr--UVtI71-n5M",
  authDomain: "stacktrack-cd3f7.firebaseapp.com",
  projectId: "stacktrack-cd3f7",
  storageBucket: "stacktrack-cd3f7.appspot.com",
  messagingSenderId: "1077525777060",
  appId: "1:1077525777060:web:57014147b83737ed20f431",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
