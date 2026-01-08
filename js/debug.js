/*
 * Alex's BetterNow
 * Copyright (c) 2026 Alex
 * All rights reserved.
 *
 * This code may not be copied, modified, or distributed without permission.
 */

// Debug functions for console access

window.debugFriends = function() {
    console.log('friendUsernames:', friendUsernames);
    console.log('friendSettings:', friendSettings);
    console.log('firebaseSettings:', firebaseSettings);
};

window.debugChest = function() {
    console.log('Auto enabled:', autoChestEnabled);
    console.log('Threshold:', autoChestThreshold);
    console.log('Last chest likes:', lastChestOpenLikes);
    console.log('Last checked:', lastCheckedLikes);
    console.log('Current likes:', getCurrentLikesFromToolbar());
    console.log('Is opening:', isOpeningChest);
    console.log('Is dropping:', isChestDropping());
    console.log('Is broadcasting:', isBroadcasting());
    console.log('Chest count:', getCurrentLikesFromToolbar() - lastChestOpenLikes);
};