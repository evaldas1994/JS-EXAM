if(localStorage.getItem("userid")) {
    const baseUrl = "https://backend-test-js-eovio.ondigitalocean.app/";
    const userid = localStorage.getItem("userid");
    
    //set default data path
    localStorage.setItem("fetch-path", "getsome/");
    
    //get default data
    getData(localStorage.getItem("fetch-path"));

    //logOut button
    document.getElementById("logOut").addEventListener("click", (e)=> {
        logOut();
    })

    //search
    let searchFor = "";
    document.getElementById("search").addEventListener("keyup", (e) => {
        filterData();
    })

    //change path by button
    document.getElementById("changeView").addEventListener("click", (e) => {
        if(localStorage.getItem("fetch-path") === "getsome/") {
            //document.getElementById("search").value = "";
            getData("getall/");
            document.getElementById("changeView").textContent = "Some Cources";
            localStorage.setItem("fetch-path", "getall/");
            
        } else {
            //document.getElementById("search").value = "";
            getData("getsome/");
            document.getElementById("changeView").textContent = "All Cources";
            localStorage.setItem("fetch-path", "getsome/");
        }
    })

    //=========  F U N C T I O N S  ==========
    function logOut() {
        localStorage.removeItem("userid");
        localStorage.removeItem("fetch-path");
        location.replace("login.html");
    }

    function filterData() {
        searchFor = document.getElementById("search").value;
        if(searchFor) {
            document.getElementById("changeView").style.visibility = "hidden";
            localStorage.setItem("fetch-path", "getall/");
            getData("getall/", searchFor);
        } else {
            document.getElementById("changeView").style.visibility = "visible";
            localStorage.setItem("fetch-path", "getsome/");
            getData("getsome/", searchFor);
        }
    }

    function getData(path, searchFor) {
        fetch(baseUrl + path + userid)
            .then((res) => res.json())
            .then((data) => {
                displayAllObjects(data, searchFor);        
        }) 
    }

    function displayAllObjects(data, searchFor = "") {
        document.getElementById("items").innerHTML = "";

        data.filter(obj => obj.title.toLowerCase().includes(searchFor.toLowerCase())).forEach(element => {
            displayOneObject(element.oldprice, element.newprice, element.parameters.cc, element.parameters.beginner, element.parameters.vidlength, element.parameters.game, element.title, element.url);    
        });
    }

    function displayOneObject(oldprice, newprice, cc, beginner, vidlength, game, title, url) {
        //price
        const li1 = document.createElement("li");
        li1.innerHTML = "&euro;";
        li1.textContent += oldprice;

        const li2 = document.createElement("li");
        li2.innerHTML = "&euro;";
        li2.textContent += newprice;

        const ul1 = document.createElement("ul");
        ul1.classList.add("price");

        //options
        const li3 = document.createElement("li");
        li3.textContent = "CC";
        !cc ? li3.classList.add("hidden") : li3.classList.remove("hidden");
        

        const li4 = document.createElement("li");
        li4.textContent = "Beginner";
        !beginner ? li4.classList.add("hidden") : li4.classList.remove("hidden");

        const li5 = document.createElement("li");
        li5.textContent = Math.floor(vidlength/60) + "h " + vidlength % 60 + "m";

        const i1 = document.createElement("i");
        i1.classList.add("fa-gamepad");
        i1.classList.add("fas");

        const li6 = document.createElement("li");
        !game ? li6.classList.add("hidden") : li6.classList.remove("hidden");

        const ul2 = document.createElement("ul");
        ul2.classList.add("options");

        //title
        const h31 = document.createElement("h3");
        h31.textContent = title;

        //image
        const img1 = document.createElement("img");
        img1.src = url;
        img1.alt = "course";

        //item
        const item1 = document.createElement("div");
        item1.classList.add("item"); 

        // appending
        ul1.append(li1, li2);
        li6.append(i1);
        ul2.append(li6, li5, li4, li3);
        item1.append(img1, h31, ul2, ul1);

        document.getElementById("items").append(item1);
    }       
} else {
    location.replace("login.html");
}
