//____Global Variables & Libraries______________________________________________

const url = 'https://www.dnd5eapi.co/api/';




// ____Functions___________________________________________________________________
// ----------------------------------------------------------------------
// Function to call data
async function callFunction(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (e) {
        console.log(`Unable to complete HTTP request: ${e}`);
    }    
}
// ----------------------------------------------------------------------
// Function responsible for keeping data
async function loadNavData() {
    const data = await callFunction(url);
    if (!data) {
        console.error("No data available for navBar.");
        return; // Exit if no data is available
    }
    return Object.keys(data);
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

        // Event Listener for each Navigational div
        navDiv.addEventListener('click', async function() {
            divForContentDivs.innerHTML = ''; // Clear existing content
            await fetchAndRenderContent(item, divForContentDivs); // Fetch and render content for clicked item
        });
    });
}
// ----------------------------------------------------------------------
// Function to fetch and render content for the selected navigation item
async function fetchAndRenderContent(item, contentDiv) {
    try {
        const dataLoad = await callFunction(url + item);
        const content = dataLoad.results;
        
        if (Array.isArray(content)) {
            content.forEach(entry => {
                const divsContent = document.createElement('div');
                divsContent.className = `contentItem contentItem-${entry.index}`;
                divsContent.innerHTML = `<h2>${entry.name}</h2>`;
                contentDiv.appendChild(divsContent);
            });
        } else {
            const divsContent = document.createElement('div');
            divsContent.className = 'contentItem';
            divsContent.textContent = JSON.stringify(content);
            contentDiv.appendChild(divsContent);
        }
    } catch (e) {
        console.error(`Unable to fetch data for ${item}: ${e}`);
    }
}

async function contentCardModal() {
    const modalData = await fetchAndRenderContent(item, contentDiv)
    console.log(modalData)
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
    modalContent.innerHTML = `<h2>${content}</h2>`;  // You can customize this to display detailed content

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


function contentModal(item) {
    openModal(`Content for ${item}`);
}





















// Main function to initialize navbar with data
async function initNavBar() {
    const navData = await loadNavData();
    if (navData) renderNavBar(navData);
}

// ____Event Listeners____________________________________________________
// ----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', initNavBar);


navDiv.addEventListener('click', async function() {
    divForContentDivs.innerHTML = ''; // Clear existing content
    await fetchAndRenderContent(item, divForContentDivs); // Fetch and render content for clicked item
    console.log(contentCardModal(item)); // Open the modal displaying the content
});





