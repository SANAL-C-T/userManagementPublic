server {
    server_name times-ecommerce.shop www.times-ecommerce.shop;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/times-ecommerce.shop/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/times-ecommerce.shop/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.times-ecommerce.shop) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = times-ecommerce.shop) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    listen [::]:80;
    server_name times-ecommerce.shop www.times-ecommerce.shop;
    return 404; # managed by Certbot




}







//......

server {
    listen 80;
    server_name localhost;  # Change this if you have a domain name

    location / {
        root /dist;  # Update to the path of your React build folder
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:5000;  # Assuming your Node.js server runs on port 5000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
16.171.174.109