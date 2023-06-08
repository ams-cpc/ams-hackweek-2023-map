/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {Popup} from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

let currentPopup: Popup | undefined = undefined;
const handleAd = () => {
    WA.room.area.onEnter("airjordanad").subscribe(() => {
        currentPopup = WA.ui.openPopup("airjordanadcontent", "The shoes are in 30% discount!", [
            {
                label: "For Men",
                className: "success",
                callback: (popup) => {
                    popup.close();
                    WA.ui.modal.openModal({
                        title: "Jordan Sneakers for Men",
                        src: "https://www.ebay.com/b/Jordan-Sneakers-for-Men/15709/bn_96541848",
                        allow: "fullscreen",
                        allowApi: false,
                        position: "center"
                    });
                }
            }, {
                label: "For Women",
                className: "warning",
                callback: (popup) => {
                    popup.close();
                    WA.ui.modal.openModal({
                        title: "Jordan Sneakers for Women",
                        src: "https://www.ebay.com/b/Jordan-Sneakers-for-Women/95672/bn_80975750",
                        allow: "fullscreen",
                        allowApi: false,
                        position: "center"
                    });
                }
            }
        ]);
        WA.room.area.onLeave("airjordanad").subscribe(closePopup);
    });

    WA.room.area.onEnter("nikead").subscribe(() => {});
}


// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)
    handleAd();
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
