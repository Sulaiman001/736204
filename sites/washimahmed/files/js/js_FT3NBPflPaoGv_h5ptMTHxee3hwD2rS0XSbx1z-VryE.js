(function ($) {

  Drupal.behaviors.fontyourfaceBrowse = {

    attach:function(context, settings) {

      $('#fontyourface-apply-tabs').tabs();;

      $('#fontyourface-apply-tabs .css-selector input').each(function(){

        var input = $(this);
        var selector = input.val();

        var select = $('<select><option value="">-- none --</option><option value="h1, h2, h3, h4, h5, h6">all headers (h1, h2, h3, h4, h5, h6)</option><option value="h1">h1</option><option value="h2">h2</option><option value="h3">h3</option><option value="p, div">standard text (p, div)</option><option value="body">everything (body)</option><option value="&lt;none&gt;">-- add selector in theme CSS --</option><option value="-- other --">other</option></select>')
          .change(fontyourfaceCssSelectChange)
          .insertBefore(input.parent());

        if (select.find('option[value="' + selector + '"]').length > 0) {

          select.find('option[value="' + selector + '"]').attr('selected', true);
          input.hide();

        } // if
        else {

          select.find('option[value="-- other --"]').attr('selected', true);
          input.show();

        } // else
        
      });

    } // attach

  } // Drupal.behaviors.fontyourfaceAddForm

  function fontyourfaceCssSelectChange() {

    var select = $(this);
    var selector = select.val();
    var input = select.parent().find('input');
    var fontFamily = select.parent().attr('data-font-family');
    var fontStyle = select.parent().attr('data-font-style');
    var fontWeight = select.parent().attr('data-font-weight');

    if (selector == '-- other --') {

      if (input.val() == '<none>') {
        input.val('');
      } // if

      input.show();

    } // if
    else {

      input.val(selector);
      input.hide();
      select.parent().find('.font-family').remove();

      if (selector == '<none>') {

        var themeInstructions = 'font-family: ' + fontFamily + ';';
        if (fontStyle) {
          themeInstructions += ' font-style: ' + fontStyle + ';';
        }
        if (fontWeight) {
          themeInstructions += ' font-weight: ' + fontWeight + ';';
        }
        select.parent().append('<div class="font-family">' + themeInstructions + '</div>');

      } // if

    } // else

  } // fontyourfaceCssSelectChange

})(jQuery);
;
(function($) {

Drupal.admin = Drupal.admin || {};
Drupal.admin.behaviors = Drupal.admin.behaviors || {};

/**
 * @ingroup admin_behaviors
 * @{
 */

/**
 * Apply active trail highlighting based on current path.
 *
 * @todo Not limited to toolbar; move into core?
 */
Drupal.admin.behaviors.toolbarActiveTrail = function (context, settings, $adminMenu) {
  if (settings.admin_menu.toolbar && settings.admin_menu.toolbar.activeTrail) {
    $adminMenu.find('> div > ul > li > a[href="' + settings.admin_menu.toolbar.activeTrail + '"]').addClass('active-trail');
  }
};

/**
 * @} End of "ingroup admin_behaviors".
 */

Drupal.admin.behaviors.shorcutcollapsed = function (context, settings, $adminMenu) {

  // Create the dropdown base 
  $("<li class=\"label\"><a>"+Drupal.t('Shortcuts')+"</a></li>").prependTo("body.menu-render-collapsed div.toolbar-shortcuts ul"); 

}

Drupal.admin.behaviors.shorcutselect = function (context, settings, $adminMenu) {

  // Create the dropdown base
  $("<select id='shortcut-menu'/>").appendTo("body.menu-render-dropdown div.toolbar-shortcuts");
    
  // Create default option "Select"
  $("<option />", {
    "selected"  :  "selected",
    "value"     :  "",
    "text"      :  Drupal.t('Shortcuts')
  }).appendTo("body.menu-render-dropdown div.toolbar-shortcuts select");
    
  // Populate dropdown with menu items
  $("body.menu-render-dropdown div.toolbar-shortcuts a").each(function() {
    var el = $(this);
    $("<option />", {
      "value"   :  el.attr("href"),
      "text"    :  el.text()
    }).appendTo("body.menu-render-dropdown div.toolbar-shortcuts select");
    });
    
  $("body.menu-render-dropdown div.toolbar-shortcuts select").change(function() {
    window.location = $(this).find("option:selected").val();
  });
  
  $('body.menu-render-dropdown div.toolbar-shortcuts ul').remove();

};

})(jQuery);
;
