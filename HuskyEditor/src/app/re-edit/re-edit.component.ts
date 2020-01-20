import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { PreviewService } from '../service/previewservice/preview.service';
import { ImagesInfo } from "../models/inmagesInfo";
import * as html2canvas from "html2canvas";
import { LoadcloudimageService } from "../service/loadcloudimageservice/loadcloudingimage.service";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { AngularCropperjsComponent } from 'angular-cropperjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//  component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: 'app-re-edit',
  templateUrl: './re-edit.component.html',
  styleUrls: ['./re-edit.component.scss']
})
export class ReEditComponent implements OnInit {

  imageUrl = null;

  ImagesInfo: ImagesInfo = new ImagesInfo();

  //the condition of inactive editing
  grayscaleOn: boolean = false;
  contrastOn: boolean = false;
  blurOn: boolean = false;
  greenOn: boolean = false;
  redOn: boolean = false;
  HighlightOn:boolean = false;

  saturateOn: boolean = false;
  brightnessOn: boolean = false;
  hue_rotateOn: boolean = false;
  invertOn: boolean = false;
  drop_shadowOn: boolean = false;
  opacityOn: boolean = false;
  imageOn: boolean = false;
  reverseOn : boolean = false;
  //the value of style
  grayscaleValue: number = 10;
  contrastValue: number = 0;
  blurValue: number = 0;
  saturateValue: number = 0;
  brightnessValue: number = 0;
  hue_rotateValue: number = 0;
  invertValue: number = 0;
  drop_shadowValue: number = 0;
  opacityValue: number = 0;
  sepiaValue: number = 0;
  tempWidth: string;
  tempHeight: string;

  //the add string
  text: string;
  light: number;
  opacitynum: number;
  //edit style element
  newCanvas: HTMLCanvasElement;
  newImage: HTMLImageElement;
  ctx: any;
  pixels: any;
  pixeldata: any;
  angle = 0;
  pixelsNoText: any;

  /**
   *
   * @param previewService
   * @param router
   * @param dialog
   * @param el
   * @param renderer2
   */
  constructor(private previewService: PreviewService,
              private router: Router,
              public dialog: MatDialog,
              private el: ElementRef,
              private renderer2: Renderer2) {

  }

  // Predefined method in a TypeScript class which is called when the class is instantiated
  ngOnInit() {

    console.log(this.previewService.ImagesInfo);
    this.ImagesInfo = this.previewService.ImagesInfo;
    this.imageUrl = this.ImagesInfo.tempImg;
    this.getEl();

  }

  goToConfirm() {
    this.previewService.ImagesInfo.tempImg = this.newCanvas.toDataURL();
    this.previewService.ImagesInfo = this.ImagesInfo;
    this.router.navigate(['/confirm']);
  }


  /**
   * Add text
   */
  addText() {
    this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
    this.ctx.putImageData(this.pixels, 0, 0);
    // this.ctx.font = "30px Arial";
    this.ctx.font = "30px Verdana";
    // Create gradient
    var gradient = this.ctx.createLinearGradient(0, 0, this.newCanvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "yellow");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    this.ctx.strokeStyle = gradient;
    this.ctx.strokeText(this.text, 10, 30);
    //this.ctx.fillText(this.text, 200, 200);
  }

  /**
   * photo edit function
   */
  getEl() {
    console.log("in getEl");
    this.newCanvas = this.el.nativeElement.querySelector('.newCanvas');
    console.log("in getEl" + this.newCanvas);
    this.newImage = this.el.nativeElement.querySelector('.newImage');
    console.log("in getEl" + this.newImage);
    this.renderer2.setStyle(this.newImage, "display", "none");/////////////////////
    console.log(this.newImage);

    this.newImage.src = this.previewService.ImagesInfo.tempImg;


    console.log(this.newImage.src);


    this.editStyle();

  }

  //  Editing style adding different image functionality

  editStyle() {
    console.log(this.newImage);
    console.log(this.newCanvas.toDataURL());
    this.newImage.onload = () => {
      this.ctx = this.newCanvas.getContext("2d");
      // this.tempWidth = window.getComputedStyle(this.el.nativeElement.querySelector(".newImage")).width;
      // this.tempHeight = window.getComputedStyle(this.el.nativeElement.querySelector(".newImage")).height;
      //console.log(this.tempHeight+"and"+this.tempWidth);
      this.ctx.drawImage(this.newImage, 0, 0, this.newImage.width, this.newImage.height);
      this.pixels = this.ctx.getImageData(0, 0, this.newImage.width, this.newImage.height);
      this.pixeldata = this.pixels.data;
      if (!this.imageOn) {
        this.pixelsNoText = this.ctx.getImageData(0, 0, this.newImage.width, this.newImage.height);
        this.imageOn = true;
      }

    }

  }

  //  To save the image in local computer
  saveAsPNG(canvas) {
    return canvas.toDataURL("image/png");
  }
  downLoad(url) {
    var oA = document.createElement("a");
    oA.download = '';// set file name ,default name is download
    oA.href = url;
    document.body.appendChild(oA);
    oA.click();
    oA.remove(); // remove after download

  }

