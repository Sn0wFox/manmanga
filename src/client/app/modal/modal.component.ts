import {  Component,
          Input,
          OnInit,
          AfterViewInit,
          Renderer,
          ViewChild,
          ViewContainerRef,
          ElementRef,
          ComponentRef,
          Type,
          ComponentFactoryResolver  } from '@angular/core';

import { AbstractModalComponent } from './abstract-modal/abstract-modal.component';
import { AwModalComponent } from './alpha-welcome-modal/aw-modal.component';

/**
 * JQuery must be included before materialize.
 * Therefore, they are both loaded as scripts
 * in the index.html page.
 * To use it, we just have to declare it.
 * NOTE:  we will use it not the manipulate the DOM,
 *        but to use materialize-css.
 */
declare let $: JQueryStatic;

@Component({
  selector: 'mmg-modal',
  templateUrl: 'modal.component.pug',
  styleUrls: ['modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  /**
   * The modal dom element, gathered by Angular.
   */
  @ViewChild('theModal')
  protected modalRef: ElementRef;

  /**
   * A reference to the container which will contain
   * a dynamically loaded component.
   */
  @ViewChild('dynamic', {read: ViewContainerRef})
  protected dynamicContainer: ViewContainerRef;

  /**
   * A reference to the currently loaded component.
   * @type {ComponentRef<any>}
   */
  protected dynamicRef: ComponentRef<any> = null;

  /**
   * Title of the modal window.
   */
  @Input()
  protected title: string;

  /**
   * Content of the modal window.
   */
  // TODO: make it another component
  @Input()
  protected content: string;

  /**
   * Whether or not the modal must allow validation.
   */
  @Input()
  protected validate: boolean = false;

  /**
   * The text of the validation button,
   * if validate is set to true.
   * @type {Array<string>}
   */
  @Input()
  protected buttonText: string[] = ['OK', 'CANCEL'];

  protected containerReady: boolean = false;

  protected componentType: Type<AbstractModalComponent>;

  constructor(
    private renderer: Renderer,
    private componentFactoryResolver: ComponentFactoryResolver) {
    // Nothing else to do
  }

  /**
   * Properly initializes the component.
   * Sets default values if not provided
   */
  public ngOnInit(): void {
    if(!this.title) {
      this.title = 'My Modal';
    }
    if(!this.content) {
      this.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    }
  }

  /**
   * Once the modal element has been gathered,
   * enables it so it can be opened and close at will.
   */
  public ngAfterViewInit(): void {
    // Enable modal behaviour
    this.renderer.invokeElementMethod($(this.modalRef.nativeElement), 'modal');
    // Load dynamically a component (just a test);
    this.componentType = AwModalComponent;
    this.loadComponent();
    // Open the modal (just a test)
    this.open();
    // The container is now ready to be used
    this.containerReady = true;
  }

  /**
   * Opens the modal.
   */
  public open(): void {
    // NOTE:  we could just do:
    //        $(this.modalRef.nativeElement).modal('open');
    //        But we will prefer using the renderer to do it the angular way.
    //        Since we ned to wrap it in JQuery to call the function 'modal' anyway,
    //        I'm not sure about what may happen if we try to use the app with Electron for example.
    this.renderer.invokeElementMethod($(this.modalRef.nativeElement), 'modal', ['open']);
  }

  /**
   * Closes the modal.
   */
  public close(): void {
    this.renderer.invokeElementMethod($(this.modalRef.nativeElement), 'modal', ['close']);
  }

  protected loadComponent(): void {
    // Get the factory for the component
    let factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
    // Destroy an eventual dynamic component
    if(this.dynamicRef) {
      this.dynamicRef.destroy();
    }
    // Create the component
    this.dynamicRef = this.dynamicContainer.createComponent(factory);
    // Well, uh, it's recommended to do that too !
    // I suppose that it enables properly data bindings for a dynamically loaded component
    this.dynamicRef.changeDetectorRef.detectChanges();
  }

}