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

let DATA = DataHelp.dataGet('evaluators');
let SDATA = DataHelp.dataGet('conventer');
let NDATA = DataHelp.dataGet('scrapers');
let googleTTS = require('google-translate-tts');
let Heroku = require('heroku-client');
let heroku = new Heroku({
    token: Details.HEROKU.API_KEY
});
let baseURI = '/apps/' + Details.HEROKU.APP_NAME;

var dd = ''
var errmsg = ''
if (Details.LANG == 'SI') dd = 'සර්වර් එකෙහි ප්‍රින්ට් වේ.', errmsg = '*ඔබ ඇතුලත් කල ෆයිල් එක සර්වර් එක තුල නොමැත!*'
if (Details.LANG == 'EN') dd = 'Prints the inside of the file on the server.', errmsg = '*The file you are looking for is not available on the server!*'
/*
SewQueen['IntroduceCMD']({pattern: 'print ?(.*)', fromMe: true, desc: dd}, (async (message, input) => {    
    exec('cat ' + input[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.client.sendMessage(message.jid,errmsg, MessageType.text)
        }
        await message.client.sendMessage(message.jid, `Root ~# ${input[1]} \n\n` + stdout, MessageType.text)
    });
}));
*/
var bdesc = ''
var berr = ''
var need_way = ''
if (Details.LANG == 'SI') bdesc = 'සර්වර් එක තුලට audio , video , photo ඇතුලත් කරයි.', berr = '*ඔබගේ ෆයිල් එක අප්ලෝඩ් කල නොහැක!*', need_way = '*ෆයිල් පාත් එකක් අවශ්‍යයි!*'
if (Details.LANG == 'EN') bdesc = 'Sends audio, video and photos inside the server.', berr = '*The file you are looking for is not available on the server!*', need_way = '*File Path Required!*'
let wk_q = Details.WORKTYPE == 'public' ? false : true
SewQueen['IntroduceCMD']({pattern: 'bashmedia ?(.*)', fromMe: wk_q, desc: bdesc, usage: 'video.mp4 && media/gif/pic.mp4'}, (async (message, input) => {    
    var id = message.jid
    try {
        if (input[1].includes('jpg') || input[1].includes('tiff') || input[1].includes('raw') || input[1].includes('dng') || input[1].includes('png') || input[1].includes('jpeg')) {
            await message.client.sendMessage(id,fs.readFileSync(`/root/QueenSewWhatsappBot/${input[1]}`), MessageType.image, {caption: Details.CPK })
        }
        else if (input[1].includes('mp4') || input[1].includes('avi') || input[1].includes('webm') || input[1].includes('mkv') || input[1].includes('mpeg')) {
            await message.client.sendMessage(id,fs.readFileSync(`/root/QueenSewWhatsappBot/${input[1]}`), MessageType.video, {caption: Details.CPK });
        }
        else if (input[1].includes('mp3') || input[1].includes('waw') || input[1].includes('flac') || input[1].includes('weba') || input[1].includes('ogg') || input[1].includes('m4a')) {
            await message.client.sendMessage(id,fs.readFileSync(`/root/QueenSewWhatsappBot/${input[1]}`), MessageType.audio);
        }
        else {
            await message.client.sendMessage(id,need_way, MessageType.text)
        }
    } catch (err) {
        await message.client.sendMessage(id,berr, MessageType.text)
    }
}));
let wk_ad = Details.WORKTYPE == 'public' ? false : true
var addsdesc = ''
var rep_add = ''
var suc_add = ''
if (Details.LANG == 'SI') addsdesc = 'සර්වර් එක තුලට audio , video , photo ඇතුලත් කරයි.', rep_add = '*ඕනම ෆයිප් එකකට රිප්ලයි එකක් යොදන්න*', suc_add = '*මීඩියා සර්වර් එකට ඇතුලත් කලා ✅*'
if (Details.LANG == 'EN') addsdesc = 'Uploads image, audio or video to the server.', rep_add = '*Reply to Any Media Message!*', suc_add = '*Media Added to Server! ✅*'

