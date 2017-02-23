import { Component, Input } from '@angular/core';

import { Author } from '../../../../lib/interfaces/author.interface';

@Component({
  selector: 'mmg-author-response',
  templateUrl: 'author-response.component.pug',
  styleUrls: ['author-response.component.scss']
})
export class AuthorComponent {
  @Input()
  author: Author;
}
