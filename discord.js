const discordjs = require("discord.js");
const discordClient = new discordjs.Client();
const config = require("./config.json");

const dc = require("./discord-utils");
const datastatus = require("./datastatus");


discordClient.on("ready",()=>{
  console.log("Discord-Bot is ready!");
});

discordClient.on("message", (message) => {
  if(message.channel.id == config.signChannel){
    if(message.content == config.signCommand){
      if(message.author && message.guild){
        const member = message.guild.member(message.author);
        if(member && dc.hasRoles(member,config.signRequiredRoles)){
          
          const tag = dc.getAllianceTag(member);
          if(tag.length){
            const toSet = !datastatus.signer.signerExist(tag);
            if(toSet)
              datastatus.signer.addSigner(tag);
            else
              datastatus.signer.removeSigner(tag);
            dc.sendStatusReport(message.channel,"Your alliance ("+tag+") "+(toSet?"signed":"is no longer signing")+" the ROE-Ruleset!");//TODO

            console.log(tag,(toSet?"signed":"unsigned"),"to ROE!");
          }else{
            dc.sendError(message.channel,"Invalid Alliance-Tag Role. Please ask a moderator for help!");
          }
        }else{
          dc.sendError(message.channel,"You are not permitted to use this command!");
        }
      }
    }
  }
});

discordClient.login(config.discordToken);

//discordClient.on("")

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