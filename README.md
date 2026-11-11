# Ubumwe Farms

Online shop for rabbits and other farm animals. Built with Next.js, MongoDB (Mongoose) and Cloudinary.

- `/` home page, categories and latest animals
- `/animals` catalog with search and filter by animal type
- `/animals/[id]` animal page with order form and WhatsApp button
- `/admin` password-protected page to add animals, upload photos and follow orders

## Run locally

```bash
npm install
```

Copy `.env.example` to `.env.local`, fill in the values, then:

```bash
npm run dev
```

## Deploy on Vercel

1. Import this repository in Vercel.
2. Add the environment variables from `.env.example` (Project Settings > Environment Variables).
3. In MongoDB Atlas > Network Access, allow access from anywhere (`0.0.0.0/0`) so Vercel can connect.
4. Deploy, then open `/admin` and add your animals.

## Environment variables

| Name | What it is |
| --- | --- |
| `MONGODB_URI` | Atlas connection string |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary account for photos |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number, digits only with country code |
| `NEXT_PUBLIC_PHONE` | Phone number shown on the site |
| `NEXT_PUBLIC_LOCATION` | Farm location shown on the site |
