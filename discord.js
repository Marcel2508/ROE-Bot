const discordjs = require("discord.js");
const discordClient = new discordjs.Client();
const config = require("./config.json");

const dc = require("./discord-utils");

const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname,"discord_modules")
const modules = fs.readdirSync(basePath);


discordClient.on("ready",()=>{
  console.log("Discord-Bot is ready!");
});

modules.forEach((modFileName)=>{
  require(path.join(basePath,modFileName))(discordClient);
  console.log("Initiated",modFileName,"module!");
});

discordClient.login(config.discordToken);


//Register Rule-Message change Listener

function getRules(){
  return new Promise(async(_resolve,_reject)=>{
    const rulesMapKeys = Object.keys(config.rulesMap);
    const channel = await discordClient.channels.resolve(config.rulesChannel);
    if(channel == null)
      return _reject(new Error("Invalid Channel!"));
      const messageContents = {};
      for(var i=0;i<rulesMapKeys.length;i++){
        try{
          const tmsg = await channel.messages.fetch(config.rulesMap[rulesMapKeys[i]]);
          if(!tmsg){
            console.error("Rules-Message",rulesMapKeys[i],"not found!");
            messageContents[rulesMapKeys[i]] = "NOT FOUND!";
            continue;
          }
          messageContents[rulesMapKeys[i]] = dc.formatMessage(tmsg.content);
        }catch(ex){
          console.error("Rules-Message",rulesMapKeys[i],"not found!");
          messageContents[rulesMapKeys[i]] = "NOT FOUND!";
          continue;
        }
      }
      _resolve(messageContents);
  });
}

module.exports = {
  getRules
};