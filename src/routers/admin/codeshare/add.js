const Discord = require('discord.js')
const app = require('express').Router();
const codesSchema = require("../../../database/models/codes.js");
const client = global.Client;
const channels = global.config.server.channels,
	  roles = global.config.server.roles;
         function makeid(length) {
      var result           = '';
      var characters       = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
console.log("[Electron CodeShare]: Admin/CodeShare/Add router loaded.");

app.post("/admin/addcode", global.checkAuth, async (req, res) => {
    const rBody = req.body;
    let kod = makeid(36);
    await new codesSchema({
        code: kod,
        codeName: rBody['codename'],
        codeCategory: rBody['category'],
        codeDesc: rBody['codedesc'],
    }).save()
    if (rBody['main']) {
        await codesSchema.updateOne({
            code: kod
        }, {
            $set: {
                main: req.body.main
            }
        });
    }
    if (rBody['commands']) {
        await codesSchema.updateOne({
            code: kod
        }, {
            $set: {
                commands: req.body.commands
            }
        });
    }
    client.channels.cache.get(channels.codelog).send(new Discord.MessageEmbed()
        .setTitle("Yeni kod eklendi!").setColor("GREEN").setFooter(config.footer)
        .setDescription(`İsimli Kullanıcı **[${req.user.username}](https://electronn.glitch.me/user/${req.user.id})**Adlı Kodu Ekledi **${rBody['codename']}** sisteme.`)
        .addField("Code Link", `https://electronn.glitch.me/codes/view/${kod}`, true)
        .addField("Code Description", rBody['codedesc'], true)
        .addField("Code Category", rBody['category'], true)
    )
    res.redirect('/codes/view/' + kod)
});

module.exports = app;
