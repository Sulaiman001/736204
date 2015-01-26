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
/* NicEdit - Micro Inline WYSIWYG
 * Copyright 2007-2008 Brian Kirchoff
 *
 * NicEdit is distributed under the terms of the MIT license
 * For more information visit http://nicedit.com/
 * Do not remove this copyright message
 */
var bkExtend=function(){var A=arguments;if(A.length==1){A=[this,A[0]]}for(var B in A[1]){A[0][B]=A[1][B]}return A[0]};function bkClass(){}bkClass.prototype.construct=function(){};bkClass.extend=function(C){var A=function(){if(arguments[0]!==bkClass){return this.construct.apply(this,arguments)}};var B=new this(bkClass);bkExtend(B,C);A.prototype=B;A.extend=this.extend;return A};var bkElement=bkClass.extend({construct:function(B,A){if(typeof (B)=="string"){B=(A||document).createElement(B)}B=$BK(B);return B},appendTo:function(A){A.appendChild(this);return this},appendBefore:function(A){A.parentNode.insertBefore(this,A);return this},addEvent:function(B,A){bkLib.addEvent(this,B,A);return this},setContent:function(A){this.innerHTML=A;return this},pos:function(){var C=curtop=0;var B=obj=this;if(obj.offsetParent){do{C+=obj.offsetLeft;curtop+=obj.offsetTop}while(obj=obj.offsetParent)}var A=(!window.opera)?parseInt(this.getStyle("border-width")||this.style.border)||0:0;return[C+A,curtop+A+this.offsetHeight]},noSelect:function(){bkLib.noSelect(this);return this},parentTag:function(A){var B=this;do{if(B&&B.nodeName&&B.nodeName.toUpperCase()==A){return B}B=B.parentNode}while(B);return false},hasClass:function(A){return this.className.match(new RegExp("(\\s|^)nicEdit-"+A+"(\\s|$)"))},addClass:function(A){if(!this.hasClass(A)){this.className+=" nicEdit-"+A}return this},removeClass:function(A){if(this.hasClass(A)){this.className=this.className.replace(new RegExp("(\\s|^)nicEdit-"+A+"(\\s|$)")," ")}return this},setStyle:function(A){var B=this.style;for(var C in A){switch(C){case"float":B.cssFloat=B.styleFloat=A[C];break;case"opacity":B.opacity=A[C];B.filter="alpha(opacity="+Math.round(A[C]*100)+")";break;case"className":this.className=A[C];break;default:B[C]=A[C]}}return this},getStyle:function(A,C){var B=(!C)?document.defaultView:C;if(this.nodeType==1){return(B&&B.getComputedStyle)?B.getComputedStyle(this,null).getPropertyValue(A):this.currentStyle[bkLib.camelize(A)]}},remove:function(){this.parentNode.removeChild(this);return this},setAttributes:function(A){for(var B in A){this[B]=A[B]}return this}});var bkLib={isMSIE:(navigator.appVersion.indexOf("MSIE")!=-1),addEvent:function(C,B,A){(C.addEventListener)?C.addEventListener(B,A,false):C.attachEvent("on"+B,A)},toArray:function(C){var B=C.length,A=new Array(B);while(B--){A[B]=C[B]}return A},noSelect:function(B){if(B.setAttribute&&B.nodeName.toLowerCase()!="input"&&B.nodeName.toLowerCase()!="textarea"){B.setAttribute("unselectable","on")}for(var A=0;A<B.childNodes.length;A++){bkLib.noSelect(B.childNodes[A])}},camelize:function(A){return A.replace(/\-(.)/g,function(B,C){return C.toUpperCase()})},inArray:function(A,B){return(bkLib.search(A,B)!=null)},search:function(A,C){for(var B=0;B<A.length;B++){if(A[B]==C){return B}}return null},cancelEvent:function(A){A=A||window.event;if(A.preventDefault&&A.stopPropagation){A.preventDefault();A.stopPropagation()}return false},domLoad:[],domLoaded:function(){if(arguments.callee.done){return }arguments.callee.done=true;for(i=0;i<bkLib.domLoad.length;i++){bkLib.domLoad[i]()}},onDomLoaded:function(A){this.domLoad.push(A);if(document.addEventListener){document.addEventListener("DOMContentLoaded",bkLib.domLoaded,null)}else{if(bkLib.isMSIE){document.write("<style>.nicEdit-main p { margin: 0; }</style><script id=__ie_onload defer "+((location.protocol=="https:")?"src='javascript:void(0)'":"src=//0")+"><\/script>");$BK("__ie_onload").onreadystatechange=function(){if(this.readyState=="complete"){bkLib.domLoaded()}}}}window.onload=bkLib.domLoaded}};function $BK(A){if(typeof (A)=="string"){A=document.getElementById(A)}return(A&&!A.appendTo)?bkExtend(A,bkElement.prototype):A}var bkEvent={addEvent:function(A,B){if(B){this.eventList=this.eventList||{};this.eventList[A]=this.eventList[A]||[];this.eventList[A].push(B)}return this},fireEvent:function(){var A=bkLib.toArray(arguments),C=A.shift();if(this.eventList&&this.eventList[C]){for(var B=0;B<this.eventList[C].length;B++){this.eventList[C][B].apply(this,A)}}}};function __(A){return A}Function.prototype.closure=function(){var A=this,B=bkLib.toArray(arguments),C=B.shift();return function(){if(typeof (bkLib)!="undefined"){return A.apply(C,B.concat(bkLib.toArray(arguments)))}}};Function.prototype.closureListener=function(){var A=this,C=bkLib.toArray(arguments),B=C.shift();return function(E){E=E||window.event;if(E.target){var D=E.target}else{var D=E.srcElement}return A.apply(B,[E,D].concat(C))}};



