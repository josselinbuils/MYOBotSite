'use strict';

$.event.props.push('dataTransfer');

var blockArray;

/* Positionnement des blocs dans l'interface */

var eventBlocks = [
	{ 'title': 'Évènements MYO', 'blocks': ['fingerSpread', 'fist', 'waveIn', 'waveOut', 'doubleTap', 'rest'] },
	{ 'title': 'Évènements NXT', 'blocks': ['soundInf(50)', 'soundSup(50)'] }
];

var actionBlocks = [
	{ 'title': 'Actions ponctuelles', 'blocks': ['accelerate', 'decelerate'] }, //playSound
	{ 'title': 'Actions continues', 'blocks': ['moveForward', 'moveBackward', 'turnLeft', 'turnRight', 'veerLeft', 'veerRight', 'stop'] },
	{ 'title': 'Actions temporelles', 'blocks': ['timedMoveForward(1)', 'timedMoveBackward(1)', 'timedTurnLeft(1)', 'timedTurnRight(1)', 'timedVeerLeft(1)', 'timedVeerRight(1)', 'timedStop(1)'] }
];

// Permet de concaténer n fois une chaîne de caractères
String.prototype.repeat = function(n) {
    return new Array(n+1).join(this);
};

// Retourne le code HTML d'un bloc
function getBlock(blockType, parameter) {
	var block;
	
	switch (blockType) {
	case 'accelerate':
		block = '<div class="block actionBlock" data-block="accelerate" data-help="La vitesse nominale du robot augmentera d\'un certain seuil."><div>Accélérer</div></div>';
		break;
	case 'contact':
		//block = '<div class="block eventBlock" data-block="contact" data-help="Événement déclenché quand le robot entre en contact avec un obstacle."><div>Contact avec obstacle</div></div>';
		break;
	case 'decelerate':
		block = '<div class="block actionBlock" data-block="decelerate" data-help="La vitesse nominale du robot diminuera d\'un certain seuil."><div>Décélérer</div></div>';
		break;
	case 'doubleTap':
		block = '<div class="block eventBlock" data-block="doubleTap" data-help="Événement déclenché quand l\'utilisateur du MYO tape 2 fois son pouce avec ses autres doigts."><div>Tap tap</div></div>';
		break;
	case 'fingerSpread':
		block = '<div class="block eventBlock" data-block="fingerSpread" data-help="Événement déclenché quand l\'utilisateur du MYO écarte ses doigts."><div>Écartement des doigts</div></div>';
		break;
	case 'fist':
		block = '<div class="block eventBlock" data-block="fist" data-help="Événement déclenché quand l\'utilisateur du MYO ferme son poing."><div>Fermeture du poing</div></div>';
		break;
	case 'moveForward':
		block = '<div class="block actionBlock" data-block="moveForward" data-help="Le robot avancera tant que de nouvelles consignes ne seront pas exécutées."><div>Avancer</div></div>';
		break;
	case 'moveBackward':
		block = '<div class="block actionBlock" data-block="moveBackward" data-help="Le robot reculera tant que de nouvelles consignes ne seront pas exécutées."><div>Reculer</div></div>';
		break;
	case 'obstacle':
		//block = '<div class="block eventBlock" data-block="obstacle" data-help="Événement déclenché quand le robot détecte un obstacle à une distance définie par l\'utilisateur."><div>Obstacle à<input type="number" value="' + parameter + '">cm</div></div>';
		break;
	case 'playSound':
		block = '<div class="block actionBlock" data-block="playSound" data-help="Le robot jouera un son prédéfini."><div>Jouer un son</div></div>';
		break;
	case 'rest':
		block = '<div class="block eventBlock" data-block="rest" data-help="Événement actif lorsqu\'aucun évènement n\'est détecté."><div>Aucun</div></div>';
		break;
	case 'soundInf':
		block = '<div class="block eventBlock" data-block="soundInf" data-help="Événement déclenché quand l\'intensité sonore devient inférieur au niveau défini par l\'utilisateur."><div>Bruit inférieur à<input type="number" value="' + parameter + '">dB</div></div>';
		break;
	case 'soundSup':
		block = '<div class="block eventBlock" data-block="soundSup" data-help="Événement déclenché quand l\'intensité sonore devient supérieur au niveau défini par l\'utilisateur."><div>Bruit supérieur à<input type="number" value="' + parameter + '">dB</div></div>';
		break;
	case 'stop':
		block = '<div class="block actionBlock" data-block="stop" data-help="Le robot s\'arrêtera et ne bougera plus tant que de nouvelles consignes ne seront pas exécutées."><div>S\'arrêter</div></div>';
		break;
	case 'timedMoveBackward':
		block = '<div class="block actionBlock" data-block="timedMoveBackward" data-help="Le robot reculera pendant la durée définie par l\'utilisateur."><div>Reculer<input type="number" value="' + parameter + '">s</div></div>';
		break;
	case 'timedMoveForward':
		block = '<div class="block actionBlock" data-block="timedMoveForward" data-help="Le robot avancera pendant la durée définie par l\'utilisateur."><div>Avancer<input type="number" value="' + parameter + '">s</div></div>';
		break;
	case 'timedStop':
		block = '<div class="block actionBlock" data-block="timedStop" data-help="Le robot s\'arrêtera et ne bougera plus pendant la durée définie par l\'utilisateur."><div>S\'arrêter<input type="number" value="' + parameter + '">s</div></div>';
		break;
	case 'timedTurnLeft':
		block = '<div class="block actionBlock" data-block="timedTurnLeft" data-help="Le robot tournera à gauche sur place pendant la durée définie par l\'utilisateur."><div>Tourner à gauche<input type="number" value="' + parameter + '">s</div></div>';
		break;
	case 'timedTurnRight':
		block = '<div class="block actionBlock" data-block="timedTurnRight" data-help="Le robot tournera à droite sur place pendant la durée définie par l\'utilisateur."><div>Tourner à droite<input type="number" value="' + parameter + '">s</div></div>';
		break;
	case 'timedVeerLeft':
		block = '<div class="block actionBlock" data-block="timedVeerLeft" data-help="Le robot virera à gauche pendant la durée définie par l\'utilisateur."><div>Virer à gauche<input type="number" value="' + parameter + '">s</div></div>';
		break;
	case 'timedVeerRight':
		block = '<div class="block actionBlock" data-block="timedVeerRight" data-help="Le robot virera à droite pendant la durée définie par l\'utilisateur."><div>Virer à droite<input type="number" value="' + parameter + '">s</div></div>';
		break;
	case 'turnLeft':
		block = '<div class="block actionBlock" data-block="turnLeft" data-help="Le robot tournera à gauche sur place tant que de nouvelles consignes ne seront pas exécutées."><div>Tourner à gauche</div></div>';
		break;
	case 'turnRight':
		block = '<div class="block actionBlock" data-block="turnRight" data-help="Le robot tournera à droite sur place tant que de nouvelles consignes ne seront pas exécutées."><div>Tourner à droite</div></div>';
		break;
	case 'veerLeft':
		block = '<div class="block actionBlock" data-block="veerLeft" data-help="Le robot virera à gauche tant que de nouvelles consignes ne seront pas exécutées."><div>Virer à gauche</div></div>';
		break;
	case 'veerRight':
		block = '<div class="block actionBlock" data-block="veerRight" data-help="Le robot virera à droite tant que de nouvelles consignes ne seront pas exécutées."><div>Virer à droite</div></div>';
		break;
	case 'waveIn':
		block = '<div class="block eventBlock" data-block="waveIn" data-help="Événement déclenché quand l\'utilisateur du MYO plie son poignet vers l\'intérieur de ses bras."><div>Vague intérieure</div></div>';
		break;
	case 'waveOut':
		block = '<div class="block eventBlock" data-block="waveOut" data-help="Événement déclenché quand l\'utilisateur du MYO plie son poignet vers l\'extérieur de ses bras."><div>Vague extérieure</div></div>';
		break;
	}
	
	return block;
}