  // To navigate to Pool component
  moveToPool() {
    this.router.navigate(['/pool']);
  }

  //  Implementing gray functionality which makes the image gray
  grayscale() {
    this.grayscaleOn = !this.grayscaleOn;
    if (this.grayscaleOn) {
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        var gray = parseInt(this.pixels.data[i]) * 1 + parseInt(this.pixels.data[i + 1]) * 1 + parseInt(this.pixels.data[i + 2]) * 0;
        this.pixels.data[i] = gray;
        this.pixels.data[i + 1] = gray;
        this.pixels.data[i + 2] = gray;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);
    }
    else {
      this.pixels = this.pixelsNoText;
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }


    console.log(this.ctx);
    console.log(this.ctx.font);
    console.log(this.ctx.getImageData);

  }

  //  Implementing hue_rotate which increases the staturation and temperature of the image
  hue_rotate() {
    this.hue_rotateOn = !this.hue_rotateOn;
    if (this.hue_rotateOn) {
      for (var i = 0; i < this.pixels.data.length; i += 4) {
        this.pixels.data[i] = 255 - this.pixels.data[i];
        this.pixels.data[i + 1] = 255 - this.pixels.data[i + 1];
        this.pixels.data[i + 2] = 255 - this.pixels.data[i + 2];
        this.pixels.data[i + 3] = 255;
      }
      this.ctx.putImageData(this.pixels, 0, 0);
    }
    else {
      this.pixels = this.pixelsNoText;
      this.ctx.clearRect(0, 0, this.newCanvas.width, this.newCanvas.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }

  }

  //  Implementing opacity functionality, it blurs the image
  opacity() {
    this.opacityOn = !this.opacityOn;

    if (this.opacityOn) {
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        this.pixels.data[i + 3] = 255*this.opacitynum;
      }
      this.ctx.clearRect(0, 0, this.newCanvas.width, this.newCanvas.height);
      this.ctx.putImageData(this.pixels, 0, 0);
    }
    else {
      this.pixels = this.pixelsNoText;
      this.ctx.clearRect(0, 0, this.newCanvas.width, this.newCanvas.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }
  }

  Highlight() {
    this.HighlightOn = !this.HighlightOn;
    if (this.HighlightOn) {
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        console.log(this.light);
        this.pixels.data[i] = this.pixels.data[i] * this.light;
        this.pixels.data[i + 1] = this.pixels.data[i + 1] * this.light;
        this.pixels.data[i + 2] = this.pixels.data[i + 2] * this.light;
        //this.pixels.data[i + 3] = 255;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);
    }
    else {
      this.pixels = this.pixelsNoText;
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }
  }

  //  Adding Greenlight functionality which makes the image look green
  Greenlight() {
    this.greenOn = !this.greenOn;
    if (this.greenOn) {
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        this.pixels.data[i] = this.pixels.data[i] * 0.1;
        this.pixels.data[i + 1] = this.pixels.data[i + 1] * 2;
        this.pixels.data[i + 2] = this.pixels.data[i + 2] * 0.1;
        //this.pixels.data[i + 3] = 255;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);
    }
    else {
      this.pixels = this.pixelsNoText;
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }
  }

  //  Adding Redlight functionality which makes the image appear look red

  Redlight() {
    this.redOn = !this.redOn;
    if (this.redOn) {
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        this.pixels.data[i] = this.pixels.data[i] * 2;
        this.pixels.data[i + 1] = this.pixels.data[i + 1] * 0.1;
        this.pixels.data[i + 2] = this.pixels.data[i + 2] * 0.1;
        //this.pixels.data[i + 3] = 255;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);
    }
    else {
      this.pixels = this.pixelsNoText;
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }
  }
  //  It blurs the image functionality

  Blurlight() {
    this.blurOn = !this.blurOn;
    if (this.blurOn) {
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        this.pixels.data[i] = this.pixels.data[i] * 0.1;
        this.pixels.data[i + 1] = this.pixels.data[i + 1] * 0.1;
        this.pixels.data[i + 2] = this.pixels.data[i + 2] * 2;
        //this.pixels.data[i + 3] = 255;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);
    }
    else {
      this.pixels = this.pixelsNoText;
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }
  }

  //  If you want to reverese the image

  Reverse() {
    this.reverseOn = !this.reverseOn;
    if (this.reverseOn) {
      for (var i = 0, len = this.pixeldata.length ; i < this.pixeldata.length; i += 4, len -= 4) {
        this.pixels.data[i] = this.pixels.data[len] ;
        this.pixels.data[i + 1] = this.pixels.data[len + 1] ;
        this.pixels.data[i + 2] = this.pixels.data[len + 2] ;
        // this.pixels.data[- i ] = this.pixels.data[-len] ;
        // this.pixels.data[-i - 1] = this.pixels.data[-len - 1] ;
        // this.pixels.data[-i - 2] = this.pixels.data[-len - 2] ;
        // console.log(this.pixeldata.length)
      }
      // this.newCanvas.width = this.newImage.height;
      // this.newCanvas.height = this.newImage.width;

      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);
      console.log("test")
    }
    else {
      this.pixels = this.pixelsNoText;

      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }
  }


}