var nicEditorConfig = bkClass.extend({
	buttons : {
		'bold' : {name : __('Click to Bold'), command : 'Bold', tags : ['B','STRONG'], css : {'font-weight' : 'bold'}, key : 'b'},
		'italic' : {name : __('Click to Italic'), command : 'Italic', tags : ['EM','I'], css : {'font-style' : 'italic'}, key : 'i'},
		'underline' : {name : __('Click to Underline'), command : 'Underline', tags : ['U'], css : {'text-decoration' : 'underline'}, key : 'u'},
		'left' : {name : __('Left Align'), command : 'justifyleft', noActive : true},
		'center' : {name : __('Center Align'), command : 'justifycenter', noActive : true},
		'right' : {name : __('Right Align'), command : 'justifyright', noActive : true},
		'justify' : {name : __('Justify Align'), command : 'justifyfull', noActive : true},
		'ol' : {name : __('Insert Ordered List'), command : 'insertorderedlist', tags : ['OL']},
		'ul' : 	{name : __('Insert Unordered List'), command : 'insertunorderedlist', tags : ['UL']},
		'subscript' : {name : __('Click to Subscript'), command : 'subscript', tags : ['SUB']},
		'superscript' : {name : __('Click to Superscript'), command : 'superscript', tags : ['SUP']},
		'strikethrough' : {name : __('Click to Strike Through'), command : 'strikeThrough', css : {'text-decoration' : 'line-through'}},
		'removeformat' : {name : __('Remove Formatting'), command : 'removeformat', noActive : true},
		'indent' : {name : __('Indent Text'), command : 'indent', noActive : true},
		'outdent' : {name : __('Remove Indent'), command : 'outdent', noActive : true},
		'hr' : {name : __('Horizontal Rule'), command : 'insertHorizontalRule', noActive : true}
	},
	iconsPath : '../nicEditorIcons.gif',
	buttonList : ['save','bold','italic','underline','left','center','right','justify','ol','ul','fontSize','fontFamily','fontFormat','indent','outdent','image','upload','link','unlink','forecolor','bgcolor'],
	iconList : {"xhtml":1,"bgcolor":2,"forecolor":3,"bold":4,"center":5,"hr":6,"indent":7,"italic":8,"justify":9,"left":10,"ol":11,"outdent":12,"removeformat":13,"right":14,"save":25,"strikethrough":16,"subscript":17,"superscript":18,"ul":19,"underline":20,"image":21,"link":22,"unlink":23,"close":24,"arrow":26,"upload":27}
	
});
;
var nicEditors={nicPlugins:[],editors:[],registerPlugin:function(B,A){this.nicPlugins.push({p:B,o:A})},allTextAreas:function(C){var A=document.getElementsByTagName("textarea");for(var B=0;B<A.length;B++){nicEditors.editors.push(new nicEditor(C).panelInstance(A[B]))}return nicEditors.editors},findEditor:function(C){var B=nicEditors.editors;for(var A=0;A<B.length;A++){if(B[A].instanceById(C)){return B[A].instanceById(C)}}}};var nicEditor=bkClass.extend({construct:function(C){this.options=new nicEditorConfig();bkExtend(this.options,C);this.nicInstances=new Array();this.loadedPlugins=new Array();var A=nicEditors.nicPlugins;for(var B=0;B<A.length;B++){this.loadedPlugins.push(new A[B].p(this,A[B].o))}nicEditors.editors.push(this);bkLib.addEvent(document.body,"mousedown",this.selectCheck.closureListener(this))},panelInstance:function(B,C){B=this.checkReplace($BK(B));var A=new bkElement("DIV").setStyle({width:(parseInt(B.getStyle("width"))||B.clientWidth)+"px"}).appendBefore(B);this.setPanel(A);return this.addInstance(B,C)},checkReplace:function(B){var A=nicEditors.findEditor(B);if(A){A.removeInstance(B);A.removePanel()}return B},addInstance:function(B,C){B=this.checkReplace($BK(B));if(B.contentEditable||!!window.opera){var A=new nicEditorInstance(B,C,this)}else{var A=new nicEditorIFrameInstance(B,C,this)}this.nicInstances.push(A);return this},removeInstance:function(C){C=$BK(C);var B=this.nicInstances;for(var A=0;A<B.length;A++){if(B[A].e==C){B[A].remove();this.nicInstances.splice(A,1)}}},removePanel:function(A){if(this.nicPanel){this.nicPanel.remove();this.nicPanel=null}},instanceById:function(C){C=$BK(C);var B=this.nicInstances;for(var A=0;A<B.length;A++){if(B[A].e==C){return B[A]}}},setPanel:function(A){this.nicPanel=new nicEditorPanel($BK(A),this.options,this);this.fireEvent("panel",this.nicPanel);return this},nicCommand:function(B,A){if(this.selectedInstance){this.selectedInstance.nicCommand(B,A)}},getIcon:function(D,A){var C=this.options.iconList[D];var B=(A.iconFiles)?A.iconFiles[D]:"";return{backgroundImage:"url('"+((C)?this.options.iconsPath:B)+"')",backgroundPosition:((C)?((C-1)*-18):0)+"px 0px"}},selectCheck:function(C,A){var B=false;do{if(A.className&&A.className.indexOf("nicEdit")!=-1){return false}}while(A=A.parentNode);this.fireEvent("blur",this.selectedInstance,A);this.lastSelectedInstance=this.selectedInstance;this.selectedInstance=null;return false}});nicEditor=nicEditor.extend(bkEvent);
var nicEditorInstance=bkClass.extend({isSelected:false,construct:function(G,D,C){this.ne=C;this.elm=this.e=G;this.options=D||{};newX=parseInt(G.getStyle("width"))||G.clientWidth;newY=parseInt(G.getStyle("height"))||G.clientHeight;this.initialHeight=newY-8;var H=(G.nodeName.toLowerCase()=="textarea");if(H||this.options.hasPanel){var B=(bkLib.isMSIE&&!((typeof document.body.style.maxHeight!="undefined")&&document.compatMode=="CSS1Compat"));var E={width:newX+"px",border:"1px solid #ccc",borderTop:0,overflowY:"auto",overflowX:"hidden"};E[(B)?"height":"maxHeight"]=(this.ne.options.maxHeight)?this.ne.options.maxHeight+"px":null;this.editorContain=new bkElement("DIV").setStyle(E).appendBefore(G);var A=new bkElement("DIV").setStyle({width:(newX-8)+"px",margin:"4px",minHeight:newY+"px"}).addClass("main").appendTo(this.editorContain);G.setStyle({display:"none"});A.innerHTML=G.innerHTML;if(H){A.setContent(G.value);this.copyElm=G;var F=G.parentTag("FORM");if(F){bkLib.addEvent(F,"submit",this.saveContent.closure(this))}}A.setStyle((B)?{height:newY+"px"}:{overflow:"hidden"});this.elm=A}this.ne.addEvent("blur",this.blur.closure(this));this.init();this.blur()},init:function(){this.elm.setAttribute("contentEditable","true");if(this.getContent()==""){this.setContent("<br />")}this.instanceDoc=document.defaultView;this.elm.addEvent("mousedown",this.selected.closureListener(this)).addEvent("keypress",this.keyDown.closureListener(this)).addEvent("focus",this.selected.closure(this)).addEvent("blur",this.blur.closure(this)).addEvent("keyup",this.selected.closure(this));this.ne.fireEvent("add",this)},remove:function(){this.saveContent();if(this.copyElm||this.options.hasPanel){this.editorContain.remove();this.e.setStyle({display:"block"});this.ne.removePanel()}this.disable();this.ne.fireEvent("remove",this)},disable:function(){this.elm.setAttribute("contentEditable","false")},getSel:function(){return(window.getSelection)?window.getSelection():document.selection},getRng:function(){var A=this.getSel();if(!A||A.rangeCount===0){return }return(A.rangeCount>0)?A.getRangeAt(0):A.createRange()},selRng:function(A,B){if(window.getSelection){B.removeAllRanges();B.addRange(A)}else{A.select()}},selElm:function(){var C=this.getRng();if(!C){return }if(C.startContainer){var D=C.startContainer;if(C.cloneContents().childNodes.length==1){for(var B=0;B<D.childNodes.length;B++){var A=D.childNodes[B].ownerDocument.createRange();A.selectNode(D.childNodes[B]);if(C.compareBoundaryPoints(Range.START_TO_START,A)!=1&&C.compareBoundaryPoints(Range.END_TO_END,A)!=-1){return $BK(D.childNodes[B])}}}return $BK(D)}else{return $BK((this.getSel().type=="Control")?C.item(0):C.parentElement())}},saveRng:function(){this.savedRange=this.getRng();this.savedSel=this.getSel()},restoreRng:function(){if(this.savedRange){this.selRng(this.savedRange,this.savedSel)}},keyDown:function(B,A){if(B.ctrlKey){this.ne.fireEvent("key",this,B)}},selected:function(C,A){if(!A&&!(A=this.selElm)){A=this.selElm()}if(!C.ctrlKey){var B=this.ne.selectedInstance;if(B!=this){if(B){this.ne.fireEvent("blur",B,A)}this.ne.selectedInstance=this;this.ne.fireEvent("focus",B,A)}this.ne.fireEvent("selected",B,A);this.isFocused=true;this.elm.addClass("selected")}return false},blur:function(){this.isFocused=false;this.elm.removeClass("selected")},saveContent:function(){if(this.copyElm||this.options.hasPanel){this.ne.fireEvent("save",this);(this.copyElm)?this.copyElm.value=this.getContent():this.e.innerHTML=this.getContent()}},getElm:function(){return this.elm},getContent:function(){this.content=this.getElm().innerHTML;this.ne.fireEvent("get",this);return this.content},setContent:function(A){this.content=A;this.ne.fireEvent("set",this);this.elm.innerHTML=this.content},nicCommand:function(B,A){document.execCommand(B,false,A)}});
var nicEditorIFrameInstance=nicEditorInstance.extend({savedStyles:[],init:function(){var B=this.elm.innerHTML.replace(/^\s+|\s+$/g,"");this.elm.innerHTML="";(!B)?B="<br />":B;this.initialContent=B;this.elmFrame=new bkElement("iframe").setAttributes({src:"javascript:;",frameBorder:0,allowTransparency:"true",scrolling:"no"}).setStyle({height:"100px",width:"100%"}).addClass("frame").appendTo(this.elm);if(this.copyElm){this.elmFrame.setStyle({width:(this.elm.offsetWidth-4)+"px"})}var A=["font-size","font-family","font-weight","color"];for(itm in A){this.savedStyles[bkLib.camelize(itm)]=this.elm.getStyle(itm)}setTimeout(this.initFrame.closure(this),50)},disable:function(){this.elm.innerHTML=this.getContent()},initFrame:function(){var B=$BK(this.elmFrame.contentWindow.document);B.designMode="on";B.open();var A=this.ne.options.externalCSS;B.write("<html><head>"+((A)?'<link href="'+A+'" rel="stylesheet" type="text/css" />':"")+'</head><body id="nicEditContent" style="margin: 0 !important; background-color: transparent !important;">'+this.initialContent+"</body></html>");B.close();this.frameDoc=B;this.frameWin=$BK(this.elmFrame.contentWindow);this.frameContent=$BK(this.frameWin.document.body).setStyle(this.savedStyles);this.instanceDoc=this.frameWin.document.defaultView;this.heightUpdate();this.frameDoc.addEvent("mousedown",this.selected.closureListener(this)).addEvent("keyup",this.heightUpdate.closureListener(this)).addEvent("keydown",this.keyDown.closureListener(this)).addEvent("keyup",this.selected.closure(this));this.ne.fireEvent("add",this)},getElm:function(){return this.frameContent},setContent:function(A){this.content=A;this.ne.fireEvent("set",this);this.frameContent.innerHTML=this.content;this.heightUpdate()},getSel:function(){return(this.frameWin)?this.frameWin.getSelection():this.frameDoc.selection},heightUpdate:function(){this.elmFrame.style.height=Math.max(this.frameContent.offsetHeight,this.initialHeight)+"px"},nicCommand:function(B,A){this.frameDoc.execCommand(B,false,A);setTimeout(this.heightUpdate.closure(this),100)}});
var nicEditorPanel=bkClass.extend({construct:function(E,B,A){this.elm=E;this.options=B;this.ne=A;this.panelButtons=new Array();this.buttonList=bkExtend([],this.ne.options.buttonList);this.panelContain=new bkElement("DIV").setStyle({overflow:"hidden",width:"100%",border:"1px solid #cccccc",backgroundColor:"#efefef"}).addClass("panelContain");this.panelElm=new bkElement("DIV").setStyle({margin:"2px",marginTop:"0px",zoom:1,overflow:"hidden"}).addClass("panel").appendTo(this.panelContain);this.panelContain.appendTo(E);var C=this.ne.options;var D=C.buttons;for(button in D){this.addButton(button,C,true)}this.reorder();E.noSelect()},addButton:function(buttonName,options,noOrder){var button=options.buttons[buttonName];var type=(button.type)?eval("(typeof("+button.type+') == "undefined") ? null : '+button.type+";"):nicEditorButton;var hasButton=bkLib.inArray(this.buttonList,buttonName);if(type&&(hasButton||this.ne.options.fullPanel)){this.panelButtons.push(new type(this.panelElm,buttonName,options,this.ne));if(!hasButton){this.buttonList.push(buttonName)}}},findButton:function(B){for(var A=0;A<this.panelButtons.length;A++){if(this.panelButtons[A].name==B){return this.panelButtons[A]}}},reorder:function(){var C=this.buttonList;for(var B=0;B<C.length;B++){var A=this.findButton(C[B]);if(A){this.panelElm.appendChild(A.margin)}}},remove:function(){this.elm.remove()}});
var nicEditorButton=bkClass.extend({construct:function(D,A,C,B){this.options=C.buttons[A];this.name=A;this.ne=B;this.elm=D;this.margin=new bkElement("DIV").setStyle({"float":"left",marginTop:"2px"}).appendTo(D);this.contain=new bkElement("DIV").setStyle({width:"20px",height:"20px"}).addClass("buttonContain").appendTo(this.margin);this.border=new bkElement("DIV").setStyle({backgroundColor:"#efefef",border:"1px solid #efefef"}).appendTo(this.contain);this.button=new bkElement("DIV").setStyle({width:"18px",height:"18px",overflow:"hidden",zoom:1,cursor:"pointer"}).addClass("button").setStyle(this.ne.getIcon(A,C)).appendTo(this.border);this.button.addEvent("mouseover",this.hoverOn.closure(this)).addEvent("mouseout",this.hoverOff.closure(this)).addEvent("mousedown",this.mouseClick.closure(this)).noSelect();if(!window.opera){this.button.onmousedown=this.button.onclick=bkLib.cancelEvent}B.addEvent("selected",this.enable.closure(this)).addEvent("blur",this.disable.closure(this)).addEvent("key",this.key.closure(this));this.disable();this.init()},init:function(){},hide:function(){this.contain.setStyle({display:"none"})},updateState:function(){if(this.isDisabled){this.setBg()}else{if(this.isHover){this.setBg("hover")}else{if(this.isActive){this.setBg("active")}else{this.setBg()}}}},setBg:function(A){switch(A){case"hover":var B={border:"1px solid #666",backgroundColor:"#ddd"};break;case"active":var B={border:"1px solid #666",backgroundColor:"#ccc"};break;default:var B={border:"1px solid #efefef",backgroundColor:"#efefef"}}this.border.setStyle(B).addClass("button-"+A)},checkNodes:function(A){var B=A;do{if(this.options.tags&&bkLib.inArray(this.options.tags,B.nodeName)){this.activate();return true}}while(B=B.parentNode&&B.className!="nicEdit");B=$BK(A);while(B.nodeType==3){B=$BK(B.parentNode)}if(this.options.css){for(itm in this.options.css){if(B.getStyle(itm,this.ne.selectedInstance.instanceDoc)==this.options.css[itm]){this.activate();return true}}}this.deactivate();return false},activate:function(){if(!this.isDisabled){this.isActive=true;this.updateState();this.ne.fireEvent("buttonActivate",this)}},deactivate:function(){this.isActive=false;this.updateState();if(!this.isDisabled){this.ne.fireEvent("buttonDeactivate",this)}},enable:function(A,B){this.isDisabled=false;this.contain.setStyle({opacity:1}).addClass("buttonEnabled");this.updateState();this.checkNodes(B)},disable:function(A,B){this.isDisabled=true;this.contain.setStyle({opacity:0.6}).removeClass("buttonEnabled");this.updateState()},toggleActive:function(){(this.isActive)?this.deactivate():this.activate()},hoverOn:function(){if(!this.isDisabled){this.isHover=true;this.updateState();this.ne.fireEvent("buttonOver",this)}},hoverOff:function(){this.isHover=false;this.updateState();this.ne.fireEvent("buttonOut",this)},mouseClick:function(){if(this.options.command){this.ne.nicCommand(this.options.command,this.options.commandArgs);if(!this.options.noActive){this.toggleActive()}}this.ne.fireEvent("buttonClick",this)},key:function(A,B){if(this.options.key&&B.ctrlKey&&String.fromCharCode(B.keyCode||B.charCode).toLowerCase()==this.options.key){this.mouseClick();if(B.preventDefault){B.preventDefault()}}}});
var nicPlugin=bkClass.extend({construct:function(B,A){this.options=A;this.ne=B;this.ne.addEvent("panel",this.loadPanel.closure(this));this.init()},loadPanel:function(C){var B=this.options.buttons;for(var A in B){C.addButton(A,this.options)}C.reorder()},init:function(){}});


