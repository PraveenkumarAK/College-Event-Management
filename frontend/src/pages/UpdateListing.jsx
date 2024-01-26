import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import background from '../assets/jeremy-chevallier.jpg'

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    type: "",
    block: "",
    venue: "",
    startingDateTime: "",
    endingDateTime: "",
    winner: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    const fetchListing = async () => {
        const listingId = params.listingId;
        const res = await fetch(`/backend/listing/get/${listingId}`);
        const data =await res.json();
        if(data.success === false) {
            console.log(data.message);
            return;
        }
        setFormData(data);
    };
    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
    e.target.id === 'TechnicalEvent' || 
    e.target.id === 'Workshops' || 
    e.target.id === 'CulturalEvent' || 
    e.target.id === 'Cooking' || 
    e.target.id === 'FoodShops' || 
    e.target.id === 'GamingEvent' || 
    e.target.id === 'ArtEvent'){
    setFormData({
      ...formData,
      type: e.target.id 
    });
  }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleDateTime = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      setLoading(true);
      setError(false);
      const res = await fetch(`/backend/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div  style={{backgroundSize:'cover', backgroundImage: `url(${background})`}}>
    <main className="p-3 max-w-4xl mx-auto  backdrop-blur-xl shadow-2xl rounded-lg h-full  text-white ">
    <h1 className="text-3xl font-semibold text-center my-7 pb-2 border-b max-w-full">
      Update a Listing
    </h1>

    <form
      onSubmit={handleSubmit}
      className=" flex flex-col sm:flex-row gap-4 "
    >
      <div className="flex flex-col flex-1">

        <input
          type="text"
          id="name"
          placeholder="Event Name"
          className="border-b-2 p-4 rounded-lg outline-none bg-transparent mb-11"
          required
          onChange={handleChange}
          value={formData.name}
        />


        <input
          type="text"
          id="block"
          placeholder="Block"
          className="border-b-2 p-2 rounded-lg outline-none bg-transparent mb-11"
          required
          onChange={handleChange}
          value={formData.block}
        />

        <input
          type="text"
          id="venue"
          placeholder="Venue"
          className="border-b-2 p-2 rounded-lg outline-none bg-transparent mb-11"
          required
          onChange={handleChange}
          value={formData.venue}
        />

        <input
          type={"text"}
          id="startingDateTime"
          placeholder="Starting Date & Time"
          className="border-b-2 p-2 rounded-lg outline-none bg-transparent mb-11"
          required
          onChange={handleDateTime}
          value={formData.startingDateTime}
        />
      
        <input
          type={"text"}
          id="endingDateTime"
          placeholder="Ending Date & Time"
          className="border-b-2 p-2 rounded-lg outline-none bg-transparent mb-11"
          required
          onChange={handleDateTime}
          value={formData.endingDateTime}
          /> 

        <textarea
          type="text"
          id="description"
          placeholder="Description"
          className="border-b-2 p-2 rounded-lg outline-none bg-transparent mb-11"
          required
          onChange={handleChange}
          value={formData.description}
        />
          </div>

        <div className="flex flex-col flex-1 p-2">
          <label >Category</label>
        <div className="flex gap-6 flex-wrap py-4 ">
          <div className="flex gap-2">
              <input type="checkbox" id='TechnicalEvent' className="w-5 " onChange={handleChange} checked={formData.type === 'TechnicalEvent'}/>
              <span>Technical Event</span>
          </div>
          <div className="flex gap-2">
                <input type="checkbox" id='Workshops' className="w-5 " onChange={handleChange} checked={formData.type === 'Workshops'}/>
              <span>Workshops</span>
          </div>
          <div className="flex gap-2">
                <input type="checkbox" id='CulturalEvent' className="w-5 " onChange={handleChange} checked={formData.type === 'CulturalEvent'}/>
              <span>Cultural Event</span>
          </div>
          <div className="flex gap-2">
                <input type="checkbox" id='Cooking' className="w-5 " onChange={handleChange} checked={formData.type === 'Cooking'}/>
              <span>Cooking</span>
          </div>
          <div className="flex gap-2">
                <input type="checkbox" id='FoodShops' className="w-5 " onChange={handleChange} checked={formData.type === 'FoodShops'}/>
              <span>FoodShops</span>
          </div>
          <div className="flex gap-2">
                <input type="checkbox" id='GamingEvent' className="w-5 " onChange={handleChange} checked={formData.type === 'GamingEvent'}/>
              <span>Gaming Event</span>
          </div>
          <div className="flex gap-2">
                <input type="checkbox" id='ArtEvent' className="w-5 " onChange={handleChange} checked={formData.type === 'ArtEvent'}/>
              <span>Art Event</span>
          </div>
        </div>

        <p className="font-extrabold mt-5">
          Images:
          <span className="font-normal ml-2">
            The first image will be the cover(max6)
          </span>
        </p>

        <div className="flex gap-4 mt-5">
          <input
            onChange={(e) => setFiles(e.target.files)}
            className="p-3 border border-gray-300 rounded w-full"
            type="file"
            id="image"
            accept="image/*"
            multiple
          />

              <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="bg-transparent w-64 text-white text-xl font-medium p-2 cursor-pointer rounded-lg border border-white hover:bg-white duration-300 hover:text-black"
            >
              
              {uploading ? "Uploading..." : "Upload"}
            </button>

          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-16 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75 font-mono"
                >
                  Delete
                </button>
              </div>
            ))}

            <textarea
            id="winner"
            placeholder="Winner"
            className="border-b-2 p-2 rounded-lg outline-none bg-transparent mt-7 placeholder:text-white"
            onChange={handleChange}
            value={formData.winner}
            />

          <button
            disabled={loading || uploading}
            className="bg-transparent mt-9  text-white text-xl font-medium p-2 cursor-pointer rounded-lg border border-white hover:bg-white duration-300 hover:text-black"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
    </div>
  );
}
