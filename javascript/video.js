const relatedInnerWrapper = document.querySelector(".related-video-container");
const commentInnerWrapper = document.querySelector(".comment-section");
const downloadButton = document.querySelector(".download");

let data = JSON.parse(localStorage.getItem("video"));
// console.log(data);

//comments url
let comment_http = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet";

let relatedVideoUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&chart=mostPopular&regionCode=IN";

//Related vidoes section
function watchVideos() {
    playVideo(data); // Load and play the clicked video
    loadComments();
}

//Mechanism for playing the video
function playVideo(data) {
    let videoContainer = document.querySelector(".play-video");
    videoContainer.innerHTML = "";
    let iframe = document.createElement("iframe");
    iframe.height = "100%";
    iframe.width = "100%";
    iframe.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=0`;
    iframe.setAttribute = ("allowfullscreen", true);
    videoContainer.append(iframe);
    videoDescription(data);
}

//Loading the commemts 
async function loadComments() {
    let commentResponse = await fetch(`${comment_http}&videoId=${data.videoId}&key=${key}`);
    let commentData = await commentResponse.json();
    appendCommentData(commentData.items);
}

//function calls
playVideo(data);
loadComments();
watchVideos();

//Appending the comment data into the DOM
function appendCommentData(commentDataArray) {
    commentInnerWrapper.innerHTML += commentDataArray.map((commentsData) => {
        return `    
        <div class="single-comment">
            <img src="${commentsData.snippet.topLevelComment.snippet.authorProfileImageUrl}" alt="users img">
            <div class="comment-info">
                <p class="username">${commentsData.snippet.topLevelComment.snippet.authorDisplayName}</p>
                <p class="actualcomment">${commentsData.snippet.topLevelComment.snippet.textDisplay}</p>
            </div>
        </div>`;
    }).join('');
}

//video description
function videoDescription(data) {
    const chantitle = document.querySelector(".channel-title");
    chantitle.innerHTML = `${data.snippet.title}`;
    const userprofilepic = document.querySelector(".users-profile");
    userprofilepic.src = `${data.snippet.thumbnails.default.url}`;
    const channelName = document.querySelector(".channel-name");
    channelName.innerHTML = `${data.snippet.channelTitle}`;
}