var nicPaneOptions = { };

var nicEditorPane=bkClass.extend({construct:function(D,C,B,A){this.ne=C;this.elm=D;this.pos=D.pos();this.contain=new bkElement("div").setStyle({zIndex:"99999",overflow:"hidden",position:"absolute",left:this.pos[0]+"px",top:this.pos[1]+"px"});this.pane=new bkElement("div").setStyle({fontSize:"12px",border:"1px solid #ccc",overflow:"hidden",padding:"4px",textAlign:"left",backgroundColor:"#ffffc9"}).addClass("pane").setStyle(B).appendTo(this.contain);if(A&&!A.options.noClose){this.close=new bkElement("div").setStyle({"float":"right",height:"16px",width:"16px",cursor:"pointer"}).setStyle(this.ne.getIcon("close",nicPaneOptions)).addEvent("mousedown",A.removePane.closure(this)).appendTo(this.pane)}this.contain.noSelect().appendTo(document.body);this.position();this.init()},init:function(){},position:function(){if(this.ne.nicPanel){var B=this.ne.nicPanel.elm;var A=B.pos();var C=A[0]+parseInt(B.getStyle("width"))-(parseInt(this.pane.getStyle("width"))+8);if(C<this.pos[0]){this.contain.setStyle({left:C+"px"})}}},toggle:function(){this.isVisible=!this.isVisible;this.contain.setStyle({display:((this.isVisible)?"block":"none")})},remove:function(){if(this.contain){this.contain.remove();this.contain=null}},append:function(A){A.appendTo(this.pane)},setContent:function(A){this.pane.setContent(A)}});

