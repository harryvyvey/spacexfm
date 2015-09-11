//TODO: use a more robust onload
var DOMYoutubeIFrame = document.getElementById('youtube-iframe');

DOMYoutubeIFrame.src = 'about:blank';

var trackList = [
    {'videoId': 'Q7EL1nTnOI8', 'startSeconds':0, 'endSeconds': undefined }, // SpaceX Webcast Music 2013.11.28
    {'videoId': 'Ggo7E0LyEJw', 'startSeconds':11, 'endSeconds': undefined }, // SpaceX Webcast Music 03.06.2014
    {'videoId': 'CQnR5fhCXkQ', 'startSeconds':0, 'endSeconds': undefined }, // Falcon 9 First Stage Return | ORBCOMM Mission
    {'videoId': 'MX76RyZulI8', 'startSeconds':0, 'endSeconds': 144 }, // SpaceX Dragon V2 Unveil Begining                   Quiet!!
    {'videoId': 'MX76RyZulI8', 'startSeconds':1048, 'endSeconds': 1223 }, // SpaceX Dragon V2 Unveil Ending                 Quiet!!
    {'videoId': 'Cf_-g3UWQ04', 'startSeconds':0, 'endSeconds': undefined }, // SpaceX Dragon V2 Unveil Animation sequence
    {'videoId': '0NKFtrlrOIs', 'startSeconds':0, 'endSeconds': undefined }, // May 20, 2012
    {'videoId': 'vrR31nHCV-U', 'startSeconds':0, 'endSeconds': undefined }, //SpaceX Rocket Tank Production
    {'videoId': 'IBm9xpltdIo', 'startSeconds':0, 'endSeconds': undefined }, //SpaceX Webcast Music 10.01.2015
    {'videoId': 'Tccj8-rcQ08', 'startSeconds':0, 'endSeconds': undefined }, //SpaceX Webcast Music 10.01.2015
    {'videoId': 'SOLOZRVNM8w', 'startSeconds':0, 'endSeconds': undefined }, //Parker & Hanson - Gravity (Original Mix) by Anjunabeats
    {'videoId': 'mA548WWMiLY', 'startSeconds':0, 'endSeconds': 216 }, //SpaceX Webcast Music 2015.04.14 + SpaceX Intro
    {'videoId': '7uflq0d4rzg', 'startSeconds':0, 'endSeconds': undefined }, //SpaceX Rocket Tank Production
    {'videoId': 'xjSb_b4TtxI', 'startSeconds':0, 'endSeconds': undefined }, //Crew Dragon | Interior
];

var trackCursor = Math.floor(Math.random() * trackList.length);
var newTrack = pickTrack();
DOMYoutubeIFrame.src = 'https://www.youtube.com/embed/'+newTrack.videoId+'?start='+newTrack.startSeconds+'&end='+newTrack.endSeconds+'&autoplay=1&enablejsapi=1&origin='+window.location.protocol + "//" + window.location.hostname;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player(DOMYoutubeIFrame, {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        increaseTrackCursor()
        player.loadVideoById(pickTrack());
    }
    if (event.data == -1) {
        setTimeout(function() {
            if (player.getPlayerState() == -1) {
                console.log("still unstarted after 1 second, skipping");
                increaseTrackCursor();
                player.loadVideoById(pickTrack());
            }
        },1000)
    }
    if (document.getElementById('media').className != "active") {
        document.getElementById('media').className = 'active';
    }
}

function pickTrack() {
    console.log('Playing track '+(trackCursor+1) +' of '+ trackList.length)
    return trackList[trackCursor];
}
function increaseTrackCursor() {
    trackCursor = (trackCursor+1) % trackList.length;
}
function decreaseTrackCursor() {
    trackCursor = (trackCursor+trackList.length-1) % trackList.length;
}
document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
        case 32: // space
            if (player.getPlayerState() == YT.PlayerState.PAUSED ) {
                player.playVideo();
            } else if (player.getPlayerState() == YT.PlayerState.PLAYING ) {
                player.pauseVideo();
            }
        break;

        case 37: // left
            decreaseTrackCursor();
            player.loadVideoById(pickTrack());
        break;

        case 38: // up
            player.setVolume(player.getVolume()+10);
        break;

        case 39: // right
            increaseTrackCursor();
            player.loadVideoById(pickTrack());
        break;

        case 40: // down
            player.setVolume(player.getVolume()-10);
        break;

        default: return;
    }
    e.preventDefault();
};
