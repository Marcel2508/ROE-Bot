// Compiled using markoc@4.20.1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/bot-web$1.0.0/templates/homepage.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_str = require("marko/src/runtime/helpers/to-string"),
    marko_forOf = require("marko/src/runtime/helpers/for-of"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer")),
    _preferred_script_location_tag = marko_loadTag(require("marko/src/core-tags/components/preferred-script-location-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Server164.eu - ROE</title><link rel=\"stylesheet\" href=\"https://unpkg.com/spectre.css/dist/spectre.min.css\"><link rel=\"stylesheet\" href=\"https://unpkg.com/spectre.css/dist/spectre-exp.min.css\"><link rel=\"stylesheet\" href=\"https://unpkg.com/spectre.css/dist/spectre-icons.min.css\"> <style type=\"text/css\">\n    html,body{\n      background-color: #11181E;\n      color: #B7DBD9;\n    }\n    .container{\n      max-width:900px;\n      margin: 0 auto;\n      margin-top:30px;\n      margin-bottom:40px;\n    }\n    .signer{\n      padding:10px;\n      font-weight:bold;\n    }\n\n    .dc-link{\n      margin: 0 auto;\n      width:300px;\n      cursor:pointer;\n      display:block;\n    }\n\n    .center{\n      text-align:center;\n    }\n\n    .disclaimer{\n      color: #97BBB9;\n      font-size:10px;\n    }\n    \n    .allianceTag{\n      float:left;\n      padding:10px;\n    }\n    .allianceTag .icon{\n      float:left;\n      height:20px;\n    }\n\n    .allianceTag .tag{\n      font-size:18px;\n      line-height:20px;\n      display:block;\n      float:left;\n      margin-left:5px;\n    }\n\n    .cb{\n      clear:both;\n    }\n\n  </style></head><body><div class=\"container\"><h3>This are the Rules of engagement on server 164!</h3><br>" +
    marko_str(data.rules) +
    "<br><br><br><b>This rules have been accepted by the following alliances:</b><br>");

  var $for$0 = 0;

  marko_forOf(data.signers, function(tag, index) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<div class=\"allianceTag\"><img class=\"icon\" src=\"/ship-icon.png\"><div class=\"tag\">" +
      marko_escapeXml(tag) +
      "</div></div>");
  });

  out.w("<div class=\"cb\"></div><br><br><div class=\"center\" style=\"margin-top:100px;\">Join our Discord-Server to show your support for this rules & help make the game better!</div><a href=\"https://discordapp.com/invite/RVMkRDM\" class=\"dc-link\"><img src=\"/discord-logo.svg\" style=\"width:100%;\"></a><div style=\"margin-top:100px;\" class=\"center\">Made with &lt;3 by Marcel2508. Early alpha stage! More coming soon... &nbsp;|&nbsp;<a href=\"/impress.html\" target=\"_blank\">Impress/GDPR</a></div><div class=\"disclaimer center\">The owner of this website is not affiliated, associated, authorised, endorsed by, or in any way connected with Scopely, CBS Studios, Digit, Paramount Pictures, or any of their subsidiaries or affiliates.</div></div>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "30");

  _preferred_script_location_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/bot-web$1.0.0/templates/homepage.marko",
    tags: [
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer",
      "marko/src/core-tags/components/preferred-script-location-tag"
    ]
  };
