<?php
function tmwpro_process_page(&$variables) {
	$tree = menu_tree_all_data('main-menu', NULL, 3);
	$variables['main_menu'] = _tmwpro_mainmenu($tree);
	$theme_settings = theme_get_setting('tmwpro_exclude_title');
	$settings = explode(',', $theme_settings);
	if (in_array($variables['title'], $settings)) {
		$variables['is_front'] = TRUE;
	}
}

function _tmwpro_mainmenu($tree) {
	global $user;
	$user = user_load($user->uid);
	if ($user->uid > 0) {
		$signinsignup = '<li class="dropdown mega-menu-item mega-menu-signin signin logged" id="headerAccount">
		<a class="dropdown-toggle" href="/user"><i class="fa fa-user"></i> '.$user->name.' <i class="fa fa-angle-down"></i></a>
		<ul class="dropdown-menu">
			<li>
				<div class="mega-menu-content">
					<div class="row">
						<div class="col-md-8">
							<div class="user-avatar">
								<div class="img-thumbnail">
									<img src="'.file_create_url($user->picture->uri).'" alt="'.$user->picture->filename.'">
								</div>
								<p><strong>'.$user->field_full_name['und'][0]['value'].'</strong><span>'.$user->field_something_about_you['und'][0]['safe_value'].'</span></p>
							</div>
						</div>
						<div class="col-md-4">
							<ul class="list-account-options">
								<li><a href="/user">My Account</a></li>
								<li><a href="/user/logout">Log Out</a></li>
							</ul>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</li>';
	}
	else {
		$signinsignup = '<li class="mega-menu-item mega-menu-signin signin" id="headerAccount"><a class="dropdown-toggle" href="/user"><i class="fa fa-user"></i> SIGN IN</a></li>';
	}
	foreach ($tree as $bluemenu) {
		if (!empty($bluemenu['below']) && $bluemenu['link']['expanded'] == 1) {
			$foo = '';
			$bluemenu['link']['link_title'] == menu_get_active_title() ? $foo = 'active' : NULL;
			$html[] = '<li class="dropdown '.$foo.'">';
			$html[] = '<a class="dropdown-toggle" href="'.url($bluemenu['link']['link_path']).'">'.$bluemenu['link']['link_title'].' <i class="fa fa-angle-down"></i></a>';
			$html[] = '<ul class="dropdown-menu">';
			foreach ($bluemenu['below'] as $dropdown) {
				if (!empty($dropdown['below'])) {
					$html[] = '<li class="dropdown-submenu"><a href="'.url($dropdown['link']['link_path']).'">'.$dropdown['link']['link_title'].'</a>';
					$html[] = '<ul class="dropdown-menu">';
					foreach ($dropdown['below'] as $submenu) {
						$html[] = '<li><a href="'.url($submenu['link']['link_path']).'">'.$submenu['link']['link_title'].'</a></li>';
					}
					$html[] = '</ul></li>';
				}
				else {
					$html[] = '<li><a href="'.url($dropdown['link']['link_path']).'">'.$dropdown['link']['link_title'].'</a></li>';
				}
			}
			$html[] = '</ul>';
			$html[] = '</li>';
		}
		else {
			$foo = '';
			$bluemenu['link']['link_title'] == menu_get_active_title() ? $foo = 'active' : NULL;
			$html[] = '<li class="'.$foo.'"><a href="'.url($bluemenu['link']['link_path']).'">'.$bluemenu['link']['link_title'].'</a></li>';
		}
	}
	$html = '<ul class="nav nav-pills nav-main" id="mainMenu">' . implode("\n", $html) . $signinsignup . '</ul>';
	return $html;
}

/**
 * Implements hook_element_info_alter().
 */
function tmwpro_element_info_alter(&$elements) {
  foreach ($elements as &$element) {
    $element['#process'][] = 'tmwpro_process_element';
    if (!empty($element['#input'])) {
      $element['#process'][] = 'tmwpro_process_input';
    }
  }
}

/**
 * Process all elements.
 */
function tmwpro_process_element(&$element, &$form_state) {
	if (!empty($element['#attributes']['class']) && is_array($element['#attributes']['class'])) {
    if (in_array('container-inline', $element['#attributes']['class'])) {
      $element['#attributes']['class'][] = 'form-inline';
    }
    if (in_array('form-wrapper', $element['#attributes']['class'])) {
      $element['#attributes']['class'][] = 'form-group';
    }
  }
  return $element;
}

/**
 * Process input elements.
 */
function tmwpro_process_input(&$element, &$form_state) {
	$types = array(
    'textfield',
    'textarea',
    'password',
    'password_confirm',
    'select',
    'machine_name',
    'webform_email',
    'emailfield',
    'numberfield',
    'rangefield',
    'searchfield',
    'telfield',
    'urlfield',
  );
  if (!empty($element['#type']) && (in_array($element['#type'], $types))) {
    $element['#attributes']['class'][] = 'form-control';
  }
  return $element;
}

function tmwpro_form_alter(&$form, &$form_state, $form_id) {
  $form['actions']['submit']['#attributes']['class'][] = 'btn btn-primary btn-lg';
	$form['actions']['preview']['#attributes']['class'][] = 'btn btn-info btn-lg padleft';
	$form['actions']['delete']['#attributes']['class'][] = 'btn btn-danger btn-lg padleft';
}

function tmwpro_menu_local_tasks(&$variables) {
  $output = '';
	if (!empty($variables['primary'])) {
		$variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
		$variables['primary']['#prefix'] .= '<ul class="nav nav-tabs">';
		$variables['primary']['#suffix'] = '</ul>';
		$output .= drupal_render($variables['primary']);
	}
	if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="nav nav-tabs">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }
	return $output;
}