// Transforme un tabeau de blocs JSON en code Java (fonction récursive)
function arrayToCode(blocksArray, level) {
	var code = '';

	// Parcours les blocs du tableau
	$.each(blocksArray, function(index, value) {
		
		// Récupère et stocke le type du bloc
		var blockType = value instanceof Array ? value[0].toString() : value.toString(), parameter;

		// Si le bloc contient un paramètre, stocke ce dernier
		if (blockType.indexOf('(') !== -1) {
			
			// Stocke le paramètre
			parameter = parseInt(blockType.replace(/[^(]*\(([^)]*)\)$/, '$1'));
			
			// Retire le paramètre dans le type du bloc
			blockType = blockType.replace(/\([^)]*\)$/, '');			
		}
		
		// Ajoute le code Java du bloc au code complet
		switch (blockType) {
		case 'accelerate':
			code += '<span class="tab"></span>'.repeat(level) + 'accelerer();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'contact':
			//code += '<span class="tab"></span>'.repeat(level) + 'if (contactAvecObstacle() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'decelerate':
			code += '<span class="tab"></span>'.repeat(level) + 'decelerer();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'doubleTap':
			code += '<span class="tab"></span>'.repeat(level) + '</span>if (tapTap() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'fingerSpread':
			code += '<span class="tab"></span>'.repeat(level) + 'if (ecartementDesDoigts() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'fist':
			code += '<span class="tab"></span>'.repeat(level) + 'if (fermetureDuPoing() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'moveForward':
			code += '<span class="tab"></span>'.repeat(level) + 'avancer();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'moveBackward':
			code += '<span class="tab"></span>'.repeat(level) + 'reculer();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'obstacle':
			//code += '<span class="tab"></span>'.repeat(level) + '</span>if (distanceAvecObstacle() <= ' + parameter + ') {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'playSound':
			code += '<span class="tab"></span>'.repeat(level) + 'jouerUnSon();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'rest':
			code += '<span class="tab"></span>'.repeat(level) + 'if (aucunEvenement() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'soundInf':
			code += '<span class="tab"></span>'.repeat(level) + '</span>if (niveauSonore() < ' + parameter + ') {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'soundSup':
			code += '<span class="tab"></span>'.repeat(level) + '</span>if (niveauSonore() > ' + parameter + ') {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'stop':
			code += '<span class="tab"></span>'.repeat(level) + 'sarreter();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'timedMoveBackward':
			code += '<span class="tab"></span>'.repeat(level) + 'reculer(' + parameter + ');<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'timedMoveForward':
			code += '<span class="tab"></span>'.repeat(level) + 'avancer(' + parameter + ');<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'timedStop':
			code += '<span class="tab"></span>'.repeat(level) + 'sarreter(' + parameter + ');<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'timedTurnLeft':
			code += '<span class="tab"></span>'.repeat(level) + 'tournerAGauche(' + parameter + ');<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'timedTurnRight':
			code += '<span class="tab"></span>'.repeat(level) + 'tournerADroite(' + parameter + ');<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'timedVeerLeft':
			code += '<span class="tab"></span>'.repeat(level) + 'virerAGauche(' + parameter + ');<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'timedVeerRight':
			code += '<span class="tab"></span>'.repeat(level) + 'virerADroite(' + parameter + ');<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'turnLeft':
			code += '<span class="tab"></span>'.repeat(level) + 'tournerAGauche();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'turnRight':
			code += '<span class="tab"></span>'.repeat(level) + 'tournerADroite();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'veerLeft':
			code += '<span class="tab"></span>'.repeat(level) + 'virerAGauche();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'veerRight':
			code += '<span class="tab"></span>'.repeat(level) + 'virerADroite();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'waveIn':
			code += '<span class="tab"></span>'.repeat(level) + 'if (vagueInterieure() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'waveOut':
			code += '<span class="tab"></span>'.repeat(level) + '</span>if (vagueExterieure() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		}

		// Si le bloc contient d'autres blocs, rappelle la fonction sur son contenu (récursivité)
		if (value instanceof Array) {
			code = code.replace(/\[code\]/g, arrayToCode(value[1], level + 1));
		
		// Sinon, on retourne le code généré
		} else {
			code = code.replace(/\[code\]/g, '');
		}
	});
	
	return code.replace(/\[code\]/g, '');
}

