import {  Component,
          Input,
          AfterViewInit,
          Renderer,
          ViewChild,
          ViewContainerRef,
          ElementRef,
          ComponentRef,
          Type,
          ComponentFactoryResolver  } from '@angular/core';

import { AbstractModal } from './modal.abstract';

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
export class ModalComponent implements AfterViewInit {

  /**
   * The modal DOM element, gathered by Angular.
   */
  @ViewChild('theModal')
  protected modalRef: ElementRef;

  /**
   * A reference to the container which will contain
   * a dynamically loaded component, i.e. the modal's content.
   */
  @ViewChild('dynamic', {read: ViewContainerRef})
  protected dynamicContainer: ViewContainerRef;

  /**
   * A reference to the currently loaded component.
   * @type {ComponentRef<any>}
   */
  protected dynamicRef: ComponentRef<AbstractModal> = null;

  /**
   *  Whether or not the modal must allow validation.
   * @type {boolean}
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

  /**
   * Whether or not the modal must open on load.
   * @type {boolean}
   */
  @Input()
  protected openOnLoad: boolean = false;

  /**
   * The type of the modal content,
   * i.e. the type of the component that will be dynamically loaded.
   */
  @Input()
  protected componentType: Type<AbstractModal>;

  /**
   * Instantiate private services.
   */
  constructor(
    private renderer: Renderer,
    private componentFactoryResolver: ComponentFactoryResolver) {
    // Nothing else to do
  }

  /**
   * Once the modal element has been gathered,
   * enables it so it can be opened and close at will.
   */
  public ngAfterViewInit(): void {
    // Enable modal behaviour
    this.renderer.invokeElementMethod($(this.modalRef.nativeElement), 'modal');
    // Load dynamically the component
    this.loadComponent();
    // Open the directly the modal if if should be opened on load
    if(this.openOnLoad) {
      this.open();
    }
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

  /**
   * Loads the content component into the modal.
   * If there was a previous content, it is destroyed first.
   */
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