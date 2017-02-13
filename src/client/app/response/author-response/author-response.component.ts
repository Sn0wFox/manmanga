import { Component, OnInit, Input } from '@angular/core';

import { Author } from '../../../../lib/interfaces/author.interface';

@Component({
  selector: 'mmg-author-response',
  templateUrl: 'author-response.component.pug',
  styleUrls: ['author-response.component.scss']
})
export class AuthorComponent implements OnInit {
  @Input() author: Author;

  ngOnInit(): void {
    // console.log('Author !');
  }

  setAuthor(auth: Author): void {
    this.author = auth;
  }
}
