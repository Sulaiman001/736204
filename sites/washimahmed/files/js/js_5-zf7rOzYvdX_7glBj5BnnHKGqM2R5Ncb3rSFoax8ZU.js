(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 *
 * Implement a modal form.
 *
 * @see modal.inc for documentation.
 *
 * This javascript relies on the CTools ajax responder.
 */

(function ($) {
  // Make sure our objects are defined.
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.Modal = Drupal.CTools.Modal || {};

  /**
   * Display the modal
   *
   * @todo -- document the settings.
   */
  Drupal.CTools.Modal.show = function(choice) {
    var opts = {};

    if (choice && typeof choice == 'string' && Drupal.settings[choice]) {
      // This notation guarantees we are actually copying it.
      $.extend(true, opts, Drupal.settings[choice]);
    }
    else if (choice) {
      $.extend(true, opts, choice);
    }

    var defaults = {
      modalTheme: 'CToolsModalDialog',
      throbberTheme: 'CToolsModalThrobber',
      animation: 'show',
      animationSpeed: 'fast',
      modalSize: {
        type: 'scale',
        width: .8,
        height: .8,
        addWidth: 0,
        addHeight: 0,
        // How much to remove from the inner content to make space for the
        // theming.
        contentRight: 25,
        contentBottom: 45
      },
      modalOptions: {
        opacity: .55,
        background: '#fff'
      }
    };

    var settings = {};
    $.extend(true, settings, defaults, Drupal.settings.CToolsModal, opts);

    if (Drupal.CTools.Modal.currentSettings && Drupal.CTools.Modal.currentSettings != settings) {
      Drupal.CTools.Modal.modal.remove();
      Drupal.CTools.Modal.modal = null;
    }

    Drupal.CTools.Modal.currentSettings = settings;

    var resize = function(e) {
      // When creating the modal, it actually exists only in a theoretical
      // place that is not in the DOM. But once the modal exists, it is in the
      // DOM so the context must be set appropriately.
      var context = e ? document : Drupal.CTools.Modal.modal;

      if (Drupal.CTools.Modal.currentSettings.modalSize.type == 'scale') {
        var width = $(window).width() * Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = $(window).height() * Drupal.CTools.Modal.currentSettings.modalSize.height;
      }
      else {
        var width = Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = Drupal.CTools.Modal.currentSettings.modalSize.height;
      }

      // Use the additionol pixels for creating the width and height.
      $('div.ctools-modal-content', context).css({
        'width': width + Drupal.CTools.Modal.currentSettings.modalSize.addWidth + 'px',
        'height': height + Drupal.CTools.Modal.currentSettings.modalSize.addHeight + 'px'
      });
      $('div.ctools-modal-content .modal-content', context).css({
        'width': (width - Drupal.CTools.Modal.currentSettings.modalSize.contentRight) + 'px',
        'height': (height - Drupal.CTools.Modal.currentSettings.modalSize.contentBottom) + 'px'
      });
    }

    if (!Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.modal = $(Drupal.theme(settings.modalTheme));
      if (settings.modalSize.type == 'scale') {
        $(window).bind('resize', resize);
      }
    }

    resize();

    $('span.modal-title', Drupal.CTools.Modal.modal).html(Drupal.CTools.Modal.currentSettings.loadingText);
    Drupal.CTools.Modal.modalContent(Drupal.CTools.Modal.modal, settings.modalOptions, settings.animation, settings.animationSpeed);
    $('#modalContent .modal-content').html(Drupal.theme(settings.throbberTheme));

    // Position autocomplete results based on the scroll position of the modal.
    $('#modalContent .modal-content').delegate('input.form-autocomplete', 'keyup', function() {
      $('#autocomplete').css('top', $(this).position().top + $(this).outerHeight() + $(this).offsetParent().filter('#modal-content').scrollTop());
    });
  };

  /**
   * Hide the modal
   */
  Drupal.CTools.Modal.dismiss = function() {
    if (Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.unmodalContent(Drupal.CTools.Modal.modal);
    }
  };

  /**
   * Provide the HTML to create the modal dialog.
   */
  Drupal.theme.prototype.CToolsModalDialog = function () {
    var html = ''
    html += '  <div id="ctools-modal">'
    html += '    <div class="ctools-modal-content">' // panels-modal-content
    html += '      <div class="modal-header">';
    html += '        <a class="close" href="#">';
    html +=            Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '        </a>';
    html += '        <span id="modal-title" class="modal-title">&nbsp;</span>';
    html += '      </div>';
    html += '      <div id="modal-content" class="modal-content">';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    return html;
  }

  /**
   * Provide the HTML to create the throbber.
   */
  Drupal.theme.prototype.CToolsModalThrobber = function () {
    var html = '';
    html += '  <div id="modal-throbber">';
    html += '    <div class="modal-throbber-wrapper">';
    html +=        Drupal.CTools.Modal.currentSettings.throbber;
    html += '    </div>';
    html += '  </div>';

    return html;
  };

  /**
   * Figure out what settings string to use to display a modal.
   */
  Drupal.CTools.Modal.getSettings = function (object) {
    var match = $(object).attr('class').match(/ctools-modal-(\S+)/);
    if (match) {
      return match[1];
    }
  }

  /**
   * Click function for modals that can be cached.
   */
  Drupal.CTools.Modal.clickAjaxCacheLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return Drupal.CTools.AJAX.clickAJAXCacheLink.apply(this);
  };

  /**
   * Handler to prepare the modal for the response
   */
  Drupal.CTools.Modal.clickAjaxLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return false;
  };

  /**
   * Submit responder to do an AJAX submit on all modal forms.
   */
  Drupal.CTools.Modal.submitAjaxForm = function(e) {
    var $form = $(this);
    var url = $form.attr('action');

    setTimeout(function() { Drupal.CTools.AJAX.ajaxSubmit($form, url); }, 1);
    return false;
  }

  /**
   * Bind links that will open modals to the appropriate function.
   */
  Drupal.behaviors.ZZCToolsModal = {
    attach: function(context) {
      // Bind links
      // Note that doing so in this order means that the two classes can be
      // used together safely.
      /*
       * @todo remimplement the warm caching feature
       $('a.ctools-use-modal-cache', context).once('ctools-use-modal', function() {
         $(this).click(Drupal.CTools.Modal.clickAjaxCacheLink);
         Drupal.CTools.AJAX.warmCache.apply(this);
       });
        */

      $('area.ctools-use-modal, a.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        // Create a drupal ajax object
        var element_settings = {};
        if ($this.attr('href')) {
          element_settings.url = $this.attr('href');
          element_settings.event = 'click';
          element_settings.progress = { type: 'throbber' };
        }
        var base = $this.attr('href');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });

      // Bind buttons
      $('input.ctools-use-modal, button.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        var button = this;
        var element_settings = {};

        // AJAX submits specified in this manner automatically submit to the
        // normal form action.
        element_settings.url = Drupal.CTools.Modal.findURL(this);
        if (element_settings.url == '') {
          element_settings.url = $(this).closest('form').attr('action');
        }
        element_settings.event = 'click';
        element_settings.setClick = true;

        var base = $this.attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);

        // Make sure changes to settings are reflected in the URL.
        $('.' + $(button).attr('id') + '-url').change(function() {
          Drupal.ajax[base].options.url = Drupal.CTools.Modal.findURL(button);
        });
      });

      // Bind our custom event to the form submit
      $('#modal-content form', context).once('ctools-use-modal', function() {
        var $this = $(this);
        var element_settings = {};

        element_settings.url = $this.attr('action');
        element_settings.event = 'submit';
        element_settings.progress = { 'type': 'throbber' }
        var base = $this.attr('id');

        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        Drupal.ajax[base].form = $this;

        $('input[type=submit], button', this).click(function(event) {
          Drupal.ajax[base].element = this;
          this.form.clk = this;
          // Stop autocomplete from submitting.
          if (Drupal.autocompleteSubmit && !Drupal.autocompleteSubmit()) {
            return false;
          }
          // An empty event means we were triggered via .click() and
          // in jquery 1.4 this won't trigger a submit.
          if (event.bubbles == undefined) {
            $(this.form).trigger('submit');
            return false;
          }
        });
      });

      // Bind a click handler to allow elements with the 'ctools-close-modal'
      // class to close the modal.
      $('.ctools-close-modal', context).once('ctools-close-modal')
        .click(function() {
          Drupal.CTools.Modal.dismiss();
          return false;
        });
    }
  };

  // The following are implementations of AJAX responder commands.

  /**
   * AJAX responder command to place HTML within the modal.
   */
  Drupal.CTools.Modal.modal_display = function(ajax, response, status) {
    if ($('#modalContent').length == 0) {
      Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(ajax.element));
    }
    $('#modal-title').html(response.title);
    // Simulate an actual page load by scrolling to the top after adding the
    // content. This is helpful for allowing users to see error messages at the
    // top of a form, etc.
    $('#modal-content').html(response.output).scrollTop(0);

    // Attach behaviors within a modal dialog.
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.attachBehaviors('#modalContent', settings);
  }

  /**
   * AJAX responder command to dismiss the modal.
   */
  Drupal.CTools.Modal.modal_dismiss = function(command) {
    Drupal.CTools.Modal.dismiss();
    $('link.ctools-temporary-css').remove();
  }

  /**
   * Display loading
   */
  //Drupal.CTools.AJAX.commands.modal_loading = function(command) {
  Drupal.CTools.Modal.modal_loading = function(command) {
    Drupal.CTools.Modal.modal_display({
      output: Drupal.theme(Drupal.CTools.Modal.currentSettings.throbberTheme),
      title: Drupal.CTools.Modal.currentSettings.loadingText
    });
  }

  /**
   * Find a URL for an AJAX button.
   *
   * The URL for this gadget will be composed of the values of items by
   * taking the ID of this item and adding -url and looking for that
   * class. They need to be in the form in order since we will
   * concat them all together using '/'.
   */
  Drupal.CTools.Modal.findURL = function(item) {
    var url = '';
    var url_class = '.' + $(item).attr('id') + '-url';
    $(url_class).each(
      function() {
        var $this = $(this);
        if (url && $this.val()) {
          url += '/';
        }
        url += $this.val();
      });
    return url;
  };


  /**
   * modalContent
   * @param content string to display in the content box
   * @param css obj of css attributes
   * @param animation (fadeIn, slideDown, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.modalContent = function(content, css, animation, speed) {
    // If our animation isn't set, make it just show/pop
    if (!animation) {
      animation = 'show';
    }
    else {
      // If our animation isn't "fadeIn" or "slideDown" then it always is show
      if (animation != 'fadeIn' && animation != 'slideDown') {
        animation = 'show';
      }
    }

    if (!speed) {
      speed = 'fast';
    }

    // Build our base attributes and allow them to be overriden
    css = jQuery.extend({
      position: 'absolute',
      left: '0px',
      margin: '0px',
      background: '#000',
      opacity: '.55'
    }, css);

    // Add opacity handling for IE.
    css.filter = 'alpha(opacity=' + (100 * css.opacity) + ')';
    content.hide();

    // if we already ahve a modalContent, remove it
    if ( $('#modalBackdrop')) $('#modalBackdrop').remove();
    if ( $('#modalContent')) $('#modalContent').remove();

    // position code lifted from http://www.quirksmode.org/viewport/compatibility.html
    if (self.pageYOffset) { // all except Explorer
    var wt = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
      var wt = document.documentElement.scrollTop;
    } else if (document.body) { // all other Explorers
      var wt = document.body.scrollTop;
    }

    // Get our dimensions

    // Get the docHeight and (ugly hack) add 50 pixels to make sure we dont have a *visible* border below our div
    var docHeight = $(document).height() + 50;
    var docWidth = $(document).width();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    if( docHeight < winHeight ) docHeight = winHeight;

    // Create our divs
    $('body').append('<div id="modalBackdrop" style="z-index: 1000; display: none;"></div><div id="modalContent" style="z-index: 1001; position: absolute;">' + $(content).html() + '</div>');

    // Keyboard and focus event handler ensures focus stays on modal elements only
    modalEventHandler = function( event ) {
      target = null;
      if ( event ) { //Mozilla
        target = event.target;
      } else { //IE
        event = window.event;
        target = event.srcElement;
      }

      var parents = $(target).parents().get();
      for (var i = 0; i < parents.length; ++i) {
        var position = $(parents[i]).css('position');
        if (position == 'absolute' || position == 'fixed') {
          return true;
        }
      }
      if( $(target).filter('*:visible').parents('#modalContent').size()) {
        // allow the event only if target is a visible child node of #modalContent
        return true;
      }
      if ( $('#modalContent')) $('#modalContent').get(0).focus();
      return false;
    };
    $('body').bind( 'focus', modalEventHandler );
    $('body').bind( 'keypress', modalEventHandler );

    // Create our content div, get the dimensions, and hide it
    var modalContent = $('#modalContent').css('top','-1000px');
    var mdcTop = wt + ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
    var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);
    $('#modalBackdrop').css(css).css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').show();
    modalContent.css({top: mdcTop + 'px', left: mdcLeft + 'px'}).hide()[animation](speed);

    // Bind a click for closing the modalContent
    modalContentClose = function(){close(); return false;};
    $('.close').bind('click', modalContentClose);

    // Bind a keypress on escape for closing the modalContent
    modalEventEscapeCloseHandler = function(event) {
      if (event.keyCode == 27) {
        close();
        return false;
      }
    };

    $(document).bind('keydown', modalEventEscapeCloseHandler);

    // Close the open modal content and backdrop
    function close() {
      // Unbind the events
      $(window).unbind('resize',  modalContentResize);
      $('body').unbind( 'focus', modalEventHandler);
      $('body').unbind( 'keypress', modalEventHandler );
      $('.close').unbind('click', modalContentClose);
      $('body').unbind('keypress', modalEventEscapeCloseHandler);
      $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

      // Set our animation parameters and use them
      if ( animation == 'fadeIn' ) animation = 'fadeOut';
      if ( animation == 'slideDown' ) animation = 'slideUp';
      if ( animation == 'show' ) animation = 'hide';

      // Close the content
      modalContent.hide()[animation](speed);

      // Remove the content
      $('#modalContent').remove();
      $('#modalBackdrop').remove();
    };

    // Move and resize the modalBackdrop and modalContent on resize of the window
     modalContentResize = function(){
      // Get our heights
      var docHeight = $(document).height();
      var docWidth = $(document).width();
      var winHeight = $(window).height();
      var winWidth = $(window).width();
      if( docHeight < winHeight ) docHeight = winHeight;

      // Get where we should move content to
      var modalContent = $('#modalContent');
      var mdcTop = ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
      var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);

      // Apply the changes
      $('#modalBackdrop').css('height', docHeight + 'px').css('width', docWidth + 'px').show();
      modalContent.css('top', mdcTop + 'px').css('left', mdcLeft + 'px').show();
    };
    $(window).bind('resize', modalContentResize);

    $('#modalContent').focus();
  };

  /**
   * unmodalContent
   * @param content (The jQuery object to remove)
   * @param animation (fadeOut, slideUp, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.unmodalContent = function(content, animation, speed)
  {
    // If our animation isn't set, make it just show/pop
    if (!animation) { var animation = 'show'; } else {
      // If our animation isn't "fade" then it always is show
      if (( animation != 'fadeOut' ) && ( animation != 'slideUp')) animation = 'show';
    }
    // Set a speed if we dont have one
    if ( !speed ) var speed = 'fast';

    // Unbind the events we bound
    $(window).unbind('resize', modalContentResize);
    $('body').unbind('focus', modalEventHandler);
    $('body').unbind('keypress', modalEventHandler);
    $('.close').unbind('click', modalContentClose);
    $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

    // jQuery magic loop through the instances and run the animations or removal.
    content.each(function(){
      if ( animation == 'fade' ) {
        $('#modalContent').fadeOut(speed, function() {
          $('#modalBackdrop').fadeOut(speed, function() {
            $(this).remove();
          });
          $(this).remove();
        });
      } else {
        if ( animation == 'slide' ) {
          $('#modalContent').slideUp(speed,function() {
            $('#modalBackdrop').slideUp(speed, function() {
              $(this).remove();
            });
            $(this).remove();
          });
        } else {
          $('#modalContent').remove();
          $('#modalBackdrop').remove();
        }
      }
    });
  };

$(function() {
  Drupal.ajax.prototype.commands.modal_display = Drupal.CTools.Modal.modal_display;
  Drupal.ajax.prototype.commands.modal_dismiss = Drupal.CTools.Modal.modal_dismiss;
});

})(jQuery);
;
/**
 * @file
 * Implement basic methods required by all of panels.
 */

