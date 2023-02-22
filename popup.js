function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['content_script.js']})
    })
}

document.getElementById('clickactivity').addEventListener('click', injectTheScript);

chrome.runtime.onMessage.addListener((msg, sender) => {
    document.getElementById('currentCount').innerText = msg.count;
    document.getElementById('totalCount').innerText = '/'+msg.totalCount;
});