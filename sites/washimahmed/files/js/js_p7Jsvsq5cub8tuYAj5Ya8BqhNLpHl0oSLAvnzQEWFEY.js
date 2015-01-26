(function ($) {

/**
 * Attaches sticky table headers.
 */
Drupal.behaviors.tableHeader = {
  attach: function (context, settings) {
    if (!$.support.positionFixed) {
      return;
    }

    $('table.sticky-enabled', context).once('tableheader', function () {
      $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
    });
  }
};

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.
 */
Drupal.tableHeader = function (table) {
  var self = this;

  this.originalTable = $(table);
  this.originalHeader = $(table).children('thead');
  this.originalHeaderCells = this.originalHeader.find('> tr > th');
  this.displayWeight = null;

  // React to columns change to avoid making checks in the scroll callback.
  this.originalTable.bind('columnschange', function (e, display) {
    // This will force header size to be calculated on scroll.
    self.widthCalculated = (self.displayWeight !== null && self.displayWeight === display);
    self.displayWeight = display;
  });

  // Clone the table header so it inherits original jQuery properties. Hide
  // the table to avoid a flash of the header clone upon page load.
  this.stickyTable = $('<table class="sticky-header"/>')
    .insertBefore(this.originalTable)
    .css({ position: 'fixed', top: '0px' });
  this.stickyHeader = this.originalHeader.clone(true)
    .hide()
    .appendTo(this.stickyTable);
  this.stickyHeaderCells = this.stickyHeader.find('> tr > th');

  this.originalTable.addClass('sticky-table');
  $(window)
    .bind('scroll.drupal-tableheader', $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    .bind('resize.drupal-tableheader', { calculateWidth: true }, $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    // Make sure the anchor being scrolled into view is not hidden beneath the
    // sticky table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceAnchor.drupal-tableheader', function () {
      window.scrollBy(0, -self.stickyTable.outerHeight());
    })
    // Make sure the element being focused is not hidden beneath the sticky
    // table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceFocus.drupal-tableheader', function (event) {
      if (self.stickyVisible && event.clientY < (self.stickyOffsetTop + self.stickyTable.outerHeight()) && event.$target.closest('sticky-header').length === 0) {
        window.scrollBy(0, -self.stickyTable.outerHeight());
      }
    })
    .triggerHandler('resize.drupal-tableheader');

  // We hid the header to avoid it showing up erroneously on page load;
  // we need to unhide it now so that it will show up when expected.
  this.stickyHeader.show();
};

/**
 * Event handler: recalculates position of the sticky table header.
 *
 * @param event
 *   Event being triggered.
 */
Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader = function (event) {
  var self = this;
  var calculateWidth = event.data && event.data.calculateWidth;

  // Reset top position of sticky table headers to the current top offset.
  this.stickyOffsetTop = Drupal.settings.tableHeaderOffset ? eval(Drupal.settings.tableHeaderOffset + '()') : 0;
  this.stickyTable.css('top', this.stickyOffsetTop + 'px');

  // Save positioning data.
  var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (calculateWidth || this.viewHeight !== viewHeight) {
    this.viewHeight = viewHeight;
    this.vPosition = this.originalTable.offset().top - 4 - this.stickyOffsetTop;
    this.hPosition = this.originalTable.offset().left;
    this.vLength = this.originalTable[0].clientHeight - 100;
    calculateWidth = true;
  }

  // Track horizontal positioning relative to the viewport and set visibility.
  var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
  var vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - this.vPosition;
  this.stickyVisible = vOffset > 0 && vOffset < this.vLength;
  this.stickyTable.css({ left: (-hScroll + this.hPosition) + 'px', visibility: this.stickyVisible ? 'visible' : 'hidden' });

  // Only perform expensive calculations if the sticky header is actually
  // visible or when forced.
  if (this.stickyVisible && (calculateWidth || !this.widthCalculated)) {
    this.widthCalculated = true;
    var $that = null;
    var $stickyCell = null;
    var display = null;
    var cellWidth = null;
    // Resize header and its cell widths.
    // Only apply width to visible table cells. This prevents the header from
    // displaying incorrectly when the sticky header is no longer visible.
    for (var i = 0, il = this.originalHeaderCells.length; i < il; i += 1) {
      $that = $(this.originalHeaderCells[i]);
      $stickyCell = this.stickyHeaderCells.eq($that.index());
      display = $that.css('display');
      if (display !== 'none') {
        cellWidth = $that.css('width');
        // Exception for IE7.
        if (cellWidth === 'auto') {
          cellWidth = $that[0].clientWidth + 'px';
        }
        $stickyCell.css({'width': cellWidth, 'display': display});
      }
      else {
        $stickyCell.css('display', 'none');
      }
    }
    this.stickyTable.css('width', this.originalTable.outerWidth());
  }
};

})(jQuery);
;

