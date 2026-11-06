import { NextRequest, NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Do not present a sample track as real listening activity.
const FALLBACK_RECENTLY_PLAYED = { isPlaying: false };

async function getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token || '',
        }),
        cache: 'no-store',
    });

    return response.json();
}

async function getRecentlyPlayed(access_token: string) {
    try {
        const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            cache: 'no-store',
        });

        if (response.status === 204 || !response.ok) {
            console.warn(`Spotify recently-played returned status ${response.status}. Using fallback track.`);
            return NextResponse.json(FALLBACK_RECENTLY_PLAYED);
        }

        const data = await response.json();
        const track = data?.items?.[0]?.track;

        if (!track) {
            return NextResponse.json(FALLBACK_RECENTLY_PLAYED);
        }

        const title = track.name;
        const artist = track.artists.map((_artist: { name: string }) => _artist.name).join(', ');
        const songUrl = track.external_urls.spotify;

        return NextResponse.json({
            isPlaying: false,
            title,
            artist,
            songUrl,
        });
    } catch (err) {
        console.error('Error fetching recently played track:', err);
        return NextResponse.json(FALLBACK_RECENTLY_PLAYED);
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const mock = searchParams.get('mock');

    // Support mock parameter testing for UI developers
    if (mock === 'now-playing') {
        return NextResponse.json({
            isPlaying: true,
            title: "Faramosh",
            artist: "Madboy Mink, Saba Azad",
            songUrl: "https://open.spotify.com/track/4Pz7jTGLb5wOaQz8U315jZ",
        });
    } else if (mock === 'last-played') {
        return NextResponse.json(FALLBACK_RECENTLY_PLAYED);
    } else if (mock === 'offline') {
        return NextResponse.json({ isPlaying: false });
    }

    if (!client_id || !client_secret || !refresh_token) {
        return NextResponse.json(FALLBACK_RECENTLY_PLAYED);
    }

    try {
        const { access_token } = await getAccessToken();
        if (!access_token) return NextResponse.json(FALLBACK_RECENTLY_PLAYED);

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            cache: 'no-store',
        });

        if (response.status === 204 || !response.ok) {
            return await getRecentlyPlayed(access_token);
        }

        const song = await response.json();

        if (!song || song.item === null || !song.is_playing) {
            return await getRecentlyPlayed(access_token);
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ');
        const songUrl = song.item.external_urls.spotify;

        return NextResponse.json({
            isPlaying,
            title,
            artist,
            songUrl,
        });
    } catch (error) {
        console.error('Error fetching Spotify now playing:', error);
        // Unavailable activity stays empty rather than showing invented history.
        return NextResponse.json(FALLBACK_RECENTLY_PLAYED);
    }
}


