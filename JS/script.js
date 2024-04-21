async function main() {
    


document.addEventListener('DOMContentLoaded', async function () {
    let playlist="Animal"
    // Menu Control
    const closeButton = document.getElementById("closebtn");
    const openButton = document.getElementById("menu-open");
    let navbar = document.getElementById("navbar")
    const nav = document.getElementById("menu-to-open-close");
    // console.log(nav)
    const song_img =  document.getElementById("song_img")
    const for5btn =  document.getElementById("for5btn")
    const back5btn =  document.getElementById("back5btn")
    const forward =  document.getElementById("forward")
    const backward =  document.getElementById("backward")
    let songlst
    let songindex = 0

    let src = "songs/Animal/Abrar's Entry/Abrar's Entry"
    



    
    

    
        
    

function setupAudioControls() {
    

    forward.addEventListener("click", function () {
       
        if (songindex <songlst.length-1) 
        
     
            songindex+=1
            src=`songs/${playlist}/${songlst[songindex].replace(playlist,"").replace("/","")}/${songlst[songindex].replace(playlist,"").replace("/","")}`
            console.log(songlst[songindex].replace(playlist,"").replace("/",""))
       
            loadsong(src)
            changenewinfo(songlst[songindex])
     
        
    });

    backward.addEventListener("click", function () {
        if (songindex !== 0) {
            songindex-=1
            src=`songs/${playlist}/${songlst[songindex].replace(playlist,"").replace("/","")}/${songlst[songindex].replace(playlist,"").replace("/","")}`

            loadsong(src)
            changenewinfo(songlst[songindex])
        }
    });
}

        




function showplayico(){
        playBtnIcon.classList.add("ri-play-circle-fill")

    }

    


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
    song_name=song_name.replace(playlist,"")
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


async function loadplaylist(){
    
    await songslstload()
   
        let song_name=`songs/${playlist}/${songlst[songindex].replace(playlist,"").replace("/","")}/${songlst[songindex].replace(playlist,"").replace("/","")}`
        

     loadsong(song_name)
     changenewinfo(songlst[songindex])
} 

function loadsong(src){
    console.log(src)
    
    initializeAudio(src+".mp3")
    imageloader(src+".jpg")
}

loadplaylist()
// loadsong(src)
setupAudioControls()


// loadplaylist(playlist)
// initializeAudio("songs/Animal/Shayad/Shayad.mp3")
updateInfo()

    playBtn.addEventListener("click", 
        togglePlay);
    seccontols()

    










    

function playlisthandle(playlistLst){
    for (const i of playlistLst) {
        let htmlContent = `<a class="song-cont">
        <p class="playName">${i}</</p>
        <p id="songNumber">12</p>
      
      </a>`
        nav.insertAdjacentHTML('beforeend', htmlContent);
    }
        }
     

let playlistlst = await getfolderlist("songs")
playlisthandle(playlistlst)
console.log(playlistlst,";;")



let playslistconts = document.querySelectorAll(".song-cont")

playslistconts.forEach(function(ele) {
    ele.addEventListener('click', async function(event) {
   
        playlist=event.target.querySelector(".playName").textContent.replace(`
        `, "")
        songindex=0
  
        await songslstload()
        console.log(songlst,"ll")
        let song_name=`songs/${playlist}/${songlst[songindex].replace(playlist,"").replace("/","")}/${songlst[songindex].replace(playlist,"").replace("/","")}`
        

     loadsong(song_name)
     changenewinfo(songlst[songindex].replace(playlist,""))
        
    });
});


async function songslstload(){
    songlst=await getfoldersongslist(`songs/${playlist}`,playlist)




    
}

})}













async function getfoldersongslist(folder,playlist) {
    console.log(playlist)
 
    
    
       
    const response = await fetch(`/${folder}/`);
    const htmlContent = await response.text();
    let div = document.createElement("div")
    div.innerHTML= htmlContent
    let alst=[]

    for (const i of div.getElementsByTagName("td")) {
        let a=i.querySelector(("a"))
        if (a){
            alst.push(a["href"].replace("http://127.0.0.1:5500/songs/","").replace("/","").replace(`Arijit`,""))
           

        }
       
        
    }
    alst.shift()
    
    return alst

        
    };








async function getfolderlist(folder) {
 
    
    
       
    const response = await fetch(`/${folder}/`);
    const htmlContent = await response.text();
    let div = document.createElement("div")
    div.innerHTML= htmlContent
    let alst=[]

    for (const i of div.getElementsByTagName("td")) {
        let a=i.querySelector(("a"))
        if (a){
            alst.push(a["href"].replace("http://127.0.0.1:5500/songs/","").replace("/",""))
           

        }
       
        
    }
    alst.shift()
    
    return alst

        
    };




main()






