/* =====================================================
   Friend Treat Log
   Part 1 - Core
===================================================== */

let logs = [];

async function loadLogs(){

    try{

        const response = await fetch("/data/friends.json");

        logs = await response.json();

        renderCards();

        updateStats();

        updateCharts();

    }

    catch(err){

        console.error(err);

    }

}

loadLogs();

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

    renderCards();

    showToast("Memory Deleted");

}
/* =====================================================
   Part 3 - Search, Sort & Timeline
===================================================== */

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");

const timelineBtn = document.getElementById("timelineBtn");
const cardBtn = document.getElementById("cardBtn");

const timelineView = document.getElementById("timelineView");
const timelineContainer = document.getElementById("timelineContainer");

let currentView = "cards";

/* =======================================
        Search
======================================= */

searchBox.addEventListener("input", () => {

    const keyword = searchBox.value.toLowerCase();

    const filtered = logs.filter(item =>

        item.friend.toLowerCase().includes(keyword) ||

        item.place.toLowerCase().includes(keyword) ||

        (item.food || "").toLowerCase().includes(keyword) ||

        (item.occasion || "").toLowerCase().includes(keyword)

    );

    renderCards(filtered);

});

/* =======================================
        Sort
======================================= */

sortSelect.addEventListener("change", () => {

    const mode = sortSelect.value;

    let arr = [...logs];

    switch(mode){

        case "newest":

            arr.sort((a,b)=>
                new Date(b.date)-new Date(a.date)
            );

            break;

        case "oldest":

            arr.sort((a,b)=>
                new Date(a.date)-new Date(b.date)
            );

            break;

        case "friend":

            arr.sort((a,b)=>
                a.friend.localeCompare(b.friend)
            );

            break;

        case "amount":

            arr.sort((a,b)=>
                b.amount-a.amount
            );

            break;

    }

    renderCards(arr);

});

/* =======================================
        Timeline
======================================= */

function renderTimeline(){

    timelineContainer.innerHTML="";

    const arr=[...logs].sort(

        (a,b)=>new Date(b.date)-new Date(a.date)

    );

    if(arr.length===0){

        timelineContainer.innerHTML=`

        <div class="empty-state">

        <div class="empty-icon">🍜</div>

        <h2>No Memories Yet</h2>

        </div>

        `;

        return;

    }

    arr.forEach(item=>{

        const clone=document

        .getElementById("timelineTemplate")

        .content.cloneNode(true);

        clone.querySelector(".timelineFriend")

            .textContent=item.friend;

        clone.querySelector(".timelineDate")

            .textContent=formatDate(item.date);

        clone.querySelector(".timelineRestaurant")

            .textContent="📍 "+item.place;

        clone.querySelector(".timelineFood")

            .textContent="🍽 "+(item.food||"-");

        clone.querySelector(".timelineOccasion")

            .textContent="🎉 "+(item.occasion||"-");

        timelineContainer.appendChild(clone);

    });

}

/* =======================================
        Toggle View
======================================= */

timelineBtn.addEventListener("click",()=>{

    currentView="timeline";

    document.querySelector(".entries")

        .classList.add("hidden");

    timelineView.classList.remove("hidden");

    renderTimeline();

});

cardBtn.addEventListener("click",()=>{

    currentView="cards";

    timelineView.classList.add("hidden");

    document.querySelector(".entries")

        .classList.remove("hidden");

    renderCards();

});

/* =======================================
        Refresh Timeline Automatically
======================================= */

const oldRender = renderCards;

renderCards = function(data = logs){

    oldRender(data);

    if(currentView==="timeline"){

        renderTimeline();

    }

};
/* =====================================================
   Part 4 - Charts, Import/Export & Enhancements
===================================================== */

let monthlyChart = null;
let friendChart = null;

/* =======================================
        Charts
======================================= */

function updateCharts(){

    /* ---------- Monthly Spending ---------- */

    const monthMap = {};

    logs.forEach(item=>{

        const key = new Date(item.date)
            .toLocaleString("default",{
                month:"short",
                year:"2-digit"
            });

        monthMap[key]=(monthMap[key]||0)+Number(item.amount);

    });

    const monthLabels=Object.keys(monthMap);

    const monthValues=Object.values(monthMap);

    if(monthlyChart){

        monthlyChart.destroy();

    }

    monthlyChart=new Chart(

        document.getElementById("monthlyChart"),

        {

            type:"bar",

            data:{

                labels:monthLabels,

                datasets:[{

                    label:"Money Spent",

                    data:monthValues,

                    borderWidth:1

                }]

            },

            options:{

                responsive:true,

                plugins:{
                    legend:{
                        display:false
                    }
                }

            }

        }

    );



    /* ---------- Friend Leaderboard ---------- */

    const friendMap={};

    logs.forEach(item=>{

        friendMap[item.friend]=(friendMap[item.friend]||0)+1;

    });

    const friendNames=Object.keys(friendMap);

    const friendCounts=Object.values(friendMap);

    if(friendChart){

        friendChart.destroy();

    }

    friendChart=new Chart(

        document.getElementById("friendChart"),

        {

            type:"doughnut",

            data:{

                labels:friendNames,

                datasets:[{

                    data:friendCounts

                }]

            },

            options:{

                responsive:true

            }

        }

    );

}

/* =======================================
        Refresh UI
======================================= */

const originalRender=renderCards;

renderCards=function(data=logs){

    originalRender(data);

    updateCharts();

};

/* =======================================
        Export JSON
======================================= */

document

.getElementById("exportJSON")

.addEventListener("click",()=>{

    const blob=new Blob(

        [JSON.stringify(logs,null,2)],

        {

            type:"application/json"

        }

    );

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="friend-log.json";

    a.click();

    showToast("JSON Exported");

});

/* =======================================
        Export CSV
======================================= */

document

.getElementById("exportCSV")

.addEventListener("click",()=>{

    let csv="Friend,Date,Place,Food,Amount,Occasion,Notes\n";

    logs.forEach(item=>{

        csv+=

`${item.friend},
${item.date},
${item.place},
${item.food},
${item.amount},
${item.occasion},
"${item.notes}"\n`;

    });

    const blob=new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="friend-log.csv";

    a.click();

    showToast("CSV Exported");

});

/* =======================================
        Import JSON
======================================= */

const importModal=document.getElementById("importModal");

document

.getElementById("importJSON")

.addEventListener("click",()=>{

    const file=document

        .getElementById("importFile")

        .files[0];

    if(!file){

        alert("Choose a JSON file.");

        return;

    }

    const reader=new FileReader();

    reader.onload=e=>{

        try{



            renderCards();

            updateStats();

            updateCharts();

            importModal.classList.add("hidden");

            showToast("Imported Successfully");

        }

        catch(err){

            alert("Invalid JSON file.");

        }

    };

    reader.readAsText(file);

});

/* =======================================
        Import Modal
======================================= */

document

.getElementById("closeImport")

.onclick=()=>{

    importModal.classList.add("hidden");

};

document

.getElementById("cancelImport")

.onclick=()=>{

    importModal.classList.add("hidden");

};

/* =======================================
        Keyboard Shortcut
======================================= */

window.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeModal();

        importModal.classList.add("hidden");

    }

});

/* =======================================
        First Load
======================================= */

renderCards();

updateStats();

updateCharts();

showToast("Welcome 🍕");
