var totalSentRequest = 0;

function getSearchResultWrappers(parent = document){
    const wrapperSelector = `li>div.ember-view[class*="-result"]`;
    const wrapperSelector1 = `li.reusable-search__result-container`;
    return Array.from(
        parent.querySelectorAll(wrapperSelector).length > 0
            ? parent.querySelectorAll(wrapperSelector)
            : parent.querySelectorAll(wrapperSelector1).length > 0
            ? parent.querySelectorAll(wrapperSelector1)
            : []
    );
};

function getConnectBtn(parent){
    const conBtnSelector = 'button';
    const conBtnEl = parent.querySelector(conBtnSelector);
    return conBtnEl;
};


async function clickConnectButtons(connectButtons){
    for(let i=0;i<connectButtons.length;i++){
            connectButtons[i].click();
            totalSentRequest++;

            //sending total request sent
            chrome.runtime.sendMessage({
                count: totalSentRequest,
                totalCount: connectButtons.length,
            });

            await delay(Math.random() * 5000 + 5000); 
    }         
}

function delay(interval){
    return new Promise(resolve => setTimeout(resolve, interval));
};

function main() {
    const profileWrapper = getSearchResultWrappers();
    const connectButtons = [];
    for(let i=0;i<profileWrapper.length;i++){
        if(profileWrapper[i]){
            const btn = getConnectBtn(profileWrapper[i]);
            if(btn){
                connectButtons.push(btn)
            }
        }
    }

    //calling click action on those buttons
    clickConnectButtons(connectButtons);

}

main();