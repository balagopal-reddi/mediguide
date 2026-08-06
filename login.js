import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem(
            "mediguideUser",
            JSON.stringify({
                name: user.email,
                email: user.email
            })
        );

        alert("Login Successful");

        window.location.href = "index.html";

    } catch (error) {

        alert(error.message);

    }

});