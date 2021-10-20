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

let article = document.querySelector('article');

const displayImage = async function (photos) {

    photos.forEach(element => {
        let image = document.createElement('img');
        image.src = element.links.download;
        article.appendChild(image);
    });


}

const searchPhotos = async function (query) {
    try {
        const request = await fetch('https://api.unsplash.com/search/photos?query=' + query + '&client_id=lPy-G3iwhGr-Xis4LoXhe7DWg_ftV4NXXH0fGQ7Ce78');
        const data = await request.json();
        article.innerHTML = '';
        displayImage(data.results);

    }
    catch (error) {
        console.error(error);
    }
}

btnSearch.addEventListener('click', () => searchPhotos(search.value));

// Collection
/*------------------------------------------------------ */

let addCollection = document.querySelector('button#addCollection');

const insertCollection = async function (inputCollectionName) {
    db.collection(inputCollectionName).add({
        titre: inputCollectionName,
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

/*
const displayCollection = async function () {
    db.collection("collection").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
}


let showCollection = document.querySelector('button#showCollection');

showCollection.addEventListener('click', () => displayCollection());
*/