import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function searchSymptom(symptomName) {

    const docRef = doc(db, "symptoms", symptomName.toLowerCase());

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        console.log(docSnap.data());

    } else {

        console.log("No symptom found");

    }

}

searchSymptom("fever");