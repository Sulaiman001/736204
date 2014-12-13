<?php

/**
 * @file
 * Contains a pre-process hook for 'block'.
 */

/**
 * Implements hook_preprocess_TEMPLATE().
 */
function professional_preprocess_block(&$variables) {
  $block = $variables['block'];
  if ($block->region == 'navigation' && _professional_is_menu_block($block)) {
    $variables['attributes_array']['class'][] = 'block--nav-bar';
  }
}
