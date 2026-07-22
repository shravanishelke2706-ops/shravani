import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_TXWBN1znk2BBBE9eWl1fqb110KgDM_U",
  authDomain: "student-database-dade6.firebaseapp.com",
  databaseURL: "https://student-database-dade6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "student-database-dade6",
  storageBucket: "student-database-dade6.firebasestorage.app",
  messagingSenderId: "442541447607",
  appId: "1:442541447607:web:5cddbb2adbbcf45e5ff032",
  measurementId: "G-24NS82VK2K"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("Firebase Connected");

// Save Data
window.saveData = async function () {

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();

    if (name === "" || age === "") {
        alert("Please enter Name and Age");
        return;
    }

    try {

        const studentRef = push(ref(db, "Students"));

        await set(studentRef, {
            name: name,
            age: age
        });

        alert("Data Saved Successfully");

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

};

// Show Data
window.loadData = function () {

    const studentRef = ref(db, "Students");

    onValue(studentRef, (snapshot) => {

        let output = "";

        if (!snapshot.exists()) {

            output = "<h3>No Data Found</h3>";

        } else {

            snapshot.forEach((childSnapshot) => {

                const data = childSnapshot.val();

                output += `
                    <p>
                        <b>Name:</b> ${data.name}<br>
                        <b>Age:</b> ${data.age}
                    </p>
                    <hr>
                `;

            });

        }

        document.getElementById("output").innerHTML = output;

    });

};
