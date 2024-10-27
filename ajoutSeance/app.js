// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Remaining Firebase code

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCe06QITLo_0Fz1KnYotWHpZhKg-mubt40",
  authDomain: "plateforme-etudiants.firebaseapp.com",
  projectId: "plateforme-etudiants",
  storageBucket: "plateforme-etudiants.appspot.com",
  messagingSenderId: "831210693947",
  appId: "1:831210693947:web:fbb0460069826b781e431e",
  measurementId: "G-K6JMJEXQHE",
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Fonction pour gérer le formulaire
document.getElementById("sessionForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Récupération des valeurs du formulaire
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const htmlFile = document.getElementById("htmlFile").files[0];
  const cssFile = document.getElementById("cssFile").files[0];
  const jsFile = document.getElementById("jsFile").files[0];

  try {
    // Téléversement des fichiers et obtention de leurs URLs
    const htmlURL = await uploadFile(htmlFile, "html_files");
    const cssURL = await uploadFile(cssFile, "css_files");
    const jsURL = await uploadFile(jsFile, "js_files");

    // Ajout de la séance à Firestore
    await addDoc(collection(db, "seances"), {
      title,
      date,
      description,
      htmlURL,
      cssURL,
      jsURL,
    });

    alert("Séance enregistrée avec succès !");
    document.getElementById("sessionForm").reset();
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la séance : ", error);
    alert("Erreur lors de l'enregistrement de la séance.");
  }
});

// Fonction de téléversement de fichier
async function uploadFile(file, folder) {
  const fileRef = ref(storage, `${folder}/${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}