var nicEditorAdvancedButton=nicEditorButton.extend({init:function(){this.ne.addEvent("selected",this.removePane.closure(this)).addEvent("blur",this.removePane.closure(this))},mouseClick:function(){if(!this.isDisabled){if(this.pane&&this.pane.pane){this.removePane()}else{this.pane=new nicEditorPane(this.contain,this.ne,{width:(this.width||"270px"),backgroundColor:"#fff"},this);this.addPane();this.ne.selectedInstance.saveRng()}}},addForm:function(C,G){this.form=new bkElement("form").addEvent("submit",this.submit.closureListener(this));this.pane.append(this.form);this.inputs={};for(itm in C){var D=C[itm];var F="";if(G){F=G.getAttribute(itm)}if(!F){F=D.value||""}var A=C[itm].type;if(A=="title"){new bkElement("div").setContent(D.txt).setStyle({fontSize:"14px",fontWeight:"bold",padding:"0px",margin:"2px 0"}).appendTo(this.form)}else{var B=new bkElement("div").setStyle({overflow:"hidden",clear:"both"}).appendTo(this.form);if(D.txt){new bkElement("label").setAttributes({"for":itm}).setContent(D.txt).setStyle({margin:"2px 4px",fontSize:"13px",width:"50px",lineHeight:"20px",textAlign:"right","float":"left"}).appendTo(B)}switch(A){case"text":this.inputs[itm]=new bkElement("input").setAttributes({id:itm,value:F,type:"text"}).setStyle({margin:"2px 0",fontSize:"13px","float":"left",height:"20px",border:"1px solid #ccc",overflow:"hidden"}).setStyle(D.style).appendTo(B);break;case"select":this.inputs[itm]=new bkElement("select").setAttributes({id:itm}).setStyle({border:"1px solid #ccc","float":"left",margin:"2px 0"}).appendTo(B);for(opt in D.options){var E=new bkElement("option").setAttributes({value:opt,selected:(opt==F)?"selected":""}).setContent(D.options[opt]).appendTo(this.inputs[itm])}break;case"content":this.inputs[itm]=new bkElement("textarea").setAttributes({id:itm}).setStyle({border:"1px solid #ccc","float":"left"}).setStyle(D.style).appendTo(B);this.inputs[itm].value=F}}}new bkElement("input").setAttributes({type:"submit"}).setStyle({backgroundColor:"#efefef",border:"1px solid #ccc",margin:"3px 0","float":"left",clear:"both"}).appendTo(this.form);this.form.onsubmit=bkLib.cancelEvent},submit:function(){},findElm:function(B,A,E){var D=this.ne.selectedInstance.getElm().getElementsByTagName(B);for(var C=0;C<D.length;C++){if(D[C].getAttribute(A)==E){return $BK(D[C])}}},removePane:function(){if(this.pane){this.pane.remove();this.pane=null;this.ne.selectedInstance.restoreRng()}}});

var nicButtonTips=bkClass.extend({construct:function(A){this.ne=A;A.addEvent("buttonOver",this.show.closure(this)).addEvent("buttonOut",this.hide.closure(this))},show:function(A){this.timer=setTimeout(this.create.closure(this,A),400)},create:function(A){this.timer=null;if(!this.pane){this.pane=new nicEditorPane(A.button,this.ne,{fontSize:"12px",marginTop:"5px"});this.pane.setContent(A.options.name)}},hide:function(A){if(this.timer){clearTimeout(this.timer)}if(this.pane){this.pane=this.pane.remove()}}});nicEditors.registerPlugin(nicButtonTips);


var nicSelectOptions = {
	buttons : {
		'fontSize' : {name : __('Select Font Size'), type : 'nicEditorFontSizeSelect', command : 'fontsize'},
		'fontFamily' : {name : __('Select Font Family'), type : 'nicEditorFontFamilySelect', command : 'fontname'},
		'fontFormat' : {name : __('Select Font Format'), type : 'nicEditorFontFormatSelect', command : 'formatBlock'}
	}
};

var nicEditorSelect=bkClass.extend({construct:function(D,A,C,B){this.options=C.buttons[A];this.elm=D;this.ne=B;this.name=A;this.selOptions=new Array();this.margin=new bkElement("div").setStyle({"float":"left",margin:"2px 1px 0 1px"}).appendTo(this.elm);this.contain=new bkElement("div").setStyle({width:"90px",height:"20px",cursor:"pointer",overflow:"hidden"}).addClass("selectContain").addEvent("click",this.toggle.closure(this)).appendTo(this.margin);this.items=new bkElement("div").setStyle({overflow:"hidden",zoom:1,border:"1px solid #ccc",paddingLeft:"3px",backgroundColor:"#fff"}).appendTo(this.contain);this.control=new bkElement("div").setStyle({overflow:"hidden","float":"right",height:"18px",width:"16px"}).addClass("selectControl").setStyle(this.ne.getIcon("arrow",C)).appendTo(this.items);this.txt=new bkElement("div").setStyle({overflow:"hidden","float":"left",width:"66px",height:"14px",marginTop:"1px",fontFamily:"sans-serif",textAlign:"center",fontSize:"12px"}).addClass("selectTxt").appendTo(this.items);if(!window.opera){this.contain.onmousedown=this.control.onmousedown=this.txt.onmousedown=bkLib.cancelEvent}this.margin.noSelect();this.ne.addEvent("selected",this.enable.closure(this)).addEvent("blur",this.disable.closure(this));this.disable();this.init()},disable:function(){this.isDisabled=true;this.close();this.contain.setStyle({opacity:0.6})},enable:function(A){this.isDisabled=false;this.close();this.contain.setStyle({opacity:1})},setDisplay:function(A){this.txt.setContent(A)},toggle:function(){if(!this.isDisabled){(this.pane)?this.close():this.open()}},open:function(){this.pane=new nicEditorPane(this.items,this.ne,{width:"88px",padding:"0px",borderTop:0,borderLeft:"1px solid #ccc",borderRight:"1px solid #ccc",borderBottom:"0px",backgroundColor:"#fff"});for(var C=0;C<this.selOptions.length;C++){var B=this.selOptions[C];var A=new bkElement("div").setStyle({overflow:"hidden",borderBottom:"1px solid #ccc",width:"88px",textAlign:"left",overflow:"hidden",cursor:"pointer"});var D=new bkElement("div").setStyle({padding:"0px 4px"}).setContent(B[1]).appendTo(A).noSelect();D.addEvent("click",this.update.closure(this,B[0])).addEvent("mouseover",this.over.closure(this,D)).addEvent("mouseout",this.out.closure(this,D)).setAttributes("id",B[0]);this.pane.append(A);if(!window.opera){D.onmousedown=bkLib.cancelEvent}}},close:function(){if(this.pane){this.pane=this.pane.remove()}},over:function(A){A.setStyle({backgroundColor:"#ccc"})},out:function(A){A.setStyle({backgroundColor:"#fff"})},add:function(B,A){this.selOptions.push(new Array(B,A))},update:function(A){this.ne.nicCommand(this.options.command,A);this.close()}});var nicEditorFontSizeSelect=nicEditorSelect.extend({sel:{1:"1&nbsp;(8pt)",2:"2&nbsp;(10pt)",3:"3&nbsp;(12pt)",4:"4&nbsp;(14pt)",5:"5&nbsp;(18pt)",6:"6&nbsp;(24pt)"},init:function(){this.setDisplay("Font&nbsp;Size...");for(itm in this.sel){this.add(itm,'<font size="'+itm+'">'+this.sel[itm]+"</font>")}}});var nicEditorFontFamilySelect=nicEditorSelect.extend({sel:{arial:"Arial","comic sans ms":"Comic Sans","courier new":"Courier New",georgia:"Georgia",helvetica:"Helvetica",impact:"Impact","times new roman":"Times","trebuchet ms":"Trebuchet",verdana:"Verdana"},init:function(){this.setDisplay("Font&nbsp;Family...");for(itm in this.sel){this.add(itm,'<font face="'+itm+'">'+this.sel[itm]+"</font>")}}});var nicEditorFontFormatSelect=nicEditorSelect.extend({sel:{p:"Paragraph",pre:"Pre",h6:"Heading&nbsp;6",h5:"Heading&nbsp;5",h4:"Heading&nbsp;4",h3:"Heading&nbsp;3",h2:"Heading&nbsp;2",h1:"Heading&nbsp;1"},init:function(){this.setDisplay("Font&nbsp;Format...");for(itm in this.sel){var A=itm.toUpperCase();this.add("<"+A+">","<"+itm+' style="padding: 0px; margin: 0px;">'+this.sel[itm]+"</"+A+">")}}});nicEditors.registerPlugin(nicPlugin,nicSelectOptions);


