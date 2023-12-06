import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref as dbRef, get } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEHnozyutaf_EbVrgVFyP-2SECbZ8mIn8",
    authDomain: "group-page-8318d.firebaseapp.com",
     databaseURL: "https://group-page-8318d-default-rtdb.firebaseio.com/",
    projectId: "group-page-8318d",
    storageBucket: "group-page-8318d.appspot.com",
    messagingSenderId: "1045432375345",
    appId: "1:1045432375345:web:163d86b4292ef96b69dd10",
    measurementId: "G-S24VGX5MJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get group ID from URL
const groupId = getQueryParam('groupId');
if (groupId) {
    const groupRef = dbRef(database, 'groups/' + groupId);
    get(groupRef).then((snapshot) => {
        if (snapshot.exists()) {
            const groupData = snapshot.val();
            document.getElementById('groupName').textContent = groupData.groupName || 'No Group Name';
            document.getElementById('groupPrivacy').textContent = groupData.groupPrivacy || 'Privacy Info Not Available';
            document.getElementById('groupLocation').textContent = groupData.location || 'Location Not Specified';
            document.getElementById('groupRules').textContent = groupData.rules || 'No Rules Specified';
            document.getElementById('groupIndustry').textContent = Array.isArray(groupData.industry) ? groupData.industry.join(', ') : groupData.industry || 'Industry Not Specified';

                // New code for handling the group picture
                if (groupData.groupPictureURL) {
                    // Create an image element
                    const imgElement = document.createElement('img');
                    imgElement.src = groupData.groupPictureURL;
                    imgElement.alt = 'Group Picture';
                    imgElement.className = 'cover-photo'; // Ensure this matches your CSS class for styling
    
                    // Target the cover-photo-container div
                    const coverPhotoContainer = document.querySelector('.cover-photo-container');
                    coverPhotoContainer.innerHTML = ''; // Clear any existing content (the placeholder image)
                    coverPhotoContainer.appendChild(imgElement); // Add the new image
                }
                
        } else {
            console.log('No group data available');
        }
    }).catch((error) => {
        console.error('Error fetching group data:', error);
    });
} else {
    console.log('Group ID not found in URL');
}