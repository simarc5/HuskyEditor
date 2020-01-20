import { Component, OnInit, OnDestroy,ViewChild,ElementRef } from "@angular/core";
import { PreviewService } from "../service/previewservice/preview.service";
import { ImagesInfo } from "../models/inmagesInfo";
import { LoadcloudimageService } from "../service/loadcloudimageservice/loadcloudingimage.service";
import { Subscription } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

//  component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"]
})

export class PreviewComponent implements OnInit, OnDestroy {
  imageUrl = null;

  ImagesInfo: ImagesInfo = new ImagesInfo();

  //the condition of inactive editing
  grayscaleOn: boolean = false;
  contrastOn: boolean = false;
  blurOn: boolean = false;
  saturateOn: boolean = false;
  brightnessOn: boolean = false;
  hue_rotateOn: boolean = false;
  invertOn: boolean = false;
  drop_shadowOn: boolean = false;
  opacityOn: boolean = false;
  imageOn: boolean = false;
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
  //edit style element
  newCanvas: HTMLCanvasElement;
  newImage: HTMLImageElement;
  ctx: any;
  pixels: any;
  pixeldata: any;
  pixelsNoText: any;




  private paramsSubscription: Subscription;
  Img: any;
  @ViewChild("Mycanvas") Mycanvas: ElementRef;
  private context: HTMLCanvasElement;

  /**
   *
   * @param previewService
   * @param sanitizer
   */
  constructor(private previewService: PreviewService,private sanitizer: DomSanitizer) {
  }

  // Predefined method in a TypeScript class which is called when the class is instantiated
  ngOnInit() {
    this.ImagesInfo=this.previewService.ImagesInfo;
    this.paramsSubscription = this.previewService.getImg.subscribe(data => {
      this.ImagesInfo = data;
    });
    console.log(this.ImagesInfo);
  }


//  Confirm button
  confirm()
  {

    this.previewService.ImagesInfo=this.ImagesInfo;
  }

  // A lifecycle hook that is called when a directive, pipe, or service is destroyed. Use for any custom cleanup that needs to occur when the instance is destroyed.
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  //  For security image URL
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
