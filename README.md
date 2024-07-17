# aafo

merupakan alat

# penggunaan

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
```

"monitor": "dotenv -e .env.development -- npx prisma studio"

```

```
