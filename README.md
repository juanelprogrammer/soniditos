# SONIDITOS
Upload a sound and get download links from the original file and a small .mp3 compressed version ready for sharing.

Made with:
Next JS with Tailwind, Typescript & Supabase

This is the first babystep on creating a site for buying and selling any kind of sounds, focused on music production.
In this project I'm testing FFmpeg codec executing in the client, so that my (future) server doesn't make those heavy processes.
FFmpeg handles the convertion to mp3 in a low bitrate, making it low size. It also offers lots of other tools to process audio and video.
(Thanks [FFMPEGWASM!](https://github.com/ffmpegwasm/))

## USE
- Create a .env file with your Supabase project info (see example.env)

RUN DEV:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## OJO! (warning)
Not a full functional app, it sucks!
The CPU and RAM usage are very heavy, but hey, not in the server!