// Charge les blocs dans l'interface
function loadBlocks() {
	var i, j, blockType, parameter;

	// Parcours les types de blocs évènement (MYO, NXT, etc)
	for (i = 0; i < eventBlocks.length; i++) {
		// Affiche le titre du type de bloc dans l'interface
		$('#evenements').append('<div class="typeTitle">' + eventBlocks[i].title + '</div>');
		
		// Parcours les blocs évènement de ce type
		for (j = 0; j < eventBlocks[i].blocks.length; j++) {
			// Récupère le type du bloc
			blockType = eventBlocks[i].blocks[j];
			parameter = null;

			// Vérifie si un paramètre par défaut est défini
			if (blockType.indexOf('(') !== -1) {
				
				// Stocke le paramètre
				parameter = parseInt(blockType.replace(/[^(]*\(([^)]*)\)$/, '$1'));
				
				// Retire le paramètre dans le type du bloc
				blockType = blockType.replace(/\([^)]*\)$/, '');			
			}

			// Ajoute le bloc à l'interface
			$('#evenements').append(getBlock(blockType, parameter));
		}
	}
	
	// Parcours les types de blocs action (actions ponctuelles, actions continues, etc)
	for (i = 0; i < actionBlocks.length; i++) {
		// Affiche le titre du type de bloc dans l'interface
		$('#actions').append('<div class="typeTitle">' + actionBlocks[i].title + '</div>');
		
		// Parcours les blocs action de ce type
		for (j = 0; j < actionBlocks[i].blocks.length; j++) {
			
			// Récupère le type du bloc
			blockType = actionBlocks[i].blocks[j];
			parameter = null;

			// Vérifie si un paramètre par défaut est défini
			if (blockType.indexOf('(') !== -1) {
				
				// Stocke le paramètre
				parameter = parseInt(blockType.replace(/[^(]*\(([^)]*)\)$/, '$1'));
				
				// Retire le paramètre dans le type du bloc
				blockType = blockType.replace(/\([^)]*\)$/, '');			
			}

			// Ajoute le bloc à l'interface
			$('#actions').append(getBlock(blockType, parameter));
		}
	}
}

