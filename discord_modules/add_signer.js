const config = require("../config.json");
const dataStatus = require("../datastatus.js");
const dc = require("../discord-utils");

module.exports = function addSigner(discordClient){
  discordClient.on("message", (message) => {
    if(message.channel.id == config.signChannel){
      if(message.content == config.signCommand){
        if(message.author && message.guild){
          const member = message.guild.member(message.author);
          if(member && dc.hasRoles(member,config.signRequiredRoles)){
            
            const tag = dc.getAllianceTag(member);
            if(tag.length){
              const toSet = !dataStatus.signer.signerExist(tag);
              if(toSet)
                dataStatus.signer.addSigner(tag);
              else
                dataStatus.signer.removeSigner(tag);
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
};