/**
 * Nodequeue object
 *
 * Settings:
 *
 * container
 * up
 * down
 * top
 * bottom: 
 * delete: input image
 * order: input hidden
 * add: input to add items
 * path: path to add items
 * tr: the base id of the tr
 */
Drupal.nodequeue = function(base, settings) {
  // Set the properties for this object.
  if (settings.container == null) {
    settings.container = settings.row_class;
  }

  var max = function(array) {
    return Math.max.apply(Math, array);
  };

  var array_rand = function(array) {
    var i = array.length;
    if (i == 0) return false;
    while (--i) {
       var j = Math.floor(Math.random() * ( i + 1 ));
       var tempi = array[i];
       var tempj = array[j];
       array[i] = tempj;
       array[j] = tempi;
     }
  }

  var maxPosition = max($(settings.order).val().split(','));

  this.settings = settings;
  this.base = '#' + base;

  // helper function to swap items in an array
  var swap = function(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }

  var saveOrder = function(order) {
    var new_order = '';
    for (i in order) {
      if (new_order) {
        new_order += ',';
      }
      new_order += order[i];
    }

    $(settings.order).val(new_order);
    $(settings.hidden).show();
  }

  var changeOrder = function(item, how) {
    var order = $(settings.order).val().split(',');

    if (how != 'add' && how != 'insert') {
      var tr = $(item).parents('tr').get(0);
      var id = $(tr).attr('id').replace(settings.tr, '');
      var index = -1;
    
      for (var i in order) {
        if (order[i] == id) {
          index = parseInt(i);
          break;
        }
      }
    }

    switch (how) {
      case 'add':
        order.push(item);
        break;
      case 'insert':
        order.unshift(item);
        break;
      case 'delete':
        order.splice(index, 1);
        break;
      case 'top':
        var temp = order[index];
        order.splice(index, 1);
        order.unshift(temp);
        break;
      case 'up':
        swap(order, index, index - 1);
        break;
      case 'down':
        swap(order, index, index + 1);
        break;
      case 'bottom':
        var temp = order[index];
        order.splice(index, 1);
        order.push(temp);
        break;
    }
    
    saveOrder(order);
  }

  var makeOrder = function(order) {
    // Go through the new order and move each item to the bottom.
    // Then everything will be where it was meant to be.
    var last = $(settings.row_class + ':last');
    for (var i in order) {
      var item = $('#' + settings.tr + order[i]);
      last.after(item);
      changed($(item));
      last = item;
    }
    restripeTable('#' + base);
  }

  this.changeOrder = changeOrder;

  var restripeTable = function(table) {
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
  }

  var changed = function(item) {
    if (!item.is('.changed')) {
      item.addClass('changed').css('color', 'red');
      item.children('td:first').prepend(' <b>*</b> ');
      $('p.nodequeue-warning').css('color', 'red');
    }
  }

  this.restripeTable = restripeTable;

  // Set as a function so we can be both a closure and called later
  // when more items get added.
  var bindButtons = function() {
    if (settings.remove) {
      $(settings.remove + ':not(.nodequeue-processed)')
        .addClass('nodequeue-processed')
        .click(function() { return false; })
        .click(function(e) {
          var item = $(this).parents(settings.container);
          changeOrder(this, 'delete');

          item.remove();
          restripeTable('#' + base);

          return false;
        });
    }

    if (settings.clear_list) {
      $(settings.clear_list + ':not(.nodequeue-processed)')
        .addClass('nodequeue-processed')
        .click(function() { return false; })
        .click(function(e) {
          $(settings.row_class).each(function() { $(this).remove() });
          saveOrder([]);
        });
    }

    if (settings.shuffle) {
      $(settings.shuffle + ':not(.nodequeue-processed)')
        .addClass('nodequeue-processed')
        .click(function() { return false; })
        .click(function(e) {
          // randomize the order
          var order = $(settings.order).val().split(',');
          array_rand(order);
          saveOrder(order);
          makeOrder(order);
        });
    }

    if (settings.reverse) {
      $(settings.reverse + ':not(.nodequeue-processed)')
        .addClass('nodequeue-processed')
        .click(function() { return false; })
        .click(function(e) {
          // reverse the order
          var order = $(settings.order).val().split(',');
          order.reverse();
          saveOrder(order);
          makeOrder(order);
        });
    }

    if (settings.up) {
      $(settings.up + ':not(.nodequeue-processed)')
        .addClass('nodequeue-processed')
        .click(function() { return false; })
        .click(function(e) {
          var item = $(this).parents(settings.container);
          var prev = $(item).prev();

          if (prev.html() != null && item != prev) {
            // move item
            prev.before(item);
            restripeTable('#' + base);
            changed(item);
            changeOrder(this, 'up');
          }

          return false;
        });
    }

    if (settings.top) {
      $(settings.top + ':not(.nodequeue-processed)')
        .addClass('nodequeue-processed')
        .click(function() { return false; })
        .click(function(e) {
          var item = $(this).parents(settings.container);
          var first = $(item).siblings(':first');

          first.before(item);
          restripeTable('#' + base);
          changeOrder(this, 'top');
          changed(item);

          return false;
        });
    }

    if (settings.down) {
      $(settings.down + ':not(.nodequeue-processed)')
        .addClass('nodequeue-processed')
        .click(function() { return false; })
        .click(function(e) {
          var item = $(this).parents(settings.container);
          var next = $(item).next();

          if (next.html() != null && item != next) {
            // move item
            next.after(item);
            restripeTable('#' + base);
            changeOrder(this, 'down');
            changed(item);
          }

          return false;
        });
    }

    if (settings.bottom) {
      $(settings.bottom + ':not(.nodequeue-processed)')
        .addClass('nodequeue-processed')
        .click(function() { return false; })
        .click(function(e) {
          var item = $(this).parents(settings.container);
          var last = $(item).siblings(':last');
          
          // move item
          last.after(item);
          restripeTable('#' + base);
          changeOrder(this, 'bottom');
          changed(item);

          return false;
        });
    }

    if (settings.add) {
      $(settings.add + ':not(.nodequeue-processed)')
        .addClass('nodequeue-processed')
        .click(function() { return false; })
        .click(function(e) {
          var input = this;
          $(input).attr('disabled', true);
          $(input).parent().addClass('throbbing');
          var data = { position: maxPosition + 1 };
          for (i in settings.post) {
            data[$(settings.post[i]).attr('name')] = $(settings.post[i]).val();
          }

          $.ajax({
            type: 'POST',
            data: data,
            url: settings.path,
            global: true,
            success: function (data) {
              // Parse response
              $(input).parent().removeClass('throbbing');
              $(input).attr('disabled', false);
              data = Drupal.parseJson(data);
              if (data.status) {
                // add new data
                var new_content = $(data.data);

                Drupal.freezeHeight();
                // Hide the new content before adding to page.

                maxPosition++;
                // Add the form and re-attach behavior.
                if (settings.add_location != 'top') {
                  $('#' + base + ' tbody').append(new_content);
                  changeOrder(maxPosition, 'add');
                }
                else {
                  $('#' + base + ' tbody').prepend(new_content);
                  changeOrder(maxPosition, 'insert');
                }

                changed(new_content);

                bindButtons();

                Drupal.unfreezeHeight();

                // Add the extra data, if necessary
                if (data.extra && settings.extra) {
                  var val = $(settings.extra).val();
                  if (val) {
                    val += ',';
                  }
                  val += data.extra;
                  $(settings.extra).val(val);
                }

                if (settings.clear) {
                  for (i in settings.clear) {
                    $(settings.clear[i]).val('');
                  }
                }
                return;
              }
              else {
                // report the error
                alert(data.error, 'Error');
              }
            },
            error: function(data) {
              alert(Drupal.t('An error occurred'));
              $(input).parent().removeClass('throbbing');
              $(input).attr('disabled', false);
            }
          });
          return false;
        });

    }
  }

  // Focus if we're told to.
  if (settings.focus) {
    $(settings.focus).get(0).focus();
  }
  this.bindButtons = bindButtons();
}