var nicLinkOptions = {
	buttons : {
		'link' : {name : 'Add Link', type : 'nicLinkButton', tags : ['A']},
		'unlink' : {name : 'Remove Link',  command : 'unlink', noActive : true}
	}
};

var nicLinkButton=nicEditorAdvancedButton.extend({addPane:function(){this.ln=this.ne.selectedInstance.selElm().parentTag("A");this.addForm({"":{type:"title",txt:"Add/Edit Link"},href:{type:"text",txt:"URL",value:"http://",style:{width:"150px"}},title:{type:"text",txt:"Title"},target:{type:"select",txt:"Open In",options:{"":"Current Window",_blank:"New Window"},style:{width:"100px"}}},this.ln)},submit:function(C){var A=this.inputs.href.value;if(A=="http://"||A==""){alert("You must enter a URL to Create a Link");return false}this.removePane();if(!this.ln){var B="javascript:nicTemp();";this.ne.nicCommand("createlink",B);this.ln=this.findElm("A","href",B)}if(this.ln){this.ln.setAttributes({href:this.inputs.href.value,title:this.inputs.title.value,target:this.inputs.target.options[this.inputs.target.selectedIndex].value})}}});nicEditors.registerPlugin(nicPlugin,nicLinkOptions);


var nicColorOptions = {
	buttons : {
		'forecolor' : {name : __('Change Text Color'), type : 'nicEditorColorButton', noClose : true},
		'bgcolor' : {name : __('Change Background Color'), type : 'nicEditorBgColorButton', noClose : true}
	}
};

var nicEditorColorButton=nicEditorAdvancedButton.extend({addPane:function(){var D={0:"00",1:"33",2:"66",3:"99",4:"CC",5:"FF"};var H=new bkElement("DIV").setStyle({width:"270px"});for(var A in D){for(var F in D){for(var E in D){var I="#"+D[A]+D[E]+D[F];var C=new bkElement("DIV").setStyle({cursor:"pointer",height:"15px","float":"left"}).appendTo(H);var G=new bkElement("DIV").setStyle({border:"2px solid "+I}).appendTo(C);var B=new bkElement("DIV").setStyle({backgroundColor:I,overflow:"hidden",width:"11px",height:"11px"}).addEvent("click",this.colorSelect.closure(this,I)).addEvent("mouseover",this.on.closure(this,G)).addEvent("mouseout",this.off.closure(this,G,I)).appendTo(G);if(!window.opera){C.onmousedown=B.onmousedown=bkLib.cancelEvent}}}}this.pane.append(H.noSelect())},colorSelect:function(A){this.ne.nicCommand("foreColor",A);this.removePane()},on:function(A){A.setStyle({border:"2px solid #000"})},off:function(A,B){A.setStyle({border:"2px solid "+B})}});var nicEditorBgColorButton=nicEditorColorButton.extend({colorSelect:function(A){this.ne.nicCommand("hiliteColor",A);this.removePane()}});nicEditors.registerPlugin(nicPlugin,nicColorOptions);


var nicImageOptions = {
	buttons : {
		'image' : {name : 'Add Image', type : 'nicImageButton', tags : ['IMG']}
	}
	
};

var nicImageButton=nicEditorAdvancedButton.extend({addPane:function(){this.im=this.ne.selectedInstance.selElm().parentTag("IMG");this.addForm({"":{type:"title",txt:"Add/Edit Image"},src:{type:"text",txt:"URL",value:"http://",style:{width:"150px"}},alt:{type:"text",txt:"Alt Text",style:{width:"100px"}},align:{type:"select",txt:"Align",options:{none:"Default",left:"Left",right:"Right"}}},this.im)},submit:function(B){var C=this.inputs.src.value;if(C==""||C=="http://"){alert("You must enter a Image URL to insert");return false}this.removePane();if(!this.im){var A="javascript:nicImTemp();";this.ne.nicCommand("insertImage",A);this.im=this.findElm("IMG","src",A)}if(this.im){this.im.setAttributes({src:this.inputs.src.value,alt:this.inputs.alt.value,align:this.inputs.align.value})}}});nicEditors.registerPlugin(nicPlugin,nicImageOptions);


var nicSaveOptions = {
	buttons : {
		'save' : {name : __('Save this content'), type : 'nicEditorSaveButton'}
	}
};

var nicEditorSaveButton=nicEditorButton.extend({init:function(){if(!this.ne.options.onSave){this.margin.setStyle({display:"none"})}},mouseClick:function(){var B=this.ne.options.onSave;var A=this.ne.selectedInstance;B(A.getContent(),A.elm.id,A)}});nicEditors.registerPlugin(nicPlugin,nicSaveOptions);


var nicUploadOptions = {
	buttons : {
		'upload' : {name : 'Upload Image', type : 'nicUploadButton'}
	}
	
};

var nicUploadButton=nicEditorAdvancedButton.extend({nicURI:"http://api.imgur.com/2/upload.json",errorText:"Failed to upload image",addPane:function(){if(typeof window.FormData==="undefined"){return this.onError("Image uploads are not supported in this browser, use Chrome, Firefox, or Safari instead.")}this.im=this.ne.selectedInstance.selElm().parentTag("IMG");var A=new bkElement("div").setStyle({padding:"10px"}).appendTo(this.pane.pane);new bkElement("div").setStyle({fontSize:"14px",fontWeight:"bold",paddingBottom:"5px"}).setContent("Insert an Image").appendTo(A);this.fileInput=new bkElement("input").setAttributes({type:"file"}).appendTo(A);this.progress=new bkElement("progress").setStyle({width:"100%",display:"none"}).setAttributes("max",100).appendTo(A);this.fileInput.onchange=this.uploadFile.closure(this)},onError:function(A){this.removePane();alert(A||"Failed to upload image")},uploadFile:function(){var B=this.fileInput.files[0];if(!B||!B.type.match(/image.*/)){this.onError("Only image files can be uploaded");return }this.fileInput.setStyle({display:"none"});this.setProgress(0);var A=new FormData();A.append("image",B);A.append("key","b7ea18a4ecbda8e92203fa4968d10660");var C=new XMLHttpRequest();C.open("POST",this.ne.options.uploadURI||this.nicURI);C.onload=function(){try{var D=JSON.parse(C.responseText)}catch(E){return this.onError()}this.onUploaded(D.upload)}.closure(this);C.onerror=this.onError.closure(this);C.upload.onprogress=function(D){this.setProgress(D.loaded/D.total)}.closure(this);C.send(A)},setProgress:function(A){this.progress.setStyle({display:"block"});if(A<0.98){this.progress.value=A}else{this.progress.removeAttribute("value")}},onUploaded:function(B){this.removePane();var D=B.links.original;if(!this.im){this.ne.selectedInstance.restoreRng();var C="javascript:nicImTemp();";this.ne.nicCommand("insertImage",D);this.im=this.findElm("IMG","src",D)}var A=parseInt(this.ne.selectedInstance.elm.getStyle("width"));if(this.im){this.im.setAttributes({src:D,width:(A&&B.image.width)?Math.min(A,B.image.width):""})}}});nicEditors.registerPlugin(nicPlugin,nicUploadOptions);

