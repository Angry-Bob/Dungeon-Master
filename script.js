
// 
//____Global Variables & Libraries______________________________________________

const url = 'https://www.dnd5eapi.co/api/';







// ____Functions___________________________________________________________________
// ----------------------------------------------------------------------
// Function to call data
async function callFunction() {
    const url = 'https://www.dnd5eapi.co/api/';
    try {
    const response = await axios.get(url);
    return response.data
    } catch (e) {
        console.log(`Unable to complete HTTP request: ${e}` )
    }    
}
// ----------------------------------------------------------------------
// Function responsible for keeping data
async function loadNavData() {
    const data = await callFunction();
    if (!data) {
        console.error("No data available for navBar.");
        return; // Exit if no data is available
    }
    return Object.keys(data);

}
// ----------------------------------------------------------------------
async function navBar() {

    let navBar = document.getElementById('navBar')
    const divForContentDivs = document.getElementById('contentDiv')

    if (!navBar || !divForContentDivs) {
        console.error("Required elements not found.");
        return;
    }
    let data = await loadNavData()
    if (!data) return;

        // --------------------------------------------------- //
        // --For loop that creates Navigational Bar---------- //
    for (let i = 0; i < data.length; i++) {
        const navDiv = document.createElement('div')
        navDiv.className = `navItem navItem-${i}`
        navDiv.textContent = data[i]
        navBar.appendChild(navDiv)
        // ------------------------------------ //
        //Event Listener for each Navigational div//
        navDiv.addEventListener('click', async function() {
            //Used to reset DIV//
            divForContentDivs.innerHTML = '';
            // ------------------------------ //

            try {
            const dataLoad = await axios.get(url + data[i])
            const content = dataLoad.data.results
            console.log(content)

            if (Array.isArray(content)) {
                content.forEach(item => {
                    const divsContent = document.createElement('div')
                    divsContent.className = `contentItem contentItem-${content[item]}`

                    // ------------------------------ //
                    divsContent.innerHTML = `

                    <h2>${item.name}</h2> <br>
                    <br>
                    <h3>${item.index}</h3>
                    
                    
                    ` || JSON.stringify(item)
                    
                    // ------------------------------ //
                    divForContentDivs.appendChild(divsContent)
                })
                } else {
                    const divsContent = document.createElement('div');
                    divsContent.className = 'contentItem';
                    divsContent.textContent = JSON.stringify(content);
                    divForContentDivs.appendChild(divsContent);
                }
            } catch (e) {
                console.error(`Unable to fetch data for ${data[i]}: ${e}`);
            }
                


            

            
        })
    }

}

// ____Event Listeners____________________________________________________
// ----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', navBar);








