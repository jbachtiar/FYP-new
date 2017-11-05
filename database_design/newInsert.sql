
INSERT INTO `customer` (`EMAIL`, `FIRST_NAME`, `LAST_NAME`, `PHONE_NO`, `PASSWORD`, `VERIFIED`) VALUES
('customer2@gmail.com', 'Tan', 'Chen', '+6585823165', '1234', 'Y'),
('customer3@gmail.com', 'Ming', 'Chen', '+6581123165', '1234', 'Y'),
('customer@gmail.com', 'Huiyan', 'Chen', '+6585882165', '1234', 'Y');

INSERT INTO `staff_role` (`ROLE_ID`, `ROLE_NAME`) VALUES
(1, 'Admin'),
(2, 'Factory Manager'),
(3, 'Factory Worker');

INSERT INTO `staff` (`EMAIL`, `FIRST_NAME`, `LAST_NAME`, `PHONE_NO`, `PASSWORD`, `ROLE_ID`) VALUES
('manager@gmail.com', 'Tom', 'John', '12345678', '1234', 2),
('super@gmail.com', 'Ming', 'Xia', '12345678', '1234', 1),
('worker@gmail.com', 'Matthew', 'Xia', '12345678', '1234', 3);

INSERT INTO `courier` (`COURIER_NAME`, `TRACKING_URL`) VALUES
('DHL', 'dhl.com'),
('Shun Feng', 'ShunFeng.com');

-- ---------------I
INSERT INTO `customer_address` (`ADDRESS_ID`, `EMAIL`, `RECIPIENT_NAME`, `PHONE_NO`, `ADDRESS_LINE`, `CITY`, `COUNTRY`, `POSTAL_CODE`, `ISDEFAULT`) VALUES
(1, 'customer2@gmail.com', 'Tan Yan', '91214230', '134 Road Ave 3', 'Singapore', 'Singapore', '126748', 'Y'),
(1, 'customer3@gmail.com', 'Ming Yan', '82114230', '134 Ubi Ave 3', 'Singapore', 'Singapore', '426748', 'Y'),
(1, 'customer@gmail.com', 'Hui Yan', '91234230', '134 Highlander Ave 3', 'Singapore', 'Singapore', '536748', 'Y'),
(2, 'customer@gmail.com', 'Mark Chen', '99122332', '324 Orchard Ave 4', 'Singapore', 'Singapore', '876324', 'N');

-- ---

INSERT INTO `collection` (`COLLECTION_ID`, `COLLECTION_NAME`, `DELETED`) VALUES
(1, 'Bestsellers', 'N'),
(2, '2018 Spring', 'N'),
(3, '2018 Summer', 'N'),
(4, '2017 Spring', 'N'),
(5, '2017 Winter', 'N');




INSERT INTO `pattern` (`PATTERN_ID`, `PATTERN_NAME`, `PATTERN_DESC`, `PATTERN_PRICE`, `DELETED`, `COLLECTION_ID`) VALUES
(1, 'Forest', 'Hi, here is a description on Forest', 100, 'N', 1),
(2, 'Birds', 'Hi, here is a description on Birds', 120, 'N', 1),
(3, 'Bloom', 'Hi, here is a description on Bloom', 110, 'N', 2),
(4, 'Mimosa', 'Hi, here is a description of Mimosa', 100, 'N', 3),
(5, 'Lotus', 'Hi, here is a description on Lotus', 340, 'N', 4),
(6, 'Coconuts', 'Hi, here is a description on Coconuts', 400, 'N', 3),
(7, 'Flowers', 'Hi, here is a description on Flowers', 200, 'N', 3);