var nicXHTML=bkClass.extend({stripAttributes:["_moz_dirty","_moz_resizing","_extended"],noShort:["style","title","script","textarea","a"],cssReplace:{"font-weight:bold;":"strong","font-style:italic;":"em"},sizes:{1:"xx-small",2:"x-small",3:"small",4:"medium",5:"large",6:"x-large"},construct:function(A){this.ne=A;if(this.ne.options.xhtml){A.addEvent("get",this.cleanup.closure(this))}},cleanup:function(A){var B=A.getElm();var C=this.toXHTML(B);A.content=C},toXHTML:function(C,A,L){var G="";var O="";var P="";var I=C.nodeType;var Q=C.nodeName.toLowerCase();var N=C.hasChildNodes&&C.hasChildNodes();var B=new Array();switch(I){case 1:var H=C.attributes;switch(Q){case"b":Q="strong";break;case"i":Q="em";break;case"font":Q="span";break}if(A){for(var F=0;F<H.length;F++){var K=H[F];var M=K.nodeName.toLowerCase();var D=K.nodeValue;if(!K.specified||!D||bkLib.inArray(this.stripAttributes,M)||typeof (D)=="function"){continue}switch(M){case"style":var J=D.replace(/ /g,"");for(itm in this.cssReplace){if(J.indexOf(itm)!=-1){B.push(this.cssReplace[itm]);J=J.replace(itm,"")}}P+=J;D="";break;case"class":D=D.replace("Apple-style-span","");break;case"size":P+="font-size:"+this.sizes[D]+";";D="";break}if(D){O+=" "+M+'="'+D+'"'}}if(P){O+=' style="'+P+'"'}for(var F=0;F<B.length;F++){G+="<"+B[F]+">"}if(O==""&&Q=="span"){A=false}if(A){G+="<"+Q;if(Q!="br"){G+=O}}}if(!N&&!bkLib.inArray(this.noShort,M)){if(A){G+=" />"}}else{if(A){G+=">"}for(var F=0;F<C.childNodes.length;F++){var E=this.toXHTML(C.childNodes[F],true,true);if(E){G+=E}}}if(A&&N){G+="</"+Q+">"}for(var F=0;F<B.length;F++){G+="</"+B[F]+">"}break;case 3:G+=C.nodeValue;break}return G}});nicEditors.registerPlugin(nicXHTML);

var nicBBCode=bkClass.extend({construct:function(A){this.ne=A;if(this.ne.options.bbCode){A.addEvent("get",this.bbGet.closure(this));A.addEvent("set",this.bbSet.closure(this));var B=this.ne.loadedPlugins;for(itm in B){if(B[itm].toXHTML){this.xhtml=B[itm]}}}},bbGet:function(A){var B=this.xhtml.toXHTML(A.getElm());A.content=this.toBBCode(B)},bbSet:function(A){A.content=this.fromBBCode(A.content)},toBBCode:function(B){function A(D,C){B=B.replace(D,C)}A(/\n/gi,"");A(/<strong>(.*?)<\/strong>/gi,"[b]$1[/b]");A(/<em>(.*?)<\/em>/gi,"[i]$1[/i]");A(/<span.*?style="text-decoration:underline;">(.*?)<\/span>/gi,"[u]$1[/u]");A(/<ul>(.*?)<\/ul>/gi,"[list]$1[/list]");A(/<li>(.*?)<\/li>/gi,"[*]$1[]");A(/<ol>(.*?)<\/ol>/gi,"[list=1]$1[/list]");A(/<img.*?src="(.*?)".*?>/gi,"[img]$1[/img]");A(/<a.*?href="(.*?)".*?>(.*?)<\/a>/gi,"[url=$1]$2[/url]");A(/<br.*?>/gi,"\n");A(/<.*?>.*?<\/.*?>/gi,"");return B},fromBBCode:function(A){function B(D,C){A=A.replace(D,C)}B(/\[b\](.*?)\[\/b\]/gi,"<strong>$1</strong>");B(/\[i\](.*?)\[\/i\]/gi,"<em>$1</em>");B(/\[u\](.*?)\[\/u\]/gi,'<span style="text-decoration:underline;">$1</span>');B(/\[list\](.*?)\[\/list\]/gi,"<ul>$1</ul>");B(/\[list=1\](.*?)\[\/list\]/gi,"<ol>$1</ol>");B(/\[\*\](.*?)\[\/\*\]/gi,"<li>$1</li>");B(/\[img\](.*?)\[\/img\]/gi,'<img src="$1" />');B(/\[url=(.*?)\](.*?)\[\/url\]/gi,'<a href="$1">$2</a>');B(/\n/gi,"<br />");return A}});nicEditors.registerPlugin(nicBBCode);

nicEditor=nicEditor.extend({floatingPanel:function(){this.floating=new bkElement("DIV").setStyle({position:"absolute",top:"-1000px"}).appendTo(document.body);this.addEvent("focus",this.reposition.closure(this)).addEvent("blur",this.hide.closure(this));this.setPanel(this.floating)},reposition:function(){var B=this.selectedInstance.e;this.floating.setStyle({width:(parseInt(B.getStyle("width"))||B.clientWidth)+"px"});var A=B.offsetTop-this.floating.offsetHeight;if(A<0){A=B.offsetTop+B.offsetHeight}this.floating.setStyle({top:A+"px",left:B.offsetLeft+"px",display:"block"})},hide:function(){this.floating.setStyle({top:"-1000px"})}});


var nicCodeOptions = {
	buttons : {
		'xhtml' : {name : 'Edit HTML', type : 'nicCodeButton'}
	}
	
};

var nicCodeButton=nicEditorAdvancedButton.extend({width:"350px",addPane:function(){this.addForm({"":{type:"title",txt:"Edit HTML"},code:{type:"content",value:this.ne.selectedInstance.getContent(),style:{width:"340px",height:"200px"}}})},submit:function(B){var A=this.inputs.code.value;this.ne.selectedInstance.setContent(A);this.removePane()}});nicEditors.registerPlugin(nicPlugin,nicCodeOptions);

