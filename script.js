import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

    FIREBASE_CONFIGURATION
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyC4K95mJNBzHQmh09E_AQe6tmWfyCqXZuU",
    authDomain: "formulario-javascript-2024.firebaseapp.com",
    projectId: "formulario-javascript-2024",
    storageBucket: "formulario-javascript-2024.appspot.com",
    messagingSenderId: "588271455015",
    appId: "1:588271455015:web:4917a9b268f7e80aa0f702",
    measurementId: "G-KX5JCGK1ET"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Get a list of cities from your database
async function getCities(db) {
const citiesCol = collection(db, 'cities');
const citySnapshot = await getDocs(citiesCol);
const cityList = citySnapshot.docs.map(doc => doc.data());
return cityList;
}

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    //validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
errorNombre.textContent = 'Por favor, introducí tu nombre'
errorNombre.classList.add('error-message')
    }else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }
    //validar correo electronico
    let emailEntrada = document.getElementById ('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;; 
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent= 'Por favor, introduci un mail valido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }
    // validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña tiene que tener al menos 8 caracteres, numeros, mayusculas y minusculas y caracteres especiales.'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }
    // si todos los campos son validos, confirmar formulario
    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){

        // Backend que reciba la informacion

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
        alert('El formulario se ha enviado con exito')
        document.getElementById('formulario').requestFullscreen();
    }
    })




















