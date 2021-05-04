const Discord = require('discord.js');
const client = new Discord.Client();
const cfg = serverConfig = require("./serverConfig.js");
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
require('./util/eventLoader.js')(client);
const xpfile = require("./msgData.json");
var prefix = cfg.prefix;
const log = message => {console.log(`${message}`);};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./cmd/', (err, files) => {
if (err) console.error(err);
log(`${files.length} komut yüklenecek.`);
files.forEach(f => {
let props = require(`./cmd/${f}`);
log(`${props.help.name} Komutu Yüklendi.`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);});});});
client.reload = command => {
return new Promise((resolve, reject) => {try {
delete require.cache[require.resolve(`./cmd/${command}`)];
let cmd = require(`./cmd/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);});resolve();} catch (e) {reject(e);}});};
client.load = command => {
return new Promise((resolve, reject) => {try {
let cmd = require(`./cmd/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);});
resolve();} catch (e) {
reject(e);}});};
client.unload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./cmd/${command}`)];
let cmd = require(`./cmd/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);});
resolve();} catch (e) {
reject(e);}});};
client.elevation = message => {
if (!message.guild) {
return;}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === cfg.sahip) permlvl = 4;
return permlvl;};
client.login(cfg.token);
client.on("message",function(message) {
let kanal = cfg.levelLog
let mesaj = cfg.xpMsg
if(message.author.bot) return;
var addXP = Math.floor(Math.random() * 8) + 3
if(!xpfile[message.author.id])
xpfile[message.author.id] = {
xp: 0,
level: 1,
reqxp: 100}
fs.writeFile("./msgData.json",JSON.stringify(xpfile), function(err){
if(err) console.log(err)})
xpfile[message.author.id].xp += addXP
if(xpfile[message.author.id].xp > xpfile[message.author.id].reqxp) {
xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp
xpfile[message.author.id].reqxp *= 1.25
xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp)
xpfile[message.author.id].level += 1
if(!mesaj) {
message.reply("Hey Level Atladın** "+xpfile[message.author.id].level+" **!")} 
if (mesaj) {
const msg = mesaj.replace("-member-", `<@${message.author.id}>`).replace("-server-", `${message.guild.name}`).replace("-seviye-", `${xpfile[message.author.id].level}`).replace("-seviyexp-", `${xpfile[message.author.id].xp}`).replace("-totalxp-", `${xpfile[message.author.id].reqxp}`)
return client.channels.cache.get(kanal).send(msg);
fs.writeFile("./msgData.json",JSON.stringify(xpfile), function(err){
if(err) console.log(err)})}}})