(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.changed = function(item) {
    if (!item.is('.changed')) {
      item.addClass('changed');
      item.find('div.grabber span.text').append(' <span class="star">*</span> ');
    }
  };

  Drupal.Panels.restripeTable = function(table) {
    // :even and :odd are reversed because jquery counts from 0 and
    // we count from 1, so we're out of sync.
    $('tbody tr:not(:hidden)', $(table))
      .removeClass('even')
      .removeClass('odd')
      .filter(':even')
        .addClass('odd')
      .end()
      .filter(':odd')
        .addClass('even');
  };
})(jQuery);
;
/**
 * @file display_editor.js
 *
 * Contains the javascript for the Panels display editor.
 */

(function ($) {

// randomly lock a pane.
// @debug only
Drupal.settings.Panels = Drupal.settings.Panels || {};


/** Delete pane button **/
Drupal.Panels.bindClickDelete = function(context) {
  $('a.pane-delete:not(.pane-delete-processed)', context)
    .addClass('pane-delete-processed')
    .click(function() {
    if (confirm(Drupal.t('Remove this pane?'))) {
      var id = '#' + $(this).attr('id').replace('pane-delete-', '');
      $(id).remove();
      Drupal.Panels.Draggable.savePositions();
    }
    return false;
  });
};

Drupal.Panels.bindPortlet = function() {
  var handle = $(this).find('.panel-pane-collapsible > div.pane-title');
  var content = $(this).find('.panel-pane-collapsible > div.pane-content');
  if (content.length) {
    var toggle = $('<span class="toggle toggle-collapsed"></span>');
    handle.before(toggle);
    toggle.click(function() {
      content.slideToggle(20);
      toggle.toggleClass('toggle-collapsed');
    });
    handle.click(function() {
      content.slideToggle(20);
      toggle.toggleClass('toggle-collapsed');
    });
    content.hide();
  }
};

Drupal.Panels.Draggable = {
  // The draggable object
  object: null,

  // Where objects can be dropped
  dropzones: [],
  current_dropzone: null,

  // positions within dropzones where an object can be plazed
  landing_pads: [],
  current_pad: null,

  // Where the object is
  mouseOffset: { x: 0, y: 0 },
  windowOffset: { x: 0, y: 0 },
  offsetDivHeight: 0,

  // original settings to be restored
  original: {},
  // a placeholder so that if the object is let go but not over a drop zone,
  // it can be put back where it belongs
  placeholder: {},

  hoverclass: 'hoverclass',
  helperclass: 'helperclass',
  accept: 'div.panel-region',
  handle: 'div.grabber',
  draggable: 'div.panel-portlet',
  main: 'div#panels-dnd-main',

  // part of the id to remove to get just the number
  draggableId: 'panel-pane-',

  // part of the id to remove to get just the number
  regionId: 'panel-region-',

  // What to add to the front of a the id to get the form id for a panel
  formId: 'input#edit-',

  maxWidth: 250,

  unsetDropZone: function() {
    $(this.current_dropzone.obj).removeClass(this.hoverclass);
    this.current_dropzone = null;
    for (var i in this.landing_pads) {
      $(this.landing_pads[i].obj).remove();
    }
    this.landing_pads = [];
    this.current_pad = null;
  },

  createLandingPad: function(where, append) {
    var obj = $('<div class="' + this.helperclass +'" id="' +
      $(where).attr('id') + '-dropzone">&nbsp;</div>');
    if (append) {
      $(where).append(obj);
    }
    else {
      $(where).before(obj);
    }
    var offset = $(obj).offset();

    $(obj).css({
      display: 'none'
    });
    this.landing_pads.push({
      centerX: offset.left + ($(obj).innerWidth() / 2),
      centerY: offset.top + ($(obj).innerHeight() / 2),
      obj: obj
    });
    return obj;
  },

  calculateDropZones: function(event, dropzone) {
    var draggable = Drupal.Panels.Draggable;
    var dropzones = [];
    $(this.accept).each(function() {
      var offset = $(this).offset();
      offset.obj = this;
      offset.region = this.id.replace(draggable.regionId, '');
      offset.width = $(this).outerWidth();
      offset.height = $(this).outerHeight();
      dropzones.push(offset);
    });
    this.dropzones = dropzones;
  },

  reCalculateDropZones: function() {
    for (var i in this.dropzones) {
      var offset = $(this.dropzones[i].obj).offset();
      offset.width = $(this.dropzones[i].obj).outerWidth();
      offset.height = $(this.dropzones[i].obj).outerHeight();
      $.extend(this.dropzones[i], offset);
    }
  },

  changeDropZone: function(new_dropzone) {
    // Unset our old dropzone.
    if (this.current_dropzone) {
      this.unsetDropZone();
    }

    // Set up our new dropzone.
    this.current_dropzone = new_dropzone;
    $(this.current_dropzone.obj).addClass(this.hoverclass);
    // add a landing pad
    this.createLandingPad(this.current_dropzone.obj, true);

    var that = this;
    // Create a landing pad before each existing portlet.
    $(this.current_dropzone.obj).find(this.draggable).each(function() {
      if (that.object.id != this.id) {
        that.createLandingPad(this, false);
      }
    });
  },

  findLandingPad: function(x, y) {
    var shortest_distance = null;
    var nearest_pad = null;
    // find the nearest pad.
    for (var i in this.landing_pads) {
      // This isn't the real distance, this is the square of the
      // distance -- no point in spending processing time on
      // sqrt.
      var dstx = Math.abs(x - this.landing_pads[i].centerX);
      var dsty = Math.abs(y - this.landing_pads[i].centerY);
      var distance =  (dstx * dstx) + (dsty * dsty);
      if (shortest_distance == null || distance < shortest_distance) {
        shortest_distance = distance;
        nearest_pad = this.landing_pads[i];
      }
    }
    if (nearest_pad != this.current_pad) {
      if (this.current_pad) {
        $(this.current_pad.obj).hide();
      }
      this.current_pad = nearest_pad;
      $(nearest_pad.obj).show();
    }
  },

  findDropZone: function(x, y) {
    // Go through our dropzones and see if we're over one.
    var new_dropzone = null;
    for (var i in this.dropzones) {
//      console.log('x:' + x + ' left:' + this.dropzones[i].left + ' right: ' + this.dropzones[i].left + this.dropzones[i].width);
      if (this.dropzones[i].left < x &&
        x < this.dropzones[i].left + this.dropzones[i].width &&
        this.dropzones[i].top < y &&
        y < this.dropzones[i].top + this.dropzones[i].height) {
          new_dropzone = this.dropzones[i];
          break;
      }
    }
    // If we're over one, see if it's different.
    if (new_dropzone && (!this.regionLock || this.regionLockRegions[new_dropzone.region])) {
      var changed = false;
      if (!this.current_dropzone || new_dropzone.obj.id != this.current_dropzone.obj.id) {
        this.changeDropZone(new_dropzone);
        changed = true;
      }
      this.findLandingPad(x, y);
      if (changed)  {
        // recalculate the size of our drop zones due to the fact that we're drawing landing pads.
        this.reCalculateDropZones();
      }
    }
    // If we're not over one, be sure to unhilite one if we were just
    // over it.
    else if (this.current_dropzone) {
      this.unsetDropZone();
    }
  },

  /** save button clicked, or pane deleted **/
  savePositions: function() {
    var draggable = Drupal.Panels.Draggable;
    $(draggable.accept).each(function() {
      var val = '';
      $(this).find(draggable.draggable).each(function() {
        if (val) {
          val += ',';
        }

        val += this.id.replace(draggable.draggableId, '');
      });
      var region = this.id.replace(draggable.regionId, '');
      $('input[name="panel[pane][' +  region + ']"]').val(val);
    });
    return false;
  }
};

Drupal.Panels.DraggableHandler = function() {
  $(this).addClass('panel-draggable');
  var draggable = Drupal.Panels.Draggable;
  var scrollBuffer = 10;
  var scrollDistance = 10;
  var scrollTimer = 30;

  getMouseOffset = function(docPos, mousePos, windowPos) {
    return { x: mousePos.x - docPos.x + windowPos.x, y: mousePos.y - docPos.y + windowPos.y};
  };

  getMousePos = function(ev) {
    ev = ev || window.event;

    if (ev.pageX || ev.pageY) {
      return { x:ev.pageX, y:ev.pageY };
    }
    return {
      x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
      y:ev.clientY + document.body.scrollTop  - document.body.clientTop
    };
  };

  getPosition = function(e) {
    /*
    if (document.defaultView && document.defaultView.getComputedStyle) {
      var css = document.defaultView.getComputedStyle(e, null);
      return {
        x: parseInt(css.getPropertyValue('left')),
        y: parseInt(css.getPropertyValue('top'))
      };
    }
    */
    var left = 0;
    var top  = 0;

    while (e.offsetParent) {
      left += e.offsetLeft;
      top  += e.offsetTop;
      e     = e.offsetParent;
    }

    left += e.offsetLeft;
    top  += e.offsetTop;

    return { x:left, y:top };
  };

  mouseUp = function(e) {
    clearTimeout(draggable.timeoutId);
    draggable.dropzones = [];

    if (draggable.current_pad) {
      // Drop the object where we're hovering
      $(draggable.object).insertAfter($(draggable.current_pad.obj));
      Drupal.Panels.changed($(draggable.object));
    }
    else {
      // or put it back where it came from
      $(draggable.object).insertAfter(draggable.placeholder);
    }
    // remove the placeholder
    draggable.placeholder.remove();

    // restore original settings.
    $(draggable.object).css(draggable.original);
    if (draggable.current_dropzone) {
      draggable.unsetDropZone();
    }

    $(document).unbind('mouseup').unbind('mousemove');
    draggable.savePositions();
  };

  mouseMove = function(e) {
    draggable.mousePos = getMousePos(e);

    draggable.findDropZone(draggable.mousePos.x, draggable.mousePos.y);

    var windowMoved = parseInt(draggable.offsetDivHeight - $(draggable.main).innerHeight());

    draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + windowMoved + 'px';
    draggable.object.style.left = draggable.mousePos.x - draggable.mouseOffset.x  + 'px';
    $(draggable.object).toggleClass('moving');
  };

  mouseDown = function(e) {
    // If we mouse-downed over something clickable, don't drag!
    if (e.target.nodeName == 'A' || e.target.nodeName == 'INPUT' || e.target.parentNode.nodeName == 'A' || e.target.nodeName.nodeName == 'INPUT') {
      return;
    }

    draggable.object = $(this).parent(draggable.draggable).get(0);
    draggable.paneId = draggable.object.id.replace(draggable.draggableId, '');

    // create a placeholder so we can put this object back if dropped in an invalid location.
    draggable.placeholder = $('<div class="draggable-placeholder-object" style="display:none"></div>"');
    $(draggable.object).after(draggable.placeholder);

    // Store original CSS so we can put it back.
    draggable.original = {
      position: $(draggable.object).css('position'),
      width: 'auto',
      left: $(draggable.object).css('left'),
      top: $(draggable.object).css('top'),
      'z-index': $(draggable.object).css('z-index'),
      'margin-bottom': $(draggable.object).css('margin-bottom'),
      'margin-top': $(draggable.object).css('margin-top'),
      'margin-left': $(draggable.object).css('margin-left'),
      'margin-right': $(draggable.object).css('margin-right'),
      'padding-bottom': $(draggable.object).css('padding-bottom'),
      'padding-top': $(draggable.object).css('padding-top'),
      'padding-left': $(draggable.object).css('padding-left'),
      'padding-right': $(draggable.object).css('padding-right')
    };

    draggable.mousePos = getMousePos(e);
    var originalPos = $(draggable.object).offset();
    var width = Math.min($(draggable.object).innerWidth(), draggable.maxWidth);

    draggable.offsetDivHeight = $(draggable.main).innerHeight();
    draggable.findDropZone(draggable.mousePos.x, draggable.mousePos.y);

    // Make copies of these because in FF3, they actually change when we
    // move the item, whereas they did not in FF2.

    if (e.layerX || e.layerY) {
      var layerX = e.layerX;
      var layerY = e.layerY;
    }
    else if (e.originalEvent && e.originalEvent.layerX) {
      var layerX = e.originalEvent.layerX;
      var layerY = e.originalEvent.layerY;
    }

    // Make the draggable relative, get it out of the way and make it
    // invisible.
    $(draggable.object).css({
      position: 'relative',
      'z-index': 100,
      width: width + 'px',
      'margin-bottom': (-1 * parseInt($(draggable.object).outerHeight())) + 'px',
      'margin-top': 0,
      'margin-left': 0,
      'margin-right': (-1 * parseInt($(draggable.object).outerWidth())) + 'px',
      'padding-bottom': 0,
      'padding-top': 0,
      'padding-left': 0,
      'padding-right': 0,
      'left': 0,
      'top': 0
    })
      .insertAfter($(draggable.main));
    var newPos = $(draggable.object).offset();

    var windowOffset = { left: originalPos.left - newPos.left, top: originalPos.top - newPos.top }

    // if they grabbed outside the area where we make the draggable smaller, move it
    // closer to the cursor.
    if (layerX != 'undefined' && layerX > width) {
      windowOffset.left += layerX - 10;
    }
    else if (layerX != 'undefined' && e.offsetX > width) {
      windowOffset.left += e.offsetX - 10;
    }

    // This is stored so we can move with it.
    draggable.mouseOffset = { x: draggable.mousePos.x - windowOffset.left, y: draggable.mousePos.y - windowOffset.top};
    draggable.offsetDivHeight = $(draggable.main).innerHeight();

    draggable.object.style.top = windowOffset.top + 'px';
    draggable.object.style.left = windowOffset.left + 'px';
    $(document).unbind('mouseup').unbind('mousemove').mouseup(mouseUp).mousemove(mouseMove);

    draggable.calculateDropZones(draggable.mousePos, e);
    draggable.timeoutId = setTimeout('timer()', scrollTimer);

    // If locking to a particular set of regions, set that:
    if (Drupal.settings.Panels && Drupal.settings.Panels.RegionLock && Drupal.settings.Panels.RegionLock[draggable.paneId]) {
      draggable.regionLock = true;
      draggable.regionLockRegions = Drupal.settings.Panels.RegionLock[draggable.paneId];
    }
    else {
      draggable.regionLock = false;
      draggable.regionLockRegions = null;
    }

    return false;
  };

  timer = function() {
    if (!draggable.timeCount) {
      draggable.timeCount = 0;
    }
    draggable.timeCount = draggable.timeCount + 1;
    var left = $(window).scrollLeft();
    var right = left + $(window).width();
    var top = $(window).scrollTop();
    var bottom = top + $(window).height();

    if (draggable.mousePos.x < left + scrollBuffer && left > 0) {
      window.scrollTo(left - scrollDistance, top);
      draggable.mousePos.x -= scrollDistance;
      draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + 'px';
    }
    else if (draggable.mousePos.x > right - scrollBuffer) {
      window.scrollTo(left + scrollDistance, top);
      draggable.mousePos.x += scrollDistance;
      draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + 'px';
    }
    else if (draggable.mousePos.y < top + scrollBuffer && top > 0) {
      window.scrollTo(left, top - scrollDistance);
      draggable.mousePos.y -= scrollDistance;
      draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + 'px';
    }
    else if (draggable.mousePos.y > bottom - scrollBuffer) {
      window.scrollTo(left, top + scrollDistance);
      draggable.mousePos.y += scrollDistance;
      draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + 'px';
    }

    draggable.timeoutId = setTimeout('timer()', scrollTimer);
  }

  $(this).mousedown(mouseDown);
};

$.fn.extend({
  panelsDraggable: Drupal.Panels.DraggableHandler
});

/**
 * Implement Drupal behavior for autoattach
 */
Drupal.behaviors.PanelsDisplayEditor = {
  attach: function(context) {
    // Show javascript only items.
    $('span#panels-js-only').css('display', 'inline');

    $('#panels-dnd-main div.panel-pane:not(.panel-portlet)')
      .addClass('panel-portlet')
      .each(Drupal.Panels.bindPortlet);

    // The above doesn't work if context IS the pane, so do this to catch that.
    if ($(context).hasClass('panel-pane') && !$(context).hasClass('panel-portlet')) {
      $(context)
        .addClass('panel-portlet')
        .each(Drupal.Panels.bindPortlet);
    }

    // Make draggables and make sure their positions are saved.
    $(context).find('div.grabber:not(.panel-draggable)').panelsDraggable();
    Drupal.Panels.Draggable.savePositions();

    // Bind buttons.
    $('input#panels-hide-all', context).click(Drupal.Panels.clickHideAll);
    $('input#panels-show-all', context).click(Drupal.Panels.clickShowAll);

    Drupal.Panels.bindClickDelete(context);

    $('#panels-live-preview-button:not(.panels-preview-processed)')
      .addClass('panels-preview-processed')
      .click(function () {
        if (!$('#panels-preview').size()) {
          $('#panels-dnd-main').parents('form').after('<div id="panels-preview" class="clearfix"></div>');
        }
        var html = '';
        html += '  <div id="modal-throbber">';
        html += '    <div class="modal-throbber-wrapper">';
        html +=        Drupal.settings.CToolsModal.throbber;
        html += '    </div>';
        html += '  </div>';

        $('#panels-preview').html(html);
      });

    var setTitleClass = function () {
      if ($('#edit-display-title-hide-title').val() == 2) {
        $('#panels-dnd-main').removeClass('panels-set-title-hide');
      }
      else {
        $('#panels-dnd-main').addClass('panels-set-title-hide');
      }
    }

    // The panes have an option to set the display title, but only if
    // a select is set to the proper value. This sets a class on the
    // main edit div so that the option to set the display title
    // is hidden if that is not selected, and visible if it is.
    $('#edit-display-title-hide-title:not(.panels-title-processed)')
      .addClass('panels-title-processed')
      .change(setTitleClass);

    setTitleClass();
  }
}

$(function() {
  /**
   * AJAX responder command to render the preview.
   */
  Drupal.ajax.prototype.commands.panel_preview = function(ajax, command, status) {
    $('#panels-preview').html(command.output);
  }
});

})(jQuery);
;
/**
 * @file
 * Implement a simple, clickable dropdown menu.
 *
 * See dropdown.theme.inc for primary documentation.
 *
 * The javascript relies on four classes:
 * - The dropdown must be fully contained in a div with the class
 *   ctools-dropdown. It must also contain the class ctools-dropdown-no-js
 *   which will be immediately removed by the javascript; this allows for
 *   graceful degradation.
 * - The trigger that opens the dropdown must be an a tag wit hthe class
 *   ctools-dropdown-link. The href should just be '#' as this will never
 *   be allowed to complete.
 * - The part of the dropdown that will appear when the link is clicked must
 *   be a div with class ctools-dropdown-container.
 * - Finally, ctools-dropdown-hover will be placed on any link that is being
 *   hovered over, so that the browser can restyle the links.
 *
 * This tool isn't meant to replace click-tips or anything, it is specifically
 * meant to work well presenting menus.
 */

