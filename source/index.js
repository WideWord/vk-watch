const {VK} = require('vk-io');
const TelegramBot = require('node-telegram-bot-api');
const cfg = require('../config');
const fs = require('fs');

const tg = new TelegramBot(cfg.tg.token);

async function notifyForItem(item) {
    const notification = 'https://vk.com/feed?w=wall' + item.owner_id + '_' + item.id;
    tg.sendMessage(cfg.tg.chatId, notification);
}

(async () => {

    let state;

    if (fs.existsSync(cfg.stateFile)) {
        state = JSON.parse(fs.readFileSync(cfg.stateFile));
    } else {
        state = {
            lastNewsTime: 0
        };
    }

    const vk = new VK();

    vk.setToken(cfg.vk.token);

    let newNewsTime = state.lastNewsTime;

    for (const request of cfg.requests) {
        const response = await vk.api.newsfeed.search({
            q: request
        });
        for (item of response.items) {
            if (item.date > newNewsTime) {
                newNewsTime = item.date;
            }
            if (item.date > state.lastNewsTime) {
                await notifyForItem(item);
            }
        }
    }

    state.lastNewsTime = newNewsTime;

    fs.writeFileSync(cfg.stateFile, JSON.stringify(state));

    console.log('Done');

})();

