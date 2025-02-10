## Electron App with React & Typescript.
This repository contains a simple "get started" project, which you can clone/download in order to create your own electron application.
In this project you can find all the nessesary libraries inside <ins>**package.json**</ins> to help you get started with React and Typescript, but also additional libraries, for building your project and adding automatic updates.

Furthermore, all personalized configuration has been removed from this project, so that you can add your own. Areas where you need to insert your own details can be found with `UPPERCASE_VALUES_IN_PACKAGE_JSON`.

---

### Features
This electron project comes with the following features:

- React
- Typescript
- Page Navigation
- Tailwind CSS
- Shadcn/UI Components
- CSS Modules
- Theme Management (Shadcn)
- Electron Auto-Reload (Implemented)
- Electron Auto-Update (Implemented / Commented out)
- Electron Build (Structure for configuration / Requires personalized values)
- Production Ready

---

### Get Started
Getting started with this project is very simple, first you need to download this project on your local device and from there, follow the steps below.
1. Run `npm install` inside your project directory to install all required packages.
2. Open <ins>**package.json**</ins> fill in all the missing details (remove fields if not needed, this is based on your preferences and the app you are building).
3. Run `npm run dev` to start the webpack config and build a javascrpt bundle, and start the electron project.
4. Happy hacking!

---

### General Configuration
This project comes with a variety of libraries included, inside <ins>**package.json**</ins>. You can simply uninstall them with `npm uninstall <package-name>` or you can remove them from the list before executing `npm install` if you don't need some of them.

In the project files, you will see there are 2 main files for electron called <ins>**main-dev.json**</ins> and <ins>**main-prod.json**</ins>. These 2 files are configured for development and production accordingly. Inside the development main, you will see that DevTools are enabled, and `electron-reload` library is used for automatically reloading on save. On the production main, you can see that `electron-reload` is removed from the code, DevTools are disabled and the menu is hidden. There are also methods and flags added for the auto-update feature to your electron app (these are commented out).

When the project is ready for release, ensure to switch from the dev and point to the prod main. Uncomment or remove the comments completely depending on what you need. And build from prod.

---

### Creating New React Components
When creating components, ensure you always add `import React from 'react';` on the top of the file, this will allow you to use JSX. The file should be named with `.tsx` in the end. Everything else is exactly the same as any react project.

---

### Navigation
There is a pre-built navigation utility implemented in this project, where you can navigate between page components. You can see an example of the provider in the `app.tsx` file. There is also a hook that you can use to navigate between pages or components, get current page, and also all available pages.

---

### Creating Pages
You can create new pages by going to the <ins>**pages**</ins> folder and create a new component inside it. You can create multiple folders inside as well as files, all files will be considered as pages and will be accessible via the <ins>**navigator**</ins>.

---

### Navigation Paths
Defining the paths of created pages is easy. Simply use the relative path of the page component (excluding the root pages folder) and you can navigate to that page.

For example: ./pages/user/profile.tsx
To navigate to the profile page you can use `setPage("user/profile")` and that's all.

---

### Navigation Drawbacks
- Currently navigation is not persistant, meaning you cannot refresh the electron window and stay on the navigated page. It will take you back to the default page as defined in the navigation provider.
- You cannot pass props from one page to the other currently. But a simple workaround is to use any type of storage (e.g. localStorage).