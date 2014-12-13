<div id="preloader"><div id="spinner"></div></div>
<div class="wrapper">
  <section class="tab-content">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-3 widget-profil">
              <div class="row">
                <!-- Profile Image -->
                <div class="col-lg-12 col-md-12 col-sm-3 col-xs-12">
                  <div class="image-holder one" id="pic_prof_1"  style="display:none">
                    <img class="head-image up circle" src="http://placehold.it/150x150" width="150" height="150" alt="" />
                    <img class="head-image up-left circle" src="http://placehold.it/150x150" width="150" height="150" alt="" />
                    <img class="head-image left circle" src="http://placehold.it/150x150" width="150" height="150" alt="" />
                    <img class="head-image down-left circle" src="http://placehold.it/150x150" width="150" height="150" alt="" />
                    <img class="head-image down circle" src="http://placehold.it/150x150" width="150" height="150" alt="" />
                    <img class="head-image down-right circle" src="http://placehold.it/150x150" width="150" height="150" alt="" />
                    <img class="head-image right circle" src="http://placehold.it/150x150" width="150" height="150" alt="" />
                    <img class="head-image up-right circle" src="http://placehold.it/150x150" width="150" height="150" alt="" />
                    <img class="head-image front circle" src="http://placehold.it/150x150" width="150" height="150" alt="" />
                  </div>
                  <!-- style for simple image profile -->		
                  <div class="circle-img" id="pic_prof_2"></div>
                </div>
                <!-- End Profile Image -->
                <div class="col-lg-12 col-md-12 col-sm-9 col-xs-12">
									<?php print render($page['right']); ?>
                </div>
              </div>
            </div>
            <div class="col-md-9 flexy_content" style="padding-left: 0;padding-right: 0;">
              <!-- verticalTab menu -->
              <div id="verticalTab">
                <?php print render($page['left']); ?>
                <!-- /resp-tabs-list -->
                <!-- resp-tabs-container --> 
                <div class="resp-tabs-container">
                  <?php print render($page['content']); ?>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>