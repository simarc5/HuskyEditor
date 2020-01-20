import { ShareInfoClass } from '../models/ShareInfoClass';
import { ShareInfoService } from '../service/share-infoservice/share-info.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//   component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  shareInfoClass : ShareInfoClass = new ShareInfoClass;
  logoutLink = "/";
  signAsLink = "/";

  /**
   *
   * @param router
   * @param shareInfoService
   */
  constructor(private router: Router, private shareInfoService:ShareInfoService) {
    this.shareInfoService.change.subscribe((shareInfo: ShareInfoClass)=>{
      this.shareInfoClass = shareInfo;
    })
  }

  ngOnInit() {
  }

  /**
   * logout function
   */
  logOut(){
    this.router.navigate(['/']);
    this.shareInfoClass.logIn = false;
  }

  /**
   * jump to the firstpage
   */
  firstPage(){
    if(this.shareInfoClass.logIn){
      this.router.navigate(['/pool']);
    }
    else{
      this.router.navigate(['/']);
    }
  }
}
