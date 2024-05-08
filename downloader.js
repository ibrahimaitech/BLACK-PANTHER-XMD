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
let Language = DataPack.constdata
let WorkType = Details.WORKTYPE == 'public' ? false : true
let { MessageType, Mimetype} = require('@ravindu01manoj/sew-queen-web');
let { sendMessageDownloader, sendMessageBrodcast, sendMessageAddBrodcast, downloadapksewqueen, downloadtwittersewqueen} = require('sew-queen-pro/sources/dc/cmd/dl')
let { ytdocdlBackupForSewQueen } = require('sew-queen-pro/sources/dc/cmd/yt')
const Lang = Language.dataGet('scrapers')
var ytsd = require( 'yt-search' )
const translatte = require('translatte')


SewQueen['IntroduceCMD']({
        pattern: 'mediafire ?(.*)', // Mediafire Download
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'mediafire')
          } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Mediafire File!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'insta ?(.*)',  // instagram Download
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'insta')
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Insta Video!',MessageType.text, { quoted: QueenSew.data})
              }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'github ?(.*)',   // About Github Ptofile And Repo
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'github')
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Profile!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 


SewQueen['IntroduceCMD']({
        pattern: 'tiktok ?(.*)',   // Tiktok Download
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'tiktok')
})); 

SewQueen['IntroduceCMD']({
        pattern: 'url ?(.*)',     // Image To Url
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        if (QueenSew.reply_message === false || QueenSew.reply_message.image === false) return await QueenSew.client.sendMessage(QueenSew.jid,'Reply To Any Image...',MessageType.text);
        try {
await sendMessageDownloader(QueenSew, input, 'imgurl')
        } catch (e) {
  if(e.message.includes('display')) {
     return await QueenSew.client.sendMessage(QueenSew.jid,'Your Imgbb APIKEY is invalid.. please add the api key ( api.imgbb.com )',MessageType.text)
     } else {
   return await QueenSew.client.sendMessage(QueenSew.jid,'Do Not Use Bot Here.. This Is Your Log Number',MessageType.text)
   }
  }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'covid ?(.*)',   // Covid Info
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'covid')
})); 

SewQueen['IntroduceCMD']({
        pattern: 'trt ?(.*)',    // Language Translate
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        if (!QueenSew.reply_message) {
            return await QueenSew.client.sendMessage(QueenSew.jid,Lang.NEED_REPLY,MessageType.text);
        }
        var langa;
        var langb;
        if(input[1].includes(' ')) {
   langa = input[1].split(' ')[0];
   langb = input[1].split(' ')[1];
   } else {
  langa = 'auto';
  langb = Details.LANG
 }
   
   
       let ceviri = await translatte(QueenSew.reply_message.message, {from: langa, to: langb});
        if ('text' in ceviri) {
            return await QueenSew.reply('*▶️ ' + Lang.LANG + ':* ```' + langa + '```\n'
            + '*◀️ ' + Lang.FROM + '*: ```' + langb + '```\n'
            + '*🔎 ' + Lang.RESULT + ':* ```' + ceviri.text + '```');
        } else {
            return await QueenSew.client.sendMessage(QueenSew.jid,Lang.TRANSLATE_ERROR,MessageType.text)
        }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'tts ?(.*)',   // Text To Audio
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'tts')
})); 


SewQueen['IntroduceCMD']({
        pattern: 'wiki ?(.*)',  // Wikipedia Download
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'wiki')
})); 

SewQueen['IntroduceCMD']({
        pattern: 'img ?(.*)',  // Google Image Download With 10+ images
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'imgsend')
})); 

SewQueen['IntroduceCMD']({
        pattern: 'wallpaper ?(.*)',   // Hd Wallpaper Download With Search Option 100000000+
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'wallpaper')

})); 
SewQueen['IntroduceCMD']({
        pattern: 'pint ?(.*)',    // Pinterest Download With Search Option 100000000+
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'pint')
})); 

