INSERT INTO CUSTOMER VALUES ('customer@gmail.com','Huiyan','Chen','85882165','1234','N');

INSERT INTO STAFF_ROLE VALUES ('1','Admin');
INSERT INTO STAFF_ROLE VALUES ('2','Factory Manager');
INSERT INTO STAFF_ROLE VALUES ('3','Factory Worker');

INSERT INTO STAFF VALUES ('staff@gmail.com','Ming','Xia','12345678','1234','1');
INSERT INTO STAFF VALUES ('staff1@gmail.com','Tom','John','12345678','1234','2');
INSERT INTO STAFF VALUES ('staff2@gmail.com','Matthew','Xia','12345678','1234','3');
INSERT INTO STAFF VALUES ('staff3@gmail.com','James','Xia','12345678','1234','3');

INSERT INTO CUSTOMER_ADDRESS VALUES ('1', 'customer@gmail.com', 'hui yan', '91234230', '134 Highlander Ave 3','Singapore','Singapore','536748', 'Y');
INSERT INTO CUSTOMER_ADDRESS VALUES ('2', 'customer@gmail.com', 'hy chen', '99122332', '324 Orchard Ave 4','Singapore','Singapore','876324', 'N');

INSERT INTO COLLECTION VALUES ('1','Bestsellers');
INSERT INTO COLLECTION VALUES ('2','2018 Spring');
INSERT INTO COLLECTION VALUES ('3','2018 Summer');
INSERT INTO COLLECTION VALUES ('4','2017 Spring');
INSERT INTO COLLECTION VALUES ('5','2017 Winter');

INSERT INTO PATTERN VALUES ('1','Forest','Hi, here is a description on Forest',100,'N','1');
INSERT INTO PATTERN VALUES ('2','Birds','Hi, here is a description on Birds',120,'N','1');
INSERT INTO PATTERN VALUES ('3','Bloom','Hi, here is a description on Bloom',110,'N','2');
INSERT INTO PATTERN VALUES ('4','Mimosa','Hi, here is a description of Mimosa',100,'N','3');
INSERT INTO PATTERN VALUES ('5','Lotus','Hi, here is a description on Lotus',340,'N','4');
INSERT INTO PATTERN VALUES ('6','Coconuts','Hi, here is a description on Coconuts',400,'N','3');
INSERT INTO PATTERN VALUES ('7','Flowers','Hi, here is a description on Flowers',200,'N','3');

INSERT INTO FABRIC VALUES('1','Silk','Silk, also known as natural silk, is continuous filament solidified from the silk fluid secreted by silkworms during cocooning. It is a natural protein fiber and also one of the earliest fibers to be woven into textiles. Second to none in texture, shine, strength and drape, silk is renowned as “the second skin of human body” and “The Queen of Fibers” in the industry.',250,'N');
INSERT INTO FABRIC VALUES('2','Modal','Modal fabric is a regenerated cellulose fiber developed by the Lenzing company from Austria. Its raw materials are beech trees living in European bushes. Beech trees are made into wood pulp first and then processed into Modal fiber using special spinning technologies. The textile made from this fiber has a silky shine, fine touch, and excellent draping. Modal fiber is an eco-friendly fiber because all its raw materials are natural and can be naturally decomposed.',100,'N');
INSERT INTO FABRIC VALUES('3','Long Staple Cotton','Long staple cotton, also called sea island cotton, is a cultivated cotton species that is known for its long fiber. Long staple cotton is renowned as fine cotton for its high quality and long soft fiber.',120,'N');
INSERT INTO FABRIC VALUES('4','Cotton','Cotton is a widely used home textile fabric. Popular among consumers because of its features such as perspiration absorbent, breezy for wear, softness and no irritation to skin, ease of wash, and no pilling.',80,'N');
INSERT INTO FABRIC VALUES('5','Lyocell Tencel','Lyocell, also called Tencel, is a form of rayon which consists of cellulose fiber made from dissolving pulp (bleached wood pulp) using dry jet-wet spinning. It is a typical eco-friendly fiber developed by the Austria Lenzing company. The decomposition rate of Tencel in mud is over 99%, causing little pollution. Tencel is hygroscopic, comfortable, and draping. Tencel products are more hygroscopic than cotton products, softer than silk products, and cooler than linen products. That is why Tencel is called “green fiber of the 21st century”.',450,'N');
INSERT INTO FABRIC VALUES('6','Polyester-Cotton','Polyester-cotton called by a joint name of polyester blend cotton combination fabric,and it is the textile which made by the yarn of 65%—67% polyester blended with 33%—35% cotton.',200,'N');

INSERT INTO TAG VALUES('1','New Arrivals');
INSERT INTO TAG VALUES('2','Bestsellers');
INSERT INTO TAG VALUES('3','Promotion');
INSERT INTO TAG VALUES('4','Limited Edition');
INSERT INTO TAG VALUES('5','Exclusive Colours');
INSERT INTO TAG VALUES('6','Editors Choice');

INSERT INTO PATTERN_TAG VALUES('1','4');
INSERT INTO PATTERN_TAG VALUES('1','6');
INSERT INTO PATTERN_TAG VALUES('2','1');
INSERT INTO PATTERN_TAG VALUES('3','3');
INSERT INTO PATTERN_TAG VALUES('4','1');
INSERT INTO PATTERN_TAG VALUES('4','4');
INSERT INTO PATTERN_TAG VALUES('5','1');
INSERT INTO PATTERN_TAG VALUES('6','6');
INSERT INTO PATTERN_TAG VALUES('7','1');