// Transforme un tabeau de blocs JSON en code HTML et ajoute le code généré à l'interface pour afficher les blocs (fonction récursive)
function arrayToBlocks(blocksArray, target) {
	
	// Parcours les blocs du tableau
	$.each(blocksArray, function(index, value) {
		
		// Récupère et stocke le type du bloc
		var blockType = value instanceof Array ? value[0].toString() : value.toString(), parameter;

		// Si le bloc contient un paramètre, stocke ce dernier
		if (blockType.indexOf('(') !== -1) {

			// Stocke le paramètre
			parameter = parseInt(blockType.replace(/[^(]*\(([^)]*)\)$/, '$1'));
			
			// Retire le paramètre dans le type du bloc
			blockType = blockType.replace(/\([^)]*\)$/, '');			
		}
		
		// Ajoute le code HTML du bloc à l'interface
		target.append(getBlock(blockType, parameter));

		// Si le bloc contient d'autres blocs, rappelle la fonction sur son contenu (récursivité)
		if (value instanceof Array) {
			arrayToBlocks(value[1], target.children('.block').last());
		}
	});
}

// Transforme les blocs de l'interface en tableau JSON pouvant être transféré au robot NXT
function blocksToArray(target) {
	var blocksArray = [];

	// Parcours les blocs de l'interface
	target.each(function() {
		// Récupère et stocke le type du bloc
		var blockType = $(this).attr('data-block'), newTarget = $(this).children('.block');

		// Si le bloc contient d'autres blocs, ajoute le bloc au tableau et rappelle la fonction sur les blocs qu'il contient
		if (newTarget.length) {
			blocksArray.push([blockType + ($(this).children('div').first().find('input').first().length ? '(' + $(this).children('div').first().find('input').first().val() + ')' : ''), blocksToArray(newTarget)]);
		
		// Sinon, ajoute juste le bloc au tableau
		} else {
			blocksArray.push(blockType + ($(this).children('div').first().find('input').first().length ? '(' + $(this).children('div').first().find('input').first().val() + ')' : ''));
		}
	});
			
	return blocksArray;
}

