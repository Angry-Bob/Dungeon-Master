async function callFunction() {
    const url = 'https://www.dnd5eapi.co/api/';

    try {
    const response = await axios.get(url);
    return response.data
    } catch (e) {
        console.log(`Unable to complete HTTP request: ${e}` )
    }    
}

async function loadNavData() {
    const data = await callFunction();
    if (!data) {
        console.error("No data available for navBar.");
        return; // Exit if no data is available
    }
    return Object.keys(data);

}



async function navBar() {
    let navBar = document.getElementById('navBar')
    if (!navBar) {
        console.error("No element with ID 'navBar' found.");
        return;
    }

    let allNavItems = await loadNavData(); // Initial load
    let displayedNavItems = 0;


    function appendNavItems() {
        for (let i = 0; i < 5 && displayedNavItems < allNavItems.length; i++) {
            const navDivs = document.createElement('div');
            navDivs.className = `navBox navBox-${displayedNavItems}`;
            navDivs.textContent = allNavItems[displayedNavItems];

            navBar.appendChild(navDivs);
            displayedNavItems++;
        }
    }

    appendNavItems();

    navBar.addEventListener('scroll', () => {
        const nearBottom = navBar.scrollHeight - navBar.scrollTop <= navBar.clientHeight + 50; // 50px before reaching the bottom

        if (nearBottom && displayedNavItems < allNavItems.length) {
            appendNavItems();
        }

    });

``

}



document.addEventListener('DOMContentLoaded', async function () {
    await navBar();
});







