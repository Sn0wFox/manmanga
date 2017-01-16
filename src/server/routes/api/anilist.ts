import {Request, Response, Router} from "express";
import {Character} from "../../../lib/interfaces/character.interface";
import {AnilistApi} from "../../lib/anilist-api.class";
import * as Anilist from "../../lib/anilist-api.interfaces";

export const anilistApiRouter: Router = Router();

/**
 * The object managing Anilist's API calls.
 */
// TODO: what about multiple queries at the same time with an expired token ?
const anilistApi: AnilistApi = new AnilistApi();

/**
 * GET /character/:name
 *    :name The character's name.
 * Gather all available information about the character ':name',
 * according to anilist.
 * Meant to research a character with a precise name.
 */
anilistApiRouter.get("/character/:name", async function (req: Request, res: Response) {
  try {
    const characterName: string = req.params["name"];
    const character: Character = await anilistApi.getCharacter(characterName);
    res.status(200).json(character);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(404).send(err);
  }
});

/**
 * GET /search/manga/:keywords
 *    :keywords The keywords with which searching for mangas.
 * Gather the list of all mangas with a title matching the given keywords,
 * according to anilist.
 */
anilistApiRouter.get("/search/manga/:keywords", async function (req: Request, res: Response) {
  try {
    const result: Anilist.Manga = await anilistApi.searchManga(req.params["keywords"]);
    res.status(200).json(result);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(404).send(err);
  }
});

/**
 * GET /search/anime/:keywords
 *    :keywords The keywords with which searching for animes.
 * Gather the list of all animes with a title matching the given keywords,
 * according to anilist.
 */
anilistApiRouter.get("/search/anime/:keywords", async function (req: Request, res: Response) {
  try {
    const result: Anilist.Anime = await anilistApi.searchAnime(req.params["keywords"]);
    res.status(200).json(result);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(404).send(err);
  }
});

/**
 * GET /search/character/:keywords
 *    :keywords The keywords with which searching for characters.
 * Gather the list of all characters with a name matching the given keywords,
 * according to anilist.
 */
// TODO: return a single character or rename to "characters"
anilistApiRouter.get("/search/character/:keywords", async function (req: Request, res: Response) {
  try {
    const result: Character[] = await anilistApi.searchCharacter(req.params["keywords"]);
    res.status(200).json(result);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(404).send(err);
  }
});

/**
 * GET /search/staff/:keywords
 *    :keywords The keywords with which searching for staff members.
 * Gather the list of all staff members with a name matching the given keywords,
 * according to anilist.
 */
anilistApiRouter.get("/search/staff/:keywords", async function (req: Request, res: Response) {
  try {
    const result: Anilist.Staff = await anilistApi.searchStaff(req.params["keywords"]);
    res.status(200).json(result);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(404).send(err);
  }
});

/**
 * GET /search/studio/:keywords
 *    :keywords The keywords with which searching for studios.
 * Gather the list of all studios with a name matching the given keywords,
 * according to anilist.
 */
anilistApiRouter.get("/search/studio/:keywords", async function (req: Request, res: Response) {
  try {
    const result: Anilist.Studio = await anilistApi.searchStudio(req.params["keywords"]);
    res.status(200).json(result);
  } catch (err) {
    console.error(`ERROR with the request to ${req.originalUrl}`);
    console.error(err);
    res.status(404).send(err);
  }
});

export default anilistApiRouter;
