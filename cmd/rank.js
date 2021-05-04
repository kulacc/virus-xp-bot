const { createCanvas, loadImage} = require('canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { path, join } = require("join")
const xpfile = require("../msgData.json");
module.exports.run = async (client, message, args) => {
  const level = xpfile[message.author.id].level
  if(level === undefined) level = "0"
  if(level === null) level = "0"
  const xp = xpfile[message.author.id].xp
  if(xp === undefined) xp = "0"
  if(xp === null) xp = "0"
  const totalxp = xpfile[message.author.id].reqxp
  if(totalxp === undefined) totalxp = "0"
  if(totalxp === null) totalxp = "0"
const canvas = createCanvas(1000,333);
const ctx = canvas.getContext("2d")
const background = await loadImage("https://cdn.discordapp.com/attachments/834125662565564426/836729027993665547/unknown.png");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height)  
ctx.lineWidth = 4;
ctx.strokeStyle = "#ffffff";
ctx.globalAlpha = 0.2;
ctx.fillStyle = "#000000";
ctx.fillRect(180, 216, 770, 65);
ctx.fill(); 
ctx.globalAlpha = 1;
ctx.strokeRect(180, 216, 770, 65);
ctx.stroke();
ctx.fillStyle = "#ff7306";
ctx.globalAlpha = 0.6;
ctx.fillRect(180, 216, ((100 / (totalxp)) * xp) * 7.7, 65);// level* 40
ctx.fill();
ctx.globalAlpha = 1;
ctx.font = "30px Arial";
ctx.textAlign = "center";  
ctx.fillStyle = "#ffffff";  
ctx.fillText(`${xp} / ${totalxp} XP`, 600, 260);
ctx.textAlign = "left";
ctx.fillStyle = "#ffffff";
ctx.fillText(`${message.author.tag} Mesaj İstatistikleri:`, 300, 120);
ctx.fillStyle = "#ffffff";
ctx.font = "50px Arial";
ctx.fillText("Level:", 300, 180);  
ctx.fillText(level, 450, 180);
ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
ctx.lineWidth = 6;
ctx.strokeStyle = "#ffffff";
ctx.stroke();
ctx.closePath();
ctx.clip();
const avatar = await loadImage(message.author.displayAvatarURL({ format: "jpg"}))  
ctx.drawImage(avatar, 40, 40, 250, 250);
const final = new MessageAttachment(canvas.toBuffer(), "rank.png")  
message.channel.send(final)
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['msj',"msg","me"],
  permLevel: 0 
};

exports.help = {
  name: 'mesaj'
};