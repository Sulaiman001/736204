<?php

/**
 * @file
 * Theme setting callbacks for the garland theme.
 */

/**
 * Implements hook_form_FORM_ID_alter().
 *
 * @param $form
 *   The form.
 * @param $form_state
 *   The form state.
 */
function tmwpro_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['tmwpro_exclude_title'] = array(
    '#type' => 'textarea',
    '#title' => t('Enter page title to exclude'),
    '#default_value' => theme_get_setting('tmwpro_exclude_title'),
    '#description' => t('Specify page title separated by (,)'),
  );
}
