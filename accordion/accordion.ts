import { Component, ViewChild, OnInit, Renderer, Input } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit {

  @Input('accordionExapanded') accordionExapanded: boolean = false;
  @ViewChild("cc") cardContent: any;
  @Input('title') title: string;

  icon: string = "arrow-down";

  constructor(public renderer: Renderer, public events: Events) {
  }

  ngOnInit() {
    console.log('accordionExapanded', this.accordionExapanded);
    console.log(this.cardContent.nativeElement);
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
    this.initAccordion();
    this.collapseAllEvent();
  }

  initAccordion() {

    if (!this.accordionExapanded) {
      return ;
    }

    this.expand();
    this.icon = "arrow-up";
  }

  toggleAccordion() {

    let tempAccordionExapanded = this.accordionExapanded;
    this.events.publish('collapseAll');

    if (tempAccordionExapanded) {
      return this.collapse();
    }

    this.expand();
  }

  public setCollapseMeta(){
    this.accordionExapanded = false;
    this.icon = "arrow-down";
  }

  public setExpandMeta(){
    this.accordionExapanded = true;
    this.icon = "arrow-up";
  }

  private collapseAllEvent(){
    this.events.subscribe('collapseAll', () => {
      this.collapse();
    });
  }

  private collapse(){
    this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
    this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px");
    this.setCollapseMeta();
  }

  private expand(){
    this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
    this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "unset");
    // this.renderer.setElementStyle(this.cardContent.nativeElement, "margin-left", "-40px");
    this.setExpandMeta();
  }

}
