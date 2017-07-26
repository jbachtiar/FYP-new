INSERT INTO CUSTOMER VALUES ('customer@gmail.com','Huiyan','Chen','85882165','abc','Singapore','536748','1234','N');
INSERT INTO STAFF_ROLE VALUES ('1','Admin');
INSERT INTO STAFF VALUES ('staff@gmail.com','Ming','Xia','12345678','1234','1');

INSERT INTO COLLECTION VALUES ('CO1','Bestsellers');
INSERT INTO COLLECTION VALUES ('CO2','2018 Spring');
INSERT INTO COLLECTION VALUES ('CO3','2018 Summer');
INSERT INTO COLLECTION VALUES ('CO4','2017 Spring');
INSERT INTO COLLECTION VALUES ('CO5','2017 Winter');

INSERT INTO PATTERN VALUES ('P1','Forest','Hi, here is a description on Forest',100,'CO1');
INSERT INTO PATTERN VALUES ('P2','Birds','Hi, here is a description on Birds',120,'CO1');
INSERT INTO PATTERN VALUES ('P3','Bloom','Hi, here is a description on Bloom',110,'CO2');
INSERT INTO PATTERN VALUES ('P4','Mimosa','Hi, here is a description of Mimosa',100,'CO3');
INSERT INTO PATTERN VALUES ('P5','Lotus','Hi, here is a description on Lotus',340,'CO4');
INSERT INTO PATTERN VALUES ('P11','Coconuts','Hi, here is a description on Coconuts',400,'CO3');
INSERT INTO PATTERN VALUES ('P12','Flowers','Hi, here is a description on Flowers',200,'CO3');

INSERT INTO FABRIC VALUES('F1','Silk','Silk, also known as natural silk, is continuous filament solidified from the silk fluid secreted by silkworms during cocooning. It is a natural protein fiber and also one of the earliest fibers to be woven into textiles. Second to none in texture, shine, strength and drape, silk is renowned as “the second skin of human body” and “The Queen of Fibers” in the industry.',250);
INSERT INTO FABRIC VALUES('F2','Modal','Modal fabric is a regenerated cellulose fiber developed by the Lenzing company from Austria. Its raw materials are beech trees living in European bushes. Beech trees are made into wood pulp first and then processed into Modal fiber using special spinning technologies. The textile made from this fiber has a silky shine, fine touch, and excellent draping. Modal fiber is an eco-friendly fiber because all its raw materials are natural and can be naturally decomposed.',100);
INSERT INTO FABRIC VALUES('F3','Long Staple Cotton','Long staple cotton, also called sea island cotton, is a cultivated cotton species that is known for its long fiber. Long staple cotton is renowned as fine cotton for its high quality and long soft fiber.',120);
INSERT INTO FABRIC VALUES('F4','Cotton','Cotton is a widely used home textile fabric. Popular among consumers because of its features such as perspiration absorbent, breezy for wear, softness and no irritation to skin, ease of wash, and no pilling.',80);
INSERT INTO FABRIC VALUES('F5','Lyocell Tencel','Lyocell, also called Tencel, is a form of rayon which consists of cellulose fiber made from dissolving pulp (bleached wood pulp) using dry jet-wet spinning. It is a typical eco-friendly fiber developed by the Austria Lenzing company. The decomposition rate of Tencel in mud is over 99%, causing little pollution. Tencel is hygroscopic, comfortable, and draping. Tencel products are more hygroscopic than cotton products, softer than silk products, and cooler than linen products. That is why Tencel is called “green fiber of the 21st century”.',450);
INSERT INTO FABRIC VALUES('F6','Polyester-Cotton','Polyester-cotton called by a joint name of polyester blend cotton combination fabric,and it is the textile which made by the yarn of 65%—67% polyester blended with 33%—35% cotton.',200);

