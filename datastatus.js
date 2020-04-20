const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname,"data");
const signerListPath = path.join(dataPath,"signerlist.json");
const rulesetCachePath = path.join(dataPath,"rulesetcache.json");

const discord = require("./discord");

const DEFAULT_LANG = "en";
const RULESET_UPDATE_INTERVAL = 24*60*60*1000;

if(!fs.existsSync(dataPath))fs.mkdirSync(dataPath);

const signerList = fs.existsSync(signerListPath)?JSON.parse(fs.readFileSync(signerListPath)):[];
const rulesetCache = fs.existsSync(rulesetCachePath)?JSON.parse(fs.readFileSync(rulesetCachePath)):{};

function _writeFile(filepath,data){
  fs.writeFile(filepath,JSON.stringify(data),(err)=>{
    if(err)
      console.error(err);
  });
}

const signer = {
  signerExist(tag){
    if(signerList.indexOf(tag) == -1)return false;
    return true;
  },
  addSigner(tag){
    signerList.push(tag);
    signer._writeFile();
  },
  removeSigner(tag){
    const idx = signerList.indexOf(tag);
    if(idx==-1)return;
    signerList.splice(idx,1);
    signer._writeFile();
  },
  getSignerList(){
    if(signerList==null)return [];
    else return signerList;
  },
  _writeFile(){
    _writeFile(signerListPath,signerList);
  }
};

const ruleset = {
  get(lang){
    return new Promise((_resolve,_reject)=>{
      if(rulesetCache.lastUpdate == null){
        ruleset._checkUpdate().then(()=>{
          ruleset.get(lang).then(_resolve).catch(_reject);
        }).catch(_reject);
      }
      else{
        ruleset._checkUpdate();
        if(rulesetCache.data.hasOwnProperty(lang))
          return _resolve(rulesetCache.data[lang]);
        else
          return _resolve(rulesetCache.data[DEFAULT_LANG]);
      }
    });
  },
  validLocale(l){
    return rulesetCache.data.hasOwnProperty(l);
  },
  _checkUpdate(){
    return new Promise((_resolve,_reject)=>{
      if(rulesetCache.lastUpdate==null || Date.now() - rulesetCache.lastUpdate > RULESET_UPDATE_INTERVAL){
        discord.getRules().then((ruleData)=>{
          rulesetCache.data = ruleData;
          rulesetCache.lastUpdate = Date.now();
          ruleset._writeFile();
          _resolve();
        }).catch(_reject);
      } else{
        _resolve();
      }
    });
  },
  _writeFile(){
    _writeFile(rulesetCachePath,rulesetCache);
  }
};  


module.exports = {
  signer,
  ruleset
};