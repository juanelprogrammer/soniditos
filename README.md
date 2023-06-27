# SONIDITOS
Upload a sound and get download links ready to share for the original file and a small .mp3 compressed version ready for sharing.

Made with:
Next JS (trying server-actions), Typescript & Supabase

This is the first babystep on creating a site for buying and selling any kind of sounds, focused on music production.
In this project I'm testing FFmpeg codec executing in the client, so that my (future) server doesn't make those heavy processes. 
(Thanks FFMPEGWASM!)


## USE
Create a .env file with your Supabase project info (see example.env)

RUN DEV:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```