INSERT INTO PATTERN_FABRIC VALUES('P1','F1');
INSERT INTO PATTERN_FABRIC VALUES('P2','F1');
INSERT INTO PATTERN_FABRIC VALUES('P2','F2');
INSERT INTO PATTERN_FABRIC VALUES('P2','F3');
INSERT INTO PATTERN_FABRIC VALUES('P3','F4');
INSERT INTO PATTERN_FABRIC VALUES('P3','F5');
INSERT INTO PATTERN_FABRIC VALUES('P4','F1');
INSERT INTO PATTERN_FABRIC VALUES('P4','F6');
INSERT INTO PATTERN_FABRIC VALUES('P5','F1');
INSERT INTO PATTERN_FABRIC VALUES('P5','F2');
INSERT INTO PATTERN_FABRIC VALUES('P5','F3');
INSERT INTO PATTERN_FABRIC VALUES('P11','F6');
INSERT INTO PATTERN_FABRIC VALUES('P12','F1');
INSERT INTO PATTERN_FABRIC VALUES('P12','F6');

INSERT INTO TAG VALUES('T1','New Arrivals');
INSERT INTO TAG VALUES('T2','Bestsellers');
INSERT INTO TAG VALUES('T3','Promotion');
INSERT INTO TAG VALUES('T4','Limited Edition');
INSERT INTO TAG VALUES('T5','Exclusive Colours');
INSERT INTO TAG VALUES('T6','Editors Choice');

INSERT INTO PATTERN_TAG VALUES('P1','T4');
INSERT INTO PATTERN_TAG VALUES('P1','T6');
INSERT INTO PATTERN_TAG VALUES('P2','T1');
INSERT INTO PATTERN_TAG VALUES('P3','T3');
INSERT INTO PATTERN_TAG VALUES('P4','T1');
INSERT INTO PATTERN_TAG VALUES('P4','T4');
INSERT INTO PATTERN_TAG VALUES('P5','T1');
INSERT INTO PATTERN_TAG VALUES('P11','T6');
INSERT INTO PATTERN_TAG VALUES('P12','T1');


INSERT INTO SIZE VALUES('Single',100);
INSERT INTO SIZE VALUES('Double',200);
INSERT INTO SIZE VALUES('Queen',300);
INSERT INTO SIZE VALUES('King',400);

INSERT INTO COLOUR VALUES('C1','White');
INSERT INTO COLOUR VALUES('C2','Black');
INSERT INTO COLOUR VALUES('C3','Red');
INSERT INTO COLOUR VALUES('C4','Yellow');
INSERT INTO COLOUR VALUES('C5','Blue');
INSERT INTO COLOUR VALUES('C6','Green');
INSERT INTO COLOUR VALUES('C7','Pink');
INSERT INTO COLOUR VALUES('C8','Purple');
INSERT INTO COLOUR VALUES('C9','Teal');
INSERT INTO COLOUR VALUES('C10','Gold');
INSERT INTO COLOUR VALUES('C11','Silver');

INSERT INTO PRODUCT VALUES('001','P1','F1','C2',100,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P1.png');
INSERT INTO PRODUCT VALUES('002','P2','F1','C1',100,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P2.png');
INSERT INTO PRODUCT VALUES('003','P3','F4','C2',120,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P3.png');
INSERT INTO PRODUCT VALUES('004','P4','F1','C7',200,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P4.png');
INSERT INTO PRODUCT VALUES('005','P5','F1','C2',300,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P5.png');
INSERT INTO PRODUCT VALUES('006','P4','F1','C4',900,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P6.png');
INSERT INTO PRODUCT VALUES('007','P4','F6','C1',500,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P7.png');
INSERT INTO PRODUCT VALUES('008','P2','F2','C9',300,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P8.png');
INSERT INTO PRODUCT VALUES('009','P4','F1','C6',200,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P9.png');
INSERT INTO PRODUCT VALUES('010','P3','F4','C3',100,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P10.png');
INSERT INTO PRODUCT VALUES('011','P11','F6','C1',300,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P11.png');
INSERT INTO PRODUCT VALUES('012','P12','F6','C1',300,'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P12.png');
