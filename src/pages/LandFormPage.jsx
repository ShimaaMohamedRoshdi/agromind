// import React, { useState } from "react";
// import api from "../../services/api";
// import LocationSearch from "../components/LocationSearch";
// import Joi from "joi";

// export default function LandFormPage() {
//   const [formData, setFormData] = useState({
//     landName: "",
//     size: "",
//     soilType: "",
//     irrigationType: "",
//     startDate: "",
//     latitude: "",
//     longitude: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Define soil and irrigation types
//   const soilTypes = [
//     "Clay",
//     "Sandy",
//     "Silty",
//     "Peaty",
//     "Chalky",
//     "Loamy",
//     "Saline",
//     "Laterite",
//     "Black Soil",
//     "Red Soil",
//     "Alluvial",
//   ];
//   const irrigationTypes = [
//     "Surface Irrigation",
//     "Drip Irrigation",
//     "Sprinkler Irrigation",
//     "Manual Irrigation",
//     "Subsurface Irrigation",
//     "Center Pivot Irrigation",
//     "Furrow Irrigation",
//     "Flood Irrigation",
//     "Basin Irrigation",
//     "Border Irrigation",
//   ];

//   // Joi schema to validate form data
//   const schema = Joi.object({
//     landName: Joi.string().min(3).max(50).required().messages({
//       "string.base": "Land Name must be a string.",
//       "string.min": "Land Name must be at least 3 characters long.",
//       "string.max": "Land Name cannot exceed 50 characters.",
//       "any.required": "Land Name is required.",
//     }),
//     size: Joi.string().min(1).required().messages({
//       "string.base": "Size must be a string.",
//       "string.min": "Size cannot be empty.",
//       "any.required": "Land Size is required.",
//     }),
//     soilType: Joi.string()
//       .valid(...soilTypes)
//       .required()
//       .messages({
//         "any.only": "Please select a valid soil type.",
//         "any.required": "Soil Type is required.",
//       }),
//     irrigationType: Joi.string()
//       .valid(...irrigationTypes)
//       .required()
//       .messages({
//         "any.only": "Please select a valid irrigation type.",
//         "any.required": "Irrigation Type is required.",
//       }),
//     startDate: Joi.date().required().messages({
//       "date.base": "Start Date must be a valid date.",
//       "any.required": "Start Date is required.",
//     }),
//     latitude: Joi.number().required().messages({
//       "number.base": "Latitude must be a number.",
//       "any.required": "Latitude is required.",
//     }),
//     longitude: Joi.number().required().messages({
//       "number.base": "Longitude must be a number.",
//       "any.required": "Longitude is required.",
//     }),
//   });

//   // Handle changes to form fields
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle location selection
//   const handleLocationSelect = (location) => {
//     setFormData({
//       ...formData,
//       latitude: location.geometry.lat,
//       longitude: location.geometry.lng,
//     });
//   };

//   // Handle form submission with validation
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate the form data with Joi
//     const { error } = schema.validate(formData, { abortEarly: false });

//     if (error) {
//       // Set validation errors in state
//       const newErrors = {};
//       error.details.forEach((err) => {
//         newErrors[err.path[0]] = err.message;
//       });
//       setErrors(newErrors);
//     } else {
//       // Clear any previous errors and submit the form data
//       setErrors({});

//       try {
//         await api.post("/land", formData);
//         alert("Land information saved successfully!");
//         // Redirect or clear the form if needed
//       } catch (error) {
//         console.error(error);
//         alert("Error saving land information");
//       }
//     }
//   };

//   return (
//     <div className="p-5 max-w-xl mx-auto bg-white shadow-md rounded mt-6">
//       <h2 className="text-xl font-bold mb-4">Add Land Information</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold w-full p-2">Land Name :</label>
//           <input
//             type="text"
//             name="landName"
//             placeholder="Land Name"
//             onChange={handleChange}
//             required
//             className="w-full border p-2"
//           />
//           {errors.landName && <p className="text-red-500">{errors.landName}</p>}
//         </div>

