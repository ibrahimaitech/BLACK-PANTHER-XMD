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

let DATA = DataHelp.dataGet('weather');

SewQueen['IntroduceCMD']({pattern: 'lngcode', fromMe: WorkType, dontAdCommandList: true}, (async (message, input) => {    

    await message.sendMessage('*Code:* en_US \n *Language:* English (US) \n\n *Code:* hi \n *Language:* Hindi \n\n *Code:* es \n *Language:* Spanish \n\n *Code:* fr \n *Language:* French \n\n *Code:* ja \n *Language:* Japanese \n\n *Code:* ru \n *Language:* Russian \n\n *Code:* en_GB \n *Language:* English (UK) \n\n *Code:* de \n *Language:* German \n\n *Code:* it \n *Language:* Italian \n\n *Code:* ko \n *Language:* Korean \n\n *Code:* pt-BR \n *Language:* Brazilian Portuguese \n\n *Code:* ar \n *Language:* Arabic \n\n *Code:* tr \n *Language:* Turkish \n\n');

}));


SewQueen['IntroduceCMD']({ pattern: 'dict ?(.*)', fromMe: WorkType, desc: "Use it as a dictionary.\nEg: .dict en_US;lead\n For supporting languages send *.lngcode*" }, async (message, input) => {

    if (!input[1]) return await message.sendMessage("Need word")

 if (input[1].includes(';')) {
        var split = input[1].split(';');
        word = split[1];
        langcode = split[0];
         }
	else {
        word = input[1];
        langcode = 'en_US';
        }

    await message.sendMessage("Loading")

	  
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        let {
         definition,
	example,	
        } = response.data[0].meanings[0].definitions[0]

   
	
	let msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })
	})    
	    
	    
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        let {
         definition,
	example,	
        } = response.data[0].meanings[0].definitions[1]

   
	
	let msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })
	 })
	
	     await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        let {
         definition,
	example,	
        } = response.data[0].meanings[1].definitions[0]

   
	
	let msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })
	})    
		     
	 await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        let {
         definition,
	example,	
        } = response.data[0].meanings[1].definitions[1]

   
	
	let msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })    
	})    
		 
		  await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${langcode}/${word}`)
      .then(async (response) => {
        let {
         definition,
	example,	
        } = response.data[1].meanings[0].definitions[0]

   
	
	let msg = `
        *${"Definition"}*: ${definition}    
        *${"Example"}*: ${example}`
	
	 await message.client.sendMessage(message.jid, msg , MessageType.text, {
          quoted: message.data,
        })
	    

      })
      
  },
)
