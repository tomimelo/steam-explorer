export interface AvatarInfo {
  url: string,
  image: string
}

export interface PersonaInfo {
  alias: string,
  name?: string,
  location?: {
    description: string,
    image: string
  }
}

export type User = AvatarInfo & PersonaInfo
