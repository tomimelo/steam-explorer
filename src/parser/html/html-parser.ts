import { AvatarInfo, PersonaInfo, User } from '../../types/user'
import { Parser } from '../parser'

export class HtmlParser implements Parser<string> {
  public parseUsers (data: string): ReadonlyArray<User> {
    const normalizedHtml = data.replace(/\r|\n|\t/g, '')
    const searchRows = this.getUsersRawDataRows(normalizedHtml)
    return searchRows.map(searchRow => this.parseUser(searchRow))
  }

  private parseUser (html: string): User {
    const { url, image } = this.parseAvatarInfo(html)
    const { alias, name, location } = this.parseUserInfo(html)
    return {
      url,
      alias,
      image,
      ...(name && { name }),
      ...(location && { location })
    }
  }

  private parseAvatarInfo (html: string): AvatarInfo {
    const avatarRegex = /<div class="avatarMedium"><a href="([^<]+)"><img src="([^<]+)"><\/a><\/div>/
    const avatarMatch = html.match(avatarRegex)
    if (!avatarMatch) this.throwNoMatchFoundError()
    const [, url, image] = avatarMatch
    return {
      url,
      image
    }
  }

  private parseUserInfo (html: string): PersonaInfo {
    const userInfoRegex = /<div class="searchPersonaInfo"><a class="searchPersonaName" href="[^<]+">([^<]+)<\/a><br \/>(?:(.*)<br \/>)?(?:(.*)&nbsp;)?(?:<img.*src="([^<"]+)")?(?:(?!\/div).)*<\/div>/
    const userInfoMatch = html.match(userInfoRegex)
    if (!userInfoMatch) this.throwNoMatchFoundError()
    const [, alias, name, locationDescription, countryFlag] = userInfoMatch
    return {
      alias,
      ...(name && { name }),
      ...(locationDescription && {
        location: {
          description: locationDescription,
          image: countryFlag
        }
      })
    }
  }

  private getUsersRawDataRows (html: string): ReadonlyArray<string> {
    const searchRowRegex = /<div class="search_row"(?:(?!search_row).)*<\/div>/g
    const searchRows = html.match(searchRowRegex)
    if (!searchRows) this.checkEmptyResults(html)
    return searchRows || []
  }

  private checkEmptyResults (html: string): void {
    const noResultsRegex = /<div class="search_results_error"/
    if (!noResultsRegex.test(html)) {
      this.throwNoMatchFoundError()
    }
  }

  private throwNoMatchFoundError (): never {
    throw new Error('No matches found in provided HTML')
  }
}