// Met à jour les dimensions de l'interface
function resize() {
	var windowHeight = Math.max($(window).height(), 550);
	
	$('.blocksContainer').css('min-height', windowHeight - 233);
	$('.codeContainer').css('min-height', windowHeight - 233);
	$('.programPane').css('max-height', windowHeight - 233);
	$('.blocks .tab-pane').css('max-height', windowHeight - 207);
	$('.blocks').css('height', windowHeight - 187);
	$('.programContainer').css('height', windowHeight - 223);
}

// Met à jour le tableau JSON et le code Java en fonction des blocs que contient l'interface
function updateCode() {
	
	/* Protection contre les valeurs négatives dans les blocs action temporisée */
	
	// Parcourt les blocs action temporisée dans le conteneur principal
	$('.blocksContainer .actionBlock[data-block^=timed]').each(function() {
		
		// Vérifie que le bloc ne contienne pas de valeur négative
		if ($(this).find('input').val() < 1) {
			
			// Fixe la valeur du paramètre à 1 dans le bloc
			$(this).find('input').val(1);
		}
	});
	
	// Génère le tableau JSON et le stocke
	blockArray = blocksToArray($('.blocksContainer > .block'));
	
	// Génère le code Java et le stocke
	var code = arrayToCode(blockArray, 1);
	
	// Affiche le code Java généré
	$('.codeContainer code').html(code.length ? 'while (1) {<br />' + code.substr(0, code.length - 6) + '}' : '');
	
	/* Affiche la coloration syntaxique */
	
	hljs.configure({ useBR: true });
	
	$('.codeContainer code').each(function(i, block) {
	    $(this).removeClass('hljs');
		hljs.highlightBlock(block);
	  });

	/* Met à jour la barre d'outils */
	
	// Si le conteneur contient des blocs ajoutés par l'utilisateur, met à jour la barre d'outils pour que le fichier correspondant puisse être téléchargé
	if (blockArray.length) {
		// Active le bouton de téléchargement
		$('#saveButton').removeClass('disabled');
		
		// Active le bouton pour vider le conteneur de blocs
		$('#emptyContainerButton').removeClass('disabled');
	
	} else {
		// Désactive le bouton de téléchargement
		$('#saveButton').addClass('disabled');
		
		// Désactive le bouton pour vider le conteneur de blocs
		$('#emptyContainerButton').addClass('disabled');
	}
}