//         <div>
//           <label className="block font-semibold w-full p-2">Land Size :</label>
//           <input
//             type="text"
//             name="size"
//             placeholder="Size (e.g., 5 acres)"
//             onChange={handleChange}
//             required
//             className="w-full border p-2"
//           />
//           {errors.size && <p className="text-red-500">{errors.size}</p>}
//         </div>
//         <div className="mb-1 mt-1">
//           <label className="block font-semibold w-full  p-2 w-100">
//             Soil Type:
//           </label>
//           <select
//             name="soilType"
//             value={formData.soilType}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 w-100" // same style as text inputs
//           >
//             <option value="">-- Select Soil Type --</option>
//             {soilTypes.map((type, index) => (
//               <option key={index} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>
//         <label className="block font-semibold  w-full  p-2 w-100">
//           Irrigation Type:
//         </label>
//         <select
//           name="irrigationType"
//           value={formData.irrigationType}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded text-gray-700 w-100"
//         >
//           <option value="">-- Select Irrigation Type --</option>
//           {irrigationTypes.map((type, index) => (
//             <option key={index} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>

//         <div>
//           <label className="block font-semibold">Start Planting Date:</label>
//           <input
//             type="date"
//             name="startDate"
//             onChange={handleChange}
//             required
//             className="w-full border p-2"
//           />
//           {errors.startDate && (
//             <p className="text-red-500">{errors.startDate}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-semibold">Search Location:</label>
//           <LocationSearch onLocationSelect={handleLocationSelect} />
//           {errors.latitude && <p className="text-red-500">{errors.latitude}</p>}
//           {errors.longitude && (
//             <p className="text-red-500">{errors.longitude}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="bg-green text-black px-4 py-2 rounded mt-4"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import api from "../../services/api";
// import LocationSearch from "../components/LocationSearch";
// import Joi from "joi";

// export default function LandFormPage() {
//   const [formData, setFormData] = useState({
//     id: null,
//     landName: "",
//     size: "",
//     soilType: "",
//     irrigationType: "",
//     startDate: "",
//     latitude: "",
//     longitude: "",
//     pictureUrl: "",
//     weatherCondition: "",
//     waterSource: "",
//     status: "",
//   });

//   const [lands, setLands] = useState([]);
//   const [errors, setErrors] = useState({});

//   const fetchLands = async () => {
//     const response = await api.get("/land");
//     console.log("Fetched lands:", response.data); // Add this
//     setLands(response.data);
//   };

//   useEffect(() => {
//     fetchLands();
//   }, []);

//   const soilTypes = [
//     "Clay",
//     "Sandy",
//     "Silty",
//     "Peaty",
//     "Chalky",
//     "Loamy",
//     "Saline",
//     "Laterite",
//     "Black Soil",
//     "Red Soil",
//     "Alluvial",
//   ];
//   const irrigationTypes = [
//     "Surface Irrigation",
//     "Drip Irrigation",
//     "Sprinkler Irrigation",
//     "Manual Irrigation",
//     "Subsurface Irrigation",
//     "Center Pivot Irrigation",
//     "Furrow Irrigation",
//     "Flood Irrigation",
//     "Basin Irrigation",
//     "Border Irrigation",
//   ];

