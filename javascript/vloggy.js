const slideBar = document.querySelector(".slide-bar");
const MenuButton = document.querySelector(".menubutton");
const innerWrapper = document.querySelector(".vid-list");
const container = document.querySelector(".container");

function OnNavItemClick() {
    slideBar.classList.toggle('small-slidebar');
    container.classList.toggle('large-container');
}

var key = config.SECRET_API_KEY;

let video_http = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=65&chart=mostPopular&regionCode=IN";

window.addEventListener("load", MostPOpular);

async function MostPOpular() {
    let response = await fetch(`${video_http}&key=${key}`);
    let data = await response.json();
    appendData(data.items);
}

//search bar
async function search() {
    let querry = document.getElementById("querry").value;
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${querry}&key=${key}`);
    let result_search = await res.json();
    appendData(result_search.items);
}

//appending the video data into the DOM
function appendData(data) {

    innerWrapper.innerHTML = null;
    innerWrapper.innerHTML += data.map((youtubedata) => {
        // Convert YouTube's published time to Indian Standard Time (IST)
        const publishedTime = new Date(youtubedata.snippet.publishedAt);
        const istPublishedTime = publishedTime.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

        return `<div class="channel-information">
        <a href=""><img class="thumbnail" src="${youtubedata.snippet.thumbnails.high.url}" alt="thumbnail"></a>
    <div class="video-information flex">
        <img class="authorimg" src="${youtubedata.snippet.thumbnails.high.url}" alt="jackimg">
        <div class="vid-info flex">
            <a href="">${youtubedata.snippet.title}</a>
            <p class="channeltitle">${youtubedata.snippet.channelTitle} • ${istPublishedTime}</p>   
        </div>
    </div>
    </div>`;
    }).join('');

    //Adding some mechanism for the clicked video
    const channelBlocks = document.querySelectorAll(".channel-information");
    if (channelBlocks) {
        channelBlocks.forEach((channelBlock, index) => {
            channelBlock.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default behavior of anchor tag
                const clickedData = {
                    snippet: data[index].snippet,
                    videoId: data[index].id.videoId
                };
                localStorage.setItem("video", JSON.stringify(clickedData));
                window.location.href = "./video.html";
            })
        });
    }
}

