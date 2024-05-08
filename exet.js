//═══════════════════════════════════════════════════════//
//╔══╗ ╔╗   ╔═══╗╔═══╗╔╗╔═╗    ╔═══╗╔═══╗╔═╗ ╔╗╔════╗╔╗ ╔╗╔═══╗╔═══╗    ╔═╗╔═╗╔═══╗
//║╔╗║ ║║   ║╔═╗║║╔═╗║║║║╔╝    ║╔═╗║║╔═╗║║║╚╗║║║╔╗╔╗║║║ ║║║╔══╝║╔═╗║    ║║╚╝║║╚╗╔╗║
//║╚╝╚╗║║   ║║ ║║║║ ╚╝║╚╝╝     ║╚═╝║║║ ║║║╔╗╚╝║╚╝║║╚╝║╚═╝║║╚══╗║╚═╝║    ║╔╗╔╗║ ║║║║
//║╔═╗║║║ ╔╗║╚═╝║║║ ╔╗║╔╗║     ║╔══╝║╚═╝║║║╚╗║║  ║║  ║╔═╗║║╔══╝║╔╗╔╝    ║║║║║║ ║║║║
//║╚═╝║║╚═╝║║╔═╗║║╚═╝║║║║╚╗    ║║   ║╔═╗║║║ ║║║ ╔╝╚╗ ║║ ║║║╚══╗║║║╚╗    ║║║║║║╔╝╚╝║
//╚═══╝╚═══╝╚╝ ╚╝╚═══╝╚╝╚═╝    ╚╝   ╚╝ ╚╝╚╝ ╚═╝ ╚══╝ ╚╝ ╚╝╚═══╝╚╝╚═╝    ╚╝╚╝╚╝╚═══╝
//════════════════════════════//
let DataPack = require('sew-queen-pro');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let { createPollWithSewAnyGroupChat } = require('sew-queen-pro/sources/dc/cmd/warn')
let {SendMessageToStatus, checkIsGroup} = require('sew-queen-pro/sources/dc/cmd/admin')
let { MessageType } = require('@ravindu01manoj/sew-queen-web');
let WorkType = Details.WORKTYPE == 'public' ? false : true
/*
SewQueen['IntroduceCMD']({
        pattern: 'poll ?(.*)', 
        fromMe: WorkType, 
        dontAdCommandList: true
       }, 
(async (QueenSew, input) => {
var grp = await checkIsGroup(QueenSew)
if (!grp) return;

if(input[1].includes('/-/') || input[1].includes('/=/') || (input[1].includes('/') && input[1].includes(','))) {

await createPollWithSewAnyGroupChat(QueenSew, input)
} else {
 return await QueenSew.client.sendMessage(QueenSew.jid,'Poll Option Is Undefined.. Please Use This Type\n\n.poll poll header/poll list name/poll1,poll2,poll3,poll4', MessageType.text)
 }
}));
*/
SewQueen['IntroduceCMD']({
        pattern: 'setst ?(.*)', 
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
try {
await SendMessageToStatus(QueenSew, input)
} catch (e) {
 return await QueenSew.client.sendMessage(QueenSew.jid,'I Can\'t Post This Status', MessageType.text)
}
}));
