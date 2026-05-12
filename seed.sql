USE ecommerce_db;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart_items;
DELETE FROM products;
DELETE FROM categories;

ALTER TABLE categories AUTO_INCREMENT = 1;
ALTER TABLE products AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

-- Insert Categories
INSERT INTO categories (id, name, description) VALUES
(1, 'Designer Fragrances', 'Top luxury fragrances from world-renowned fashion houses'),
(2, 'Niche Fragrances', 'High-quality Middle Eastern fragrances and niche clones'),
(3, 'Luxury Cosmetics', 'Premium makeup and beauty products'),
(4, 'Daily Essentials', 'Luxury skincare and everyday lifestyle products');

-- Designer Fragrances
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Bleu de Chanel EDP','A woody, aromatic fragrance for the modern man.',150.00,50,'/assets/graphics/BLC_edp.png',1),
('Dior Sauvage EDP','A radically fresh composition.',145.00,100,'/assets/graphics/dior_sua.png',1),
('Tom Ford Oud Wood','Rare. Exotic. Distinctive.',295.00,15,'/assets/graphics/tom_ford_ow.png',1),
('YSL Y EDP','A seductive interpretation.',148.00,80,'/assets/graphics/ysl_y.png',1),
('Creed Aventus','The bestselling men’s fragrance.',365.00,5,'/assets/graphics/creed_avntus.png',1);

-- Niche Fragrances
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Lattafa Khamrah','A luxurious oriental spicy fragrance.',45.00,200,'/assets/graphics/lattafa_khamrah.png',2),
('Lattafa Asad','A bold, spicy amber fragrance.',35.00,150,'/assets/graphics/lattafa_asad.png',2),
('Afnan 9PM','A sweet, vanilla bubblegum scent.',35.00,100,'/assets/graphics/afnan_9pm.png',2),
('Armaf Club de Nuit Intense','The famous Creed Aventus clone.',32.00,300,'/assets/graphics/cdnim.png',2),
('Rasasi Hawas','An aquatic, fruity monster performer.',55.00,150,'/assets/graphics/rassasi_hawas.png',2);

-- Luxury Cosmetics
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Charlotte Tilbury Flawless Filter','Customizable complexion booster.',49.00,120,'/assets/graphics/flawless_filter.png',3),
('Dior Backstage Foundation','Face and body foundation.',43.00,90,'/assets/graphics/backstage.png',3),
('NARS Radiant Creamy Concealer','Award-winning concealer.',32.00,200,'/assets/graphics/nars.png',3),
('Huda Beauty Easy Bake Powder','Loose baking powder.',38.00,150,'/assets/graphics/huda_bty.png',3),
('Rare Beauty Soft Pinch Blush','Long-lasting liquid blush.',23.00,300,'/assets/graphics/liquid_blush.png',3);

-- Daily Essentials
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Aesop Resurrection Hand Balm','Hydrating botanical hand balm.',33.00,80,'/assets/graphics/asb.png',4),
('Kiehls Ultra Facial Cream','24-hour daily moisturizer.',39.00,100,'/assets/graphics/ultra_facial.png',4),
('Sol de Janeiro Bum Bum Cream','Fast-absorbing body cream.',48.00,140,'/assets/graphics/bumbum.png',4),
('Organic Charcoal Body Wash','Deep cleansing body wash.',12.99,300,'/assets/graphics/charcol.png',4),
('Premium Whitening Toothpaste','Fluoride-free whitening toothpaste.',14.00,200,'/assets/graphics/tooth_paste.png',4);