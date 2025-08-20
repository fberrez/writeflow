FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest
RUN corepack enable

FROM base AS build
WORKDIR /app

# Copy workspace configuration files
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy all package.json files for proper workspace resolution
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/

# Install all dependencies (needed for Turborepo to work properly)
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY . .

# Build the frontend using Turborepo
RUN pnpm build --filter=@writeflow/frontend

FROM node:20-alpine AS prod

ENV NODE_ENV=production

WORKDIR /app
# Copy the built files
COPY --from=build /app/apps/frontend/dist ./dist
# Install serve to host the static files
RUN npm install -g serve
# Expose port 80
EXPOSE 80
# Command to serve static files with proper SPA routing
CMD ["serve", "-s", "dist", "-l", "80"] 