-- --------------------------------------------------------
INSERT INTO `fabric` (`FABRIC_ID`, `FABRIC_NAME`, `FABRIC_DESC`, `FABRIC_PRICE`, `DELETED`) VALUES
(1, 'Silk', 'Silk, also known as natural silk, is continuous filament solidified from the silk fluid secreted by silkworms during cocooning. It is a natural protein fiber and also one of the earliest fibers to be woven into textiles. Second to none in texture, shine, strength and drape, silk is renowned as “the second skin of human body” and “The Queen of Fibers” in the industry.', 250, 'N'),
(2, 'Modal', 'Modal fabric is a regenerated cellulose fiber developed by the Lenzing company from Austria. Its raw materials are beech trees living in European bushes. Beech trees are made into wood pulp first and then processed into Modal fiber using special spinning technologies. The textile made from this fiber has a silky shine, fine touch, and excellent draping. Modal fiber is an eco-friendly fiber because all its raw materials are natural and can be naturally decomposed.', 100, 'N'),
(3, 'Long Staple Cotton', 'Long staple cotton, also called sea island cotton, is a cultivated cotton species that is known for its long fiber. Long staple cotton is renowned as fine cotton for its high quality and long soft fiber.', 120, 'N'),
(4, 'Cotton', 'Cotton is a widely used home textile fabric. Popular among consumers because of its features such as perspiration absorbent, breezy for wear, softness and no irritation to skin, ease of wash, and no pilling.', 80, 'N'),
(5, 'Lyocell Tencel', 'Lyocell, also called Tencel, is a form of rayon which consists of cellulose fiber made from dissolving pulp (bleached wood pulp) using dry jet-wet spinning. It is a typical eco-friendly fiber developed by the Austria Lenzing company. The decomposition rate of Tencel in mud is over 99%, causing little pollution. Tencel is hygroscopic, comfortable, and draping. Tencel products are more hygroscopic than cotton products, softer than silk products, and cooler than linen products. That is why Tencel i', 450, 'N'),
(6, 'Polyester-Cotton', 'Polyester-cotton called by a joint name of polyester blend cotton combination fabric,and it is the textile which made by the yarn of 65%—67% polyester blended with 33%—35% cotton.', 200, 'N');

-- 

INSERT INTO `tag` (`TAG_ID`, `TAG_NAME`) VALUES
(1, 'New Arrivals'),
(2, 'Bestsellers'),
(3, 'Promotion'),
(4, 'Limited Edition'),
(5, 'Exclusive Colours'),
(6, 'Editors Choice');


INSERT INTO `pattern_tag` (`PATTERN_ID`, `TAG_ID`) VALUES
(2, 1),
(4, 1),
(5, 1),
(7, 1),
(3, 3),
(1, 4),
(4, 4),
(1, 6),
(6, 6);
--
-- Table structure for table `cart`
--

INSERT INTO `cart` (`CART_ID`, `CART_PRICE`, `EMAIL`) VALUES
(1, 0, 'customer@gmail.com'),
(2, 0, 'customer2@gmail.com'),
(3, 0, 'customer3@gmail.com');

-- --------------------------------------------------------


INSERT INTO `bedding_size` (`SIZE_NAME`, `DIMENSIONS`, `SIZE_PRICE`) VALUES
('Double', '137 cm x 187 cm', 200),
('King', '183 cm x 203 cm', 400),
('Queen', '153 cm x 203 cm', 300),
('Single', '92 cm x 187 cm', 100),
('Super King', '	203ccm x 203 cm', 500);



INSERT INTO `colour` (`COLOUR_ID`, `COLOUR_NAME`, `DELETED`) VALUES
(1, 'White', 'N'),
(2, 'Black', 'N'),
(3, 'Red', 'N'),
(4, 'Yellow', 'N'),
(5, 'Blue', 'N'),
(6, 'Green', 'N'),
(7, 'Pink', 'N'),
(8, 'Purple', 'N'),
(9, 'Teal', 'N'),
(10, 'Gold', 'N'),
(11, 'Silver', 'N'),
(12, 'Grey', 'N'),
(13, 'Vanila Green', 'N'),
(14, 'Khaki Green', 'N');

INSERT INTO `order_status` (`STATUS_ID`, `STATUS_NAME`) VALUES
(1, 'Payment Received'),
(2, 'In Production'),
(3, 'Packaging'),
(4, 'Pending for Shipment'),
(5, 'Shipped'),
(6, 'Completed');



