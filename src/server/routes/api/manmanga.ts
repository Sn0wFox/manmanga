import {NextFunction, Request, Response, Router} from "express";
import {Anime} from "../../../lib/interfaces/anime.interface";
import {Author} from "../../../lib/interfaces/author.interface";
import {Character} from "../../../lib/interfaces/character.interface";
import * as io from "../../../lib/interfaces/io";
import {MangaCover} from "../../../lib/interfaces/manga-cover.interface";
import {Manga} from "../../../lib/interfaces/manga.interface";
import {AnilistApi} from "../../lib/anilist-api.class";
import * as dbpedia from "../../lib/dbpedia";
import * as mcdIOSphe from "../../lib/mcd-iosphere";
import requestIO from "../../lib/request-io";

export const manmangaApiRouter: Router = Router();

/**
 * GET /isManga/:resource
 *    :resource  The resource to analyze
 * Identify if the given resource is known as a manga,
 * according to dbpedia.
 * Beware, result may vary with the case used to write the resource's name.
 * Returns a JSON with fields:
 *    resource: the resource's name.
 *    isManga : whether the given resource is a manga or not.
 * Or 500 if there was an error with the request.
 */
manmangaApiRouter.get("/isManga/:resource", async function (req: Request, res: Response, next: NextFunction) {
  // TODO: move the logic to lib/dbpedia
  try {
    const resource: string = req.params["resource"];
    const query: string = `select distinct ?p ?o where {
    values ?title {dbr:${resource}}.
    ?title rdf:type dbo:Manga."
    ?title ?p ?o. }`;

    const response: io.Response = await requestIO.get({
      uri: "http://dbpedia.org/sparql",
      queryString: {
        query: query,
        format: "application/json"
      }
    });

    const data: any = JSON.parse(response.body);

    if (data.results.bindings.length === 0) {
      res.status(200).json({
        resource: resource,
        isManga: false
      });
    } else {
      res.status(200).json({
        resource: resource,
        isManga: true
      });
    }
  } catch (err) {
    console.error("ERROR with the request");
    console.error(err);
    res.status(500).send(err);
  }
});

manmangaApiRouter.get("/resource/:name", async function (req: Request, res: Response) {
  try {
    const resourceName: string = req.params["name"];
    const resource: dbpedia.SearchResult = await dbpedia.search(resourceName);
    res.status(200).json(resource);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(500).send(err);
  }
});

/**
 * GET /manga/:name
 *    :name  The name of the manga (according to dbpedia; beware of the case)
 * Gather all available information about the manga named ':name'.
 * Returns a manga as JSON,
 * or a 500 error if there was a problem with the request.
 */
// TODO: if the manga is unknown of dbpedia, but known to McdIOSphere,
//       this will still returns a coverURL => correct this ?
manmangaApiRouter.get("/manga/:name", async function (req: Request, res: Response) {
  const mangaName: string = req.params["name"];
  let manga: Manga;

  try {
    manga = await dbpedia.retrieveManga(mangaName);
  } catch (err) {
    console.error(`ERROR with the request from /api/sparql/manga/${mangaName}`);
    console.error(err);
    res.status(500).send(err);
    return;
  }

  try {
    const cover: MangaCover = await mcdIOSphe.getMangaCoverUrl(mangaName.replace(/_/g, " "));
    manga.coverUrl = cover.coverUrl;
  } catch (err) {
    // At this point, the error is coming from McdIOSphere;
    // but we can still return the manga without any coverUrl
    console.warn(err);
  }

  res.status(200).json(manga);
});

/**
 * GET /anime/:name
 *    :name  The name of the anime (according to dbpedia; beware of the case)
 * Gather all available information about the anime named ':name'.
 * Returns an anime as JSON,
 * or a 404 error if there was a problem with the request.
 */
manmangaApiRouter.get("/api/sparql/anime/:name", async function (req: Request, res: Response) {
  try {
    const animeName: string = req.params["name"];
    const anime: Anime = await dbpedia.retrieveAnime(animeName);
    res.status(200).json(anime);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(500).send(err);
  }
});

/**
 * GET /author/:name
 *    :name  The name of the author (according to dbpedia; beware of the case)
 * Gather all available information about the author named ':name'.
 * Returns an author as JSON,
 * or a 500 error if there was a problem with the request.
 */
manmangaApiRouter.get("/api/sparql/author/:name", async function (req: Request, res: Response) {
  try {
    const authorName: string = req.params["name"];
    const author: Author = await dbpedia.retrieveAuthor(authorName);
    res.status(200).json(author);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(404).send(err);
  }
});

/**
 * GET /character/:name
 *    :name  The name of the character (according to dbpedia; beware of the case)
 * Gather all available information about the character named ':name'.
 * Returns a character as JSON,
 * or a 404 error if there was a problem with the request.
 */
manmangaApiRouter.get("/character/:name", async function (req: Request, res: Response) {
  try {
    const characterName: string = req.params["name"];
    const character: Character = await dbpedia.retrieveCharacter(characterName);
    res.status(200).json(character);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(500).send(err);
  }
});

/**
 * GET /manga/:name/coverUrl
 *    :name The name of the manga (according to mcd.iosphe; beware, don't use '_').
 * Gather the manga's first volume front cover.
 * Returns a JSON with fields:
 *    title: the manga's name.
 *    coverUrl : an url to the manga's first volume front cover.
 * Or 404 if there was an error with the request.
 */
// TODO: maybe this endpoint is not needed,
// since the cover url is supposed to be sent when gathering all manga's information.
manmangaApiRouter.get("/manga/:name/coverUrl", async function (req: Request, res: Response) {
  try {
    const mangaName: string = req.params["name"];
    const cover: MangaCover = await mcdIOSphe.getMangaCoverUrl(mangaName);
    res.status(200).json(cover);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(500).send(err);
  }
});

export default manmangaApiRouter;

// wikiPageID => can be interesting!
