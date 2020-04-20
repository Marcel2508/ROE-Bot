const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const locale = require("express-locale");
const config = require("./config.json");
const path = require("path");

const markoExpress = require("marko/express");
const homepage = require("./templates/homepage.marko.js");

const dataStatus = require("./datastatus");

const app = express();

app.use(markoExpress());
app.use(locale());
app.use(helmet());

function sendError(res,err){
  res.status(500).type("text/plain").send(err).end();
}

app.use(express.static(path.join(__dirname,"htdocs")));

app.get("/",(req,res)=>{
  let locale = req.locale?req.locale.language:"en";
  if(dataStatus.ruleset.validLocale(locale))
    res.redirect("/"+locale);
  else res.redirect("/en");
});

app.get("/:lang",(req,res)=>{
  dataStatus.ruleset.get(req.params.lang).then(sourceCode=>{
    res.marko(homepage,{
      rules:sourceCode,
      signers:dataStatus.signer.getSignerList()
    });
  }).catch(ex=>{
    console.error(ex);
    sendError(res,"Unknown error executing your request! Please ask Marcel2508#9095 for further help!");
  });
});

app.listen(config.serverPort);