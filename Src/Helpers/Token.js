import md5 from "md5";

String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};

const Token = {};

Token.generateToken = (username, email) => {
  if (!isNaN(username)) return null;
  if (!isNaN(email)) return null;
  let shuffleUsername = username.shuffle();
  let shuffleEmail = email.shuffle();
  let shuffled = (shuffleEmail + shuffleUsername).shuffle();
  let dataAtual = new Date().toLocaleString("pt-br");
  dataAtual = dataAtual.replace(" ", "");
  let token = shuffled + dataAtual.shuffle();
  return md5(token.shuffle());
};

export default Token;
