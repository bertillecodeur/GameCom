var nbOperations = 2,
	compteur = 0,
	tentatives = 0,
	score = 0;
	level = "niv1";

var Niveau1 = new Object({
	nameLevel: "niv1",
	operateur: " + ",
});

var Niveau2 = new Object({
	nameLevel: "niv2",
	operateur: " - ",
});

var Niveau3 = new Object({
	nameLevel: "niv3",
	operateurTab: [" + ", " - "],
	operateurIndice: 0,
	operateur: "",
	creerOperateur: function() {
		operateurIndice = Math.floor(Math.random() * 2);
		operateur = this.operateurTab[operateurIndice];
		return operateur;
	}
});

var Niveau4 = new Object({
	nameLevel: "niv4",
	operateur: " x ",
});

var Niveau5 = new Object({
	nameLevel: "niv5",
	operateurTab: [" + ", " - ", " x "],
	operateurIndice: 0,
	operateur: "",
	creerOperateur: function() {
		operateurIndice = Math.floor(Math.random() * 3);
		operateur = this.operateurTab[operateurIndice];
		return operateur;
	}
});

var Operation = new Object({
	nb1: 0,
	nb2: 0,
	op: "",
	operationEcrite: "",
	resultAttendu: 0,
	creerOperationEcrite: function() {
		do {
			this.nb1 = Math.floor(Math.random() * 10);
			this.nb2 = Math.floor(Math.random() * 10);
		} while (this.nb1 < this.nb2);
		switch (level) {
			case "niv1":
				this.op = Niveau1.operateur;
				break;
			case "niv2":
				this.op = Niveau2.operateur;
				break;
			case "niv3":
				this.op = Niveau3.creerOperateur();
				break;
			case "niv4":
				this.op = Niveau4.operateur;
				break;
			case "niv5":
				this.op = Niveau5.operateur;
				break;
			default:
				this.op = " + ";
				break;
		}
		operationEcrite = this.nb1 + this.op + this.nb2 + " = ";
		return operationEcrite;
	},
	creerResultAttendu: function() {
		 switch (this.op) {
		 	case " + ":
		 		this.resultAttendu = this.nb1 + this.nb2;
		 		break;
		 	case " - ":
		 		this.resultAttendu = this.nb1 - this.nb2;
		 		break;
		 	case " x ":
		 		this.resultAttendu = this.nb1 * this.nb2;
		 		break;
		 	default:
		 		this.resultAttendu = this.nb1 + this.nb2;
		 		break;
		 }
		 return this.resultAttendu;
	}
});

var Calcul = new Object({
	resultSaisi: 0,
	resultAttendu: 0,
	getResultSaisi: function() {
		this.resultSaisi = document.getElementById("rep").value;
		document.getElementById("rep").value = "";
	},
	calculer: function() {
		this.resultAttendu = Operation.creerResultAttendu();
		this.getResultSaisi();
		if (this.resultSaisi != "") {
			this.resultSaisi = Number(this.resultSaisi);
			if (this.resultSaisi === this.resultAttendu) {
				affichercorrect(); 
				tentatives = 0;
				compteur = ++compteur;
				score = ++score;
				start();
			} else if (this.resultSaisi != this.resultAttendu) {
				if (tentatives < 2) {
					tentatives = ++tentatives;
					afficherincorrect();
				} else {
					tentatives = 0;
					compteur = ++compteur;
					cachervalidattempt();
					start();
				}
			}
		} else {
			entertext();
		}
	}
});

var Scoring = new Object({
	pseudo: "",
	scorefinal: 0,
	tabscore: new Array(),
	tabscores,
	getPseudo: function() {
		this.pseudo = document.getElementById("enterpseudo").value;
		document.getElementById("enterpseudo").value = "";

	},
	getScore: function() {
		this.scorefinal = score;
	},
	recScore: function() {
		Scoring.getPseudo();
		Scoring.getScore();
		this.tabscore.unshift(this.pseudo + " : " + this.scorefinal + "/" + nbOperations + "<br/>");
		reset();
	},
	afficherScores: function() {
		this.tabscores = this.tabscore.join('');
		document.getElementById("tabscores").innerHTML = this.tabscores;
	}
});

function choixLevel() {
	switch (level) {
		case "niv1":
			niveau1selected();
			break;
		case "niv2":
			niveau2selected();
			break;
		case "niv3":
			niveau3selected();
			break;
		case "niv4":
			niveau4selected();
			break;
		case "niv5":
			niveau5selected();
			break;
		default:
			level = "niv1";
			break;
	}
	reset();
	return level;

}

function start() {
	if (compteur < nbOperations) {
		document.getElementById("optore").innerHTML = Operation.creerOperationEcrite();
	} else {
		afficherscore();
	}
	Scoring.afficherScores();
}

