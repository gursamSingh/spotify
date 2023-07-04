// Initializing Variables

let songIndex = 0;
let playButton = document.querySelector('.masterPlayButton');
let progressBar = document.querySelector('.progress-bar');
let playingGif = document.querySelector('.gif');
let allSongItems = document.querySelectorAll('.song-item');
let masterSongName = document.querySelector(".master-song-name");

let audioElement = new Audio('./songs/1.mp3');
let isAudioPlaying = false;

let songs = [{
        songName: 'Song-Name1',
        filePath: 'songs/1.mp3',
        coverPath: 'covers/1.jpg'
    },
    {
        songName: 'Song-Name2',
        filePath: 'songs/2.mp3',
        coverPath: 'covers/2.jpg'
    },
    {
        songName: 'Song-Name3',
        filePath: 'songs/3.mp3',
        coverPath: 'covers/3.jpg'
    },
    {
        songName: 'Song-Name4',
        filePath: 'songs/4.mp3',
        coverPath: 'covers/4.jpg'
    },
    {
        songName: 'Song-Name5',
        filePath: 'songs/5.mp3',
        coverPath: 'covers/5.jpg'
    },
    {
        songName: 'Song-Name6',
        filePath: 'songs/6.mp3',
        coverPath: 'covers/6.jpg'
    },
    {
        songName: 'Song-Name7',
        filePath: 'songs/7.mp3',
        coverPath: 'covers/7.jpg'
    },
    {
        songName: 'Song-Name8',
        filePath: 'songs/8.mp3',
        coverPath: 'covers/8.jpg'
    },
    {
        songName: 'Song-Name9',
        filePath: 'songs/9.mp3',
        coverPath: 'covers/9.jpg'
    },
    {
        songName: 'Song-Name10',
        filePath: 'songs/10.mp3',
        coverPath: 'covers/10.jpg'
    }
]

// Listing the covers and song name in the Banner container
allSongItems.forEach((element,i)=>{
    element.querySelector('img').src = songs[i].coverPath
    element.querySelector('.song-name').innerHTML = songs[i].songName;
})




// Listening to Events

// 1 (Playing/Pausing Song on click on the play button )
playButton.addEventListener("click", () => {
    isAudioPlaying = !isAudioPlaying;
    if (isAudioPlaying) {
        audioElement.play();
        playButton.classList.remove('fa-circle-play');
        playButton.classList.add('fa-circle-pause');
        playingGif.style.opacity = 1;

    } else {
        audioElement.pause();
        playButton.classList.remove('fa-circle-pause');
        playButton.classList.add('fa-circle-play');
        playingGif.style.opacity = 0;
    }
})


// 2 (Updating the progress bar)

audioElement.addEventListener('timeupdate', ()=>{
    songProgress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    progressBar.value = songProgress;
})

// 3 (Updating the song & progress bar when change happens on time when clicked)

progressBar.addEventListener('change', () =>{
    audioElement.currentTime = progressBar.value * audioElement.duration / 100
})




// Jis song pe click karka hai usko chhod ke baaki sab pe pause icon hojaye

const makeAllPlays = ()=>{
    document.querySelectorAll(".songItemPlay").forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

// playing the song from music list / banner container itself
document.querySelectorAll(".songItemPlay").forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        isAudioPlaying = true
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `./songs/${songIndex+1}.mp3`;
        audioElement.currentTime= 0;
        audioElement.play();
        playingGif.style.opacity = 1;
        if(isAudioPlaying){
            playButton.classList.add('fa-circle-pause');
            playButton.classList.remove('fa-circle-play');
        }
    })
})



// playing next song when clicked in next button 

document.querySelector(".fa-forward").addEventListener("click",()=>{
    if(songIndex < 9){
        songIndex = songIndex + 1;
    }else{
        songIndex = 0;
    }
    isAudioPlaying = true
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `./songs/${songIndex+1}.mp3`;
    audioElement.play();
    playingGif.style.opacity = 1;
    if(isAudioPlaying){
        playButton.classList.add('fa-circle-pause');
        playButton.classList.remove('fa-circle-play');
    }
})

// playing previous song when clicked in previous button

document.querySelector(".fa-backward").addEventListener("click",()=>{
    if(songIndex  <= 0){
        songIndex = 0;
    }else{
        songIndex = songIndex - 1;
    }
    isAudioPlaying = true
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `./songs/${songIndex+1}.mp3`;
    audioElement.play();
    playingGif.style.opacity = 1;
    if(isAudioPlaying){
        playButton.classList.add('fa-circle-pause');
        playButton.classList.remove('fa-circle-play');
    }
})