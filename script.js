// =========================================
// MediGuide
// Firebase Setup & Initialization
// =========================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// =========================================
// Global Variables
// =========================================

let hospitals = [];
let symptoms = {};


// =========================================
// Load Hospitals
// =========================================

async function loadHospitals() {

    try {

        const snapshot = await getDocs(collection(db, "hospital"));

        hospitals = [];

        snapshot.forEach((doc) => {

            hospitals.push({

                id: doc.id,

                ...doc.data()

            });

        });

        console.log("✅ Hospitals Loaded");

        console.table(hospitals);
        console.log(hospitals[0]);

    }

    catch (error) {

        console.error("Hospital Load Error :", error);

    }

}


// =========================================
// Load Symptoms
// =========================================

async function loadSymptoms() {

    try {

        const snapshot = await getDocs(collection(db, "symptoms"));

        symptoms = {};

        snapshot.forEach((doc) => {

            symptoms[doc.id.toLowerCase()] = {

                id: doc.id,

                ...doc.data()

            };

        });

        console.log("✅ Symptoms Loaded");

        console.table(symptoms);

    }

    catch (error) {

        console.error("Symptoms Load Error :", error);

    }

}


// =========================================
// Initialize App
// =========================================

async function initializeApp() {

await loadHospitals();

await loadSymptoms();

loadCities();

displayHospitals(hospitals);

    loadFavorites();

    loadHistory();

    setupSearchListeners();

    console.log("✅ Firebase Initialization Completed");

}

initializeApp();


// =========================================
// Loader
// =========================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loaderOverlay");

    if (loader) {

        loader.style.display = "none";

    }

});
// =========================================
// Search Elements
// =========================================

const searchInputElement =
    document.getElementById("searchInput") ||
    document.getElementById("searchInputSection");

const searchButtonElement =
    document.getElementById("searchButton") ||
    document.getElementById("searchButtonSection");

const specialistPanel =
document.getElementById("specialistPanel");

const resultTitle =
document.getElementById("resultTitle");

const resultSubtitle =
document.getElementById("resultSubtitle");

const cityFilter =
document.getElementById("cityFilter");

const ratingFilter =
document.getElementById("ratingFilter");

const emergencyFilter =
document.getElementById("emergencyFilter");

function setupSearchListeners() {
    if (searchButtonElement) {
        searchButtonElement.addEventListener("click", searchSymptom);
    }

    if (searchInputElement) {
        searchInputElement.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                searchSymptom();
            }
        });
    }
}


// =========================================
// Search Events
// =========================================

// Search listeners are initialized after Firebase data loads.


// =========================================
// Search Function
// =========================================

function searchSymptom(){

    const keyword = (searchInputElement?.value || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g," ");

    if(keyword===""){

        alert("Please enter a symptom.");

        return;

    }

    const symptom = symptoms[keyword];

    if(!symptom){

        alert("Symptom not found.");

        return;

    }

    showSymptom(symptom);

}


// =========================================
// Display Symptom
// =========================================

function showSymptom(symptom){

    specialistPanel.classList.add("active");

    specialistPanel.innerHTML=`

        <h2>${symptom.name}</h2>

        <p>

            ${symptom.description}

        </p>

        <h3>🛡 Precautions</h3>

        <ul>

    ${String(symptom.precautions || "")
        .split(",")
        .map(item => `<li>${item.trim()}</li>`)
    .join("")}

        </ul>
<h3>🦠 Possible Diseases</h3>

<ul>

${String(symptom["possible diseases"] || "")
    .split(",")
    .map(item => `<li>${item.trim()}</li>`)
    .join("")}

</ul>

        <h3>👨‍⚕ Recommended Specialty</h3>

        <p>

            ${symptom.specialty}

        </p>

    `;

    const matchedHospitals = hospitals.filter(hospital=>{

        const hospitalSpecialty =
            (hospital.specialty || "")
            .toLowerCase();

        const symptomSpecialty =
            (symptom.specialty || "")
            .toLowerCase();

        return hospitalSpecialty.includes(symptomSpecialty);

    });

    resultTitle.innerHTML =

        `Hospitals for "${symptom.name}"`;

    resultSubtitle.innerHTML =

        `${matchedHospitals.length} Hospital(s) Found`;

    displayHospitals(matchedHospitals);

    addSearchHistory(symptom.name);

}
// =========================================
// Display Hospital Cards
// =========================================

function loadCities() {

    if (!cityFilter) return;

    cityFilter.innerHTML = `
        <option value="all">All Cities</option>
    `;

    const cities = [...new Set(
        hospitals
            .map(h => h.city)
            .filter(Boolean)
    )].sort();

    cities.forEach(city => {

        cityFilter.innerHTML += `
            <option value="${city}">
                ${city}
            </option>
        `;

    });

}

