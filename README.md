This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

1. Install dependencies (we are using yarn): `yarn`

2. Pull environment variables from vercel: `vercel env pull`

3. Rename `.env.example` -> `.env` and edit it

4. Run the development server: `vercel dev`

On the first run you will be prompted to connect to the vercel project which will create the .vercel folder. Just follow the instructions and connect to the existing project or create a new one.
After the first setup, remove the .vercel from the .gitignore file, so that the vercel settings are stored inside of GIT. This is neccessary for deployments via Gitlab.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy

We use Gitlab Pipelines for the deployment. Pipelines are triggered depending on the git branch.

## Tailwind

### Color Themes

To create a color theme we add follow these steps:

1. Add colors object to lib/styles/constants.js and export it (also export from lib/styles/theme.js)
2. In tailwind.config.js add the new theme to the "addBase" Plugin:

    - `'.theme-dark': extractColorVars(theme('colorsDark')),``

You can look at the dark mode example.
