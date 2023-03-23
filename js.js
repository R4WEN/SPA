// calls the function pageElements upon loading the page...
document.body.onload = pageElements;

// ...which calls other functions to provide the page elements
function pageElements() {
    addButton('print sumting', 'print-button', printCatFacts); // button text, button ID, function for event listener
    addButton('clear everytin', 'clear-button', clearCatFacts); // same
    addDiv('all-cat-facts'); // div ID
}

/* grabs data and calls function so it turns up in body as a child of a div
(so to be able to erase it w the other button) */
function printCatFacts() {
    fetch('https://meowfacts.herokuapp.com/')
    .then(response => response.json())
    .then(function (json) {
        // calls function that add catfact to div
        addCatFacts(Object.values(json));
    });
}

// adds catfacts to div
function addCatFacts(myText) {
    // create a new element
    const newElement = document.createElement('p');
    // and give it the catfact content
    const newContent = document.createTextNode(myText);
    // add the text node to the element
    newElement.appendChild(newContent);
    // add element to div
    document.getElementById('all-cat-facts').appendChild(newElement);
}

// clears all catfacts by removing all childs of the parent div
// inspo from https://www.w3schools.com/jsref/met_node_removechild.asp
function clearCatFacts() {
    const catFactsDiv = document.getElementById('all-cat-facts');
    // as long as div has children, the first child will be removed
    while (catFactsDiv.hasChildNodes()) {
        catFactsDiv.removeChild(catFactsDiv.firstChild);
    }
}

// adds div
function addDiv(myId) {
    // create a div
    const newElement = document.createElement('div');
    // give it ID
    newElement.setAttribute('id', myId);
    // add to body
    document.body.appendChild(newElement);
}

// adds button
// based code on https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#web_component_example
// this should be first for easier readability, but i call a couple of funtions that have nothing to
// do w the assignment so i figured id rather end w it
function addButton(myText, myId, myEvent) {
    // create a new element
    const newElement = document.createElement('button');
    // give it ID
    newElement.setAttribute('id', myId);
    // some event listeners
    newElement.addEventListener('click', myEvent);
    newElement.addEventListener('click', colorExplosion);
    // and a lil bit of styling
    myStyleAttributes(newElement);
    // and give it some content
    const newContent = document.createTextNode(myText);
    // add the text node to the element
    newElement.appendChild(newContent);
    // add element to body
    document.body.appendChild(newElement);
}

function myStyleAttributes(myElement) {
    let x = myElement.style;
    x.border = 'none';
    x.fontSize = '100%';
    x.padding = '27px';
    x.width = '50%';
}

// only for fun :) lets throw in some fun colors!!
function colorExplosion() {
    const randomColor1 = randomColorGenerator();
    const randomColor2 = randomColorGenerator();
    this.style.backgroundColor = randomColor1;
    /* Below is some very bad coding, im combining two random colors meaning i have no control over the contrast
    between background and text. Adding a glow of the text in the same color amplifies this problem. lol. */
    this.style.color = randomColor2;
    this.style.textShadow = '0 0 20px ' + randomColor2 + ', 0 0 20px ' + randomColor2; 
}

// basically copypaste from https://css-tricks.com/snippets/javascript/random-hex-color/
function randomColorGenerator() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}
