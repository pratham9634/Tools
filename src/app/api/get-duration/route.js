import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.YOUTUBE_API_KEY;

function getPlaylistId(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('list');
  } catch (e) {
    return null;
  }
}

export async function POST(req) {
  try {
    const { url } = await req.json();
    const playlistId = getPlaylistId(url);

    if (!playlistId) {
      return NextResponse.json({ error: 'Invalid YouTube playlist URL' }, { status: 400 });
    }

    let videoIds = [];
    let nextPageToken = '';

    do {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${nextPageToken}&key=${API_KEY}`
      );
      const data = await res.json();

      if (!res.ok || !data.items) {
        console.error('Error fetching playlistItems:', data);
        return NextResponse.json({ error: 'Failed to fetch playlist items' }, { status: 500 });
      }

      videoIds.push(...data.items.map(item => item.contentDetails.videoId));
      nextPageToken = data.nextPageToken || '';
    } while (nextPageToken);

    let totalSeconds = 0;
    for (let i = 0; i < videoIds.length; i += 50) {
      const chunk = videoIds.slice(i, i + 50);

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${chunk.join(',')}&key=${API_KEY}`
      );
      const data = await res.json();

      if (!res.ok || !data.items) {
        console.error('Error fetching video durations:', data);
        return NextResponse.json({ error: 'Failed to fetch video durations' }, { status: 500 });
      }

      for (const item of data.items) {
        const durationISO = item.contentDetails.duration;
        totalSeconds += parseISODuration(durationISO);
      }
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return NextResponse.json({
      totalSeconds,
      videoCount: videoIds.length,
      formattedDuration: formatSecondsToHMS(totalSeconds),
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

function parseISODuration(iso) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const [, h = 0, m = 0, s = 0] = iso.match(regex) || [];
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
}
function formatSecondsToHMS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const pad = (n) => String(n).padStart(2, '0');
  
    return `${pad(hours)}hr:${pad(minutes)}mm:${pad(seconds)}sec`;
  }