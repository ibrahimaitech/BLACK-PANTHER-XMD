import express from 'express' 
import {createServer} from 'http'
import path from 'path'
import { join, dirname } from 'path'
import {Socket} from 'socket.io'
import {toBuffer} from 'qrcode'
import fetch from 'node-fetch'
//import fs from 'fs'
import fs from 'fs/promises'
import { watchFile, unwatchFile } from "fs"
import { fileURLToPath } from "url"
 
function connect(conn, PORT) {
  const app = global.app = express()
  //console.log(app)
  const server = global.server = createServer(app)
  let _qr = 'Invalid QR, you have probably already scanned the QR.'

  conn.ev.on('connection.update', function appQR({qr}) {
    if (qr) {
      _qr = qr
      if (global.renderHost === 1 && process.env.RENDER_EXTERNAL_URL) {
        console.log(`To obtain the QR code go to ${process.env.RENDER_EXTERNAL_URL}/get-qr-code`);
      }
    } 
  })
  
  app.get('/qr', async (req, res) => {
    res.setHeader('content-type', 'image/png')
    res.end(await toBuffer(_qr))
  });

  app.get('/', async (req, res) => {
    res.json("ALAN;WALKER-MD is running");
  });

  server.listen(PORT, async () => {
    console.log('App listened on port', PORT)
    if (global.renderHost === 1) await keepAliveHostRender();
    if (global.herokuHost === 1) 
    if (global.replitHost === 1) keepAlive()
  })
}

function pipeEmit(event, event2, prefix = '') {
  const old = event.emit;
  event.emit = function(event, ...args) {
    old.emit(event, ...args)
    event2.emit(prefix + event, ...args)
  }
  return {
    unpipeEmit() {
      event.emit = old
    }}
}

function keepAlive() {
  const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
  if (/(\/\/|\.)undefined\./.test(url)) return
  setInterval(() => {
    fetch(url).catch(console.error)
  }, 5 * 1000 * 60)
}


const keepAliveHostRender = async () => {
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
  
const configPath = join(__dirname, 'config.js')
let configContent = await fs.readFile(configPath, 'utf8')
  try {
      setInterval(async() => {
        if (process.env.RENDER_EXTERNAL_URL) {
          const urlRender = process.env.RENDER_EXTERNAL_URL;
          const res = await fetch(urlRender);
          if (res.status === 200) {
            const result = await res.text();
            console.log(`Result from keepAliveHostRender() ->`, result);
          }
        } else {
        const isInitialConfig = configContent.includes('global.getQrWeb = 1;') && configContent.includes('global.renderHost = 1;')
        if (isInitialConfig) {
          console.log(`You are not using a Render.com Host\nChanging values ​​of "getQrWeb" and "renderHost" to 0 in 'config.js'`)
          try {
          configContent = configContent.replace('global.getQrWeb = 1;', 'global.getQrWeb = 0;')
          configContent = configContent.replace('global.renderHost = 1;', 'global.renderHost = 0;')
          await fs.writeFile(configPath, configContent, 'utf8')
          console.log('Configuration file updated successfully.')
        } catch (writeError) {
          console.error(`Error writing 'config.js' file: `, writeError)
        }}
}
      }, 5 * 1000 * 60)
  } catch (error) {
    console.log(`Error handled in server.js keepAliveHostRender() details: ${error}`);
  }
}

export default connect

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
unwatchFile(file);
console.log(chalk.redBright("Update 'server.js'"));
import(`${file}?update=${Date.now()}`);
})
