import React, { useState } from 'react'
import {AiFillCloseCircle, AiFillHome, AiOutlineFullscreenExit, AiOutlineHome, AiOutlineMenu} from 'react-icons/ai'
import '../css/sidebar.css';
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { MdExitToApp } from 'react-icons/md';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import favIcon from '../assets/favicon.png'
import client from '../sanityClient';
import { v4 as uuidv4 } from "uuid";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(-1);
  const [visibility, setvisibility] = useState("mediumSizeSidebar");
  const [slideDirection, setSlideDirection] = useState("close");
  const [isOpen, setIsOpen] = useState(false);
  const [count , setCount] = useState(0);

  const showSidebar = () => {
    setIsOpen(true);
    console.log("Showing sidebar");
    setvisibility("openSidebar");
  };

  const closeSidebar = () => {
    console.log("closing Sidebar ");
    setvisibility("mediumSizeSidebar");
    setIsOpen(false);
  };

  const logoutUser = () => {
    const toastId = toast.loading("Loading...");

    localStorage.removeItem("user");

    toast.update(toastId, {
      render: "User Logout SuccessFull....",
      type: "success",
      isLoading: false,
      autoClose: 3000, // Close after 3 seconds
      closeOnClick: true,
    });

    window.location.reload("/");
  };

  /**Creating array of the categories , so that it can be fetched dynamiccaly */

  const arr = [
    "Walpaper",
    "Nature",
    "Food",
    "Travel",
    "People",
    "Technology",
    "Business",
    "Fashion",
    "Fitness",
    "Architecture",
    "Abstract",
  ];

  function handleSelectedItem(item, index) {
    setSelectedItem(index);
    /**Here would be the code to change the value for the feed section */
  }

  /**------------------------------------------------------------------ */

  // Pexels API Key
  const apiKey = "371hwQT5K1vbeqG4zGgq5FLFrtdlYlVWkGj9gFaYtDdB4MEgAecS7hWN"; // Replace with your Pexels API Key

  // Fetch all categories from Sanity
  async function fetchCategories() {
    try {
      const categories = await client.fetch('*[_type == "category"]');
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Fetch all users from Sanity
  async function fetchUsers() {
    try {
      const users = await client.fetch('*[_type == "user"]');
      console.log("Users get fetchec");
      console.log(users);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // Fetch images from Pexels API based on category name
 async function fetchImages(category) {
  const url = `https://api.pexels.com/v1/search?query=${category}&per_page=5`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    const data = await response.json();
    
    return data.photos.map(photo => ({
      src: photo.src.original, // Direct Image URL
      title: photo.alt, // Use alt text as title
      description: photo.alt, // Use alt text as a base description
      photographer: photo.photographer, // Photographer's name
      photographerUrl: photo.photographer_url, // Photographer's URL
      destinationUrl: photo.src.original, // Direct link to the image
    }));
  } catch (error) {
    console.error(`Error fetching images for category ${category}:`, error);
  }
}

// Upload image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    // Fetch the image as a blob
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const imageBlob = await response.blob();
    const filename = imageUrl.split("/").pop(); // Extract filename from URL

    // Upload the blob to Sanity
    const imageAsset = await client.assets.upload("image", imageBlob, {
      filename,
    });
    return imageAsset._id; // Return the document ID of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    throw error; // Rethrow the error to handle it later
  }
}


// Create posts in Sanity for each user and category
async function createPostsForUsers() {
  try {
    const categories = await fetchCategories();
    const users = await fetchUsers();

    for (const user of users) {
      for (const category of categories) {
        const images = await fetchImages(category.categoryName); // Fetch images for the category
        
        for (const { src, title, description, photographer, photographerUrl, destinationUrl } of images) {

          console.log( "Image Link ", src );
          const imageRef = await uploadImageToSanity(src); // Upload the image to Sanity

          console.log(imageRef);
          const postData = {
            _type: 'post',
            postId: uuidv4(), // Generate unique post ID
            title: title ? title : `Image by ${photographer}`, // Use actual title from API
            description: `This image titled *"${description}"* was captured by [${photographer}](${photographerUrl}). It beautifully represents the ${category.categoryName} category. Feel free to use this image for your projects!`,
            category: { _type: 'reference', _ref: category._id }, // Reference to category
            destination: destinationUrl, // Use the direct link to the image
            post: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef, // Use the document ID of the uploaded image
              },
            },
            postedbBy: {
          _type: "reference",
          _ref: user._id,
        }, // Reference to the user
            postedDate: new Date().toISOString(),
          };

          try {
            await client.create(postData);
            console.log("Image Uploaded Sucess : ");
            console.log(postData);
            console.log(`Post created for user ${user.name} with title: ${postData.title}`);
            console.log(count);

            setCount( count+1);
          } catch (error) {
            console.error('Error creating post:', error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error creating posts:', error);
  }
}

// Execute the function to create posts
// createPostsForUsers();



  // Execute the function to create posts
  // createPostsForUsers();

  /**---------------------------------------------------------------- */

  return (
    <div className="sidebarContainer">
      <div className="mobileScreenSidebar">
        <AiOutlineMenu onClick={showSidebar} className="menu" />

        <div className="mobileSidebarTop">
          <img src={favIcon} className="AppLogo" alt="" />
          <p className="logoText">ShotZ</p>
        </div>
      </div>

      <div className={` ${visibility} ${isOpen ? "open" : "close"}`}>
        <div className="sidebarTop">
          <img src={favIcon} className="AppLogo" alt="" />
          <p className="logoText">ShotZ</p>
          <AiFillCloseCircle
            size={30}
            className="closeCircle"
            onClick={closeSidebar}
          />
        </div>

        <ul>
          <li className="list ">
            <NavLink
              key="key"
              class="navLink"
              to="/"
              className={({ isActive }) => (isActive ? "selected" : "navLink")}
            >
              <AiFillHome />
              {"   "}
              Home
            </NavLink>
          </li>
        </ul>

        <p style={{"fontWeight":"bold" , "textAlign":"center" , "fontSize":"18px" , "color":"darkred"}}>Categories</p>

        <ul>
          {arr.map((item, index) => {
            return (
              <li className="list">
                <NavLink
                  key={item}
                  to={`/category/${item}`}
                  className={({ isActive }) =>
                    isActive ? "selected" : "navLink"
                  }
                  onClick={() => {
                    handleSelectedItem(item, index);
                  }}
                >
                  {item}
                </NavLink>
              </li>
            );
          })}
        </ul>

      
        <button type="button" className="logout" onClick={logoutUser}>
          Log Out <MdExitToApp className="logOutUserIcon" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar
