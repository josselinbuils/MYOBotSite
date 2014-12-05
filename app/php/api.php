<?php
	session_start();
	
	$action = isset($_POST['action']) ? htmlspecialchars($_POST['action']) : (isset($_GET['action']) ? htmlspecialchars($_GET['action']) : null);
	
	$show = '';
	
	// Connexion a la BDD
	
	function bddConnection() {
		global $bdd;
		$pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
		$bdd = new PDO('mysql:host=sql3.exolia.fr;dbname=youbiweb', 'youbi325', 'Boxster987', $pdo_options);
		$bdd->query('SET NAMES UTF8');
	}

	switch ($action) {
		case 'checkConnection':
			$show = isset($_SESSION['status']) && $_SESSION['status'] == 'connected' ? $_SESSION['username'] : 'NotConnected';
			break;
		
		case 'connection':
			$user = isset($_POST['user']) ? htmlspecialchars($_POST['user']) : null;
			$password = isset($_POST['password']) ? htmlspecialchars($_POST['password']) : null;

			if ($user) {
				bddConnection();
			
				$req = 'SELECT *
					FROM myop_utilisateurs
					WHERE utilisateur="' . $user . '"';
			
				if (!($res = $bdd->query($req))) {
					$show = 'RequestError';
				
				} else if ($data = $res->fetch()) {
					
					if ($password == $data['mdp']) {
						$_SESSION['status'] = 'connected';
						$_SESSION['user'] = $data['id'];
						$_SESSION['username'] = $data['utilisateur'];
						$show = 'Connected';
					} else {
						$show = 'BadPasswordError';
					}
				} else {
					$show = 'BadUserError';
				}

				$res->closeCursor();
			}
			break;
			
		case 'getProgram':
			bddConnection();
					
			$req = 'SELECT *
				FROM myop_programmes
				WHERE utilisateur="' . $_SESSION['user'] . '"';
					
			if (!($res = $bdd->query($req))) {
				$show = 'RequestError';
	
			} else if ($data = $res->fetch()) {
				$show = $data['programme'];
			}
		
			$res->closeCursor();
			break;
			
		case 'getUserProgram':
			$user = isset($_GET['user']) ? htmlspecialchars($_GET['user']) : null;
			
			if ($user) {
			
				bddConnection();
					
				$req = 'SELECT myop_programmes.programme
					FROM myop_programmes
					JOIN myop_utilisateurs ON myop_utilisateurs.id=myop_programmes.utilisateur
					WHERE myop_utilisateurs.utilisateur="' . $user . '"';
					
				if (!($res = $bdd->query($req))) {
					$show = 'RequestError';
			
				} else if ($data = $res->fetch()) {
					$show = $data['programme'];
				}
			
				$res->closeCursor();
			}
			break;
			
		case 'setProgram':
			$program = isset($_POST['program']) ? urldecode($_POST['program']) : null;
			
			if ($program) {
				bddConnection();
						
				$req = 'SELECT COUNT(*)
					FROM myop_programmes
					WHERE utilisateur="' . $_SESSION['user'] . '"';
						
				if (!($res = $bdd->query($req))) {
					$show = 'RequestError';
		
				} else if ($data = $res->fetch()) {
					
					// Modification
					if ($data[0] > 0) {
						$req = 'UPDATE myop_programmes SET programme=\'' . $program . '\' WHERE utilisateur=' . $_SESSION['user'];
	
						if (!($res = $bdd->query($req))) {
							$show = 'RequestError';
						} else {
							$show = 'UpdatedProgram';
						}

					// Ajout
					} else {
						$req = 'INSERT INTO myop_programmes (utilisateur, programme) VALUES (' . $_SESSION['user'] . ', \'' . $program . '\')';
						
						if (!($res = $bdd->query($req))) {
							$show = 'RequestError';
						} else {
							$show = 'UpdatedProgram';
						}
					}
				}
		
				$res->closeCursor();
			} else {
				$show = 'NoProgramError';
			}
			break;
			
		case 'logout':
			$_SESSION = array();
			session_destroy();
			session_start();
			break;
	}
	
	echo $show ? $show : 'NothingError';
?>