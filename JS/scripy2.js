document.addEventListener('DOMContentLoaded', function () {
    let playlist = "Animal";
    let songindex = 0;
    let songlst = [];

    // Menu Control
    const closeButton = document.getElementById("closebtn");
    const openButton = document.getElementById("menu-open");
    let navbar = document.getElementById("navbar");
    const nav = document.getElementById("menu-to-open-close");
    const song_img = document.getElementById("song_img");
    const for5btn = document.getElementById("for5btn");
    const back5btn = document.getElementById("back5btn");
    const forward = document.getElementById("forward");
    const backward = document.getElementById("backward");

    function playlistevent() {
        let links = document.querySelectorAll(".song-cont");
        links.forEach((link, index) => {
            link.removeEventListener('click', chnageplaylist);
            link.addEventListener('click', chnageplaylist);
        });
    }

    function loadplaylist(playName) {
        songindex = 0;

        getSongs(`songs/${playName}`)
            .then(songslst => {
                if (songslst.length > 0) {
                    songslst.shift();
                    console.log(songslst, "get");
                    songlst = [...songslst];
                    songindex = 0;
                }

                // Remove and re-add event listeners for navigation controls
                removeNavigationEventListeners();
                setupNavigationEventListeners(playName, songslst);

                // Load the first song
                const song_name = songslst[songindex];
                newsongloader(playName, song_name);
            })
            .catch(error => {
                console.error('Error loading playlist:', error);
            });
    }

    function removeNavigationEventListeners() {
        forward.removeEventListener("click", forwardClickHandler);
        backward.removeEventListener("click", backwardClickHandler);
    }

    function setupNavigationEventListeners(playName, songslst) {
        forward.addEventListener("click", forwardClickHandler);
        backward.addEventListener("click", backwardClickHandler);

        function forwardClickHandler() {
            if (songindex < songslst.length - 1) {
                songindex++;
                const song_name = songslst[songindex];
                newsongloader(playName, song_name);
            }
        }

        function backwardClickHandler() {
            if (songindex !== 0) {
                songindex--;
                const song_name = songslst[songindex];
                newsongloader(playName, song_name);
            }
        }
    }

    function chnageplaylist(event) {
        event.preventDefault();
        console.log('Element clicked:', event.target);
        let playName = event.target.querySelector(".playName").textContent.trim();
        playlist = playName;
        loadplaylist(playlist);
    }

    function showplayico() {
        playBtnIcon.classList.add("ri-play-circle-fill");
    }

    // Other setup...
    // Add your additional setup or functionality here

    // Initialize playlist and load the first song
    loadplaylist(playlist);

;

const resetAnimation = () => {
    nav.style.animation = ""; // Reset animation
    void nav.offsetWidth; // Force reflow
};

const closeNav = () => {
    console.log("Close Button clicked");
    resetAnimation();
    nav.style.animation = "hamburger-open 0.4s ease-in reverse";
    closeButton.style.display = "none";
    openButton.style.display = "block";
    setTimeout(console.log(5),navbar.style.zIndex ="-1000",5000)
    navbar.style.zIndex ="-1000"



};

const openNav = () => {
    console.log("Open Button clicked");
    resetAnimation();
    nav.style.animation = "hamburger-close 0.4s ease-in reverse";
    openButton.style.display = "none";
    closeButton.style.display = "block";
    navbar.style.display = "flex"
    navbar.style.zIndex ="1000"


};

closeButton.addEventListener("click", closeNav);
openButton.addEventListener("click", openNav);

// Audio Player Control
const songInfoTags = {
    "song_nameCont": document.getElementById("song-name"),
    "artist_nameCont": document.getElementById("artist-name"),
    "duration_Cont": document.getElementById("duration"),
    "current_timeCont": document.getElementById("current_time")
};

const changeInfo = {
    "song_name": "Abrar's Entry",
    "artist_name": "Unknown",
    "duration": 0, // Initialize duration to 0 initially
    "current_time": 0
};

let audioElem = new Audio("songs/Animal/Abrar's Entry/Abrar's Entry.mp3");


const playBtn = document.getElementById("playBtn");
const playBtnIcon = document.getElementById("playbtnico");
const progressBar = document.getElementById("progressbar");

const initializeAudio = (src) => {
    audioElem.src=src
    showplayico()

    
    audioElem.addEventListener("loadedmetadata", function () {
        progressBar.setAttribute("max", Math.floor(audioElem.duration));
        changeInfo.duration = `${Math.floor(audioElem.duration / 60)}:${Math.floor(audioElem.duration % 60)}`;
        updateInfo();
    });

    progressBar.addEventListener("input", function () {
        audioElem.currentTime = progressBar.value;
    });

    audioElem.addEventListener("timeupdate", function () {
        progressBar.value = audioElem.currentTime;
        changeInfo.current_time = `${Math.floor(audioElem.currentTime / 60)}:${Math.floor(audioElem.currentTime % 60)}`;
        songInfoTags.current_timeCont.innerHTML = changeInfo.current_time;
    });
};
const imageloader = (src)=>{
    song_img.src=src


}

const newsongloader= (play_name,song_name) => {
    initializeAudio(`songs/${play_name}/${song_name}${song_name.slice(0,-1)}.mp3`)
    imageloader(`songs/${play_name}/${song_name}${song_name.slice(0,-1)}.jpg`)
    changenewinfo(song_name)


}
function changenewinfo(song_name){
song_name=song_name.replace("/","")
song_name=song_name.split('%20').join(' ');
changeInfo.song_name=song_name
// i will make json file for artis name
updateInfo()
}
const updateInfo = () => {
    songInfoTags["song_nameCont"].innerHTML = changeInfo.song_name;
    songInfoTags["artist_nameCont"].innerHTML = changeInfo.artist_name;
    songInfoTags["duration_Cont"].innerHTML = changeInfo.duration;
};

const togglePlay = () => {
    const playList = ["ri-play-circle-fill", "ri-pause-circle-fill"];
    if (audioElem.paused || audioElem.currentTime <= 0) {
        playBtnIcon.classList.replace(playList[0], playList[1]);
        audioElem.play();
    } else {
        playBtnIcon.classList.replace(playList[1], playList[0]);
        audioElem.pause();
    }
};

function seccontols(){
    for5btn.addEventListener("click", function(){
        audioElem.currentTime+=5
        progressBar.value = audioElem.currentTime;
        changeInfo.current_time = `${Math.floor(audioElem.currentTime / 60)}:${Math.floor(audioElem.currentTime % 60)}`;
        songInfoTags.current_timeCont.innerHTML = changeInfo.current_time;
        
        
        
   

    }
    )
    back5btn.addEventListener("click", function(){
        audioElem.currentTime-=5
        progressBar.value = audioElem.currentTime;
        changeInfo.current_time = `${Math.floor(audioElem.currentTime / 60)}:${Math.floor(audioElem.currentTime % 60)}`;
        songInfoTags.current_timeCont.innerHTML = changeInfo.current_time;

    }
    )
    
    
}


loadplaylist(playlist)
// initializeAudio("songs/Animal/Shayad/Shayad.mp3")
updateInfo()

playBtn.addEventListener("click", 
    togglePlay);
seccontols()









// Your existing code...

function playlistupdate(navCont) {
    fetch('info/playlist.json')
        .then(response => response.json())
        .then(data => {
            for (const i in data) {
                let htmlContent = `<a class="song-cont">
                <p class="playName">${data[i]["name"]}</</p>
                <p id="songNumber">${data[i]["number"]}</p>
              </a>`
                navCont.insertAdjacentHTML('beforeend', htmlContent);
            }

            // Add click event listener to each link after updating the playlist
            playlistevent()
            
            
          

        })
        .catch(error => console.error('Error reading JSON file:', error));
}

playlistupdate(nav);
console.log(songlst,999)



async function getSongs(folder) {
    try {
        const response = await fetch(`/${folder}/`);
        const htmlContent = await response.text();

        // Parse the HTML content
        const div = document.createElement("div");
        div.innerHTML = htmlContent;
        const anchorElements = div.getElementsByTagName("a");

        // Initialize an array to store folder names
        const folders = [];

        // Loop through the anchor elements
        for (let i = 0; i < anchorElements.length; i++) {
            const element = anchorElements[i];
           
            // Extract the folder name and push it to the folders array
            let filename = element.href.split(`/${folder}/`)[1];
           
            
      
            folders.push(filename);
        }

        return folders; // Return the list of folders
    } catch (error) {
        throw new Error(`Error fetching songs from folder '${folder}': ${error.message}`);
    }
}




// console.log(document.querySelectorAll(".song-cont"))

// // Select all anchor elements with class "myLink"
// let links = document.querySelectorAll(".song-cont");
// console.log(links);


// // Add click event listener to each link
// for (let i = 0; i < links.length; i++) {
//     console.log('Inside loop:', i); // Log index inside the loop
//     links[i].addEventListener('click', function() {
//         console.log('Element clicked:', i);
//         console.log("ghhhg");
//         // Add your code here to execute when the element is clicked
//     });
// }
// console.log("ghg");
// console.log(links.length)








});



