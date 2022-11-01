import axios, { AxiosInstance } from 'axios'
import { HtmlParser } from '../../parser/html/html-parser'
import { Parser } from '../../parser/parser'
import { User } from '../../types/user'
import { Explorer, FindOptions, FindResults } from '../explorer'

interface UsersRawData {
  html: string,
  total: number
}

interface SearchSteamCommunityResults {
  html: string,
  search_result_count: number
}

export interface SteamExplorerConfig {
  apiKey: string
}

export interface SteamUser extends User {
  id: string
}

export class SteamExplorer implements Explorer {
  private readonly defaultFindOptions = { page: 1 }
  private apiClient: AxiosInstance
  private parser: Parser
  public constructor (private readonly config: SteamExplorerConfig) {
    this.validateConfig()
    this.apiClient = axios.create({ baseURL: 'http://api.steampowered.com', params: { key: this.config.apiKey } })
    this.parser = new HtmlParser()
  }

  public async findUsers (q: string, { page }: FindOptions = this.defaultFindOptions): Promise<FindResults<SteamUser>> {
    const { html, total } = await this.fetchUsersRawData(q, page)
    const players = this.parser.parseUsers(html)
    const playersWithId = await Promise.all(players.map(async player => {
      const [maybeId, typeOfUrl] = player.url.split('/').reverse()
      const id = typeOfUrl === 'profiles'
        ? maybeId
        : await this.getSteamId(maybeId)
      return {
        id,
        ...player
      }
    }))
    return {
      total,
      page,
      results: playersWithId
    }
  }

  private async fetchUsersRawData (q: string, page: number): Promise<UsersRawData> {
    const cookie = await this.getCookie()
    if (!cookie) throw new Error('Cannot get cookie')
    const sessionId = this.getSessionIdFromCookie(cookie)
    const { data } = await axios.get<SearchSteamCommunityResults>(`https://steamcommunity.com/search/SearchCommunityAjax?text=${q}&filter=users&sessionid=${sessionId}&steamid_user=false&page=${page}`, {
      headers: {
        Cookie: cookie
      }
    })
    const { html, search_result_count: total } = data
    return {
      html,
      total
    }
  }

  private async getSteamId (nickname: string): Promise<string> {
    const { data } = await this.apiClient.get(`/ISteamUser/ResolveVanityURL/v0001/?vanityurl=${nickname}`)
    if (data.response.success !== 1) {
      throw new Error('User not found')
    }
    return data.response.steamid
  }

  private async getCookie (): Promise<string | undefined> {
    const res = await axios.get('https://steamcommunity.com/')
    const [cookie] = res.headers['set-cookie'] || []
    return cookie
  }

  private getSessionIdFromCookie (cookie: string): string {
    const [session] = cookie.split(';')
    const [, sessionId] = session.split('=')
    return sessionId
  }

  private validateConfig (): void {
    if (!this.config.apiKey) {
      throw new Error('You must provide a Steam API key in config')
    }
  }
}
