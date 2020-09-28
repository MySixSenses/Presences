const presence = new Presence({
    clientId: "758864138897850368"
});
let author, title;
var startTimeStamp = Math.round(Date.now());
presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
        largeImageKey: "flickr_logo",
        startTimestamp: startTimeStamp,
        smallImageKey: "flickr_logo",
        smallImageText: "Viewing Images or videos on Flickr",
    };
    if (document.location.hostname == "www.flickr.com") {
        if (document.location.pathname == "/") {
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/photos/")) {
            title = document.querySelector("title");
            title = title.innerText;
            title = title.split("|");
            author = title[1];
            title = title[0];
            presenceData.details = "Viewing" + title;
            presenceData.state = "From: " + author;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