function reset() {
	compteur = 0;
	tentatives = 0;
	score = 0;
	document.getElementById("opera").style.display = "inline-block";
	document.getElementById("score").innerHTML = "";
	document.getElementById("score").style.display = "none";
	document.getElementById("valid").innerHTML = "";
	document.getElementById("attempt").innerHTML = "";
	document.getElementById("rep").value = "";
	document.getElementById("pseudo").style.display = "none";
	start();
}

function entertext() {
	document.getElementById("valid").style.display = "block";
	document.getElementById("valid").style.color = "red";
	document.getElementById("valid").innerHTML = "Veuillez entrer une réponse !";
}

function afficherscore() {
	cachervalidattempt();
	document.getElementById("opera").style.display = "none";
	document.getElementById("score").style.display = "block";
	document.getElementById("score").innerHTML = "Vous avez obtenu un score de : " + score + "/" + nbOperations;
	document.getElementById("pseudo").style.display = "block";
}

function affichercorrect() {
	document.getElementById("attempt").style.display = "none";
	document.getElementById("valid").style.display = "block";
	document.getElementById("valid").style.color = "green";
	document.getElementById("valid").innerHTML = "Correct !";
}

function afficherincorrect() {
	document.getElementById("valid").style.display = "block";
	document.getElementById("valid").style.color = "red";
	document.getElementById("valid").innerHTML = "Incorrect !";
	document.getElementById("attempt").style.display = "block";
	document.getElementById("attempt").innerHTML = "Encore " + (3 - tentatives) + " tentatives.";
}

function cachervalidattempt() {
	document.getElementById("valid").style.display = "none";
	document.getElementById("attempt").style.display = "none";
}

function niveau1selected() {
	document.getElementById("niv1s").style.color = "white";
	document.getElementById("niv1s").style.background = "green";
	document.getElementById("niv2s").style.color = "black";
	document.getElementById("niv2s").style.background = "cornflowerblue";
	document.getElementById("niv3s").style.color = "black";
	document.getElementById("niv3s").style.background = "cornflowerblue";
	document.getElementById("niv4s").style.color = "black";
	document.getElementById("niv4s").style.background = "cornflowerblue";
	document.getElementById("niv5s").style.color = "black";
	document.getElementById("niv5s").style.background = "cornflowerblue";
}

function niveau2selected() {
	document.getElementById("niv1s").style.color = "black";
	document.getElementById("niv1s").style.background = "cornflowerblue";
	document.getElementById("niv2s").style.color = "white";
	document.getElementById("niv2s").style.background = "green";
	document.getElementById("niv3s").style.color = "black";
	document.getElementById("niv3s").style.background = "cornflowerblue";
	document.getElementById("niv4s").style.color = "black";
	document.getElementById("niv4s").style.background = "cornflowerblue";
	document.getElementById("niv5s").style.color = "black";
	document.getElementById("niv5s").style.background = "cornflowerblue";
}

function niveau3selected() {
	document.getElementById("niv1s").style.color = "black";
	document.getElementById("niv1s").style.background = "cornflowerblue";
	document.getElementById("niv2s").style.color = "black";
	document.getElementById("niv2s").style.background = "cornflowerblue";
	document.getElementById("niv3s").style.color = "white";
	document.getElementById("niv3s").style.background = "green";
	document.getElementById("niv4s").style.color = "black";
	document.getElementById("niv4s").style.background = "cornflowerblue";
	document.getElementById("niv5s").style.color = "black";
	document.getElementById("niv5s").style.background = "cornflowerblue";
}

function niveau4selected() {
	document.getElementById("niv1s").style.color = "black";
	document.getElementById("niv1s").style.background = "cornflowerblue";
	document.getElementById("niv2s").style.color = "black";
	document.getElementById("niv2s").style.background = "cornflowerblue";
	document.getElementById("niv3s").style.color = "black";
	document.getElementById("niv3s").style.background = "cornflowerblue";
	document.getElementById("niv4s").style.color = "white";
	document.getElementById("niv4s").style.background = "green";
	document.getElementById("niv5s").style.color = "black";
	document.getElementById("niv5s").style.background = "cornflowerblue";
}

function niveau5selected() {
	document.getElementById("niv1s").style.color = "black";
	document.getElementById("niv1s").style.background = "cornflowerblue";
	document.getElementById("niv2s").style.color = "black";
	document.getElementById("niv2s").style.background = "cornflowerblue";
	document.getElementById("niv3s").style.color = "black";
	document.getElementById("niv3s").style.background = "cornflowerblue";
	document.getElementById("niv4s").style.color = "black";
	document.getElementById("niv4s").style.background = "cornflowerblue";
	document.getElementById("niv5s").style.color = "white";
	document.getElementById("niv5s").style.background = "green";
}

reset();
start();