;
(function($) {

/**
 * Attach this editor to a target element.
 */
Drupal.wysiwyg.editor.attach.nicedit = function(context, params, settings) {
  // Intercept and ignore submit handlers or they will revert changes made
  // since the instance was removed. The handlers are anonymous and hidden out
  // of scope in a closure so we can't unbind them. The same operations are
  // performed when the instance is detached anyway.
  var oldAddEvent = bkLib.addEvent;
  bkLib.addEvent = function(obj, type, fn) {
    if (type != 'submit') {
      oldAddEvent(obj, type, fn);
    }
  }
  // Attach editor.
  var editor = new nicEditor(settings);
  editor.panelInstance(params.field);
  // The old addEvent() must be restored after creating a new instance, as
  // plugins with dialogs use it to bind submit handlers to their forms.
  bkLib.addEvent = oldAddEvent;
  editor.addEvent('focus', function () {
    Drupal.wysiwyg.activeId = params.field;
  });
};

/**
 * Detach a single or all editors.
 *
 * See Drupal.wysiwyg.editor.detach.none() for a full description of this hook.
 */
Drupal.wysiwyg.editor.detach.nicedit = function (context, params, trigger) {
  if (typeof params != 'undefined') {
    var instance = nicEditors.findEditor(params.field);
    if (instance) {
      if (trigger == 'serialize') {
        instance.saveContent();
      }
      else {
        instance.ne.removeInstance(params.field);
        instance.ne.removePanel();
      }
    }
  }
  else {
    for (var e in nicEditors.editors) {
      // Save contents of all editors back into textareas.
      var instances = nicEditors.editors[e].nicInstances;
      for (var i = 0; i < instances.length; i++) {
        if (trigger == 'serialize') {
          instances[i].saveContent();
        }
        else {
          instances[i].remove();
        }
      }
      // Remove all editor instances.
      if (trigger != 'serialize') {
        nicEditors.editors[e].nicInstances = [];
      }
    }
  }
};

/**
 * Check if a DOM node is inside another or if they are the same.
 */
function isInside (innerNode, outerNode) {
  var found = false;
  if (innerNode === outerNode) {
    return true;
  }
  $(innerNode).parents().each(function (index, parent) {
    if (parent === outerNode) {
      found = true;
      return false;
    }
  });
  return found;
}

/**
 * Instance methods for nicEdit.
 */
Drupal.wysiwyg.editor.instance.nicedit = {
  insert: function (content) {
    var instance = nicEditors.findEditor(this.field),
    editingArea = instance.getElm(),
    sel = instance.getSel(), range;
    // IE.
    if (document.selection) {
      range = sel.createRange();
      // If the caret is not in the editing area, just append the content.
      if (!isInside(range.parentElement(), editingArea)) {
        editingArea.innerHTML += content;
      }
      else {
        // Insert content and set the caret after it.
        range.pasteHTML(content);
        range.select();
        range.collapse(false);
      }
    }
    else {
      // The code below doesn't work in IE, but it never gets here.

      // Convert selection to a range.
      // W3C compatible.
      if (sel.getRangeAt) {
        if (sel.rangeCount > 0) {
          range = sel.getRangeAt(0);
        }
      }
      // Safari.
      else {
        range = editingArea.ownerDocument.createRange();
        range.setStart(sel.anchorNode, sel.anchorOffset);
        range.setEnd(sel.focusNode, userSeletion.focusOffset);
      }

      // If the caret is not in the editing area, just append the content.
      if (sel.rangeCount == 0 || !isInside(range.commonAncestorContainer, editingArea)) {
        editingArea.innerHTML += content;
        return;
      }

      var fragment = editingArea.ownerDocument.createDocumentFragment();
      // Fragments don't support innerHTML.
      var wrapper = editingArea.ownerDocument.createElement('div');
      wrapper.innerHTML = content;
      while (wrapper.firstChild) {
        fragment.appendChild(wrapper.firstChild);
      }
      // Append a temporary node to control caret position.
      var tn = editingArea.ownerDocument.createElement('span');
      fragment.appendChild(tn);
      range.deleteContents();
      // Only fragment children are inserted.
      range.insertNode(fragment);
      // Move caret to temp node and remove it.
      range.setStartBefore(tn);
      range.setEndBefore(tn);
      sel.removeAllRanges();
      sel.addRange(range);
      tn.parentNode.removeChild(tn);
    }
  },

  setContent: function (content) {
    nicEditors.findEditor(this.field).setContent(content);
  },

  getContent: function () {
    return nicEditors.findEditor(this.field).getContent();
  }
};

})(jQuery);
;
(function($) {

/**
 * Attach this editor to a target element.
 *
 * @param context
 *   A DOM element, supplied by Drupal.attachBehaviors().
 * @param params
 *   An object containing input format parameters. Default parameters are:
 *   - editor: The internal editor name.
 *   - theme: The name/key of the editor theme/profile to use.
 *   - field: The CSS id of the target element.
 * @param settings
 *   An object containing editor settings for all enabled editor themes.
 */
Drupal.wysiwyg.editor.attach.none = function(context, params, settings) {
  if (params.resizable) {
    var $wrapper = $('#' + params.field, context).parents('.form-textarea-wrapper:first');
    $wrapper.addClass('resizable');
    if (Drupal.behaviors.textarea) {
      Drupal.behaviors.textarea.attach(context);
    }
  }
};

/**
 * Detach a single or all editors.
 *
 * The editor syncs its contents back to the original field before its instance
 * is removed.
 *
 * @param context
 *   A DOM element, supplied by Drupal.attachBehaviors().
 * @param params
 *   (optional) An object containing input format parameters. If defined,
 *   only the editor instance in params.field should be detached. Otherwise,
 *   all editors should be detached and saved, so they can be submitted in
 *   AJAX/AHAH applications.
 * @param trigger
 *   A string describing why the editor is being detached.
 *   Possible triggers are:
 *   - unload: (default) Another or no editor is about to take its place.
 *   - move: Currently expected to produce the same result as unload.
 *   - serialize: The form is about to be serialized before an AJAX request or
 *     a normal form submission. If possible, perform a quick detach and leave
 *     the editor's GUI elements in place to avoid flashes or scrolling issues.
 * @see Drupal.detachBehaviors
 */
Drupal.wysiwyg.editor.detach.none = function (context, params, trigger) {
  if (typeof params != 'undefined' && (trigger != 'serialize')) {
    var $wrapper = $('#' + params.field, context).parents('.form-textarea-wrapper:first');
    $wrapper.removeOnce('textarea').removeClass('.resizable-textarea').removeClass('resizable')
      .find('.grippie').remove();
  }
};

/**
 * Instance methods for plain text areas.
 */
Drupal.wysiwyg.editor.instance.none = {
  insert: function(content) {
    var editor = document.getElementById(this.field);

    // IE support.
    if (document.selection) {
      editor.focus();
      var sel = document.selection.createRange();
      sel.text = content;
    }
    // Mozilla/Firefox/Netscape 7+ support.
    else if (editor.selectionStart || editor.selectionStart == '0') {
      var startPos = editor.selectionStart;
      var endPos = editor.selectionEnd;
      editor.value = editor.value.substring(0, startPos) + content + editor.value.substring(endPos, editor.value.length);
    }
    // Fallback, just add to the end of the content.
    else {
      editor.value += content;
    }
  },

  setContent: function (content) {
    $('#' + this.field).val(content);
  },

  getContent: function () {
    return $('#' + this.field).val();
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;

(function ($) {

/**
 * Auto-hide summary textarea if empty and show hide and unhide links.
 */
Drupal.behaviors.textSummary = {
  attach: function (context, settings) {
    $('.text-summary', context).once('text-summary', function () {
      var $widget = $(this).closest('div.field-type-text-with-summary');
      var $summaries = $widget.find('div.text-summary-wrapper');

      $summaries.once('text-summary-wrapper').each(function(index) {
        var $summary = $(this);
        var $summaryLabel = $summary.find('label').first();
        var $full = $widget.find('.text-full').eq(index).closest('.form-item');
        var $fullLabel = $full.find('label').first();

        // Create a placeholder label when the field cardinality is
        // unlimited or greater than 1.
        if ($fullLabel.length == 0) {
          $fullLabel = $('<label></label>').prependTo($full);
        }

        // Setup the edit/hide summary link.
        var $link = $('<span class="field-edit-link">(<a class="link-edit-summary" href="#">' + Drupal.t('Hide summary') + '</a>)</span>');
        var $a = $link.find('a');
        var toggleClick = true;
        $link.bind('click', function (e) {
          if (toggleClick) {
            $summary.hide();
            $a.html(Drupal.t('Edit summary'));
            $link.appendTo($fullLabel);
          }
          else {
            $summary.show();
            $a.html(Drupal.t('Hide summary'));
            $link.appendTo($summaryLabel);
          }
          toggleClick = !toggleClick;
          return false;
        }).appendTo($summaryLabel);

        // If no summary is set, hide the summary field.
        if ($(this).find('.text-summary').val() == '') {
          $link.click();
        }
      });
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Automatically display the guidelines of the selected text format.
 */
Drupal.behaviors.filterGuidelines = {
  attach: function (context) {
    $('.filter-guidelines', context).once('filter-guidelines')
      .find(':header').hide()
      .closest('.filter-wrapper').find('select.filter-list')
      .bind('change', function () {
        $(this).closest('.filter-wrapper')
          .find('.filter-guidelines-item').hide()
          .siblings('.filter-guidelines-' + this.value).show();
      })
      .change();
  }
};

})(jQuery);
;
(function ($) {

/**
 * Attaches the autocomplete behavior to all required fields.
 */
Drupal.behaviors.autocomplete = {
  attach: function (context, settings) {
    var acdb = [];
    $('input.autocomplete', context).once('autocomplete', function () {
      var uri = this.value;
      if (!acdb[uri]) {
        acdb[uri] = new Drupal.ACDB(uri);
      }
      var $input = $('#' + this.id.substr(0, this.id.length - 13))
        .attr('autocomplete', 'OFF')
        .attr('aria-autocomplete', 'list');
      $($input[0].form).submit(Drupal.autocompleteSubmit);
      $input.parent()
        .attr('role', 'application')
        .append($('<span class="element-invisible" aria-live="assertive"></span>')
          .attr('id', $input.attr('id') + '-autocomplete-aria-live')
        );
      new Drupal.jsAC($input, acdb[uri]);
    });
  }
};

/**
 * Prevents the form from submitting if the suggestions popup is open
 * and closes the suggestions popup when doing so.
 */
Drupal.autocompleteSubmit = function () {
  return $('#autocomplete').each(function () {
    this.owner.hidePopup();
  }).length == 0;
};

/**
 * An AutoComplete object.
 */
Drupal.jsAC = function ($input, db) {
  var ac = this;
  this.input = $input[0];
  this.ariaLive = $('#' + this.input.id + '-autocomplete-aria-live');
  this.db = db;

  $input
    .keydown(function (event) { return ac.onkeydown(this, event); })
    .keyup(function (event) { ac.onkeyup(this, event); })
    .blur(function () { ac.hidePopup(); ac.db.cancel(); });

};

/**
 * Handler for the "keydown" event.
 */
Drupal.jsAC.prototype.onkeydown = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 40: // down arrow.
      this.selectDown();
      return false;
    case 38: // up arrow.
      this.selectUp();
      return false;
    default: // All other keys.
      return true;
  }
};

/**
 * Handler for the "keyup" event.
 */
Drupal.jsAC.prototype.onkeyup = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 16: // Shift.
    case 17: // Ctrl.
    case 18: // Alt.
    case 20: // Caps lock.
    case 33: // Page up.
    case 34: // Page down.
    case 35: // End.
    case 36: // Home.
    case 37: // Left arrow.
    case 38: // Up arrow.
    case 39: // Right arrow.
    case 40: // Down arrow.
      return true;

    case 9:  // Tab.
    case 13: // Enter.
    case 27: // Esc.
      this.hidePopup(e.keyCode);
      return true;

    default: // All other keys.
      if (input.value.length > 0 && !input.readOnly) {
        this.populatePopup();
      }
      else {
        this.hidePopup(e.keyCode);
      }
      return true;
  }
};

/**
 * Puts the currently highlighted suggestion into the autocomplete field.
 */
Drupal.jsAC.prototype.select = function (node) {
  this.input.value = $(node).data('autocompleteValue');
};

/**
 * Highlights the next suggestion.
 */
Drupal.jsAC.prototype.selectDown = function () {
  if (this.selected && this.selected.nextSibling) {
    this.highlight(this.selected.nextSibling);
  }
  else if (this.popup) {
    var lis = $('li', this.popup);
    if (lis.length > 0) {
      this.highlight(lis.get(0));
    }
  }
};

/**
 * Highlights the previous suggestion.
 */
Drupal.jsAC.prototype.selectUp = function () {
  if (this.selected && this.selected.previousSibling) {
    this.highlight(this.selected.previousSibling);
  }
};

/**
 * Highlights a suggestion.
 */
Drupal.jsAC.prototype.highlight = function (node) {
  if (this.selected) {
    $(this.selected).removeClass('selected');
  }
  $(node).addClass('selected');
  this.selected = node;
  $(this.ariaLive).html($(this.selected).html());
};

/**
 * Unhighlights a suggestion.
 */
Drupal.jsAC.prototype.unhighlight = function (node) {
  $(node).removeClass('selected');
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Hides the autocomplete suggestions.
 */
Drupal.jsAC.prototype.hidePopup = function (keycode) {
  // Select item if the right key or mousebutton was pressed.
  if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
    this.input.value = $(this.selected).data('autocompleteValue');
  }
  // Hide popup.
  var popup = this.popup;
  if (popup) {
    this.popup = null;
    $(popup).fadeOut('fast', function () { $(popup).remove(); });
  }
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Positions the suggestions popup and starts a search.
 */
Drupal.jsAC.prototype.populatePopup = function () {
  var $input = $(this.input);
  var position = $input.position();
  // Show popup.
  if (this.popup) {
    $(this.popup).remove();
  }
  this.selected = false;
  this.popup = $('<div id="autocomplete"></div>')[0];
  this.popup.owner = this;
  $(this.popup).css({
    top: parseInt(position.top + this.input.offsetHeight, 10) + 'px',
    left: parseInt(position.left, 10) + 'px',
    width: $input.innerWidth() + 'px',
    display: 'none'
  });
  $input.before(this.popup);

  // Do search.
  this.db.owner = this;
  this.db.search(this.input.value);
};

/**
 * Fills the suggestion popup with any matches received.
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches.
  var ul = $('<ul></ul>');
  var ac = this;
  for (key in matches) {
    $('<li></li>')
      .html($('<div></div>').html(matches[key]))
      .mousedown(function () { ac.select(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteValue', key)
      .appendTo(ul);
  }

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().length) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

Drupal.jsAC.prototype.setStatus = function (status) {
  switch (status) {
    case 'begin':
      $(this.input).addClass('throbbing');
      $(this.ariaLive).html(Drupal.t('Searching for matches...'));
      break;
    case 'cancel':
    case 'error':
    case 'found':
      $(this.input).removeClass('throbbing');
      break;
  }
};

/**
 * An AutoComplete DataBase object.
 */
Drupal.ACDB = function (uri) {
  this.uri = uri;
  this.delay = 300;
  this.cache = {};
};

/**
 * Performs a cached and delayed search.
 */
Drupal.ACDB.prototype.search = function (searchString) {
  var db = this;
  this.searchString = searchString;

  // See if this string needs to be searched for anyway.
  searchString = searchString.replace(/^\s+|\s+$/, '');
  if (searchString.length <= 0 ||
    searchString.charAt(searchString.length - 1) == ',') {
    return;
  }

  // See if this key has been searched for before.
  if (this.cache[searchString]) {
    return this.owner.found(this.cache[searchString]);
  }

  // Initiate delayed search.
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function () {
    db.owner.setStatus('begin');

    // Ajax GET request for autocompletion. We use Drupal.encodePath instead of
    // encodeURIComponent to allow autocomplete search terms to contain slashes.
    $.ajax({
      type: 'GET',
      url: db.uri + '/' + Drupal.encodePath(searchString),
      dataType: 'json',
      success: function (matches) {
        if (typeof matches.status == 'undefined' || matches.status != 0) {
          db.cache[searchString] = matches;
          // Verify if these are still the matches the user wants to see.
          if (db.searchString == searchString) {
            db.owner.found(matches);
          }
          db.owner.setStatus('found');
        }
      },
      error: function (xmlhttp) {
        alert(Drupal.ajaxError(xmlhttp, db.uri));
      }
    });
  }, this.delay);
};

/**
 * Cancels the current autocomplete request.
 */
Drupal.ACDB.prototype.cancel = function () {
  if (this.owner) this.owner.setStatus('cancel');
  if (this.timer) clearTimeout(this.timer);
  this.searchString = '';
};

})(jQuery);
;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.pathFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.path-form', context).drupalSetSummary(function (context) {
      var path = $('.form-item-path-alias input').val();
      var automatic = $('.form-item-path-pathauto input').attr('checked');

      if (automatic) {
        return Drupal.t('Automatic alias');
      }
      if (path) {
        return Drupal.t('Alias: @alias', { '@alias': path });
      }
      else {
        return Drupal.t('No alias');
      }
    });
  }
};

})(jQuery);
;

