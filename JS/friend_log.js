/* =====================================================
   Friend Treat Log
   Part 1 - Core
===================================================== */

let logs = JSON.parse(localStorage.getItem("friendLogs")) || [];

const entryContainer = document.getElementById("entryContainer");
const template = document.getElementById("entryTemplate");

const totalFriends = document.getElementById("totalFriends");
const totalTreats = document.getElementById("totalTreats");
const totalSpent = document.getElementById("totalSpent");
const lastTreat = document.getElementById("lastTreat");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

/* =======================================
    Helpers
======================================= */

function saveLogs() {
    localStorage.setItem("friendLogs", JSON.stringify(logs));
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function showToast(message) {
    toastText.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* =======================================
    Statistics
======================================= */

function updateStats() {

    totalTreats.textContent = logs.length;

    const friends = [...new Set(logs.map(x => x.friend))];

    totalFriends.textContent = friends.length;

    const spent = logs.reduce((a, b) => a + Number(b.amount || 0), 0);

    totalSpent.textContent =
        "₹" + spent.toLocaleString();

    if (logs.length) {

        const latest = [...logs].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        )[0];

        lastTreat.textContent = formatDate(latest.date);

    } else {

        lastTreat.textContent = "--";

    }

}

/* =======================================
    Render Cards
======================================= */

function renderCards(data = logs) {

    entryContainer.innerHTML = "";

    if (!data.length) {

        const empty =
            document
            .getElementById("emptyStateTemplate")
            .content
            .cloneNode(true);

        entryContainer.appendChild(empty);

        document
            .getElementById("emptyAdd")
            ?.addEventListener("click", openModal);

        updateStats();

        return;
    }

    data.forEach((item, index) => {

        const clone =
            template.content.cloneNode(true);

        const card =
            clone.querySelector(".memory-card");

        clone.querySelector(".friend-name")
            .textContent = item.friend;

        clone.querySelector(".amount")
            .textContent = "₹" + item.amount;

        clone.querySelector(".date")
            .textContent =
            "📅 " + formatDate(item.date);

        clone.querySelector(".place")
            .textContent =
            "📍 " + item.place;

        clone.querySelector(".food")
            .textContent =
            "🍽 " + (item.food || "-");

        clone.querySelector(".occasion")
            .textContent =
            "🎉 " + (item.occasion || "-");

        clone.querySelector(".notes")
            .textContent =
            item.notes || "No notes.";

        const img =
            clone.querySelector(".photo");

        img.src =
            item.photo ||
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800";

        img.onerror = () => {

            img.src =
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800";

        };

        clone.querySelector(".edit-btn")
            .addEventListener("click", () => {

                editEntry(index);

            });

        clone.querySelector(".delete-btn")
            .addEventListener("click", () => {

                deleteEntry(index);

            });

        entryContainer.appendChild(card);

    });

    updateStats();

}

/* =======================================
    Initial Load
======================================= */

renderCards();
/* =====================================================
   Part 2 - CRUD Operations
===================================================== */

const modal = document.getElementById("entryModal");
const form = document.getElementById("entryForm");

const openBtn = document.getElementById("openModal");
const fab = document.getElementById("fabButton");

const closeBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");

let editIndex = -1;

/* =======================================
        Modal
======================================= */

function openModal(){

    modal.classList.remove("hidden");

    document.getElementById("friend").focus();

}

function closeModal(){

    modal.classList.add("hidden");

    form.reset();

    editIndex = -1;

}

openBtn.addEventListener("click",openModal);

fab.addEventListener("click",openModal);

closeBtn.addEventListener("click",closeModal);

cancelBtn.addEventListener("click",closeModal);

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        closeModal();

    }

});

/* =======================================
        Add / Update Entry
======================================= */

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const item={

        friend:document.getElementById("friend").value.trim(),

        date:document.getElementById("date").value,

        place:document.getElementById("place").value.trim(),

        food:document.getElementById("food").value.trim(),

        amount:Number(document.getElementById("amount").value),

        occasion:document.getElementById("occasion").value.trim(),

        notes:document.getElementById("notes").value.trim(),

        photo:document.getElementById("photo").value.trim()

    };

    if(editIndex>=0){

        logs[editIndex]=item;

        showToast("Memory Updated ✨");

    }else{

        logs.push(item);

        showToast("Memory Saved 🍕");

    }

    saveLogs();

    renderCards();

    closeModal();

});

/* =======================================
        Edit
======================================= */

function editEntry(index){

    editIndex=index;

    const x=logs[index];

    document.getElementById("friend").value=x.friend;

    document.getElementById("date").value=x.date;

    document.getElementById("place").value=x.place;

    document.getElementById("food").value=x.food;

    document.getElementById("amount").value=x.amount;

    document.getElementById("occasion").value=x.occasion;

    document.getElementById("notes").value=x.notes;

    document.getElementById("photo").value=x.photo;

    modal.classList.remove("hidden");

}

/* =======================================
        Delete
======================================= */

function deleteEntry(index){

    const ok=confirm(

        `Delete memory with ${logs[index].friend}?`

    );

    if(!ok) return;

    logs.splice(index,1);

    saveLogs();

    renderCards();

    showToast("Memory Deleted");

}
