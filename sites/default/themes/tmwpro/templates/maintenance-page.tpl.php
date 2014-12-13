<?php

/**
 * @file
 * Implementation to display a single Drupal page while offline.
 *
 * All the available variables are mirrored in page.tpl.php.
 *
 * @see template_preprocess()
 * @see template_preprocess_maintenance_page()
 * @see bartik_process_maintenance_page()
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">
<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
	<link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,900,300italic,400italic,700italic' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700,300&amp;subset=latin,latin-ext' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=PT+Serif' rel='stylesheet' type='text/css'>
  <?php print $styles; ?>
</head>
<body class="not-front <?php print $classes; ?>" <?php print $attributes;?>>
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
  </div>
	<div class="page-wrapper" style="height: 500px;">
		<!-- scrollToTop start -->
		<div class="scrollToTop"><i class="fa fa-angle-up"></i></div>
		<!-- scrollToTop end -->
		<section class="main">
			<!-- page intro start -->
			<div class="page-intro">
				<div class="container">
					<div class="row">
						<div class="col-md-6">
							<h1 class="page-title">Site Under Maintenance</h1>
						</div>
					</div>
				</div>
			</div>
			<!-- page intro end -->
			<!-- main content wrapper start -->
			<div class="main-content-wrapper">
				<div class="container">
					<div class="row">
						<!-- main-content start -->
						<section class="main-content col-md-12">
							<div class="icon-box-2 pt-clear">
								<i class="fa fa-sitemap object-non-visible" data-animation-effect="fadeInUpSmall" data-effect-delay="400"></i>
							</div>
							<h2 class="title">We are maintaining our website. Men at Work.</h2>
							<p>TMW Groups is currently under maintenance. We should be back shortly. Thank you for your patience.</p>
						</section>
						<!-- main-content end -->
					</div>
				</div>
			</div>
			<!-- main content wrapper end -->
		</section>
	</div>
<?php print $scripts; ?>
</body>
</html>
