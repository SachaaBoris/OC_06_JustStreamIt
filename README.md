# OC_06_JustStreamIt  :chess_pawn:  
  
# ● Description du projet  
WebApp servant à l'affichage du site JustStreamIt.  
Il permet de générer un affichage clair et intuitif des films les mieux notés. En plus d'une premiere grille des meilleurs films, l'app propose deux autres grilles de rangement par genre.  
Le site interroge une API qui va chercher dans une base de données de films les éléments requis pour la construction et l'affichage de la page web.  
La page générée est responsive mobile + tablette + desktop et utilise bootstrap + vanilla javascript.  
  
# ● Comment installer et démarrer l'application  
1. Prérequis :  
Avoir Python 3 installé  
Avoir téléchargé et dézipé l'archive du projet sur votre disque dur,  
Ou clonez le repo avec cette commande :  
    ```
    git clone https://github.com/SachaaBoris/OC_06_JustStreamIt.git "path\to\local\folder"  
    ```
  
2. Installer l'environnement virtuel :  
    Depuis votre console favorite, naviguez jusqu'au repertoire de l'application  
    Pour créer l'environnement virtuel rentrez la ligne de commande : `py -m venv .chess/venv`  
    Activez ensuite l'environnement virtuel en rentrant la commande : `chess\venv\Scripts\activate`  
    Installer les requirements du projet avec la commande : `py -m pip install -r requirements.txt`  
  
3. Démarrer le script :  
    Toujours dans la console et à la racine du projet, lancez un serveur avec la commande : `py -m http.server 8000`  
    
  
---  
  
[![CC BY 4.0][cc-by-shield]][cc-by]  
  
This work is licensed under a [Creative Commons Attribution 4.0 International License][cc-by].  
  
[cc-by]: http://creativecommons.org/licenses/by/4.0/  
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg  