Drupal.nodequeue.autoAttach = function() {
  if (Drupal.settings && Drupal.settings.nodequeue) {
    for (var base in Drupal.settings.nodequeue) {
      if (!$('#'+ base + '.nodequeue-processed').size()) {
        var settings = Drupal.settings.nodequeue[base];
        var list = new Drupal.nodequeue(base, settings);
        $('#'+ base).addClass('nodequeue-processed');
      }
    }
  }

  $('a.nodequeue-ajax-toggle').click(function() {
    var a = this;
    href = $(this).attr('href');
    $(a).addClass('throbbing');
    $.ajax({
      type: 'POST',
      data: { js: 1 },
      url: href,
      global: true,
      dataType: 'json',
      success: function (data) {
        // Parse response
        $(a).removeClass('throbbing');
        // Change text on success
        if (data.status) {
          // Change label back
          $(a).attr('href', data.href);
          $(a).html(data.label);
          if (data.sqid) {
            $('#nodequeue-count-' + data.sqid).html(data.count);
          }
          if (data.href.search('remove-node') > -1) {
            $(a).removeClass('toggle-add');
            $(a).addClass('toggle-remove');
          }
          else {
            $(a).removeClass('toggle-remove');
            $(a).addClass('toggle-add');
          }
          return;
        }
      },
      error: function(data) {
        $(a).removeClass('throbbing');
      }
    });
    return false;
  });

}

if (Drupal.jsEnabled) {
  $(document).ready(Drupal.nodequeue.autoAttach);
}



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
