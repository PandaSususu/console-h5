# 基础镜像，基于node的基础镜像
#FROM node:14

# 维护
#LABEL maintainer=1271250334@qq.com

# 创建一个工作目录
#WORKDIR /app

# 把所有文件复制到当前的工作目录下面来
#COPY . .

# 安装依赖
#RUN npm install  --registry=https://registry.npm.taobao.org

# 打包
#RUN npm run build

# production stage
#FROM nginx:stable-alpine
#COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
#EXPOSE 1024

# 运行NGINX
#CMD ["nginx", "-g", "daemon off;"]

# build stage
FROM node:14-alpine as build-stage

LABEL maintainer=brian@toimc.com

# 创建一个工作目录
WORKDIR /app

COPY . .

RUN npm install cnpm -g --no-progress --registry=https://registry.npm.taobao.org

RUN cnpm install --no-progress

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]