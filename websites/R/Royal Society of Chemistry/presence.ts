var presence = new Presence({
    clientId: "748388379548188772" //The client ID of the Application created at https://discordapp.com/developers/applications
})
var browsingStamp = Math.floor(Date.now());
/*
strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings
});


function myOutsideHeavyLiftingFunction(){
    //Grab and process all your data here

    // element grabs //
    // api calls //
    // variable sets //
}

setInterval(myOutsideHeavyLiftingFunction, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

*/
var element: any;

presence.on("UpdateData", async () => {
    /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

    let presencedata: PresenceData = {
        largeImageKey: "rsc_org", /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
        smallImageKey: "rsc_org", /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
        smallImageText: "Royal Society Of Chemistry", //The text which is displayed when hovering over the small image
        state: "Viewing the Royal Society of Chemistry", //The lower section of the presence text
    }; 
    if (document.location.hostname == "www.rsc.org") {
        if(document.location.pathname == "/"){
            presencedata.startTimestamp = browsingStamp;
            presencedata.details = "Viewing home page";
        } else if(document.location.pathname.includes("/periodic-table/element/")){
            presencedata.startTimestamp = browsingStamp;
            element = document.location.pathname.split("/"[4]);
            presencedata.details = "Viewing element:" + element;
        }
    }
    if (presencedata.details == null) {
        //This will fire if you do not set presence details
        presence.setTrayTitle(); //Clears the tray title for mac users
        presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
        //This will fire if you set presence details
        presence.setActivity(presencedata); //Update the presence with all the values from the presenceData object
    }
});