SewQueen['IntroduceCMD']({pattern: 'addserver$', fromMe: wk_ad, desc: addsdesc}, (async (message, input) => {    
    if (message.reply_message.image) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        var fin = location.split('.')[1]
        exec('mv ' + location + ' /root/QueenSewWhatsappBot/server-image.' + fin)
        await message.client.sendMessage(message.jid,suc_add, MessageType.text)
    }
    else if (message.reply_message.video) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
            
        });
        var fin = location.split('.')[1]
        exec('mv ' + location + ' /root/QueenSewWhatsappBot/server-video.' + fin)
        await message.client.sendMessage(message.jid,suc_add, MessageType.text)
    }
    else if (message.reply_message.audio) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
            
        });
        var fin = location.split('.')[1]
        exec('mv ' + location + ' /root/QueenSewWhatsappBot/server-audio.' + fin)
        await message.client.sendMessage(message.jid,suc_add, MessageType.text)
    }
    else { await message.client.sendMessage(message.jid,rep_add, MessageType.text)
    }
}));
async function checkUsAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
var antilink_var = ''
async function antlch() {
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        antilink_var = vars.ANTI_LINK
    });
}
antlch()
var ldc = ''

if (Details.LANG == 'SI') ldc = '*‎ලින්ක් එකක් හමුවිය!*'
if (Details.LANG == 'EN') ldc = '*Link Detected!*'

SewQueen['IntroduceCMD']({on: 'text', fromMe: false, delownsewcmd: false}, (async (message, input) => {
    if (antilink_var == 'true') {
        let regex1 = new RegExp('http://')
        let regex2 = new RegExp('https://')
        if (regex1.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);     
            if (Details.ANTILINKMSG == 'default') {
                await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
            } else {
                await message.client.sendMessage(message.jid,Details.ANTILINKMSG, MessageType.text, {quoted: message.data })
            }
        } 
        else if (regex2.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);      
            if (Details.ANTILINKMSG == 'default') {
                await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
            } else {
                await message.client.sendMessage(message.jid,Details.ANTILINKMSG, MessageType.text, {quoted: message.data })
            }  
        }
        else if (message.message.match(/((?:[.]com)\b)/i)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);         
            if (Details.ANTILINKMSG == 'default') {
                await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
            } else {
                await message.client.sendMessage(message.jid,Details.ANTILINKMSG, MessageType.text, {quoted: message.data })
            }
        }
    }
}));
SewQueen['IntroduceCMD']({pattern: 'term ?(.*)', fromMe: true, desc: DATA.TERM_DESC}, (async (message, input) => {    
    var user = message.client.user.name
    var id = message.jid
    if (input[1] === '') return await message.client.sendMessage(id,DATA.GIVE_ME_CODE,MessageType.text);

    exec(input[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.client.sendMessage(id,'```' + user + ':~# ' + input[1] + '\n' + err + '```',MessageType.text);
        }
        
        return await message.client.sendMessage(id,'```' + user + ':~# ' + input[1] + '\n' + stdout + '```',MessageType.text);
      });
}));
let wk = Details.WORKTYPE == 'public' ? false : true
var medinfo = ''
if (Details.LANG == 'SI') medinfo = 'රිප්ලයි කල වීඩියෝවේ තාක්ශනික තොරතුරු පෙන්වයි.'
if (Details.LANG == 'EN') medinfo = 'Shows the technical information of the replied video.'

