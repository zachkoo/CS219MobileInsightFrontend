# 使用官方的Node.js镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目所有文件到工作目录
COPY . .

# 构建项目
RUN npm run build

# 公开80端口
EXPOSE 3000

# 定义容器启动时运行的命令
CMD ["npm", "start"]