INSERT INTO BEDDING_SIZE VALUES('Single','92 cm x 187 cm',100);
INSERT INTO BEDDING_SIZE VALUES('Double','137 cm x 187 cm',200);
INSERT INTO BEDDING_SIZE VALUES('Queen','153 cm x 203 cm',300);
INSERT INTO BEDDING_SIZE VALUES('King','183 cm x 203 cm',400);
INSERT INTO BEDDING_SIZE VALUES('Super King','	203ccm x 203 cm',500);

INSERT INTO COLOUR VALUES('1','White','N');
INSERT INTO COLOUR VALUES('2','Black','N');
INSERT INTO COLOUR VALUES('3','Red','N');
INSERT INTO COLOUR VALUES('4','Yellow','N');
INSERT INTO COLOUR VALUES('5','Blue','N');
INSERT INTO COLOUR VALUES('6','Green','N');
INSERT INTO COLOUR VALUES('7','Pink','N');
INSERT INTO COLOUR VALUES('8','Purple','N');
INSERT INTO COLOUR VALUES('9','Teal','N');
INSERT INTO COLOUR VALUES('10','Gold','N');
INSERT INTO COLOUR VALUES('11','Silver','N');

INSERT INTO ORDER_STATUS VALUES('1','Payment Received');
INSERT INTO ORDER_STATUS VALUES('2','In Production');
INSERT INTO ORDER_STATUS VALUES('3','Packaging');
INSERT INTO ORDER_STATUS VALUES('4','Pending for Shipment');
INSERT INTO ORDER_STATUS VALUES('5','Shipped');

INSERT INTO PROMO_CODE VALUES(1,"WELCOME5", "First Purchase", "% discount",5,50,100,10000,0,'2017-08-27','2017-09-10','N');
INSERT INTO PROMO_CODE VALUES(2,"1MONTH", "1st Monthsary", "$ discount",50,200,50,10000,0,'2017-09-27','2017-10-27','N');

INSERT INTO BEDDING VALUES('001','Single');
INSERT INTO BEDDING VALUES('002','Single');
INSERT INTO BEDDING VALUES('003','Single');
INSERT INTO BEDDING VALUES('004','Single');
INSERT INTO BEDDING VALUES('005','King');
INSERT INTO BEDDING VALUES('006','Single');
INSERT INTO BEDDING VALUES('007','Single');
INSERT INTO BEDDING VALUES('008','Single');
INSERT INTO BEDDING VALUES('009','Single');
INSERT INTO BEDDING VALUES('010','Single');
INSERT INTO BEDDING VALUES('011','Single');
INSERT INTO BEDDING VALUES('012','Single');

INSERT INTO PRODUCT VALUES('001','Bedding','1','2','N','1');
INSERT INTO PRODUCT VALUES('002','Bedding','2','1','N','1');
INSERT INTO PRODUCT VALUES('003','Bedding','3','2','N','3');
INSERT INTO PRODUCT VALUES('004','Bedding','4','7','N','3');
INSERT INTO PRODUCT VALUES('005','Bedding','5','2','N','6');
INSERT INTO PRODUCT VALUES('006','Bedding','4','4','N','4');
INSERT INTO PRODUCT VALUES('007','Bedding','4','1','N','2');
INSERT INTO PRODUCT VALUES('008','Bedding','2','9','N','5');
INSERT INTO PRODUCT VALUES('009','Bedding','4','6','N','4');
INSERT INTO PRODUCT VALUES('010','Bedding','3','3','N','3');
INSERT INTO PRODUCT VALUES('011','Bedding','6','1','N','5');
INSERT INTO PRODUCT VALUES('012','Bedding','7','1','N','4');

INSERT INTO PRODUCT_IMAGE VALUES('001','1','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P1.png');
INSERT INTO PRODUCT_IMAGE VALUES('002','2','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P2.png');
INSERT INTO PRODUCT_IMAGE VALUES('003','3','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P3.png');
INSERT INTO PRODUCT_IMAGE VALUES('004','4','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P4.png');
INSERT INTO PRODUCT_IMAGE VALUES('005','5','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P5.png');
INSERT INTO PRODUCT_IMAGE VALUES('006','6','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P6.png');
INSERT INTO PRODUCT_IMAGE VALUES('007','7','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P7.png');
INSERT INTO PRODUCT_IMAGE VALUES('008','8','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P8.png');
INSERT INTO PRODUCT_IMAGE VALUES('009','9','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P9.png');
INSERT INTO PRODUCT_IMAGE VALUES('010','10','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P10.png');
INSERT INTO PRODUCT_IMAGE VALUES('011','11','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P11.png');
INSERT INTO PRODUCT_IMAGE VALUES('012','12','https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P12.png');

INSERT INTO LAMP VALUES('001','Table Lamp',500);
INSERT INTO LAMP VALUES('005','Table Lamp',500);
INSERT INTO LAMP VALUES('008','Table Lamp',500);
INSERT INTO LAMP VALUES('012','Table Lamp',500);
