'use strict';

// Specify the default options and local cache
import default_options from '../data/options.json' assert {type: 'json'};
const options = {};

// Initialize the form with the user options (if available, otherwise use default options)
chrome.storage.sync.get('options', (data) => {
    let merged_options = {...default_options, ...data.options}
    Object.assign(options, merged_options);

    // Set the form values
    for (const [key, value] of Object.entries(options)) {
        document.getElementById(key).value = value;
    }
});

// Options form listeners
optionsForm.background_color.addEventListener('change', (event) => {
    options.background_color = event.target.value;
    chrome.storage.sync.set({options}).then();
});
optionsForm.text_color.addEventListener('change', (event) => {
   options.text_color = event.target.value;
   chrome.storage.sync.set({options}).then()
});