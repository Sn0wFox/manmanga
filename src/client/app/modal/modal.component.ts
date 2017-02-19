import { Component }      from '@angular/core';
import { OnInit, Input }  from '@angular/core';
import { Renderer }       from '@angular/core';
import { AfterViewInit }  from '@angular/core';
import { ViewChild }      from '@angular/core';
import { ElementRef }     from '@angular/core';

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

  //protected modalElement: ????;

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

  constructor(protected renderer: Renderer) {
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
      this.content = 'A bunch of text';
    }
  }

  /**
   * Once the modal element has been gathered,
   * enables it so it can be opened and close at will.
   */
  ngAfterViewInit(): void {
    // Enable modal behaviour
    this.renderer.invokeElementMethod($(this.modalRef.nativeElement), 'modal');
    // Open the modal (just a test)
    this.open();
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

}