const serverConfig = {
  token:"",//botunuzun süper gizli tokeni
  prefix: "",// botunuzun prefixi örn: ! = !rank
  sahip:"",
  levelLog:"",//level atlayınca gidecek mesajın kanalı boş bırakırsanız o anki kanala atar
  xpMsg:""// level atlayınca gelen tebrik mesajı boş bırakırsanız normal mesajı kullanır, destek tanımlar: -member- = etiket , -server- = sunucu adı , -seviye- ulaşılan level
};
module.exports = serverConfig;