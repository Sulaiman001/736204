(function ($) {
Drupal.behaviors.myModuleSecureLink = {
  attach: function (context, settings) {
	$('.page-user .region-content,.page-newsletter .region-content,.page-search .region-content').addClass('container');
    $('#user-login,#user-pass,#user-register-form,.block-newsletter,#newsletter-manage-subscriptions-form').addClass('tmwbox col-md-7');
  }
};
}(jQuery));