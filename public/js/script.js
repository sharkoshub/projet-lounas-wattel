const firebaseConfig = {
    apiKey: "AIzaSyCwZnrjJGawt9Y8BWrbPr5rlB2f2jf1_lU",
    authDomain: "projet-lounas-wattel.firebaseapp.com",
    projectId: "projet-lounas-wattel",
    storageBucket: "projet-lounas-wattel.appspot.com",
    messagingSenderId: "1024759485384",
    appId: "1:1024759485384:web:ba6acd4d6ac44e2a2526fd",
    measurementId: "G-3R5MM2Y5QH"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// récup images
/*------------------------------------------------- */
let search = document.querySelector('input#input-search');
let btnSearch = document.querySelector('button#btn-search');

let articleImage = document.querySelector('article#articleImage');

const displayImage = async function (photos) {

    photos.forEach(element => {
        let image = document.createElement('img');
        image.src = element.links.download;
        image.draggable = "true";
        articleImage.appendChild(image);
    });


}

const searchPhotos = async function (query) {
    try {
        const request = await fetch('https://api.unsplash.com/search/photos?query=' + query + '&client_id=lPy-G3iwhGr-Xis4LoXhe7DWg_ftV4NXXH0fGQ7Ce78');
        const data = await request.json();
        articleImage.innerHTML = '';
        displayImage(data.results);

    }
    catch (error) {
        console.error(error);
    }
}

btnSearch.addEventListener('click', () => searchPhotos(search.value));

// Collection
/*------------------------------------------------------ */

/*
let addCollection = document.querySelector('button#addCollection');

const insertCollection = async function (inputCollectionName) {
    db.collection("collection").add({
        titre: inputCollectionName,
        url: 'source.png'
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}


let inputCollectionName = document.querySelector('input#inputCollectionName');

addCollection.addEventListener('click', () => insertCollection(inputCollectionName.value));
*/

let articleCollection = document.querySelector('article#articleCollection');

const displayCollection = async function () {
    for (let i = 0; i < 4; i++) {
        let aside = document.createElement('aside');
        aside.id = i;
        aside.className = 'dropzone';
        articleCollection.appendChild(aside);
    }
}


let showCollection = document.querySelector('button#showCollection');


showCollection.addEventListener('click', () => displayCollection());

let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function (event) {

}, false);

document.addEventListener("dragstart", function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function (event) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function (event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "dropzone") {
        event.target.style.background = "purple";
    }

}, false);

document.addEventListener("dragleave", function (event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
        console.log(dragged.sr);
        alert(dragged.src + ' est drop  dans la collection ' + event.target.id);
    }

}, false);