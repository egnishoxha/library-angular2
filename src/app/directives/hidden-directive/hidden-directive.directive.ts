import { Directive, HostListener, Renderer, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[displaylist]'
})

export class HiddenDirectiveDirective {

    constructor(
      private renderer: Renderer,
      private el: ElementRef
    ){

    }
    
    @Input('displaylist') item: string;
    @Input('displaylist') arr: any[];

    // @HostListener('click', ['$event']) onClick($event){
    //   console.info('clicked: ' + $event);
    // }

    // @HostListener('mouseenter') onMouseEnter() {
    //   this.highlight(this.displaylist || 'red');
    // }
  
    // @HostListener('mouseleave') onMouseLeave() {
    //   this.highlight(null);
    // }
  
    // private highlight(color: string) {
    //   this.el.nativeElement.style.backgroundColor = color;
    // }
}

// import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// @Directive({
//   selector: '[myIf]'
// })

// export class HiddenDirectiveDirective {

//     constructor(
//         private templateRef: TemplateRef<any>,
//         private viewContainer: ViewContainerRef
//     ) { }

//     @Input() set myIf(shouldAdd: boolean) {
//         if (shouldAdd) {
//             // If condition is true add template to DOM
//             this.viewContainer.createEmbeddedView(this.templateRef);
//         } else {
//             // Else remove template from DOM
//             this.viewContainer.clear();
//         }
//     }
// }

// import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';

// @Directive({
//   selector: '[myUnderline]'
// })

// export class HiddenDirectiveDirective {

//     constructor(
//       private renderer: Renderer,
//       private el: ElementRef
//     ){

//     }
    
//     // Event listeners for element hosting
//     // the directive
//     @HostListener('mouseenter') onMouseEnter() {
//         this.hover(true);
//     }

//     @HostListener('mouseleave') onMouseLeave() {
//         this.hover(false);
//     }
//     // Event method to be called on mouse enter and on mouse leave
//     hover(shouldUnderline: boolean){
//         if(shouldUnderline){
//             // Mouse enter   
//             this.renderer.setElementStyle(this.el.nativeElement, 'text-decoration', 'underline');
//         } else {
//             // Mouse leave           
//             this.renderer.setElementStyle(this.el.nativeElement, 'text-decoration', 'none');
//         }
//     }
// }
