# Why this project ?

The goal of this exercise is to:
## Functional Requirements

- Optimize the recruiter's experience after initial contact via LinkedIn.

- Enable direct calendar scheduling for meetings.

## Research & Self-Learning

- Familiarize with Figma tools:

    - Auto Layout

    - Variables

- Evaluate the best web solution for implementing the site.

- Test AI-powered tools:

    - Cursor: Code autogeneration through conversational AI directly in the IDE.

    - V0: Convert Figma mockups to code (React, Next.js, TypeScript, TailwindCSS).

    - Builder.io / locofy: Automatically convert Figma designs to code (HTML, CSS, TailwindCSS).

## Running the code

- You will need [NodeJs setup into your machine](https://nodejs.org/en/download), check NodeJs official website.

- First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
- Add calendly url as `NEXT_PUBLIC_CALENDLY_URL` in your .env file

## What to do next ?

- [ ] track traffic metrics, mainly:
    - cta button clicked.
    - navigate to page interaction.
    - Manage utm source (add extra params when sharing your portfolio url, ex: me.dev/?urm_source=linkedin)
- [x] Add multilangual capabilites.
    - [x] language switcher
    - [x] add logic to redirect user to the corresponding lang web page, based on the browser language setting.
    ex: mywebsite.com/ -> mywebsite.com/en
- [x] Add projects page according to the mockup.
- [ ] Add sticky header to home page according to the mockup.
- [x] Add "read full description/ show less" button interaction.
- [ ] Update image sources for:
    - [x] projects
    - [ ] certifications
- [ ] Enhance website performance:
    - [ ] Use [image component](https://docs.astro.build/en/guides/images/)
- [ ] Add social media metadata (highlighted image, description)
- [ ] make the user card sticky on desktop
- [x] Update projects section.
    - [x] fill the content from data source (en/fr.json)
    - [x] make sure footer section link is referenring to the projects page
