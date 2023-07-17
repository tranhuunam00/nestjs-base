FROM node:18


# Thiết lập thư mục làm việc
WORKDIR /app

# Cài đặt các phụ thuộc của ứng dụng

COPY package*.json ./
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt 

# Sao chép các tệp cấu hình và mã nguồn của ứng dụng vào thư mục /app trên hình ảnh Docker
COPY . .

EXPOSE 9001

# Chạy ứng dụng NestJS và Redis khi Docker container được khởi động
CMD [ "npm", "run", "start" ]