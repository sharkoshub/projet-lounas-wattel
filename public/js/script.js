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

if (articleImage.innerHTML == '') {
    articleImage.innerHTML = '<p>Aucun résultat</p>'
}

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

let articleListCol = document.querySelector('#articleListCol');

let ul = document.createElement('ul');

const listCollection = async function () {
    db.collection("collection").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            let li = document.createElement('li');
            li.className = 'dropzone'
            li.id = doc.id;
            li.innerHTML = doc.id;
            ul.appendChild(li);
        });
    });
    articleListCol.appendChild(ul);
}

let showCollection = document.querySelector('button#showCollection');

showCollection.addEventListener('click', () => listCollection());

const insertCollection = async function (nomCollection, sourceImage) {

    let collection = db.collection("collection").doc(nomCollection);

    collection.get().then((doc) => {
        if (doc.exists) {
            console.log('collection d\'images existe');
            let tmp = doc.data().urls;
            let nvUrls = tmp + "\n" + sourceImage;
            collection.set({
                urls: nvUrls
            })

        } else {
            // 
            collection.set({
                urls: sourceImage
            })
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


}

let articleCollection = document.querySelector('article#articleListCol');

/**
 * Affiche les collections
 * @param {*} nomCollection 
 */
const displayCollection = async function (nomCollection) {

    let li = document.createElement('li');
    li.className = 'dropzone';
    li.id = nomCollection;
    li.innerHTML = nomCollection;
    ul.appendChild(li);
}


let inputAddCollection = document.querySelector('input#inputAddCollection');


inputAddCollection.addEventListener('change', () => displayCollection(inputAddCollection.value));

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
        insertCollection(event.target.id, dragged.src);
        alert(dragged.src + ' est drop  dans la collection ' + event.target.id);
    }

}, false);