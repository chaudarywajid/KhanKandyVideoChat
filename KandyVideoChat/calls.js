/**
 * Call management functions.
 * Kandy.js docs: https://developer.kandy.io/docs/javascript
 */

// Variable to keep track of the call.
var callId;

/**
 * Prepares Kandy for use.
 * Provides video container elements and event listeners for Kandy to use.
 */
function setup() {
    // Setup Kandy to make and receive calls.
    kandy.setup({
        // Designate HTML elements to be our stream containers.
        remoteVideoContainer: document.getElementById("remoteVideoContainer"),
        localVideoContainer: document.getElementById("localVideoContainer"),

        // Register listeners to call events.
        listeners: {
            callinitiated: onCallInitiated,
            callincoming: onCallIncoming,
            callestablished: onCallEstablished,
            callended: onCallEnded
        }
    });

    log('SHaHeeR CHaT is ready.');
}

/*
 * User auth functions.
 * Allows a user to login and logout from Kandy.
 */

function login() {
    /*
     * Login callback functions.
     */
    function onLoginSuccess() {
        log("Login was successful.");
    }
    function onLoginFailure() {
        log('Login failed. Make sure you input the user\'s credentials!');
    }

    // Variables for logging in.
    var projectAPIKey = document.getElementById('token').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    kandy.login(projectAPIKey, username, password, onLoginSuccess, onLoginFailure);
}

function logout() {
    /*
     * Logout callback function.
     */
    function onLogoutSuccess() {
        log('Logout was successful.');
    }

    kandy.logout(onLogoutSuccess);
}

/*
 * Call functions.
 */

// Get user input and make a call to the callee.
function startCall() {
    var callee = document.getElementById('callee').value;
    var showVideo = document.getElementById('callVideo').checked;

    // Tell Kandy to make a call to callee.
    kandy.call.makeCall(callee, showVideo);
}

function acceptCall() {
    var showVideo = document.getElementById('acceptVideo').checked;

    // Tell Kandy to answer the call.
    kandy.call.answerCall(callId, showVideo);
    // Second parameter is false because we are only doing voice calls, no video.

    log("Call answered.");
    // Handle UI changes. Call no longer incoming.
    document.getElementById("btnAcceptCall").disabled = true;
    document.getElementById("btnDeclineCall").disabled = true;

    // Handle UI changes. A call is in progress.
    disableCallControls(false);
}

function declineCall() {
    // Tell Kandy to reject the call.
    kandy.call.rejectCall(callId);

    log("Call declined.");
    // Handle UI changes. Call no longer incoming.
    document.getElementById("btnAcceptCall").disabled = true;
    document.getElementById("btnDeclineCall").disabled = true;
}

/*
 * Call Control functions.
 * Minimilistic functionality for handling call actions.
 */

function endCall() {
    kandy.call.endCall(callId);
}

function startVideo() {
    kandy.call.startCallVideo(callId);
    log("Starting send of video.");
}

function stopVideo() {
    kandy.call.stopCallVideo(callId);
    log("Stopping send of video.");
}

function muteCall() {
    kandy.call.muteCall(callId);
    log("Muting call.");
}

function unMuteCall() {
    kandy.call.unMuteCall(callId);
    log("Unmuting call.");
}

function holdCall() {
    kandy.call.holdCall(callId);
    log("Holding call.");
}

function unholdCall() {
    kandy.call.unHoldCall(callId);
    log("Unholding call.");
}

/*
 * Event callback functions.
 * These functions are provided to Kandy during setup.
 * Kandy calls them when their corresponding events occur.
 */

// What to do when a call is initiated.
function onCallInitiated(call, callee) {
    log("Call initiated with " + callee + ". Ringing...");

    // Store the call id, so the caller has access to it.
    callId = call.getId();

    // Handle UI changes. A call is in progress.
    disableCallControls(false);
}

// What to do for an incoming call.
function onCallIncoming(call) {
    log("Incoming call from " + call.callerNumber);

    // Store the call id, so the callee has access to it.
    callId = call.getId();

    // Handle UI changes. A call is incoming.
    document.getElementById("btnAcceptCall").disabled = false;
    document.getElementById("btnDeclineCall").disabled = false;
}

// What to do when call is established.
function onCallEstablished(call) {
    log("Call established.");

    // Handle UI changes. Call in progress.
    disableCallControls(false);
}

// What to do when a call is ended.
function onCallEnded(call) {
    log("Call ended.");

    // Handle UI changes. No current call.
    disableCallControls(true);
}

/*
 * Utility functions.
 */

// Display logged messages.
function log(message) {
    var messageLog = document.getElementById('messages');

    // Add new messages to the top of the log.
    messageLog.innerHTML = '<div class=\'alert alert-info\'>' + message + '</div>' + messageLog.innerHTML;
}

// Toggle UI state between on-call and off-call.
function disableCallControls(state) {
    // Handle UI changes for call control buttons.
    document.getElementById("btnStartVideo").disabled = state;
    document.getElementById("btnStopVideo").disabled = state;
    document.getElementById("btnMuteCall").disabled = state;
    document.getElementById("btnUnMuteCall").disabled = state;
    document.getElementById("btnHoldCall").disabled = state;
    document.getElementById("btnUnHoldCall").disabled = state;

    // Handle UI changes for make call, being opposite of call controls.
    document.getElementById("btnMakeCall").disabled = !state;
}
