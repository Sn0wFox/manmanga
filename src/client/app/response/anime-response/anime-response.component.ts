import {Component, OnInit} from "@angular/core";
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
  anime: Anime = ANIMETEST;
  test: number = 10;

  ngOnInit(): void {
    console.log("Anime !");
  }
}
