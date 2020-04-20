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

  out.w("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Server164.eu - ROE</title><link rel=\"stylesheet\" href=\"https://unpkg.com/spectre.css/dist/spectre.min.css\"><link rel=\"stylesheet\" href=\"https://unpkg.com/spectre.css/dist/spectre-exp.min.css\"><link rel=\"stylesheet\" href=\"https://unpkg.com/spectre.css/dist/spectre-icons.min.css\"> <style type=\"text/css\">\n    html,body{\n      background-color: #11181E;\n      color: #B7DBD9;\n    }\n    .container{\n      max-width:900px;\n      margin: 0 auto;\n      margin-top:30px;\n      margin-bottom:40px;\n    }\n    .signer{\n      padding:10px;\n      font-weight:bold;\n    }\n  </style></head><body><div class=\"container\"><h3>This are the Rules of engagement on server 164!</h3><br>" +
    marko_str(data.rules) +
    "<br><br><br><b>This rules have been accepted by the following alliances:</b><br>");

  var $for$0 = 0;

  marko_forOf(data.signers, function(tag, index) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<span class=\"signer\">" +
      marko_escapeXml(tag) +
      "</span>");
  });

  out.w("<br><br><div style=\"text-align:center; position:absolute;bottom:0px;width:100%;left:0px;\">Made with &lt;3 by Marcel2508. Early alpha stage! More coming soon... &nbsp;|&nbsp;<a href=\"/impress.html\" target=\"_blank\">Impress/GDPR</a></div></div>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "23");

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
