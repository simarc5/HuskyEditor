import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Images } from "../models/images";
import { ImagesService } from "../service/imageservice/images.service";
import { PreviewService } from "../service/previewservice/preview.service";
import { DomSanitizer } from "@angular/platform-browser";
import { LoadcloudimageService } from "../service/loadcloudimageservice/loadcloudingimage.service";
import { ImagesInfo } from "../models/inmagesInfo"

//  component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: "app-pool",
  templateUrl: "./pool.component.html",
  styleUrls: ["./pool.component.scss"]
})
export class PoolComponent implements OnInit {
  @ViewChild("userPhoto") userPhoto: ElementRef;
  images: Images;
  width: Number;
  height: Number;
  ImagesInfo: ImagesInfo = new ImagesInfo();

  /**
   *
   * @param imageService
   * @param previewService
   * @param router
   * @param sanitizer
   */
  constructor(
    private imageService: ImagesService,
    private previewService: PreviewService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  // necessary for showing image avoid unsafe error
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  //show all  image on cloud server
  ngOnInit() {
    this.imageService.RetrieveAllImage().subscribe(images => {
      this.images = images;
      //console.log(this.images);
    });
  }
  //select img by click image on page
  /**
   *
   * @param $event
   */
  preview($event) {
    this.ImagesInfo.cloudImg = $event.target.src;
    console.log(this.ImagesInfo);
    this.previewService.ImagesInfo=this.ImagesInfo;
    this.navigate();
  }


  /**
   * updalod img from btn
   * @param fileInput
   */
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e: any) {
        this.ImagesInfo.localImg = e.target.result;
        console.log(this.ImagesInfo)
        this.previewService.getImg.emit(this.ImagesInfo);
      }.bind(this);
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    this.clearSelectedPhoto();
    this.router.navigate(["preview"]);
  }

  /**
   * clear  the photo you selected
   */
  clearSelectedPhoto() {
    // console.log(this.userPhoto.nativeElement.files);
    this.userPhoto.nativeElement.value = "";
    // console.log(this.userPhoto.nativeElement.files);
  }
  navigate() {
    this.router.navigate(["preview"]);
  }

  onLoadMoreInfo() {}
}
