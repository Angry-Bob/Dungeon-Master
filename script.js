async function callFunction() {
    const url = 'https://www.dnd5eapi.co/api/';

    try {
    const response = await axios.get(url);
    return response.data
    } catch (e) {
        console.log(`Unable to complete HTTP request: ${e}` )
    }    
}




async function navBar() {
    const data = await callFunction()
    if (!data) {
        console.error("No data available for navBar.");
        return; // Exit if no data is available
    }
    const navs = Object.keys(data)
    let navBar = document.getElementById('navBar')
    if (!navBar) {
        console.error("No element with ID 'navBar' found.");
        return; // Exit if the 'navBar' element is not found
    }

    for (let index = 0; index < navs.length; index++) {
        const navDivs = document.createElement('div')
        navDivs.className = `navBox navBox-${index}`
        navDivs.textContent = navs[index]

        navBar.appendChild(navDivs)

    }

}



document.addEventListener('DOMContentLoaded', async function () {
    await navBar();
});







