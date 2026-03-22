# ─────────────────────────────────────────────
# 1단계: 빌드 스테이지
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일만 먼저 복사 (레이어 캐시 최적화)
COPY package.json package-lock.json* ./

# 의존성 설치
RUN npm ci --frozen-lockfile

# 소스 코드 복사
COPY . .

# 환경변수 빌드 인자
ARG VITE_APP_NAME="뽀짝 투두"
ARG VITE_APP_VERSION="1.0.0"
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_VERSION=$VITE_APP_VERSION

# 프로덕션 빌드
RUN npm run build

# ─────────────────────────────────────────────
# 2단계: 서빙 스테이지
# ─────────────────────────────────────────────
FROM nginx:alpine AS production

# 보안: nginx를 non-root 유저로 실행
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# nginx 설정 파일 복사 (SPA 라우팅 지원)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 정적 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html

USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
