# aafo

merupakan alat terapi pasien

# penggunaan

## running web

pnpm run dev => menjalankan web local dengan mode development

pnpm run build => melakukan build web
pnpm run start => menjalankan web local dengan mode production

pnpm monitor => menjalankan prisma studio

## running api

mcu ketika memulai sesi harus membuat random code untuk memasukan pengukaran dalam pasian ayng sama

# installasi

## shadcn

```bash
pnpm dlx shadcn-ui@latest init

```

## prisma

```bash
pnpm install prisma @prisma/client @prisma/studio
pnpm add -g dotenv-cli
npx prisma init
```

### runnig prisma

```bash
npx prisma generate
npx prisma db push
npx prisma studio

dotenv -e .env.development -- npx prisma db push
"monitor": "dotenv -e .env.development -- npx prisma studio"
```

## table

```bash
pnpm add material-react-table @mui/material @mui/x-date-pickers @mui/icons-material @emotion/react @emotion/styled
pnpm i export-to-csv @tanstack/react-query

```