(function ($) {
  Drupal.behaviors.CToolsDropdown = {
    attach: function() {
      $('div.ctools-dropdown').once('ctools-dropdown', function() {
        var $dropdown = $(this);
        var open = false;
        var hovering = false;
        var timerID = 0;

        $dropdown.removeClass('ctools-dropdown-no-js');

        var toggle = function(close) {
          // if it's open or we're told to close it, close it.
          if (open || close) {
            // If we're just toggling it, close it immediately.
            if (!close) {
              open = false;
              $("div.ctools-dropdown-container", $dropdown).slideUp(100);
            }
            else {
              // If we were told to close it, wait half a second to make
              // sure that's what the user wanted.
              // Clear any previous timer we were using.
              if (timerID) {
                clearTimeout(timerID);
              }
              timerID = setTimeout(function() {
                if (!hovering) {
                  open = false;
                  $("div.ctools-dropdown-container", $dropdown).slideUp(100);
                }
              }, 500);
            }
          }
          else {
            // open it.
            open = true;
            $("div.ctools-dropdown-container", $dropdown)
              .animate({height: "show", opacity: "show"}, 100);
          }
        }
        $("a.ctools-dropdown-link", $dropdown).click(function() {
          toggle();
          return false;
        });

        $dropdown.hover(
            function() {
              hovering = true;
            }, // hover in
            function() { // hover out
              hovering = false;
              toggle(true);
              return false;
            });
        // @todo -- just use CSS for this noise.
        $("div.ctools-dropdown-container a").hover(
          function() { $(this).addClass('ctools-dropdown-hover'); },
          function() { $(this).removeClass('ctools-dropdown-hover'); }
        );
      });
    }
  }
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
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);;
/*
* Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget - LAST UPDATE: MARCH 23rd, 2011
*
* Copyright (c) 2008 Joel Birch - based mostly on work by Jesse Klaasse and credit goes largely to him.
* Special thanks to Karl Swedberg for valuable input.
* 
* Dec 28th, 2010 - Modified for the Superfish project for Drupal (http://drupal.org/project/superfish)
*
* jQuery version: 1.3.x or higher.
*
* Dual licensed under the MIT and GPL licenses:
* 	http://www.opensource.org/licenses/mit-license.php
* 	http://www.gnu.org/licenses/gpl.html
*/

(function($){
  $.fn.supposition = function(){
    var $w = $(window), /*do this once instead of every onBeforeShow call*/
    _offset = function(dir) {
      return window[dir == 'y' ? 'pageYOffset' : 'pageXOffset']
      || document.documentElement && document.documentElement[dir=='y' ? 'scrollTop' : 'scrollLeft']
      || document.body[dir=='y' ? 'scrollTop' : 'scrollLeft'];
    },
    onHide = function(){
      this.css({Top:'',Right:'',Bottom:'',Left:''});
    },
    onBeforeShow = function(){
      this.each(function(){
        var $u = $(this);
        $u.css('display','block');
        var menuWidth = $u.width(),
        menuParentWidth = $u.closest('li').outerWidth(true),
        menuParentLeft = $u.closest('li').offset().left,
        totalRight = $w.width() + _offset('x'),
        menuRight = $u.offset().left + menuWidth,
        exactMenuWidth = (menuRight > (menuParentWidth + menuParentLeft)) ? menuWidth - (menuRight - (menuParentWidth + menuParentLeft)) : menuWidth;  
        if ($u.parents('.sf-js-enabled').hasClass('rtl')) {
          if (menuParentLeft < exactMenuWidth) {
            $u.css('left', menuParentWidth + 'px');
            $u.css('right', 'auto');
          }
        }
        else {
          if (menuRight > totalRight && menuParentLeft > menuWidth) {
            $u.css('right', menuParentWidth + 'px');
            $u.css('left', 'auto');
          }
        }
        var windowHeight = $w.height(),
        offsetTop = $u.offset().top,
        menuParentHeight = $u.parent().outerHeight(true),
        menuHeight = $u.height(),
        baseline = windowHeight + _offset('y');
        var expandUp = ((offsetTop + menuHeight > baseline) && (offsetTop > menuHeight));
        if (expandUp) {
          $u.css('bottom', menuParentHeight + 'px');
          $u.css('top', 'auto');
        }
        $u.css('display','none');
      });
    };

    return this.each(function() {
    var o = $.fn.superfish.o[this.serial]; /* get this menu's options */

    /* if callbacks already set, store them */
    var _onBeforeShow = o.onBeforeShow,
    _onHide = o.onHide;

    $.extend($.fn.superfish.o[this.serial],{
    onBeforeShow: function() {
    onBeforeShow.call(this); /* fire our Supposition callback */
    _onBeforeShow.call(this); /* fire stored callbacks */
    },
    onHide: function() {
    onHide.call(this); /* fire our Supposition callback */
    _onHide.call(this); /* fire stored callbacks */
    }
    });
    });
  };
})(jQuery);;
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

(function($){
  $.fn.superfish = function(op){
    var sf = $.fn.superfish,
      c = sf.c,
      $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
      over = function(){
        var $$ = $(this), menu = getMenu($$);
        clearTimeout(menu.sfTimer);
        $$.showSuperfishUl().siblings().hideSuperfishUl();
      },
      out = function(){
        var $$ = $(this), menu = getMenu($$), o = sf.op;
        clearTimeout(menu.sfTimer);
        menu.sfTimer=setTimeout(function(){
          o.retainPath=($.inArray($$[0],o.$path)>-1);
          $$.hideSuperfishUl();
          if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
        },o.delay);
      },
      getMenu = function($menu){
        var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
        sf.op = sf.o[menu.serial];
        return menu;
      },
      addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

    return this.each(function() {
      var s = this.serial = sf.o.length;
      var o = $.extend({},sf.defaults,op);
      o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
        $(this).addClass([o.hoverClass,c.bcClass].join(' '))
          .filter('li:has(ul)').removeClass(o.pathClass);
      });
      sf.o[s] = sf.op = o;

      $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
        if (o.autoArrows) addArrow( $('>a:first-child',this) );
      })
      .not('.'+c.bcClass)
        .hideSuperfishUl();

      var $a = $('a',this);
      $a.each(function(i){
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
      });
      o.onInit.call(this);

    }).each(function() {
      var menuClasses = [c.menuClass];
      if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
      $(this).addClass(menuClasses.join(' '));
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};
  sf.IE7fix = function(){
    var o = sf.op;
    if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
      this.toggleClass(sf.c.shadowClass+'-off');
    };
  sf.c = {
    bcClass: 'sf-breadcrumb',
    menuClass: 'sf-js-enabled',
    anchorClass: 'sf-with-ul',
    arrowClass: 'sf-sub-indicator',
    shadowClass: 'sf-shadow'
  };
  sf.defaults = {
    hoverClass: 'sfHover',
    pathClass: 'overideThisToUse',
    pathLevels: 1,
    delay: 800,
    animation: {opacity:'show'},
    speed: 'normal',
    autoArrows: true,
    dropShadows: true,
    disableHI: false, // true disables hoverIntent detection
    onInit: function(){}, // callback functions
    onBeforeShow: function(){},
    onShow: function(){},
    onHide: function(){}
  };
  $.fn.extend({
    hideSuperfishUl : function(){
      var o = sf.op,
        not = (o.retainPath===true) ? o.$path : '';
      o.retainPath = false;
      var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
          .find('>ul').hide().css('visibility','hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl : function(){
      var o = sf.op,
        sh = sf.c.shadowClass+'-off',
        $ul = this.addClass(o.hoverClass)
          .find('>ul:hidden').css('visibility','visible');
      sf.IE7fix.call($ul);
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
      return this;
    }
  });
})(jQuery);;
/*
 * Supersubs v0.2b - jQuery plugin - LAST UPDATE: MARCH 23rd, 2011
 * Copyright (c) 2008 Joel Birch
 *
 * Jan 16th, 2011 - Modified a little in order to work with NavBar menus as well.
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */

