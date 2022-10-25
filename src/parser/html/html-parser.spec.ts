import { expect } from 'chai'
import { HtmlParser } from './html-parser'
import { player1RawData, player2RawData, player3RawData } from '../../../test/mocks/html-parser/raw-data'
import { User } from '../../types/user'

describe(HtmlParser.name, () => {
  const htmlParser = new HtmlParser()
  describe('parseUsers', () => {
    const html = player1RawData + player2RawData + player3RawData
    it('should parse users from html', () => {
      const expectedUsers: ReadonlyArray<User> = [
        {
          url: 'https://myprofile.com/profile-id',
          alias: 'Player 1',
          image: 'https://myprofile.com/my-image.jpg',
          name: 'PlayerName',
          location: {
            description: 'Argentina',
            image: 'https://myprofile.com/countryflags/ar.gif'
          }
        },
        {
          url: 'https://myprofile.com/profile-id',
          alias: 'Player 2',
          image: 'https://myprofile.com/my-image.jpg',
          location: {
            description: 'Spain',
            image: 'https://myprofile.com/countryflags/es.gif'
          }
        },
        {
          url: 'https://myprofile.com/profile-id',
          alias: 'Player 3',
          image: 'https://myprofile.com/my-image.jpg',
          name: 'PlayerName'
        }
      ]
      const parsedUsers = htmlParser.parseUsers(html)
      expect(parsedUsers).to.deep.equal(expectedUsers)
    })
  })
})
