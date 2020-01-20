import { ShareInfoClass } from '../models/ShareInfoClass';
import { ShareInfoService } from '../service/share-infoservice/share-info.service';
import { Router } from '@angular/router';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { UsersService } from '../service/userservice/users.service';
import {User} from'../models/users';

//  component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @ViewChild('checkCode') canvasRef: ElementRef;
  public code: any;
  InputCode:string;
  shareInfoClass: ShareInfoClass = new ShareInfoClass;
  user: User=new User();
  Authentication: boolean = false;
  validation:boolean=false;

  /**
   *
   * @param router
   * @param userService
   * @param shareInfoService
   */
  constructor(private router : Router, private userService:UsersService, private shareInfoService:ShareInfoService) {
    this.user={
      userName:"",
      account:"",
      password:"",

    }
  }
  authenticate() {
    this.UsersLogin();

  }

  /**
   * logout function
   * @constructor
   */
  LogOut()
  {
    this.Authentication=false;
    this.user.account="";
    this.user.password="";
  }


  ngOnInit() {

   this.clickChange();
  }
  private UsersLogin() {

    console.log(this.user.account);
    if(this.user.account=="")
      {
        alert("please input user");
        return;
      }
    else if(this.user.password == ""){
      alert("please input password");
        return;
    }
    else if(this.InputCode!==this.code)
    {
      alert("invalid code")
      return ;
    }

    this.userService.Login(this.user.account, this.user.password).subscribe(users =>{

      console.log(users)
      if(users !==null){
        //share username and log in status
        this.user = users;
        this.shareInfoClass.userAccount = this.user.account;
        this.shareInfoClass.logIn = true;
        this.shareInfoClass.userName = this.user.userName;
        this.shareInfoService.change.emit(this.shareInfoClass);

        this.router.navigate(['/pool']);
        this.Authentication=true;

      }
      else{
        alert("invalid password");
      }
    }
      );

  }


  /**
   * create random checkcode
   */
  public createCode() {
  this.code = '';
  const codeLength = 4;  // code length
  const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // 所有候选组成验证码的字符，当然也可以用中文的
  for (let i = 0; i < codeLength; i++) { // loop
    const index = Math.floor(Math.random() * 52); // generate random index（0~51）
    this.code += random[index]; // get according character and add into verifycode
  }
  return this.code;
}


  /**
   * generate line x position value
   */
  public lineX() {
  const ranLineX = Math.floor(Math.random() * 80);
  return ranLineX;
}


  /**
   * generate line y position value
   */
  public lineY() {
  const ranLineY = Math.floor(Math.random() * 35);
  return ranLineY;
}


  /**
   * generate random color
   */
  public rgb() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

public clickChange() {
  const cxt: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
  cxt.fillStyle = '#fff';
  cxt.fillRect(0, 0, 80, 35);


  /**
   * generate 20 lines
   */
  for (let j = 0; j < 20; j++) {
    cxt.strokeStyle = this.rgb();
    cxt.beginPath();    // without beginPath, every time generate verify code lines number will added
    cxt.moveTo(this.lineX(), this.lineY());
    cxt.lineTo(this.lineX(), this.lineY());
    cxt.lineWidth = 0.5;
    cxt.closePath();
    cxt.stroke();
  }

  cxt.fillStyle = '#6271a9';
  cxt.font = 'bold 20px Arial';
  cxt.fillText(this.createCode(), 15, 25);
  console.log(this.code);
}

  register(){
    this.router.navigate(['/register']);
  }


}