INSERT INTO `promo_code` (`PROMO_CODE_ID`, `PROMO_CODE`, `PROMO_NAME`, `PROMO_TYPE`, `PROMO_VALUE`, `MIN_PURCHASE`, `MAX_DISCOUNT`, `QUOTA`, `COUNTER`, `START_DATE`, `END_DATE`, `DELETED`) VALUES
(0, 'NONE', 'NONE', 'NONE', 0, 0, 0, 0, 0, '2017-08-27', '2020-09-10', 'N'),
(1, 'WELCOME5', 'First Purchase', 'Percent Off', 5, 50, 100, 10000, 0, '2017-08-27', '2018-09-10', 'N'),
(2, '1MONTH', '1st Monthsary', 'Dollar Off', 50, 200, 50, 10000, 0, '2017-09-27', '2018-10-27', 'N');


INSERT INTO `bedding` (`PRODUCT_ID`, `SIZE_NAME`) VALUES
(5, 'King'),
(1, 'Single'),
(2, 'Single'),
(3, 'Single'),
(4, 'Single'),
(6, 'Single'),
(7, 'Single'),
(8, 'Single'),
(9, 'Single'),
(10, 'Single'),
(11, 'Single'),
(12, 'Single');

INSERT INTO `product` (`PRODUCT_ID`, `PRODUCT_TYPE`, `PATTERN_ID`, `COLOUR_ID`, `DELETED`, `FABRIC_ID`) VALUES
(1, 'Bedding', 1, 2, 'N', 1),
(2, 'Bedding', 2, 1, 'N', 1),
(3, 'Bedding', 3, 2, 'N', 3),
(4, 'Bedding', 4, 7, 'N', 3),
(5, 'Bedding', 5, 2, 'N', 6),
(6, 'Bedding', 4, 4, 'N', 4),
(7, 'Bedding', 4, 1, 'N', 2),
(8, 'Bedding', 2, 9, 'N', 5),
(9, 'Bedding', 4, 6, 'N', 4),
(10, 'Bedding', 3, 3, 'N', 3),
(11, 'Bedding', 6, 1, 'N', 5),
(12, 'Bedding', 7, 1, 'N', 4);

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--