(function ($) {

Drupal.behaviors.commentFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.comment-node-settings-form', context).drupalSetSummary(function (context) {
      return Drupal.checkPlain($('.form-item-comment input:checked', context).next('label').text());
    });

    // Provide the summary for the node type form.
    $('fieldset.comment-node-type-settings-form', context).drupalSetSummary(function(context) {
      var vals = [];

      // Default comment setting.
      vals.push($(".form-item-comment select option:selected", context).text());

      // Threading.
      var threading = $(".form-item-comment-default-mode input:checked", context).next('label').text();
      if (threading) {
        vals.push(threading);
      }

      // Comments per page.
      var number = $(".form-item-comment-default-per-page select option:selected", context).val();
      vals.push(Drupal.t('@number comments per page', {'@number': number}));

      return Drupal.checkPlain(vals.join(', '));
    });
  }
};

})(jQuery);
;

(function ($) {

Drupal.behaviors.nodeFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.node-form-revision-information', context).drupalSetSummary(function (context) {
      var revisionCheckbox = $('.form-item-revision input', context);

      // Return 'New revision' if the 'Create new revision' checkbox is checked,
      // or if the checkbox doesn't exist, but the revision log does. For users
      // without the "Administer content" permission the checkbox won't appear,
      // but the revision log will if the content type is set to auto-revision.
      if (revisionCheckbox.is(':checked') || (!revisionCheckbox.length && $('.form-item-log textarea', context).length)) {
        return Drupal.t('New revision');
      }

      return Drupal.t('No revision');
    });

    $('fieldset.node-form-author', context).drupalSetSummary(function (context) {
      var name = $('.form-item-name input', context).val() || Drupal.settings.anonymous,
        date = $('.form-item-date input', context).val();
      return date ?
        Drupal.t('By @name on @date', { '@name': name, '@date': date }) :
        Drupal.t('By @name', { '@name': name });
    });

    $('fieldset.node-form-options', context).drupalSetSummary(function (context) {
      var vals = [];

      $('input:checked', context).parent().each(function () {
        vals.push(Drupal.checkPlain($.trim($(this).text())));
      });

      if (!$('.form-item-status input', context).is(':checked')) {
        vals.unshift(Drupal.t('Not published'));
      }
      return vals.join(', ');
    });
  }
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