function displayHospitals(list) {

    const hospitalCards =
        document.getElementById("hospitalCards");

    if (!hospitalCards) return;

    hospitalCards.innerHTML = "";

    if (list.length === 0) {

        hospitalCards.innerHTML = `

        <div class="no-result">

            <h2>No Hospitals Found</h2>

            <p>No hospitals match this symptom.</p>

        </div>

        `;

        return;

    }

    list.forEach(hospital => {

        hospitalCards.innerHTML += `

        <div class="hospital-card">

            <h2>${hospital.name}</h2>

            <p><strong>⭐ Rating :</strong> ${hospital.rating || "N/A"}</p>

            <p><strong>🏥 Specialty :</strong> ${hospital.specialty || "-"}</p>

            <p><strong>📍 Address :</strong> ${hospital.address || "-"}</p>

            <p><strong>🌆 City :</strong> ${hospital.city || "-"}</p>

            <p><strong>📞 Phone :</strong> ${hospital.phone || "-"}</p>

            <p><strong>🚑 Emergency :</strong> ${hospital.emergency || "No"}</p>

            <div style="margin-top:20px;display:flex;gap:10px;">

                <button
                    class="primary-btn"
                    onclick="showDetails('${hospital.id}')">

                    View Details

                </button>

                <button
                    class="secondary-btn"
                    onclick="saveFavorite('${hospital.id}')">

                    ❤ Save

                </button>

            </div>

        </div>

        `;

    });

}


// =========================================
// Hospital Details
// =========================================

window.showDetails = function(id){

    const hospital = hospitals.find(h => h.id === id);

    console.log(hospital);
    console.log(hospital.maplink);

    if(!hospital) return;

    const modal =
        document.getElementById("detailsModal");

    const body =
        document.getElementById("modalBody");

    if(!modal || !body) return;

    body.innerHTML = `

<h2>${hospital.name}</h2>

<hr><br>

<p><b>Hospital :</b> ${hospital.name}</p>

<p><b>Specialty :</b> ${hospital.specialty}</p>

<p><b>Rating :</b> ${hospital.rating}</p>

<p><b>Address :</b> ${hospital.address}</p>

<p><b>City :</b> ${hospital.city}</p>

<p><b>State :</b> ${hospital.state}</p>

<p><b>Phone :</b> ${hospital.phone}</p>

<p><b>Emergency :</b> ${hospital.emergency}</p>

<p style="margin-top:20px;">
    <a
        href="${hospital.maplink}"
        target="_blank"
        rel="noopener noreferrer"
        class="primary-btn">

        🗺 Open in Google Maps

    </a>
</p>

`;

modal.classList.remove("hidden");

};


// =========================================
// Close Modal
// =========================================

const modalClose =
document.getElementById("modalClose");

if(modalClose){

    modalClose.addEventListener("click",()=>{

        document
        .getElementById("detailsModal")
        ?.classList.add("hidden");

    });

}

const detailsModal =
document.getElementById("detailsModal");

if(detailsModal){

    detailsModal.addEventListener("click",(e)=>{

        if(e.target.id==="detailsModal"){

            e.target.classList.add("hidden");

        }

    });

}


// =========================================
// Favorites
// =========================================

window.saveFavorite = function(id){

    let favorites = JSON.parse(

        localStorage.getItem("favorites")

    ) || [];

    if(!favorites.includes(id)){

        favorites.push(id);

    }

    localStorage.setItem(

        "favorites",

        JSON.stringify(favorites)

    );

    loadFavorites();

};


function loadFavorites(){

    const favoriteList =
        document.getElementById("favoriteList");

    if(!favoriteList) return;

    favoriteList.innerHTML = "";

    const favorites = JSON.parse(

        localStorage.getItem("favorites")

    ) || [];

    if(favorites.length===0){

        favoriteList.innerHTML =

        "<p>No Favorites</p>";

        return;

    }

    favorites.forEach(id=>{

        const hospital = hospitals.find(

            h=>h.id===id

        );

        if(hospital){

            favoriteList.innerHTML += `

            <div class="history-item">

                ❤ ${hospital.name}

            </div>

            `;

        }

    });

}


// =========================================
// Search History
// =========================================

function addSearchHistory(keyword){

    let history = JSON.parse(

        localStorage.getItem("history")

    ) || [];

    history.unshift(keyword);

    history = [...new Set(history)];

    history = history.slice(0,6);

    localStorage.setItem(

        "history",

        JSON.stringify(history)

    );

    loadHistory();

}


function loadHistory(){

    const historyDiv =
        document.getElementById("searchHistory");

    if(!historyDiv) return;

    historyDiv.innerHTML = "";

    const history = JSON.parse(

        localStorage.getItem("history")

    ) || [];

    history.forEach(item=>{

        historyDiv.innerHTML += `

        <div class="history-item">

            🔍 ${item}

        </div>

        `;

    });

}

if (cityFilter) {

    cityFilter.addEventListener("change", () => {

        let filtered = hospitals;

        if (cityFilter.value !== "all") {

            filtered = hospitals.filter(hospital =>
                hospital.city === cityFilter.value
            );

        }

        displayHospitals(filtered);

    });

}