//   const schema = Joi.object({
//     landName: Joi.string().min(3).max(50).required().messages({
//       "string.base": "Land Name must be a string.",
//       "string.min": "Land Name must be at least 3 characters long.",
//       "string.max": "Land Name cannot exceed 50 characters.",
//       "any.required": "Land Name is required.",
//     }),
//     size: Joi.string().min(1).required().messages({
//       "string.base": "Size must be a string.",
//       "string.min": "Size cannot be empty.",
//       "any.required": "Land Size is required.",
//     }),
//     soilType: Joi.string()
//       .valid(...soilTypes)
//       .required()
//       .messages({
//         "any.only": "Please select a valid soil type.",
//         "any.required": "Soil Type is required.",
//       }),
//     irrigationType: Joi.string()
//       .valid(...irrigationTypes)
//       .required()
//       .messages({
//         "any.only": "Please select a valid irrigation type.",
//         "any.required": "Irrigation Type is required.",
//       }),
//     startDate: Joi.date().required().messages({
//       "date.base": "Start Date must be a valid date.",
//       "any.required": "Start Date is required.",
//     }),
//     latitude: Joi.number().required().messages({
//       "number.base": "Latitude must be a number.",
//       "any.required": "Latitude is required.",
//     }),
//     longitude: Joi.number().required().messages({
//       "number.base": "Longitude must be a number.",
//       "any.required": "Longitude is required.",
//     }),
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLocationSelect = (location) => {
//     setFormData({
//       ...formData,
//       latitude: location.geometry.lat,
//       longitude: location.geometry.lng,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { error } = schema.validate(formData, { abortEarly: false });
//     console.log("Submitting land:", formData);

//     if (error) {
//       const newErrors = {};
//       error.details.forEach((err) => {
//         newErrors[err.path[0]] = err.message;
//       });
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       let newLand;

//       if (formData.id) {
//         await api.put(`/land/${formData.id}`, formData);
//         console.log("Land updated!");
//       } else {
//         const response = await api.post("/land/AddLand", formData); // Ensure this is correct for your backend route
//         console.log("Land created!", response.data); // Use response.data
//         newLand = response.data; // Store the created land from the response
//       }

//       // Update the lands list
//       setLands((prevLands) => [...prevLands, newLand]);

//       setFormData({
//         id: null,
//         landName: "",
//         size: "",
//         soilType: "",
//         irrigationType: "",
//         startDate: "",
//         latitude: "",
//         longitude: "",
//         pictureUrl: "",
//         weatherCondition: "",
//         waterSource: "",
//         status: "",
//       });

//       alert("Land saved successfully!");
//     } catch (err) {
//       alert("Error saving land");
//       console.error(err);
//     }
//   };

//   const handleEdit = (land) => {
//     setFormData({ ...land });
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this land?")) {
//       try {
//         await api.delete(`/land/${id}`);
//         fetchLands();
//       } catch (err) {
//         alert("Error deleting land");
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div className="grid grid-cols-12 gap-4 p-4">
//       {/* Sidebar - Left */}
//       <div className="col-span-12 md:col-span-3 bg-gray-100 p-4 rounded shadow">
//         <h2 className="text-lg font-bold mb-4">My Lands</h2>
//         {lands.length === 0 ? (
//           <p>No lands added yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {lands.map((land) => (
//               <li
//                 key={land.id}
//                 className="bg-white p-3 shadow rounded flex justify-between items-center"
//               >
//                 <div>
//                   <p className="font-semibold">{land.landName}</p>
//                   <p className="text-sm text-gray-500">{land.size}</p>
//                 </div>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleEdit(land)}
//                     className="text-blue-500 hover:underline text-sm"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(land.id)}
//                     className="text-red-500 hover:underline text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Form - Right */}
//       <div className="col-span-12 md:col-span-9 bg-white p-6 shadow rounded">
//         <h2 className="text-xl font-bold mb-4">
//           {formData.id ? "Update Land" : "Add Land Information"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-semibold w-full p-2">
//               Land Name :
//             </label>
//             <input
//               type="text"
//               name="landName"
//               placeholder="Land Name"
//               value={formData.landName} // <-- add this
//               onChange={handleChange}
//             />

//             {errors.landName && (
//               <p className="text-red-500">{errors.landName}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-semibold w-full p-2">
//               Land Size :
//             </label>
//             <input
//               type="text"
//               name="size"
//               value={formData.size}
//               placeholder="Size (e.g., 5 acres)"
//               onChange={handleChange}
//               required
//               className="w-full border p-2"
//             />

//             {errors.size && <p className="text-red-500">{errors.size}</p>}
//           </div>
//           <div className="mb-1 mt-1">
//             <label className="block font-semibold w-full  p-2 w-100">
//               Soil Type:
//             </label>
//             <select
//               name="soilType"
//               value={formData.soilType}
//               onChange={handleChange}
//               required
//               className="w-full border p-2 w-100" // same style as text inputs
//             >
//               <option value="">-- Select Soil Type --</option>
//               {soilTypes.map((type, index) => (
//                 <option key={index} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <label className="block font-semibold  w-full  p-2 w-100">
//             Irrigation Type:
//           </label>
//           <select
//             name="irrigationType"
//             value={formData.irrigationType}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded text-gray-700 w-100"
//           >
//             <option value="">-- Select Irrigation Type --</option>
//             {irrigationTypes.map((type, index) => (
//               <option key={index} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>

//           <div>
//             <label className="block font-semibold">Start Planting Date:</label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               required
//               className="w-full border p-2"
//             />
//             {errors.startDate && (
//               <p className="text-red-500">{errors.startDate}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-semibold">Search Location:</label>
//             <LocationSearch onLocationSelect={handleLocationSelect} />
//             {errors.latitude && (
//               <p className="text-red-500">{errors.latitude}</p>
//             )}
//             {errors.longitude && (
//               <p className="text-red-500">{errors.longitude}</p>
//             )}
//           </div>
//           <div>
//   <label className="block font-semibold w-full p-2">Picture URL:</label>
//   <input
//     type="text"
//     name="pictureUrl"
//     value={formData.pictureUrl}
//     placeholder="https://example.com/image.jpg"
//     onChange={handleChange}
//     className="w-full border p-2"
//   />
//   {errors.pictureUrl && <p className="text-red-500">{errors.pictureUrl}</p>}
// </div>

// <div>
//   <label className="block font-semibold w-full p-2">Water Source:</label>
//   <input
//     type="text"
//     name="waterSource"
//     placeholder="e.g., Well, River"
//     value={formData.waterSource}
//     onChange={handleChange}
//     className="w-full border p-2"
//   />
// </div>

//           <button
//             type="submit"
//             className="bg-green text-black px-4 py-2 rounded mt-4"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import LocationSearch from "../components/LocationSearch";
import Joi from "joi";

export default function LandFormPage() {
  const [formData, setFormData] = useState({
    id: null,
    landName: "",
    size: "",
    soilType: "",
    irrigationType: "",
    startDate: "",
    latitude: "",
    longitude: "",
    pictureUrl: "",
    weatherCondition: "",
    waterSource: "",
    status: "",
  });

  const [lands, setLands] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch lands list from backend
  const fetchLands = async () => {
    try {
      const response = await api.get("/land"); // Assuming GET /land returns all lands
      setLands(response.data);
    } catch (error) {
      console.error("Error fetching lands:", error);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  const soilTypes = [
    "Clay",
    "Sandy",
    "Silty",
    "Peaty",
    "Chalky",
    "Loamy",
    "Saline",
    "Laterite",
    "Black Soil",
    "Red Soil",
    "Alluvial",
  ];
  const irrigationTypes = [
    "Surface Irrigation",
    "Drip Irrigation",
    "Sprinkler Irrigation",
    "Manual Irrigation",
    "Subsurface Irrigation",
    "Center Pivot Irrigation",
    "Furrow Irrigation",
    "Flood Irrigation",
    "Basin Irrigation",
    "Border Irrigation",
  ];

  const schema = Joi.object({
    landName: Joi.string().min(3).max(50).required().messages({
      "string.base": "Land Name must be a string.",
      "string.min": "Land Name must be at least 3 characters long.",
      "string.max": "Land Name cannot exceed 50 characters.",
      "any.required": "Land Name is required.",
    }),
    size: Joi.string().min(1).required().messages({
      "string.base": "Size must be a string.",
      "string.min": "Size cannot be empty.",
      "any.required": "Land Size is required.",
    }),
    soilType: Joi.string()
      .valid(...soilTypes)
      .required()
      .messages({
        "any.only": "Please select a valid soil type.",
        "any.required": "Soil Type is required.",
      }),
    irrigationType: Joi.string()
      .valid(...irrigationTypes)
      .required()
      .messages({
        "any.only": "Please select a valid irrigation type.",
        "any.required": "Irrigation Type is required.",
      }),
    startDate: Joi.date().required().messages({
      "date.base": "Start Date must be a valid date.",
      "any.required": "Start Date is required.",
    }),
    latitude: Joi.number().required().messages({
      "number.base": "Latitude must be a number.",
      "any.required": "Latitude is required.",
    }),
    longitude: Joi.number().required().messages({
      "number.base": "Longitude must be a number.",
      "any.required": "Longitude is required.",
    }),
    pictureUrl: Joi.string().uri().optional().messages({
      "string.uri": "Picture URL must be a valid URL.",
    }),
    weatherCondition: Joi.string().optional().messages({
      "string.base": "Weather Condition must be a string.",
    }),
    waterSource: Joi.string().optional().messages({
      "string.base": "Water Source must be a string.",
    }),
    status: Joi.string().optional().messages({
      "string.base": "Status must be a string.",
    }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      latitude: location.geometry.lat,
      longitude: location.geometry.lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      if (formData.id) {
        await api.put(`/land/${formData.id}`, formData);
        await fetchLands();
      } else {
        const response = await api.post("/land/AddLand", formData);
        console.log("POST /land/AddLand response:", response);
        const newLand = response.data;
        if (newLand && newLand.id) {
          setLands((prevLands) => [...prevLands, newLand]);
          console.log("Updated lands state:", [...lands, newLand]);
        } else {
          console.warn("New land data invalid or missing id, fetching lands list");
          await fetchLands();
        }
      }

      setFormData({
        id: null,
        landName: "",
        size: "",
        soilType: "",
        irrigationType: "",
        startDate: "",
        latitude: "",
        longitude: "",
        pictureUrl: "",
        weatherCondition: "",
        waterSource: "",
        status: "",
      });

      alert("Land saved successfully!");
    } catch (err) {
      alert("Error saving land");
      console.error(err);
    }
  };

  const handleEdit = (land) => {
    setFormData({ ...land });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this land?")) return;
    try {
      await api.delete(`/land/${id}`);
      await fetchLands();

      alert("Land deleted successfully.");
      if (formData.id === id) {
        setFormData({
          id: null,
          landName: "",
          size: "",
          soilType: "",
          irrigationType: "",
          startDate: "",
          latitude: "",
          longitude: "",
          pictureUrl: "",
          weatherCondition: "",
          waterSource: "",
          status: "",
        });
      }
    } catch (error) {
      alert("Error deleting land.");
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Sidebar */}
      <div className="col-lg-2 md:col-span-3 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">My Lands</h2>
        {lands.length === 0 ? (
          <p>No lands added yet.</p>
        ) : (
          <ul className="space-y-3">
            {lands.map((land) => (
              <li
                key={land.id}
                className="bg-white p-3 shadow rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{land.landName}</p>
                  <p className="text-sm text-gray-500">{land.size}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(land)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(land.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form - Right */}
      <div className="col-lg-9 md:col-span-9 bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">
          {formData.id ? "Update Land" : "Add Land Information"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 p-3">
          <div>
            <label className="block font-semibold">Land Name:</label>
            <input
              type="text"
              name="landName"
              placeholder="Land Name"
              value={formData.landName}
              onChange={handleChange}
              className="w-full border p-2"
            />
            {errors.landName && (
              <p className="text-red-500">{errors.landName}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Land Size:</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              placeholder="Size (e.g., 5 acres)"
              onChange={handleChange}
              className="w-full border p-2"
            />
            {errors.size && <p className="text-red-500">{errors.size}</p>}
          </div>

          <div>
            <label className="block font-semibold">Soil Type:</label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">-- Select Soil Type --</option>
              {soilTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.soilType && (
              <p className="text-red-500">{errors.soilType}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Irrigation Type:</label>
            <select
              name="irrigationType"
              value={formData.irrigationType}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">-- Select Irrigation Type --</option>
              {irrigationTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.irrigationType && (
              <p className="text-red-500">{errors.irrigationType}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-2"
            />
            {errors.startDate && (
              <p className="text-red-500">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Search Location:</label>
            <LocationSearch onLocationSelect={handleLocationSelect} />
            {errors.latitude && (
              <p className="text-red-500">{errors.latitude}</p>
            )}
            {errors.longitude && (
              <p className="text-red-500">{errors.longitude}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">Weather Condition:</label>
            <input
              type="text"
              name="weatherCondition"
              value={formData.weatherCondition}
              placeholder="e.g., Sunny, Rainy"
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Status:</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              placeholder="e.g., Active, Completed"
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div>
            <label className="block font-semibold">Picture URL:</label>
            <input
              type="text"
              name="pictureUrl"
              value={formData.pictureUrl}
              placeholder="https://example.com/image.jpg"
              onChange={handleChange}
              className="w-full border p-2"
            />
            {errors.pictureUrl && (
              <p className="text-red-500">{errors.pictureUrl}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Water Source:</label>
            <input
              type="text"
              name="waterSource"
              value={formData.waterSource}
              placeholder="e.g., Well, River"
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
