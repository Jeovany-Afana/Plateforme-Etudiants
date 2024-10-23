
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js"; // Pour initialiser l'application Firebase

import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';


//Configuration de l'application Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCe06QITLo_0Fz1KnYotWHpZhKg-mubt40",
    authDomain: "plateforme-etudiants.firebaseapp.com",
    projectId: "plateforme-etudiants",
    storageBucket: "plateforme-etudiants.appspot.com",
    messagingSenderId: "831210693947",
    appId: "1:831210693947:web:fbb0460069826b781e431e",
    measurementId: "G-K6JMJEXQHE"
  };
//Initialiser Firebase avec la configuration fournie
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const progressBar = document.getElementById('progress-bar');
let email, password;
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');

const errorDisplay = (tag, message, valid) => {

    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
        
    }

    else{
        container.classList.remove("error");
        span.textContent = message;
    }
}


const emailChecker = (value) => {
    if (!value.match(/^[\w._-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      errorDisplay("email", "Le mail n'est pas valide");
      email = null;
    } else {
      errorDisplay("email", "", true);
      email = value;
    }
  };
  
  const passwordChecker = (value) => {
    progressBar.classList = "";
    if (
      !value.match(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
    ) {
      errorDisplay(
        "password",
        "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
      );
      progressBar.classList.add("progressRed");
      password = null;
    } else if (value.length < 12) {
      progressBar.classList.add("progressBlue");
      errorDisplay("password", "", true);
      password = value;
    } else {
      progressBar.classList.add("progressGreen");
      errorDisplay("password", "", true);
      password = value;
    }
  };
  
  
  
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "email":
          emailChecker(e.target.value);
          break;
        case "password":
          passwordChecker(e.target.value);
          break;
      
        default:
          null;
      }
    });
  });


  
form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    if (email && password) {
      const data = {
        email,
        password,
      };
      console.log(data);
  
      const emailOk = document.getElementById("email").value;
      const passwordOk = document.getElementById("password").value;
  
  
      try {
        // Authentifier l'utilisateur avec Firebase Auth
        const loadingSpinner = document.getElementById('loadingSpinner');//On récupère le loading spinner
        loadingSpinner.style.display = 'block';
  
        const userCredential = await signInWithEmailAndPassword(auth, emailOk, passwordOk);
        const user = userCredential.user;
    
        // Une fois connecté, vous pouvez rediriger l'utilisateur ou afficher un message
        alert('Connexion réussie !');
        console.log("Utilisateur connecté :", user);
    
        // Redirection vers la page d'accueil ou autre après connexion
        window.location.href = "../index.html";
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("Échec de la connexion. Veuillez vérifier vos informations.");
      } finally {
        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.style.display = 'none';
      }
  
  
  
      inputs.forEach((input) => (input.value = ""));
      progressBar.classList = "";
  
      email = null;
      password = null;
    } 
    else {
      alert("Veuillez remplir correctement les champs");
    }
  });
  
  
  
  
  
  
  