(function($){ // $ will refer to jQuery within this closure

  $.fn.supersubs = function(options){
    var opts = $.extend({}, $.fn.supersubs.defaults, options);
	// return original object to support chaining
    return this.each(function() {
      // cache selections
      var $$ = $(this);
      // support metadata
      var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
      // get the font size of menu.
      // .css('fontSize') returns various results cross-browser, so measure an em dash instead
      var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
        'padding' : 0,
        'position' : 'absolute',
        'top' : '-99999em',
        'width' : 'auto'
      }).appendTo($$).width(); //clientWidth is faster, but was incorrect here
      // remove em dash
      $('#menu-fontsize').remove();

      // Jump on level if it's a "NavBar"
      if ($$.hasClass('sf-navbar')) {
        $$ = $('li > ul', $$);
      }
      // cache all ul elements 
      $ULs = $$.find('ul:not(.sf-megamenu)');
      // loop through each ul in menu
      $ULs.each(function(i) {
        // cache this ul
        var $ul = $ULs.eq(i);
        // get all (li) children of this ul
        var $LIs = $ul.children();
        // get all anchor grand-children
        var $As = $LIs.children('a');
        // force content to one line and save current float property
        var liFloat = $LIs.css('white-space','nowrap').css('float');
        // remove width restrictions and floats so elements remain vertically stacked
        var emWidth = $ul.add($LIs).add($As).css({
          'float' : 'none',
          'width'  : 'auto'
        })
        // this ul will now be shrink-wrapped to longest li due to position:absolute
        // so save its width as ems. Clientwidth is 2 times faster than .width() - thanks Dan Switzer
        .end().end()[0].clientWidth / fontsize;
        // add more width to ensure lines don't turn over at certain sizes in various browsers
        emWidth += o.extraWidth;
        // restrict to at least minWidth and at most maxWidth
        if (emWidth > o.maxWidth)    { emWidth = o.maxWidth; }
        else if (emWidth < o.minWidth)  { emWidth = o.minWidth; }
        emWidth += 'em';
        // set ul to width in ems
        $ul.css('width',emWidth);
        // restore li floats to avoid IE bugs
        // set li width to full width of this ul
        // revert white-space to normal
        $LIs.css({
          'float' : liFloat,
          'width' : '100%',
          'white-space' : 'normal'
        })
        // update offset position of descendant ul to reflect new width of parent
        .each(function(){
          var $childUl = $('>ul',this);
          var offsetDirection = $childUl.css('left')!==undefined ? 'left' : 'right';
          $childUl.css(offsetDirection,emWidth);
        });
      });

    });
  };
  // expose defaults
  $.fn.supersubs.defaults = {
    minWidth: 9, // requires em unit.
    maxWidth: 25, // requires em unit.
    extraWidth: 0 // extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
  };

})(jQuery); // plugin code ends;
/**
 * @file
 * The Superfish Drupal Behavior to apply the Superfish jQuery plugin to lists.
 */

(function ($) {
  Drupal.behaviors.superfish = {
    attach: function (context, settings) {
      // Take a look at each list to apply Superfish to.
      $.each(settings.superfish || {}, function(index, options) {
        // Process all Superfish lists.
        $('#superfish-' + options.id, context).once('superfish', function() {
          var list = $(this);

          // Check if we are to apply the Supersubs plug-in to it.
          if (options.plugins || false) {
            if (options.plugins.supersubs || false) {
              list.supersubs(options.plugins.supersubs);
            }
          }

          // Apply Superfish to the list.
          list.superfish(options.sf);

          // Check if we are to apply any other plug-in to it.
          if (options.plugins || false) {
            if (options.plugins.touchscreen || false) {
              list.sftouchscreen(options.plugins.touchscreen);
            }
            if (options.plugins.smallscreen || false) {
              list.sfsmallscreen(options.plugins.smallscreen);
            }
            if (options.plugins.supposition || false) {
              list.supposition();
            }
            if (options.plugins.bgiframe || false) {
              list.find('ul').bgIframe({opacity:false});
            }
          }
        });
      });
    }
  };
})(jQuery);;
