const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
   let x = await botdata.find();
   let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`**Toplam ${bots.length} botlar bulundu.**`)
   .setColor("#7289da")
   
   .addField("Bots", `${!bots ? "" : bots.map(a => "<@"+a.botID+">").join("\n")}`, true)
      .setImage ("https://cdn.discordapp.com/attachments/1075103631738671104/1076617755375173652/standard_1.gif")

   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "bots",
    description: "",
    usage: ""
  };