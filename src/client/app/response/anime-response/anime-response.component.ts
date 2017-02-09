import {Component, OnInit, Input} from "@angular/core";
import {Anime} from "../../../../lib/interfaces/anime.interface";

const ANIMETEST: Anime = {
  title: "One piece"
};

@Component({
  selector: "mmg-anime-response",
  moduleId: "response/anime-response/anime-response.component",
  templateUrl: "anime-response.component.pug",
  styleUrls: ["anime-response.component.scss"]
})
export class AnimeComponent implements OnInit {
  @Input() anime: Anime;

  ngOnInit(): void {
    // console.log("Anime !");
  }

  setAnime(anime: Anime): void {
    this.anime = anime;
  }
}