// Initialisation de l'interface
$(function() {
	var dragElem, leaveTimeout;
	
	// Charge les blocs dans l'interface
	loadBlocks();
	
	// Redimensionne l'interface
	resize();

	// Rend les blocs déplaçables
	$('.block').attr('draggable', true);
	
	// Ajoute les boutons d'aide aux blocs
	$('.block > div:first-child').each(function() {
		if ($(this).parent().attr('data-help')) {
			$(this).append('<span class="fa fa-question-circle helpBlock" data-toggle="tooltip"></span>');
			$(this).find('.helpBlock').tooltip({ placement: 'right', container: 'body', title: $(this).parent().attr('data-help') });
		}
	});

	// Ajoute les boutons de suppression aux blocs
	$('.block > div:first-child').append('<span class="fa fa-times-circle removeBlock"></span>');
	
	// Fixe le minimum à 1 pour les paramètres
	$('input[type=number]').attr('min', 1);
	
	// Cache l'animation de chargement
	$('.container #loading').remove();
		
	// Vérifie si l'utilisateur est connecté
	$.post('php/api.php?action=checkConnection', function (data) {
		if (data !== 'NotConnected') {
			
			getProgram(function () {
				
				// Affiche l'interface
				$('.container #interface').show();
				
				// Affiche l'utilisateur
				$('.toolbar #user').html(data);
			});
		} else {
			// Affiche le formulaire de connexion
			$('.container #connectionForm').show();
		}
	});

	// Évènement déclenché lorsqu'on commence à déplacer un bloc
	$(document).on('dragstart', '.block', function(e) {
		
		// Empêche l'exécution des actions par défaut
		e.stopPropagation();
		
		// Fixe le type d'action autorisé lors du drag&drop 
		e.dataTransfer.effectAllowed = 'copy';
		
		// Indispensable pour que le drag&drop fonctionne dans Firefox
		e.dataTransfer.setData('text/plain', '');
		
		// Cache les boutons d'aide et de suppression du bloc
		$('.helpBlock, .removeBlock').css('display', 'none');
		
		// Stocke l'identifiant du bloc en mouvement
		dragElem = $(this);

		/* Gestion des conteneurs suceptibles de recevoir ce bloc */
		
		// Supprime tous les conteneurs actuellement autorisés
		$('.droppable').removeClass('droppable');
		
		// Bloc évènement
		if (dragElem.hasClass('eventBlock')) {
			
			/* 
			 * Conditions pour pouvoir positionner ce bloc dans le conteneur principal :
			 * - Ce bloc était déjà à l'intérieur du conteneur principal avant d'être déplacé
			 * - Le conteneur principal ne contient pas encore de bloc de ce type
			 */
			if ($(this).parents('.blocksContainer').length || !$('.blocksContainer .eventBlock[data-block=' + $(this).attr('data-block') +  ']').length) {
				$('.blocksContainer').addClass('droppable');
			}
			
		// Bloc action
		} else if (dragElem.hasClass('actionBlock')) {

			// Action ponctuelle ou temporisée
			if (dragElem.attr('data-block') === 'accelerate' || dragElem.attr('data-block') === 'decelerate' || dragElem.attr('data-block').indexOf('timed') !== -1) {
				
				// Parcourt les blocs évènement dans le conteneur principal
				$('.blocksContainer .eventBlock').each(function() {
					
					// Vérifie que le bloc évènement ne contienne pas d'action continue
					if ($(this).find('.actionBlock[data-block^=timed]').length === $(this).find('.block').length || $(this).find('.actionBlock[data-block=accelerate]').length > 0 || $(this).find('.actionBlock[data-block=decelerate]').length > 0) {
						
						// Autorise le bloc évènement à recevoir l'action
						$(this).addClass('droppable');
					}
				});

			// Action continue
			} else {
				
				// Parcourt les blocs évènement dans le conteneur principal
				$('.blocksContainer .eventBlock').each(function() {
					
					console.log(dragElem.parents('eventBlock[data-block=' + $(this).attr('data-block') + ']').length);
					
					// Vérifie que le bloc évènement ne contienne pas d'action ou qu'il contienne l'action déplacée
					if ($(this).find('.block').length === 0 || dragElem.parents('.eventBlock[data-block=' + $(this).attr('data-block') + ']').length) {
						
						// Autorise le bloc évènement à recevoir l'action
						$(this).addClass('droppable');
					}
				});
			}
		}
	});
	
	// Évènement déclenché lorsqu'on relache un bloc
	$(document).on('dragend', '.block', function() {
		
		// Autorise les boutons d'aide et de suppression du bloc à s'afficher à nouveau
		$('.helpBlock, .removeBlock').css('display', '');
		
		// Retire la couleur orange du conteneur
		$('.droppable').removeClass('highlight');
		
		// Supprime le marqueur du bloc déplacé
		$('#marker').remove();
		
		// Met à jour le code
		updateCode();
	});
	
	// Évènement déclenché lorsqu'on bouge la souris (sert uniquement au cas où l'évènement dragend ne se déclenche pas)
	$(document).on('mousemove', function() {
		
		// Vérifie si un bloc a été déplacé
		if ($('#marker').length) {
			
			// Autorise les boutons d'aide et de suppression du bloc à s'afficher à nouveau
			$('.helpBlock, .removeBlock').css('display', '');
			
			// Retire la couleur orange du conteneur
			$('.droppable').removeClass('highlight');
			
			// Supprime le marqueur du bloc déplacé
			$('#marker').remove();
			
			// Met à jour le code
			updateCode();
		}
	});

	// Évènement déclenché lorsqu'un bloc survole un conteneur autorisé
	$(document).on('dragover', '.droppable', function(e) {
		
		// Empêche l'exécution des actions par défaut
		e.preventDefault();
		e.stopPropagation();
		
		clearTimeout(leaveTimeout);
		
		$('.droppable').removeClass('highlight');
		$(this).addClass('highlight');

		if (dragElem.parents('.droppable').length) {
			dragElem.attr('id', 'marker');
		}
		
		var y = e.originalEvent.pageY, dy = null, targetBlock, targetPosition;
		
		$(this).children('.block').each(function() {
			if ($(this).attr('id') !== 'marker') {
				var dyBefore = Math.abs(y - $(this).offset().top), dyAfter = Math.abs(y - ($(this).offset().top + $(this).outerHeight()));
				
				if (!dy) {
					dy = dyBefore + 1;
				}
				
				if ((dyBefore < dy && y < $(this).offset().top) || (dyAfter < dy && y > ($(this).offset().top + $(this).height()))) {
					if (dyBefore < dy && dyBefore < dyAfter) {
						targetBlock = $(this);
						targetPosition = 'before';
						dy = dyBefore;
					} else {
						targetBlock = $(this);
						targetPosition = 'after';
						dy = dyAfter;
					}
				}
			}
		});

		if (dy) {
			$('#marker').remove();

			switch (targetPosition) {
			case 'before':
				targetBlock.before(dragElem.clone().attr('id', 'marker'));
				break;
			case 'after':
				targetBlock.after(dragElem.clone().attr('id', 'marker'));
				break;
			}
		} else if ($(this).children('.block').last().attr('id') !== 'marker') {
			$('#marker').remove();
			$(this).append(dragElem.clone().attr('id', 'marker'));
		}
	});
	
	$(document).on('dragleave', '.blocksContainer', function() {
		leaveTimeout = setTimeout(function() {
			$('.helpBlock, .removeBlock').css('display', '');
			$('.droppable').removeClass('highlight');
			$('#marker').remove();
			updateCode();
		}, 100);
	});

	$(document).on('drop', '.droppable', function(e) {
		e.stopPropagation();
		
		$('.droppable').removeClass('highlight');
		
		if (!($(this).hasClass('eventBlock') && dragElem.hasClass('eventBlock'))) {
			if ($('#marker').hasClass('eventBlock')) {
				$('#marker').addClass('droppable');
			}
			
			$('#marker').attr('id', '');
			
			$('.helpBlock, .removeBlock').css('display', '');

			updateCode();
		}
	});
	
	$(document).on('click', 'a[href=#]', function(e) {
		e.preventDefault();
	});
	
	$(document).on('click', '.removeBlock', function() {
		$(this).parent().parent().remove();

		updateCode();
	});
	
	$(document).on('click', '#emptyContainerButton', function() {
		$('.blocksContainer').html('');
		
		updateCode();
	});
	
	$(document).on('change', '.blocksContainer input', function() {
		updateCode();
	});
	
	$(document).on('change', '.btn-file :file', function() {
		var input = $(this), files = input.get(0).files;

		if (files.length) {
			var file = files[0], reader = new FileReader();

			reader.onloadend = function(e) {
				if (e.target.readyState === FileReader.DONE) {
					$('.blocksContainer').html('');
	
					arrayToBlocks(JSON.parse(e.target.result.toString()), $('.blocksContainer'));
					
					$('.blocksContainer .block').attr('draggable', true);
					$('.blocksContainer .block > div:first-child').append('<span class="fa fa-times-circle removeBlock"></span>');
					$('input[type=number]').attr('min', 1);
					$('input[type=number]').attr('max', 30);
					
					updateCode();
					
					input.val('');
				}
			};
			
			var blob = file.slice(0, file.size);
			reader.readAsBinaryString(blob);
		}
	});
	
	$(window).on('resize', function() {
		resize();
	});
});

