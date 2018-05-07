import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import '../../assets/js/admin.js';
declare var $;


export class InitService {

  public static init(){
    
    this.initCommon();
    
    $.AdminBSB.leftSideBar.init();
    $.AdminBSB.rightSideBar.init();
    $.AdminBSB.navbar.init();
    $.AdminBSB.panel.init();
    $.AdminBSB.browser.init();
}

public static initCommon(){
  // $('input[type="checkbox"]').iCheck({
  //     checkboxClass: 'icheckbox_square-aero',
  //     radioClass: 'iradio_square-aero'
  // });

  $.AdminBSB.dropdownMenu.init();
}

public static rightInit(){
  $.AdminBSB.rightSideBar.init();
}

}