SewQueen['IntroduceCMD']({
        pattern: 'yts ?(.*)',     // Youtube Search Engine
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'yts')
})); 
SewQueen['IntroduceCMD']({
        pattern: 'lyric ?(.*)',     // Songs Lirics Download
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'liric')
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Song!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'twitter ?(.*)', // Twitter Video Download (HD / SD / AUDIO)
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'twitter')
})); 

SewQueen['IntroduceCMD']({
        pattern: 'gettv ?(.*)', // Twitter Video Download (HD / SD / AUDIO)
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await downloadtwittersewqueen(QueenSew, input)
               } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find It!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'ytv ?(.*)',      // Youtube Video Download  (144p / 240p / 360p / 420p / 720p / mp3)
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'ytv')
              } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Video!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'gitclone ?(.*)',    // Github Repo Download
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'gitclone')
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find master Branch Of this Repo!\n\n Use Like This\n.gitclone RepoUrl/Branch',MessageType.text, { quoted: QueenSew.data})
                  }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'igprop ?(.*)',   // Instagram Profile Info
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'igprop')
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find It!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'fb ?(.*)',     // Facebook Download
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'facebook')
})); 

SewQueen['IntroduceCMD']({
        pattern: 'apk ?(.*)',   // Apksearch with apkmirror site
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'apksearch');
})); 

SewQueen['IntroduceCMD']({
        pattern: 'getapk ?(.*)',   // APK DOWNLOAD APKMIRRIR LINK
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await downloadapksewqueen(QueenSew, input);
               } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Apk!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 

SewQueen['IntroduceCMD']({
        pattern: 'playstore ?(.*)',   // Apk Search With Apk Mirrir Site
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'playstoresearch');
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find Your Search!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 
SewQueen['IntroduceCMD']({
        pattern: 'brodcast ?(.*)',    // Brodcast Without Making List (unlimited user add option)
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
if (input[1] == 'add') {
await sendMessageAddBrodcast(QueenSew, input,'add')
} else if (input[1] == 'close') {
await sendMessageAddBrodcast(QueenSew, input,'removeall')
} else if (input[1] == 'remove') {
await sendMessageAddBrodcast(QueenSew, input,'removeone')
} else {
await sendMessageBrodcast(QueenSew, input)
}
})); 
SewQueen['IntroduceCMD']({
        pattern: 'sticker ?(.*)',   // Sticker Maker With Packname && Author Name
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'stickerwithpackname');
})); 
SewQueen['IntroduceCMD']({
        pattern: 'ss ?(.*)',   //Site To Screenshot
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'sitescreenshot');
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Site!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 
SewQueen['IntroduceCMD']({
        pattern: 'spdf ?(.*)',   //Site To PDF
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'sitepdf');
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Site!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 
SewQueen['IntroduceCMD']({
        pattern: 'downimg ?(.*)',   //
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
await sendMessageDownloader(QueenSew, input, 'imagedown');
})); 
SewQueen['IntroduceCMD']({
        pattern: 'song ?(.*)',   // Youtube Song Download
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'downsong');
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Song!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 
SewQueen['IntroduceCMD']({
        pattern: 'video ?(.*)',   // Youtube Video Downloader
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'downvideo');
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find! Try With Youtube URl',MessageType.text, { quoted: QueenSew.data})
                  }
})); 
SewQueen['IntroduceCMD']({
        pattern: 'ytd ?(.*)',   // helpers
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'dlvid');
                } catch (e) {
                        try{
                        await ytdocdlBackupForSewQueen(QueenSew, input)
                              }  catch(e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Not Found This Youtube Video!',MessageType.text, { quoted: QueenSew.data})
                  }}
})); 
SewQueen['IntroduceCMD']({
        pattern: 'tikd ?(.*)', //helper
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'dltik');
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Tiktok Video!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 
SewQueen['IntroduceCMD']({
        pattern: 'dfb ?(.*)',   // helper
        fromMe: WorkType, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
        try {
await sendMessageDownloader(QueenSew, input, 'dlfb');
                } catch (e) {
                  return await QueenSew.client.sendMessage(QueenSew.jid,'Sorry I Could Not Find This Facebook Video!',MessageType.text, { quoted: QueenSew.data})
                  }
})); 