/* Gestion utilisateurs */

function connection() {
	$('.container #connectionForm form .alert').remove();
	
	// Vérifie si les champs sont remplis
	var res = true
	$('.container #connectionForm form').find('input').each(function() {
		if (!$(this).val()) {
			$(this).after(showAlert('danger', 'Ce champ doit être rempli.'));
			res = false;
		}
	});
	
	if (res) {
	
		$('.container #connectionForm button[type=submit]').prop('disabled', true);
		
		$.post('php/api.php?action=connection', $('#connectionForm form').serialize(), function (data) {
			
			switch (data) {
			
			case 'BadPasswordError':
				$('#connectionForm form button[type=submit]').after(showAlert('danger', 'Mot de passe invalide.'));
				break;

			case 'BadUserError':
				$('#connectionForm form button[type=submit]').after(showAlert('danger', 'Utilisateur inconnu.'));
				break;

			case 'Connected':
				// Cache le formulaire de connexion
				$('.container #connectionForm').hide();
				
				// Affiche le nom de l'utilisateur dans la toolbar
				$('.toolbar #user').html($('.container #connectionForm #user').val());
				
				getProgram(function () {
					// Affiche l'interface
					$('.container #interface').show();

					// Vide le formulaire
					$('.container #connectionForm #user').val('')
					$('.container #connectionForm #password').val('')
				});
				break;
			}

			$('.container #connectionForm button[type=submit]').prop('disabled', false);
		});
	}
}

