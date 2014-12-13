<div class="body">
	<header id="header">
		<div class="container">
			<h1 class="logo">
				<a href="<?php print $front_page;?>" title="<?php print t('Home'); ?>">
					<img width="256" height="76" data-sticky-width="158" data-sticky-height="50" src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>">
				</a>
			</h1>
			<?php print render($page['topsearch']); ?>
			<ul class="social-icons">
				<?php print render($page['social']); ?>
			</ul>
			<nav>
				<?php print render($page['topmenu']); ?>
			</nav>
			<button class="btn btn-responsive-nav btn-inverse" data-toggle="collapse" data-target=".nav-main-collapse">
				<i class="fa fa-bars"></i>
			</button>
		</div>
		<div class="navbar-collapse nav-main-collapse collapse">
			<div class="container">
				<nav class="nav-main mega-menu">
				<?php print $main_menu;?>
				</nav>
			</div>
		</div>
	</header>
	<div role="main" class="main">
		<?php if(!$is_front):?>
		<section class="page-top">
			<div class="container">
				<?php if ($breadcrumb): ?>
				<div class="row">
					<div class="col-md-12">
							<ul class="breadcrumb"><?php print $breadcrumb; ?></ul>
					</div>
				</div>
				<?php endif; ?>
				<div class="row">
					<div class="col-md-12">
						<h2><?php print $title; ?></h2>
					</div>
				</div>
			</div>
		</section>
		<?php if ($tabs): ?><div class="container"><?php print render($tabs); ?></div></div><?php endif; ?>
		<?php if ($messages): ?><div class="container"><?php print $messages; ?></div><?php endif; ?>
		<?php endif;?>
		<?php print render($page['header']); ?>
		<?php print render($page['banner']); ?>
		<?php print render($page['content']); ?>
	</div>
	<?php print render($page['footer']); ?>
</div>