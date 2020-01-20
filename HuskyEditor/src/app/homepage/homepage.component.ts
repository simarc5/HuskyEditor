import { Component, OnInit } from '@angular/core';


//   component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})


export class HomepageComponent implements OnInit {
  html: HTMLElement

  constructor() { }

  ngOnInit() {

  }

}
