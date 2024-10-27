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
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

//Configuration de l'application Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCe06QITLo_0Fz1KnYotWHpZhKg-mubt40",
  authDomain: "plateforme-etudiants.firebaseapp.com",
  projectId: "plateforme-etudiants",
  storageBucket: "plateforme-etudiants.appspot.com",
  messagingSenderId: "831210693947",
  appId: "1:831210693947:web:fbb0460069826b781e431e",
  measurementId: "G-K6JMJEXQHE",
};
//Initialiser Firebase avec la configuration fournie
const auth = getAuth();
const db = getFirestore();
const logoutButton = document.getElementById("logoutButton"); //On sélectionne le bouton de déconnexion
const loginButton = document.getElementById("loginButton");
const username = document.getElementById("username");
const seances = document.getElementById("seances");

logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Déconnexion réussie
      console.log("Déconnexion réussie");
      window.location.href = "./index.html"; // Redirige vers la page de connexion
    })
    .catch((error) => {
      // Une erreur est survenue lors de la déconnexion
      console.error("Erreur lors de la déconnexion:", error);
    });
});

async function getUserData(uid) {
  //Créer une requête pour rechercher l'utilisateur

  const q = query(collection(db, "etudiants"), where("uid", "==", uid));

  const querySnapchot = await getDocs(q);

  if (!querySnapchot.empty) {
    querySnapchot.forEach((doc) => {
      const userData = doc.data();
      logoutButton.style.display = "block"; //Si l'utilisateur est connecté on affiche le bouton de déconnexion
      loginButton.style.display = "none"; //On éfface le bouton connection si l'utilisateur est déjà connecté
      username.innerHTML = userData.name;
      seances.style.display = "block";
    });
  } else {
    console.log("Aucune donnée trouvée pour cet utilisateur");
  }
}

onAuthStateChanged(auth, (etudiant) => {
  if (etudiant) {
    const uid = etudiant.uid; //On récupère l'iud de l'étudiant
    getUserData(uid); //On appelle la fonction pour obtenir les données de l'utilisateur connecté
  } else {
    username.innerHTML = "";
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
    seances.style.display = "none";
  }
});
