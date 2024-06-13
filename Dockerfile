# Sử dụng nginx image
FROM nginx:alpine

# Copy nội dung thư mục public vào thư mục phục vụ của nginx
COPY public /usr/share/nginx/html

# Expose cổng mà nginx sử dụng
EXPOSE 80

# Lệnh để khởi động nginx
CMD ["nginx", "-g", "daemon off;"]
