<!DOCTYPE html>
<html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><html class="no-js"><![endif]-->
<head profile="<?php print $grddl_profile; ?>">
  <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <link href='http://fonts.googleapis.com/css?family=Lato:300,400' rel='stylesheet' type='text/css'>
  <!--[if IE 7]>
  <link rel="stylesheet" type="text/css" href="css/icons/font-awesome-ie7.min.css"/>
  <![endif]-->
  <style>
  @media only screen and (max-width : 991px){
    .resp-vtabs .resp-tabs-container {
      margin-left: 13px;
    }
  }
  @media only screen and (min-width : 800px) and (max-width : 991px){
    .resp-vtabs .resp-tabs-container {
      margin-left: 13px;
      width:89%;
    }
  }			
  </style>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
  </div>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
	<?php print $scripts; ?>
</body>
</html>
