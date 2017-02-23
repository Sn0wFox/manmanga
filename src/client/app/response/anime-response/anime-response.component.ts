import { Component, Input } from '@angular/core';

import { Anime }  from '../../../../lib/interfaces/anime.interface';

@Component({
  selector: 'mmg-anime-response',
  templateUrl: 'anime-response.component.pug',
  styleUrls: ['anime-response.component.scss']
})
export class AnimeComponent {
  @Input()
  anime: Anime;
}
