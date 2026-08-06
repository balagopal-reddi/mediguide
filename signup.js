import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

document.getElementById("signupForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
        showSuggestions();
        return;
    }

    try {

        await createUserWithEmailAndPassword(auth, email, password);

        const name = document.getElementById("name").value.trim();
        localStorage.setItem(
            "mediguideUser",
            JSON.stringify({
                name: name || email,
                email
            })
        );

        showSuggestions();

        window.location.href = "login.html";

    } catch (error) {

        showSuggestions();

    }

});