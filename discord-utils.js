//helper functions
function hasRoles(member, roleIds){
  if(!member ||member.bot)
    return false;
  const roles = member.roles.cache.keyArray();
  for(let i=0;i<roleIds.length;i++){
    if(roles.indexOf(roleIds[i])!=-1)
      return true;
  }
  return false;
}

function getAllianceTag(member){
  const roles = member.roles.cache;
  const f = roles.keyArray().find(k=>{
    if(roles.get(k).name.trim().startsWith("["))
      return true;
    return false;
  });
  if(f){
    const name = roles.get(f).name;
    if(name.length<3)
      return "";
    return name.substr(1,name.length-2);
  }
  return ""
}

function sendError(channel, text){
  channel.send(text);
}

function sendStatusReport(channel, text){
  channel.send(text);
}

function cleanMultiTag(x){
  let sidx=-1;
  while((sidx=x.indexOf("<@")) != -1){
    let eidx = x.indexOf(">",sidx);
    if(eidx!=-1){
      x = x.substr(0,sidx)+x.substr(eidx+1);
    }else break;
  }
  return x;
}

//from: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
function _escapeHtml(msgRaw){
  return msgRaw
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
}

function cleanMessage(msgRaw){
  const lines = msgRaw.split("\n").map(line=>{
    if(line.startsWith(">"))line=line.substr(1);
    line = cleanMultiTag(line);
    return _escapeHtml(line.trim());
  });
  console.log(lines);
  return lines.join("\n");
}

function messageToHtml(msgRaw){
  let inNumList = false;
  let inLineList = false;
  let lines = msgRaw.split("\n").map((line)=>{
    const clidx = line.indexOf(")");
    if(clidx != -1 && !isNaN(line.substr(0,clidx))){
      line=line.substr(clidx+1).trimLeft();
      if(inNumList==false){
        inNumList = true;
        return "<ol><li>"+line+"</li>";
      }
      return "<li>"+line+"</li>";
    }
    if(line.startsWith("-")){
      line=line.substr(1).trimLeft();
      if(inLineList==false){
        inLineList = true;
        return "<ul><li>"+line+"</li>";
      }
      return "<li>"+line+"</li>";
    }
    if(inLineList){
      inLineList = false;
      return "</ul>"+line;
    }
    if(inNumList){
      inNumList = false;
      return "</ol>"+line;
    }
    
    return line+"<br/>";
  });
  lines.map((line,i)=>{
    if(line=="<br/>" && i>0 && lines[i-1].indexOf("<")>0){
      const idxBr = lines[i-1].indexOf("<br/>");
      if(idxBr!=-1)
        lines[i-1]="<h5>"+lines[i-1].substr(0,idxBr)+"</h5>";
      else 
        lines[i-1]="<h5>"+lines[i-1]+"</h5>";
    }
  });
  if(inNumList)
    lines.push("</ul>");
  if(inLineList)
    lines.push("</ul>");

  return lines.join("");
}

function formatMessage(msg){
  const cleaned = cleanMessage(msg);
  try{
    //TODO: Experimental! -> Test!
    const formatted = messageToHtml(cleaned);
    return formatted;
  }catch(ex){
    return cleaned.split("\n").join("<br/>");
  }
}

module.exports = {
  hasRoles,
  sendError,
  sendStatusReport,
  getAllianceTag,
  formatMessage
};