SewQueen['IntroduceCMD']({pattern: 'mediainfo$', fromMe: wk, desc: medinfo}, (async (message, input) => {    
    var id = message.jid
    if (message.reply_message.video) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage           
        });
        exec('mv ' + location + ' /root/QueenSewWhatsappBot/vid.mp4')
        exec('ffprobe -hide_banner -loglevel fatal -show_error -show_format -show_streams -show_programs -show_chapters -show_private_data -print_format json /root/QueenSewWhatsappBot/vid.mp4', async (err, st, stderr) => {
            if (err) {
                return await message.client.sendMessage(id,'*Error:* \n\n' + err,MessageType.text);
            }
            var stdout = JSON.parse(st)
            let
                vsize = '*Video Size:* '
                vlength = '\n*Video Length:* '
                second = ' Second'
                vrvalue =  '\n*Video Resolution Value:* '
                vpvalue =  '\n*Video Pixel Value:* '
                vpformat =  '\n*Video Pixel Format:* '
                vcprofile = '\n*Video Codec Profile:* '
                vctag = '\n*Video Codec Tag:* '
                srvalue = '\n*Example Aspect Ratio:* '
                vrvalue = '\n*Viewable Aspect Ratio:* '
                vfps = '\n*Video FPS Value:* '
                vavgfps = '\n*Video Average FPS Value:* '
                sctip = '\n*Audio Codec Type:* '
                sctag = '\n*Audio Codec Tag:* '
                shzvalue = '\n*Audio KHz Rate:* '
                schannel = '\n*Audio Channels:* '
                schome = '\n*Audio Channel Layout:* '
            var msgi = vsize + stdout.format.size / 1000000 + 'MB' + vlength + stdout.streams[0].duration + second + vrvalue + stdout.streams[0].width + 'p' + vpvalue + stdout.streams[0].width + 'x' + stdout.streams[0].height + vpformat + stdout.streams[0].pix_fmt + vcprofile + stdout.streams[0].codec_name + vctag + stdout.streams[0].codec_tag_string + srvalue + stdout.streams[0].sample_aspect_ratio + vrvalue + stdout.streams[0].display_aspect_ratio + vfps + stdout.streams[0].r_frame_rate.split('/')[0] + vavgfps + stdout.streams[0].avg_frame_rate.split('/')[0] + sctip + stdout.streams[1].codec_name + sctag + stdout.streams[1].codec_tag_string + shzvalue + stdout.streams[1].sample_rate + schannel + stdout.streams[1].channels + schome + stdout.streams[1].channel_layout            
            return await message.client.sendMessage(id,msgi,MessageType.text);
        });
    } else { return await message.client.sendMessage(id,SDATA.MP4TOAUDİO_NEEDREPLY, MessageType.text)
    }
}));
var sucmsg = ''
var pmmm = ''
var psmm = ''
if (Details.LANG == 'SI') sucmsg = '*මැසේජ් එක යැවීම සාර්තකයි ✅*', pmmm = 'රිප්ලයි කල කෙනා වෙත ප්‍රයිවට් මැසේජ් එකක් යොමුකල හැක.', psmm = 'රිප්ලයි කල කෙනා හට ප්‍රයිවට් වොයිස් මැසේජ් එකක් යොමුකල හැක.'
if (Details.LANG == 'EN') sucmsg = '*Message Sent Successfully ✅*', pmmm = 'Sends a private message to the replied person.', psmm = 'Sends a private voice message to the respondent.'
SewQueen['IntroduceCMD']({pattern: 'pm ?(.*)', fromMe: true, desc: pmmm, onlyGrpSew: true }, (async (message, input) => {
    if (!message.reply_message) return await message.client.sendMessage(message.jid,NDATA.NEED_REPLY, MessageType.text);
    if (message.reply_message && input[1] == '') return await message.client.sendMessage(message.jid, NDATA.NEED_WORDS, MessageType.text);
    let uspm = message.reply_message.jid
    await message.client.sendMessage(uspm, `${input[1]}`, MessageType.text);
    await message.client.sendMessage(message.jid, sucmsg, MessageType.text);
}));
SewQueen['IntroduceCMD']({pattern: 'pmtts ?(.*)', fromMe: true, desc: psmm, onlyGrpSew: true}, (async (message, input) => {
    if (!message.reply_message) return await message.client.sendMessage(message.jid,NDATA.NEED_REPLY, MessageType.text);
    if (message.reply_message && input[1] == '') return await message.client.sendMessage(message.jid, NDATA.NEED_WORDS, MessageType.text);
    let 
        LANG = Details.LANG.toLowerCase(),
        ttsMessage = input[1],
        SPEED = 1.0

    if(langMatch = input[1].match("\\{([a-z]{2})\\}")) {
        LANG = langMatch[1]
        ttsMessage = ttsMessage.replace(langMatch[0], "")
    } 
    if(speedMatch = input[1].match("\\{([0].[0-9]+)\\}")) {
        SPEED = parseFloat(speedMatch[1])
        ttsMessage = ttsMessage.replace(speedMatch[0], "")
    }
    
    var buffer = await googleTTS.synthesize({
        text: ttsMessage,
        voice: LANG
    });
    fs.writeFileSync('tts.mp3', buffer);

    await message.client.sendMessage(message.reply_message.jid, fs.readFileSync('tts.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true});
    await message.client.sendMessage(message.jid,sucmsg, MessageType.text);
       
}));

