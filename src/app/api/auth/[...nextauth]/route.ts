import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { AUTH_URL } from '../utils/spotify-auth'

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: SPOTIFY_CLIENT_ID!, 
            clientSecret: SPOTIFY_CLIENT_SECRET!,
            authorization: AUTH_URL
        })
    ]
})

export { handler as GET, handler as POST }