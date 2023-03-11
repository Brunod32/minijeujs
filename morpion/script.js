jQuery(document).ready(
    function($){
        abonnement();

        function abonnement(){
            $("img").on("click", play)

            let pointsJoueur1 = 0;
            let pointsJoueur2 = 0;
            let rounds = 0;
            let victoire = false;
            let total = 0;

            function play() {
                if ($("joueur").text() == 1) {
                    $(this).attr("src", "assets/images/croix.png");
                    $(this).addClass('cross');
                    // Empêche de modifier une deuxième fois le src de l'img 
                    $(this).off();
                    $("joueur").text("2");
                    pointsJoueur1+=1;
                    rounds++;
                    console.log("point joueur 1 "+ pointsJoueur1);
                    console.log("N° tour" + rounds);
                } else {
                    $(this).attr("src", "assets/images/rond.png");
                    $(this).addClass('round');
                    $(this).off();
                    $("joueur").text("1");
                    pointsJoueur2+=10;
                    rounds++;
                    console.log("point joueur 2 "+ pointsJoueur2);
                    console.log("N° tour" + rounds);
                }
                
                total = pointsJoueur1 + pointsJoueur2;
                console.log(total);

                // Gestion égalité
                /* Comme pointJoueur1 = 1 et pointJoueur2 = 10,
                la grille est remplie si le total est de 45.
                */
                if( total === 45 ) {
                    console.log(victoire)
                    $("h3").text("Egalité");
                }

                //Check les combinaisons
                if ($("#0>img").hasClass("cross") && $("#1>img").hasClass("cross") && $("#2>img").hasClass("cross")) {
                    victoire = true;
                    $("h3").text("Joueur 1 gagne");
                    $("img").off("click");
                } else if ($("#3>img").hasClass("cross") && $("#4>img").hasClass("cross") && $("#5>img").hasClass("cross")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 1 gagne");
                } else if ($("#6>img").hasClass("cross") && $("#7>img").hasClass("cross") && $("#8>img").hasClass("cross")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 1 gagne");
                } else if ($("#0>img").hasClass("cross") && $("#3>img").hasClass("cross") && $("#6>img").hasClass("cross")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 1 gagne");
                } else if ($("#1>img").hasClass("cross") && $("#4>img").hasClass("cross") && $("#7>img").hasClass("cross")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 1 gagne");
                } else if ($("#2>img").hasClass("cross") && $("#5>img").hasClass("cross") && $("#8>img").hasClass("cross")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 1 gagne");
                } else if ($("#0>img").hasClass("cross") && $("#4>img").hasClass("cross") && $("#8>img").hasClass("cross")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 1 gagne");
                } else if ($("#2>img").hasClass("cross") && $("#4>img").hasClass("cross") && $("#6>img").hasClass("cross")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 1 gagne");
                }

                if ($("#0>img").hasClass("round") && $("#1>img").hasClass("round") && $("#2>img").hasClass("round")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 2 gagne");
                } else if ($("#3>img").hasClass("round") && $("#4>img").hasClass("round") && $("#5>img").hasClass("round")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 2 gagne");
                } else if ($("#6>img").hasClass("round") && $("#7>img").hasClass("round") && $("#8>img").hasClass("round")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 2 gagne");
                } else if ($("#0>img").hasClass("round") && $("#3>img").hasClass("round") && $("#6>img").hasClass("round")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 2 gagne");
                } else if ($("#1>img").hasClass("round") && $("#4>img").hasClass("round") && $("#7>img").hasClass("round")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 2 gagne");
                } else if ($("#2>img").hasClass("round") && $("#5>img").hasClass("round") && $("#8>img").hasClass("round")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 2 gagne");
                } else if ($("#0>img").hasClass("round") && $("#4>img").hasClass("round") && $("#8>img").hasClass("round")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 2 gagne");
                } else if ($("#2>img").hasClass("round") && $("#4>img").hasClass("round") && $("#6>img").hasClass("round")) {
                    victoire = true;
                    $("img").off("click");
                    $("h3").text("Joueur 2 gagne");
                }
            }
        }
    }
)