# Dockerfile for Frontend

# Sử dụng image nginx để phục vụ các file tĩnh
FROM nginx:latest

# Xóa đi default nginx config
RUN rm -rf /usr/share/nginx/html/*

# Sao chép các file static (HTML, CSS, JS) vào thư mục của nginx
COPY public /usr/share/nginx/html

# Expose cổng 80 để có thể truy cập web từ bên ngoài
EXPOSE 80

# Không cần CMD vì nginx image đã có lệnh mặc định để start nginx
