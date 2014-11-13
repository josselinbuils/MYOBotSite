'use strict';

$.event.props.push('dataTransfer');

var eventBlocks = [
	{ 'title': 'Évènements MYO', 'blocks': ['leftRotation', 'rightRotation', 'fingerSpread', 'fist', 'thumbToPinky'] },
	{ 'title': 'Évènements NXT', 'blocks': ['detectedSound(50)', 'obstacle(20)', 'contact'] }
];

var actionBlocks = [
	{ 'title': 'Actions ponctuelles', 'blocks': ['accelerate', 'decelerate', 'playSound'] },
	{ 'title': 'Actions continues', 'blocks': ['moveForward', 'moveBackward', 'turnLeft', 'turnRight', 'veerLeft', 'veerRight', 'stop'] },
	{ 'title': 'Actions temporelles', 'blocks': ['timedMoveForward(1)', 'timedMoveBackward(1)', 'timedTurnLeft(1)', 'timedTurnRight(1)', 'timedVeerLeft(1)', 'timedVeerRight(1)', 'timedStop(1)'] }
];

String.prototype.repeat = function(n) {
    return new Array(n+1).join(this);
};

function getBlock(blockType, parameter) {
	var block;
	
	switch (blockType) {
	case 'accelerate':
		block = '<div class="block actionBlock" data-block="accelerate" data-help="La vitesse nominale du robot augmentera d\'un certain seuil."><div>Accélérer</div></div>';
		break;
	case 'contact':
		block = '<div class="block eventBlock" data-block="contact" data-help="Événement déclenché quand le robot entre en contact avec un obstacle."><div>Contact avec obstacle</div></div>';
		break;
	case 'decelerate':
		block = '<div class="block actionBlock" data-block="decelerate" data-help="La vitesse nominale du robot diminuera d\'un certain seuil."><div>Décélérer</div></div>';
		break;
	case 'detectedSound':
		block = '<div class="block eventBlock" data-block="detectedSound" data-help="Événement déclenché quand l\'intensité sonore dépasse le niveau défini par l\'utilisateur."><div>Bruit supérieur à<input type="number" value="' + parameter + '">dB</div></div>';
		break;
	case 'fingerSpread':
		block = '<div class="block eventBlock" data-block="fingerSpread" data-help="Événement déclenché quand l\'utilisateur du MYO écarte ses doigts."><div>Écartement des doigts</div></div>';
		break;
	case 'fist':
		block = '<div class="block eventBlock" data-block="fist" data-help="Événement déclenché quand l\'utilisateur du MYO ferme son poing."><div>Fermeture du poing</div></div>';
		break;
	case 'leftRotation':
		block = '<div class="block eventBlock" data-block="leftRotation" data-help="Événement déclenché quand l\'utilisateur du MYO tourne son bras vers la gauche."><div>Rotation à gauche</div></div>';
		break;
	case 'moveForward':
		block = '<div class="block actionBlock" data-block="moveForward" data-help="Le robot avancera tant que de nouvelles consignes ne seront pas exécutées."><div>Avancer</div></div>';
		break;
	case 'moveBackward':
		block = '<div class="block actionBlock" data-block="moveBackward" data-help="Le robot reculera tant que de nouvelles consignes ne seront pas exécutées."><div>Reculer</div></div>';
		break;
	case 'obstacle':
		block = '<div class="block eventBlock" data-block="obstacle" data-help="Événement déclenché quand le robot détecte un obstacle à une distance définie par l\'utilisateur."><div>Obstacle à<input type="number" value="' + parameter + '">cm</div></div>';
		break;
	case 'playSound':
		block = '<div class="block actionBlock" data-block="playSound" data-help="Le robot jouera un son prédéfini."><div>Jouer un son</div></div>';
		break;
	case 'rightRotation':
		block = '<div class="block eventBlock" data-block="rightRotation" data-help="Événement déclenché quand l\'utilisateur du MYO tourne son bras vers la droite."><div>Rotation à droite</div></div>';
		break;
	case 'stop':
		block = '<div class="block actionBlock" data-block="stop" data-help="Le robot s\'arrêtera et ne bougera plus tant que de nouvelles consignes ne seront pas exécutées."><div>S\'arrêter</div></div>';
		break;
	case 'thumbToPinky':
		block = '<div class="block eventBlock" data-block="thumbToPinky" data-help="Événement déclenché quand l\'utilisateur du MYO relie son puce et son auriculaire."><div>Liaison pouce/auriculaire</div></div>';
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
	}
	
	return block;
}

