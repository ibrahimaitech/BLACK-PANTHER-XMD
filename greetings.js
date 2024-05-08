/* 
Sew Queen Whatsapp Bot                       

Telegram: https://t.me/RavinduManoj
Facebook: https://www.facebook.com/ravindu.manoj.79
Licensed under the  GPL-3.0 License;

Coded By Ravindu Manoj
*/ 

let DataPack = require('sew-queen-pro');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let { MessageType, MessageOptions, Mimetype, GroupSettingChange, ChatModification } = require('@ravindu01manoj/sew-queen-web');
let fs = require('fs');
let os = require('os');
let ffmpeg = require('fluent-ffmpeg');
let exec = require('child_process').exec;
let axios = require('axios');
let got = require('got');
let {execFile} = require('child_process');
let cwebp = require('cwebp-bin');
let DataHelp = DataPack.constdata
let WorkType = Details.WORKTYPE == 'public' ? false : true

let DataB = require('../DataBase/greetings');
let DATA = DataHelp.dataGet('greetings');


SewQueen['IntroduceCMD']({pattern: 'welcome (.*)', fromMe: true, dontAdCommandList: true}, (async (message, input) => {
if (message.reply_message) {
   textsew = message.reply_message.text
} else {
    if (input[1] === '') {
var hg = await DataB.getMessage(message.jid);
    if (hg === false) {
       return await message.client.sendMessage(message.jid,DATA.NOT_SET_WELCOME,MessageType.text);
    } else {
      return await message.client.sendMessage(message.jid,DATA.WELCOME_ALREADY_SETTED + hg.message + '```',MessageType.text);
    }

}
   textsew = input[1]
    }
        if (textsew === 'delete') { await message.client.sendMessage(message.jid,DATA.WELCOME_DELETED,MessageType.text); return await DataB.deleteMessage(message.jid, 'welcome'); }
        await DataB.setMessage(message.jid, 'welcome', textsew.replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,DATA.WELCOME_SETTED,MessageType.text)
}));

SewQueen['IntroduceCMD']({pattern: 'goodbye (.*)', fromMe: true, dontAdCommandList: true}, (async (message, input) => {
    if (message.reply_message) {
   textsew = message.reply_message.text
} else {
    if (input[1] === '') {
var hg = await DataB.getMessage(message.jid, 'goodbye');
    if (hg === false) {
       return await message.client.sendMessage(message.jid,DATA.NOT_SET_WELCOME,MessageType.text);
    } else {
      return await message.client.sendMessage(message.jid,DATA.GOODBYE_ALREADY_SETTED + hg.message + '```',MessageType.text);
    }

}
   textsew = input[1]
    }
        if (textsew === 'delete') { await message.client.sendMessage(message.jid,DATA.GOODBYE_DELETED,MessageType.text); return await DataB.deleteMessage(message.jid, 'goodbye'); }
        await DataB.setMessage(message.jid, 'goodbye', textsew.replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,DATA.GOODBYE_SETTED,MessageType.text)
    
}));
