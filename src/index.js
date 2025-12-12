import './styles.css';

function init() {
    console.log('Webpack project is running!');

    const urlParams = new URLSearchParams(window.location.search);
    const pushEngageId = urlParams.get('pushengage-id');
    const pushEngageSdkData = urlParams.get('pushengage-sdk-data');

    if (pushEngageSdkData) {
        try {
            // Verify it parses as JSON before saving, or just save raw string?
            // User said "value of pushengage-sdk-data needs to be written to localstorage"
            // The example URL has it encoded. URLSearchParams handles decoding automatically.
            localStorage.setItem('PushEngageSDK', pushEngageSdkData);
            console.log('PushEngage: Saved SDK data to localStorage');
        } catch (e) {
            console.error('PushEngage: Error saving SDK data', e);
        }
    }

    if (pushEngageId) {
        window.PushEngage = window.PushEngage || [];
        window.PushEngage.push(function () {
            PushEngage.setProfileId(pushEngageId)
                .then(function (response) {
                    console.log('PushEngage: Profile ID set successfully', response);
                    displayMessage(`Set Profile ID: ${pushEngageId}`, 'blue');
                })
                .catch(function (error) {
                    console.error('PushEngage: Error setting profile ID', error);
                    displayMessage(`Error setting Profile ID: ${error.message}`, 'red');
                });
        });
    } else {
        console.log('PushEngage: No pushengage-id found in URL');
    }
}

/**
 * Displays a visual message on the page.
 * @param {string} message - The message to display.
 * @param {string} color - The color of the text.
 */
function displayMessage(message, color) {
    const app = document.body;
    const info = document.createElement('div');
    info.textContent = message;
    info.style.marginTop = '20px';
    info.style.color = color;
    app.appendChild(info);
}

// Run initialization
init();