function arrayToCode(blocksArray, level) {
	var code = '';

	$.each(blocksArray, function(index, value) {
		var blockType = value instanceof Array ? value[0].toString() : value.toString(), parameter;

		if (blockType.indexOf('(') !== -1) {
			parameter = parseInt(blockType.replace(/[^(]*\(([^)]*)\)$/, '$1'));
			blockType = blockType.replace(/\([^)]*\)$/, '');			
		}
		
		switch (blockType) {
		case 'accelerate':
			code += '<span class="tab"></span>'.repeat(level) + 'accelerer();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'contact':
			code += '<span class="tab"></span>'.repeat(level) + 'if (contactAvecObstacle() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'decelerate':
			code += '<span class="tab"></span>'.repeat(level) + 'decelerer();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'detectedSound':
			code += '<span class="tab"></span>'.repeat(level) + '</span>if (niveauSonore() >= ' + parameter + ') {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'fingerSpread':
			code += '<span class="tab"></span>'.repeat(level) + 'if (ecartementDesDoigts() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'fist':
			code += '<span class="tab"></span>'.repeat(level) + 'if (fermetureDuPoing() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'leftRotation':
			code += '<span class="tab"></span>'.repeat(level) + 'if (rotationAGauche() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'moveForward':
			code += '<span class="tab"></span>'.repeat(level) + 'avancer();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'moveBackward':
			code += '<span class="tab"></span>'.repeat(level) + 'reculer();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'obstacle':
			code += '<span class="tab"></span>'.repeat(level) + '</span>if (distanceAvecObstacle() <= ' + parameter + ') {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'playSound':
			code += '<span class="tab"></span>'.repeat(level) + 'jouerUnSon();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'thumbToPinky':
			code += '<span class="tab"></span>'.repeat(level) + '</span>if (liaisonPouceAuriculaire() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'stop':
			code += '<span class="tab"></span>'.repeat(level) + 'sarreter();<br />' + (level === 1 ? '<br />' : '');
			break;
		case 'rightRotation':
			code += '<span class="tab"></span>'.repeat(level) + '</span>if (rotationADroite() == true) {<br />[code]<span class="tab">}<br />' + (level === 1 ? '<br />' : '');
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
		}

		if (value instanceof Array) {
			code = code.replace(/\[code\]/g, arrayToCode(value[1], level + 1));
		} else {
			code = code.replace(/\[code\]/g, '');
		}
	});
	
	return code.replace(/\[code\]/g, '');
}

function loadBlocks() {
	var i, j, blockType, parameter;

	for (i = 0; i < eventBlocks.length; i++) {
		$('#evenements').append('<div class="typeTitle">' + eventBlocks[i].title + '</div>');
		
		for (j = 0; j < eventBlocks[i].blocks.length; j++) {
			blockType = eventBlocks[i].blocks[j];
			parameter = null;

			if (blockType.indexOf('(') !== -1) {
				parameter = parseInt(blockType.replace(/[^(]*\(([^)]*)\)$/, '$1'));
				blockType = blockType.replace(/\([^)]*\)$/, '');			
			}

			$('#evenements').append(getBlock(blockType, parameter));
		}
	}
	
	for (i = 0; i < actionBlocks.length; i++) {
		$('#actions').append('<div class="typeTitle">' + actionBlocks[i].title + '</div>');
		
		for (j = 0; j < actionBlocks[i].blocks.length; j++) {
			blockType = actionBlocks[i].blocks[j];
			parameter = null;

			if (blockType.indexOf('(') !== -1) {
				parameter = parseInt(blockType.replace(/[^(]*\(([^)]*)\)$/, '$1'));
				blockType = blockType.replace(/\([^)]*\)$/, '');			
			}

			$('#actions').append(getBlock(blockType, parameter));
		}
	}
}

function arrayToBlocks(blocksArray, target) {
	$.each(blocksArray, function(index, value) {
		var blockType = value instanceof Array ? value[0].toString() : value.toString(), parameter;

		if (blockType.indexOf('(') !== -1) {
			parameter = parseInt(blockType.replace(/[^(]*\(([^)]*)\)$/, '$1'));
			blockType = blockType.replace(/\([^)]*\)$/, '');			
		}
		
		target.append(getBlock(blockType, parameter));

		if (value instanceof Array) {
			arrayToBlocks(value[1], target.children('.block').last());
		}
	});
}