INSERT INTO `product_image` (`PRODUCT_ID`, `IMAGE_ID`, `IMAGE_URL`) VALUES
(1, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P1.png'),
(1, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/1_2.png'),
(2, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P2.png'),
(2, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/2_2.png'),
(3, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P3.png'),
(3, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/3_2.png'),
(4, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P4.png'),
(4, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/4_2.png'),
(4, 3,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/3_3.png'),
(5, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P5.png'),
(5, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/5_2.png'),
(6, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P6.png'),
(6, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/6_2.png'),
(7, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P7.png'),
(7, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/7_2.png'),
(7, 3, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/7_3.png'),
(8, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P8.png'),
(8, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/8_2.png'),
(9, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P9.png'),
(9, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/9_2.png'),
(10, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P10.png'),
(10, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/10_2.png'),
(11, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P11.png'),
(11, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/11_2.png'),
(12, 1, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P12.png'),
(12, 2, 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/12_2.png');


INSERT INTO `lamp` (`PRODUCT_ID`, `LAMP_TYPE`, `LAMP_PRICE`) VALUES
(1, 'Table Lamp', 500),
(5, 'Table Lamp', 500),
(8, 'Table Lamp', 500),
(12, 'Table Lamp', 500);

INSERT INTO `customer_order` (`ORDER_ID`, `ORDER_DATE`, `NET_AMT`, `PROMO_DISC_AMT`, `RECIPIENT_NAME`, `PHONE_NO`, `ADDRESS_LINE`, `CITY`, `COUNTRY`, `POSTAL_CODE`, `STRIPE_CHARGE_ID`, `EMAIL`, `PROMO_CODE_ID`, `COURIER_NAME`, `ORDER_TRACKING_NO`) VALUES
(1, '2017-10-10 07:00:18', 1000, 0, 'YUXUAN', '91223223', '54A Zion Road', 'Singapore', 'Singapore', '247780', 'RFEWGORGKR3423420DDD', 'customer@gmail.com', 1, 'Shun Feng', 'shunfeng123223'),
(2, '2017-10-11 08:42:18', 900, 0, 'Human', '91233223', '54n Road', 'Singapore', 'Singapore', '247780', 'RFEWGOR222223420DDD', 'customer@gmail.com', 1, 'Shun Feng', 'dhl383'),
(3, '2017-10-11 13:43:34', 1480, 0, 'Hui Yan', '91234230', '134 Highlander Ave 3', 'Singapore', 'Singapore', '536748', 'ch_1BBkUjErLJBVVJLU5A9qyiMR', 'customer@gmail.com', 0, NULL, NULL),
(4, '2017-10-11 13:47:38', 1160, 0, 'Tan Yan', '91214230', '134 Road Ave 3', 'Singapore', 'Singapore', '126748', 'ch_1BBkYgErLJBVVJLUFz4a6b3t', 'customer2@gmail.com', 0, NULL, NULL),
(5, '2017-10-11 13:48:35', 1220, 0, 'Tan Yan', '91214230', '134 Road Ave 3', 'Singapore', 'Singapore', '126748', 'ch_1BBkZbErLJBVVJLU3jW3Z0ve', 'customer2@gmail.com', 0, NULL, NULL),
(6, '2017-10-11 13:50:36', 2960, 0, 'Tan Yan', '91214230', '134 Road Ave 3', 'Singapore', 'Singapore', '126748', 'ch_1BBkbXErLJBVVJLUcpzNFUWp', 'customer2@gmail.com', 0, NULL, NULL),
(7, '2017-10-11 13:51:34', 2670, 0, 'Ming Yan', '82114230', '134 Ubi Ave 3', 'Singapore', 'Singapore', '426748', 'ch_1BBkcTErLJBVVJLUFxqeA4ND', 'customer3@gmail.com', 0, NULL, NULL),
(8, '2017-10-11 13:52:33', 1290, 0, 'Ming Yan', '82114230', '134 Ubi Ave 3', 'Singapore', 'Singapore', '426748', 'ch_1BBkdQErLJBVVJLUFTDQ18EO', 'customer3@gmail.com', 0, NULL, NULL),
(9, '2017-10-11 13:53:33', 980, 0, 'Ming Yan', '82114230', '134 Ubi Ave 3', 'Singapore', 'Singapore', '426748', 'ch_1BBkePErLJBVVJLU2vFZ6cvq', 'customer3@gmail.com', 0, NULL, NULL);

INSERT INTO `order_item` (`ORDER_ID`, `PRODUCT_ID`, `QUANTITY`, `UNIT_PRICE`, `ITEM_STATUS`) VALUES
(1, 3, 1, 200, 'COMPLETE'),
(1, 6, 1, 500, 'COMPLETE'),
(1, 7, 1, 300, 'COMPLETE'),
(2, 11, 1, 900, 'INCOMPLETE'),
(3, 3, 1, 430, 'INCOMPLETE'),
(3, 11, 1, 1050, 'INCOMPLETE'),
(4, 4, 1, 420, 'INCOMPLETE'),
(4, 5, 1, 740, 'INCOMPLETE'),
(5, 5, 1, 740, 'INCOMPLETE'),
(5, 12, 1, 480, 'INCOMPLETE'),
(6, 5, 4, 740, 'INCOMPLETE'),
(7, 2, 1, 570, 'INCOMPLETE'),
(7, 11, 2, 1050, 'INCOMPLETE'),
(8, 1, 1, 550, 'INCOMPLETE'),
(8, 5, 1, 740, 'INCOMPLETE'),
(9, 1, 1, 550, 'INCOMPLETE'),
(9, 3, 1, 430, 'INCOMPLETE');


INSERT INTO `order_status_log` (`ORDER_ID`, `STATUS_ID`, `START_TIMESTAMP`, `END_TIMESTAMP`, `DURATION_HOURS`) VALUES
(1, 1, '2017-10-09 07:00:18', '2017-10-11 09:00:21', 0),
(1, 2, '2017-10-11 09:00:21', '2017-10-11 09:26:09', 0),
(1, 3, '2017-10-11 09:26:09', NULL, 0),
(2, 1, '2017-10-11 08:42:18', NULL, 0),
(3, 1, '2017-10-11 13:43:34', NULL, 0),
(4, 1, '2017-10-11 13:47:38', NULL, 0),
(5, 1, '2017-10-11 13:48:35', NULL, 0),
(6, 1, '2017-10-11 13:50:36', NULL, 0),
(7, 1, '2017-10-11 13:51:34', NULL, 0),
(8, 1, '2017-10-11 13:52:33', NULL, 0),
(9, 1, '2017-10-11 13:53:33', NULL, 0);
