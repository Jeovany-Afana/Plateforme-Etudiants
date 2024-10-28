import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js"; // Pour initialiser l'application Firebase

import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
  addDoc,
  getDocs,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  // Example list of sessions (replace with dynamic Firebase data fetching if needed)

  const querySnapshot = await getDocs(collection(db, "seances"));

  const container = document.getElementById("session-container");

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const session = doc.data();
      // Create session box
      const sessionBox = document.createElement("div");
      sessionBox.className = "session-box";

      // Create and append title
      const title = document.createElement("div");
      title.className = "session-header";
      title.innerHTML = `${session.title} <br> <span style="font-size:1rem;">${session.date}</span>`;
      sessionBox.appendChild(title);

      // Create and append description
      const description = document.createElement("div");
      description.className = "session-description";
      description.textContent = session.description;
      sessionBox.appendChild(description);

      // Create and append download buttons
      const downloadButtons = document.createElement("div");
      downloadButtons.className = "download-buttons";

      const buttonHTML = document.createElement("a");
      buttonHTML.className = "download-button";
      buttonHTML.href = session.htmlURL;
      buttonHTML.target = "_blank";
      buttonHTML.download = "index.html";
      buttonHTML.textContent = `Télécharger ${"HTML"}`;
      downloadButtons.appendChild(buttonHTML);

      const buttonCSS = document.createElement("a");
      buttonCSS.className = "download-button";
      buttonCSS.href = session.cssURL;
      buttonCSS.target = "_blank";
      buttonCSS.download = "style.css";
      buttonCSS.textContent = `Télécharger ${"CSS"}`;
      downloadButtons.appendChild(buttonCSS);

      const buttonJS = document.createElement("a");
      buttonJS.className = "download-button";
      buttonJS.href = session.jsURL;
      buttonJS.target = "_blank";
      buttonJS.download = "index.js";
      buttonJS.textContent = `Télécharger ${"JS"}`;
      downloadButtons.appendChild(buttonJS);

      const buttonWORD = document.createElement("a");
      buttonWORD.className = "download-button";
      buttonWORD.href = session.wordURL;
      buttonWORD.target = "_blank";
      buttonWORD.download = "introductionJS.docx"; //Le nom du fichier que l'utilisateur va télécharger
      buttonWORD.textContent = `Télécharger ${"Word"}`; // Correction ici
      downloadButtons.appendChild(buttonWORD);

      sessionBox.appendChild(downloadButtons);
      container.appendChild(sessionBox);
    });
  } else {
    document.getElementById("seances").innerHTML =
      "Aucune séance à afficher pour le moment";
    document.getElementById("seances").style.display = "block";
  }
});
