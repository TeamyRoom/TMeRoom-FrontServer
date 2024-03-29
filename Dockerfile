# prod environment
FROM nginx:stable-alpine
# 이전 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
COPY /build /usr/share/nginx/html
# 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf
# custom 설정파일을 컨테이너 내부로 복사한다.
COPY nginx.conf /etc/nginx
# 컨테이너의 80번, 3099번 포트를 열어준다.
EXPOSE 80 3099
# nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
CMD ["nginx", "-g", "daemon off;"]
