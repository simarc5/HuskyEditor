import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import * as html2canvas from "html2canvas";
import * as OSS from "ali-oss";

import { Mails } from '../models/mails';
import { MailserviceService } from '../service/mailservice/mailservice.service';

import { ImagesInfo } from "../models/inmagesInfo";
import { PreviewService } from '../service/previewservice/preview.service';
import { ImagesService } from '../service/imageservice/images.service';
import { Images } from '../models/images';

// Components for linking the component to HTML with templateURl and styling scss with styleUrl
@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"]
})


export class ConfirmComponent implements OnInit {

  //  Pattern for e-mail matching component
   pattern:any=/^[0-9A-Za-z]+(\.[a-zA-Z0-9_-]+)*@[0-9A-Za-z_]+(\.[a-zA-Z0-9_-]+)+$/g;
  mails:Mails=new Mails();
  canvasImg:any;
  header:string="";

  Images:Images =new Images();

// Setting the imageInfo
  imagesInfo: ImagesInfo = new ImagesInfo();
  constructor(private router:Router, private previewService: PreviewService,
    private mailService:MailserviceService,private imageService:ImagesService)
  {
   this.mails.To="";
    this.mails.title="";
    this.mails.content="";

  }


  ngOnInit() {

    this.imagesInfo=this.previewService.ImagesInfo;
    console.log(this.imagesInfo);
    this.canvasImg = this.imagesInfo.tempImg;

    console.log(this.canvasImg);
  }

  /**
   * send your picture through email
   */
  send()
  {
    if(this.mails.title == ""){
      alert("Please input your title");
      return;
    }
    if(!this.mails.To.match(this.pattern))
    {
      alert("invalid mail");
      return ;
    }

    if(this.mails.title == ""){
      alert("Please input your title");
      return;
    }

    let storeAs = ".jpg";

    let path=this.header+this.dataURItoFile(this.canvasImg,storeAs);


     this.mails.content= path;

     console.log(this.mails.content);
     console.log(this.header);
     this.mailService.SendMail(this.mails).subscribe((data)=>{
     });
     alert("send successfully");
   }
   //download file , to save image as Image
   download() {
     this.downloadFile('Image', this.canvasImg);
   }


// Converting the image to data URI

    dataURItoFile(dataURI, fileName) {



     var byteString = atob(dataURI.split(',')[1]);

     var ab = new ArrayBuffer(byteString.length);
     var ia = new Uint8Array(ab);
     for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
     }
     return new File([ia], fileName, {type: 'image/jpeg', lastModified: Date.now()})
   }

   //download file functionality
   downloadFile(filename, content) {
      console.log("download");
     var base64Img = content;
     var oA = document.createElement("a");
     oA.href = base64Img;
     oA.download = filename;
     var event = document.createEvent("MouseEvents");
     event.initMouseEvent(
       "click",
       true,
       false,
       window,
       0,
       0,
       0,
       0,
       0,
       false,
       false,
       false,
       false,
       0,
       null
     );
     oA.dispatchEvent(event);
   }
//  To go back to main menu
   backToSelect(){
     this.router.navigate(['/pool']);
   }

  //   To go back to Edit menu

   backToEdit(){
     this.router.navigate(['/edit']);
   }
}
