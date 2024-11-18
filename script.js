//____Global Variables & Libraries______________________________________________

const url = 'https://www.dnd5eapi.co/api/';
const url2 = 'https://www.dnd5eapi.co';
const modalEventId = document.getElementsByClassName('modal-content')


// ____Functions___________________________________________________________________
// ----------------------------------------------------------------------
// Function to call data
async function callFunction(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data['classes'])
        const response2 = await axios.get(url2 + response.data['classes'])
        console.log(response2.data.results[7].url)
        const response3 = await axios.get(url2 + response2.data[7].url)
        console.log(response3)
        return response.data;
    } catch (e) {
        console.log(`Unable to complete HTTP request: ${e}`);
    }    
}

// ----------------------------------------------------------------------
// Function responsible for loading navigation data and calling the navbar render
async function loadNavData() {
    const data = await callFunction(url);
    if (!data) {
        console.error("No data available for navBar.");
        return; // Exit if no data is available
    }
   renderNavBar(Object.keys(data)); // Call renderNavBar directly with fetched data
}

// ----------------------------------------------------------------------
// Function to render navigation items and handle clicks
function renderNavBar(data) {
    let navBar = document.getElementById('navBar');
    const divForContentDivs = document.getElementById('contentDiv');
    if (!navBar || !divForContentDivs) {
        console.error("Required elements not found.");
        return;
    }

    data.forEach((item, index) => {
        const navDiv = document.createElement('div');
        navDiv.className = `navItem navItem-${index}`;
        navDiv.textContent = item;
        navBar.appendChild(navDiv);

        // Event Listener for each navigational div
        navDiv.addEventListener('click', async function() {
            divForContentDivs.innerHTML = ''; // Clear existing content
            await fetchAndRenderContent(item, divForContentDivs); // Fetch and render content for clicked item
            ; // Open the modal displaying the content
        });
    });

}

// ----------------------------------------------------------------------
// Function to fetch and render content for the selected navigation item
async function fetchAndRenderContent(item, contentDiv) {
    const dataLoad = await callFunction(url + item);
    const content = dataLoad?.results;
    const contentCardUrl = 'https://www.dnd5eapi.co'
    if (Array.isArray(content)) {
        content.forEach(entry => {
            const divsContent = document.createElement('div');
            divsContent.className = `contentItem contentItem-${entry.index}`;
            divsContent.innerHTML = `<h2>${entry.name}</h2>`;
            contentDiv.appendChild(divsContent);
            // Add click event listener to each content item to open a modal
            divsContent.addEventListener('click', () => {
                    contentModal(entry.url); // Pass the entry name or other data to the modal
            });
        });
    } else if (content) {
        const divsContent = document.createElement('div');
        divsContent.className = 'contentItem';
        divsContent.textContent = JSON.stringify(content);
        contentDiv.appendChild(divsContent);

        // If there's a single content item, add a click event listener for the modal
        divsContent.addEventListener('click', () => {
            contentModal(JSON.stringify(content));
        });
    } else {
        console.error(`No content available for ${item}.`);
    }
}

// Open the modal with content when a content item is clicked
async function contentModal(item) {
    const altUrl = 'https://www.dnd5eapi.co';
    
    try {
        // Fetch additional content details if needed or directly pass `item`
        const contentInformationCall = await axios.get(altUrl + item);
        const theRealData = contentInformationCall.data;
        
        let descriptionHTML = '';
        let title = theRealData.name || theRealData.index; // Use name if available, otherwise use index
        
        const desc = theRealData.desc;

        // Check if desc is an array or a single string
        if (Array.isArray(desc)) {
            // If desc is an array, loop over each description
            desc.forEach(description => {
                descriptionHTML += `<h1>${description}</h1>`;
            });
        } else if (typeof desc === 'string') {
            // If desc is a single string, display it directly
            descriptionHTML += `<h1>${desc}</h1>`;
        } else {
            descriptionHTML = "<p>No description available.</p>";
        }
        
        openModal(
            `
                <h1>${title}</h1>
                <p>${theRealData.index}</p>
                ${descriptionHTML}
            `
        );
    } catch (error) {
        console.error("Failed to fetch content information:", error);
    }
}

// ----------------------------------------------------------------------
// Functions to open and close modal
// ----------------------------------------------------------------------

function openModal(content) {

    // Create the modal container
    const modal = document.createElement('div');
    modal.className = 'modal';  // Add CSS class for styling
    // Create the modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Add the content to the modal
    modalContent.innerHTML = `<h2>${content}</h2>`;  // Customize this to display detailed content

    // Add a close button
    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', () => closeModal(modal));

    // Append the content and close button to the modal
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    // Append the modal to the body
    document.body.appendChild(modal);
}

function closeModal(modal) {
    document.body.removeChild(modal); // Remove the modal from the DOM
}

// ___________________________________________________________________________
// -----------------------------------------------------------------------------












// ____Event Listeners____________________________________________________
// ----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', loadNavData); // Initialize navbar on load