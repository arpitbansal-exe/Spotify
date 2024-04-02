
# Spotify Clone

**This project is a Spotify Clone website built using Next.js and Supabase.** It allows users to browse music,like, add and listen to songs just like the popular music streaming platform Spotify.


## Tech Stack

**Frontend**

- **Next.js** A React framework for building server-side rendered and static web applications.

- **Supabase** An open-source alternative to Firebase that provides a scalable backend for applications, including authentication, database, and storage services.
## Getting Started
Follow these steps to set up the project locally:

- **Clone the repository:**
```bash
  git clone https://github.com/your-username/spotify-clone.git
  cd spotify-clone
```
- **Install dependencies:**
```bash
  npm install
```
- **Create a .env.local file in the root of your project and add the following environment variables:**
```bash
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

- **Run the development server:**
```bash
  npm run dev
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


- `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project. You can find this in your Supabase dashboard under Settings > API.

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key of your Supabase project. Also available in your Supabase dashboard under Settings > API.
- `SUPABASE_SERVICE_ROLE_KEY`: The service role key for your Supabase project. This key is used for server-side operations that require elevated permissions.

## Acknowledgements

 - [Next.js]( https://nextjs.org/)
 - [Supabase](https://supabase.io/)

## Authors

- [@arpitbansal-exe](https://www.github.com/arpitbansal-exe)


## Deployed Demo

#### Deployed on vercel: [https://bansal.vercel.app/](https://bansal.vercel.app/)

***Happy Learning!***