function blocksToArray(target) {
	var blocksArray = [];

	target.each(function() {
		var blockType = $(this).attr('data-block'), newTarget = $(this).children('.block');

		if (newTarget.length) {
			blocksArray.push([blockType + ($(this).find('input').first().length ? '(' + $(this).find('input').first().val() + ')' : ''), blocksToArray(newTarget)]);
		} else {
			blocksArray.push(blockType + ($(this).find('input').first().length ? '(' + $(this).find('input').first().val() + ')' : ''));
		}
	});
			
	return blocksArray;
}

function resize() {
	var windowHeight = Math.max($(window).height(), 550);
	
	$('.blocksContainer').css('min-height', windowHeight - 233);
	$('.codeContainer').css('min-height', windowHeight - 233);
	$('.programPane').css('max-height', windowHeight - 233);
	$('.blocks .tab-pane').css('max-height', windowHeight - 207);
	$('.blocks').css('height', windowHeight - 187);
	$('.programContainer').css('height', windowHeight - 223);
}

function updateCode() {
	var blockArray = blocksToArray($('.blocksContainer > .block')), code = arrayToCode(blockArray, 1);
	
	$('.codeContainer code').html(code.length ? 'while (1) {<br />' + code.substr(0, code.length - 6) + '}' : '');
	
	hljs.configure({useBR: true});
	
	$('.codeContainer code').each(function(i, block) {
	    $(this).removeClass('hljs');
		hljs.highlightBlock(block);
	  });

	if (blockArray.length) {
		// Download part
		$('#saveButton').attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(blockArray)));
		$('#saveButton').removeClass('disabled');
		$('#emptyContainerButton').removeClass('disabled');
	
	} else {
		// Download part
		$('#saveButton').attr('href', '#');
		$('#saveButton').addClass('disabled');
		$('#emptyContainerButton').addClass('disabled');
	}
}

$(function() {
	var dragElem, gmapInit = false, leaveTimeout;
	
	loadBlocks();
	resize();

	$('.block').attr('draggable', true);
	
	$('.block > div:first-child').each(function() {
		if ($(this).parent().attr('data-help')) {
			$(this).append('<span class="fa fa-question-circle helpBlock" data-toggle="tooltip"></span>');
			$(this).find('.helpBlock').tooltip({ placement: 'right', container: 'body', title: $(this).parent().attr('data-help') });
		}
	});
	
	$('.block > div:first-child').append('<span class="fa fa-times-circle removeBlock"></span>');
	
	$('input[type=number]').attr('min', 1);
	
	$('.container .row').first().remove();
	$('.container .row').show();

	$(document).on('dragstart', '.block', function(e) {
		e.stopPropagation();
		e.dataTransfer.effectAllowed = 'copy';
		e.dataTransfer.setData('text/plain', '');
		
		$('.helpBlock, .removeBlock').css('display', 'none');
		
		dragElem = $(this);

		$('.droppable').removeClass('droppable');
		
		if (dragElem.hasClass('eventBlock')) {
			if ($(this).parents('.blocksContainer').length || !$('.blocksContainer .eventBlock[data-block=' + $(this).attr('data-block') +  ']').length) {
				$('.blocksContainer').addClass('droppable');
			}
		} else if (dragElem.hasClass('actionBlock')) {
			$('.blocksContainer').addClass('droppable');
			$('.blocksContainer .eventBlock').addClass('droppable');
		}
	});
	
	$(document).on('dragend', '.block', function() {
		$('.helpBlock, .removeBlock').css('display', '');
		$('.droppable').removeClass('highlight');
		$('#marker').remove();
		updateCode();
	});
	
	$(document).on('mousemove', function() {
		if ($('#marker').length) {
			$('.helpBlock, .removeBlock').css('display', '');
			$('.droppable').removeClass('highlight');
			$('#marker').remove();
			updateCode();
		}
	});

	$(document).on('dragover', '.droppable', function(e) {
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
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function() {
		if ($(this).attr('href') === '#contact' && !gmapInit) {
			var map = $('#contact').find('iframe');
			map.attr('src', map.attr('data-src'));
			gmapInit = true;
		}
	});
});