function getProgram(callback) {
	$('.blocksContainer').html('');
	$('code.java').html('');

	$.get('php/api.php?action=getProgram', function (data) {
		if (data !== 'NothingError') {
			arrayToBlocks($.parseJSON(data), $('.blocksContainer'));
			
			$('.blocksContainer .block').attr('draggable', true);
			$('.blocksContainer .block > div:first-child').append('<span class="fa fa-times-circle removeBlock"></span>');
			$('input[type=number]').attr('min', 1);
			$('input[type=number]').attr('max', 30);
			
			updateCode();
			
			// Désactive le bouton de téléchargement
			$('#saveButton').addClass('disabled');
		}
		
		callback();
	});
}

function setProgram() {
	$.post('php/api.php?action=setProgram', { program: encodeURIComponent(JSON.stringify(blockArray)) }, function (data) {
		if (data === 'UpdatedProgram') {
			// Désactive le bouton de téléchargement
			$('#saveButton').addClass('disabled');
		} else {
			alert(data);
		}
	});
}

function logout() {
	$.post('php/api.php?action=logout', function (data) {

		// Cache l'interface
		$('.container #interface').hide();

		// Affiche le formulaire de connexion
		$('.container #connectionForm').show();
	});
}

function showAlert(type, text) {
	return '<div class="alert alert-' + type + '"><button type="button" class="close" data-dismiss="alert">×</button>' + (type === 'danger' ? '<i class="fa fa-warning"></i>' : '') + ' ' + text + '</div>';
}