import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");

        emailError.style.display = "none";
        passwordError.style.display = "none";

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            const userCredential =
                await signInWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            localStorage.setItem("loggedIn", "true");

            localStorage.setItem(
                "mediguideUser",
                JSON.stringify({
                    name: user.email,
                    email: user.email
                })
            );

            window.location.href = "index.html";

        } catch (error) {

            switch(error.code){

                case "auth/invalid-email":
                    emailError.style.display = "block";
                    emailError.textContent = "Please enter a valid email.";
                    break;

                case "auth/user-not-found":
                    emailError.style.display = "block";
                    emailError.textContent = "No account found.";
                    break;

                case "auth/wrong-password":
                    passwordError.style.display = "block";
                    passwordError.textContent = "Incorrect password.";
                    break;

                case "auth/invalid-credential":
                    passwordError.style.display = "block";
                    passwordError.textContent = "Invalid email or password.";
                    break;

                default:
                    passwordError.style.display = "block";
                    passwordError.textContent = "Login failed.";
            }
        }

    });

}