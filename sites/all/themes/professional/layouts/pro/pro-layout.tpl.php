<div<?php print $attributes; ?>>
	<div class="wrapper col1">
		<?php print render($page['branding']); ?>
	</div>
	<div class="wrapper col2">
		<div id="topbar">
			<?php print render($page['navigation']); ?>
		</div>
	</div>
	<div class="wrapper col3">
		<?php if($breadcrumb):?>
		<div id="breadcrumb">
			<?php print $breadcrumb; ?>
		</div>
		<?php endif;?>
		<?php print render($tabs); ?>
		<?php if($messages):?>
		<div class="messages_info">
			<?php print $messages; ?>
		</div>
		<?php endif;?>
		<?php print render($page['header']); ?>
		<?php print render($page['hero']); ?>
		<?php print render($page['highlighted']); ?>
		<?php print render($page['help']); ?>
	</div>
	<div class="wrapper col4">
		<div id="container">
			<?php if ($title): ?>
        <h1><?php print $title; ?></h1>
      <?php endif; ?>
			<?php print render($page['content']); ?>
		</div>
	</div>
	<div class="wrapper col6">
		<div id="footer">
			<div class="footbox">
				<?php print render($page['footer_first']); ?>
			</div>
			<div class="footbox">
				<?php print render($page['footer_second']); ?>
			</div>
			<div class="footbox">
				<?php print render($page['footer_third']); ?>
			</div>
			<div class="footbox">
				<?php print render($page['footer_fourth']); ?>
			</div>
		</div>
	</div>
	<div class="wrapper col7">
		<div id="copyright">
			<?php print render($page['footer']); ?>
			<p class="fl_right">Design and Developed by <a href="http://www.tmwgroups.com">TMW Groups</a></p>
			<br class="clear">
		</div>
	</div>
</div>