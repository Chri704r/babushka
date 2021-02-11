let menuIsOpen = false;
const header = document.querySelector("h3");
const header2 = document.querySelector("#menu2_tekst");
const medieurl = "https://babushka-dd8a.restdb.io/media/";
const myHeaders = {

    "x-apikey": "600ec2fb1346a1524ff12de4"
}


//--------------LOAD DOM-----------------
document.addEventListener("DOMContentLoaded", start)
let retter;
let links;
let filter = "alle";

function start() {
    console.log("DOM er loaded");
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
    hentData();

    document.querySelector("#menuknap").addEventListener("click", toggleMenu)
}

// ---------------BURGER MENU----------------

function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("#menuknap").classList.toggle("change");
    document.querySelector("#navbar").classList.toggle("hidden");

    const links = document.querySelectorAll(".link");
    links.forEach(link => link.addEventListener("click", clickLink));

    function clickLink() {

        if (menuIsOpen == true) {
            document.querySelector(".link").removeEventListener("click", clickLink);
            document.querySelector("#navbar").classList.add("hidden");

            document.querySelector("#navbar").classList.remove("openmenu");
            document.querySelector("#navbar").classList.add("closemenu");

            document.querySelector("#menuknap").classList.toggle("change");
            menuIsOpen = false;
        }
    }

    // Undersøg om menuen er åben eller lukket
    if (menuIsOpen == true) {

        // Menuen er åben, så vi lukker den med css
        document.querySelector("#navbar").classList.remove("openmenu");
        document.querySelector("#navbar").classList.add("closemenu");

        // menuen er nu lukket, så ændrer menuvariablen til at vise dette
        menuIsOpen = false;
    } else {

        // menuen er lukket, så vi åbner den
        document.querySelector("#navbar").classList.remove("closemenu");
        document.querySelector("#navbar").classList.add("openmenu");

        // Menuen er nu åben, så vi ændrer menuvariablen til at visse dette
        menuIsOpen = true;
    }
}


//---------------FILTER RETTER--------------
function filtrerRetter() {
    filter = this.dataset.kategori;

    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");

    visRetter();
    header.textContent = this.textContent;
    header2.textContent = this.textContent;
}


async function hentData() {
    const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
        headers: myHeaders
    });

    retter = await JSONData.json();
    console.log("retter", retter);
    visRetter();

}

//---------INDSÆTTER RETTER I KLON-------
function visRetter() {
    const main = document.querySelector("main");
    const template = document.querySelector("template").content;
    //console.log(retter);
    main.textContent = "";

    retter.forEach(ret => {

        if (filter == ret.kategori || filter == "alle") {

            const klon = template.cloneNode(true);
            klon.querySelector(".billede").src = medieurl + ret.billede[0];

            klon.querySelector(".navn").innerHTML = ret.navn;
            klon.querySelector(".kort_beskrivelse").textContent += ret.kortbeskrivelse;
            klon.querySelector(".pris").innerHTML += ret.pris + ",-";
            klon.querySelector("#retter").addEventListener("click", () => visDetaljer(ret));

            main.appendChild(klon);

        }
    })
}

//--------FUNKTION TIL DETALJESIDEN------

function visDetaljer(hvilken) {
    location.href = `02_detail.html?id=${hvilken._id}`;
}
