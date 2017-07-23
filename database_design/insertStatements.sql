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

INSERT INTO PRODUCT VALUES('001','P1','F1','C2',100,'https://lh3.googleusercontent.com/Iki58vWtpEDQWxNrA824QgI7-U6P9MDp4Qh8xuMBMwzmt3hvDOTKoUompT6YN2HPj_8FI9TtgyfL6IOjdMrKG9dwumdLt-u0jkViG1B6Y4IIey9lYxszZiRQ-jvjNrSImYr9YNe2Q1T0mtAfuExm1hfASleVZjBcU-F0MslhX5S1ov6zvRZByrUJoAma3XEJYNcFgX9-2nD1HglEnFr5Dkt-YYBO99akmySHE4sJ8xqsEwuSgcNKNvWwwhVpd_ngQkYsLLPhWyRGY1JukNiEs1IUuwPlG0Sn5RMSXF18uPyK8I3Boei1U3sqzIMZL-dXgteLU0Pvw-_5cydUNgn6JlzAU8VwJD5lXFwjnOIRkUS_Bu5LR599Mss3bMdgtAwX9YrKKc9KJCH_3Wt1rw4xxxwp1FQIHEQwNTcytrmbeOcmCxxek0Z5lFU6nOVdhDF9yjgabELXwUzf9-NZSYKd68F0FHVT-kZPsZLShJv0ziaZw8GWcTHJbsb8xDCTduRVLfbYkL7hlMcs2XO7YyZHfi_tXEDCsl-w80KVZ_rePBe_aBr1tnWB3xWR5FSBi9ZusJecNwmGonnnzJYTt9VG-Lnhs8RJHkQmBtxsDHj7EhIlW6uyng-wmxtlSMvhP2te-8XFe-r-UcWXUS90nuOnZdg2sd1FU1yiXbQKT4E5WE4B=w602-h600-no');
INSERT INTO PRODUCT VALUES('002','P2','F1','C1',100,'https://lh3.googleusercontent.com/5atQqDGsxxxyT2J9fHF040mdSo2yr2JfsYOlYJbQzIf71Gv3_4jt14pVLSVAxqtkUxJp-Z9fOlacg_bUaqvxk-JMyrthPKaASmHPtX-uZiRwro8lZjPLmYGLvbD0FwsOMCNoKMlLqmERN3GPFVxsZI56E9hdKg4IZ0X7wA-or_eYpGX0YmX7yLSHPW1FncDnCYEqDf84wDWjexVvDPPoOonVecVKuXMgIt8rfhSJCRwfp8TLV572USRFYRe2xazZp8hSGeNzrA194MA8VDCqQTrx3wj4sKb_JT6i9mKJgDj_fsOi55q5TUN5qAfGqoub8W5NmIFw0qJoJZ9L51I-uBSwnMTicA5YiQtSoeXfTLFSHpXH9aD7lX689mZH0F965OB0owB9CMWt5wRZmhz1d1aPXEJfCH8I9_6KHZvQVovxcyAZTJXQAfnrFknhgOeaRDu07O-rAcskyrvhYeH02wkQC5ziTaiQnawpumHaznaaMEeXS_60LWLSIVACsogFN4yI2gwoQMUIuSeuvAzbVnQ_H0xxgm1ShlbQoNFfcQCrMCLmeuYcJOzk7Fn6RHqUriqdCd1UornOgkrMAd6PAExEI33HAdpp50tuQJPJNGmWG3oInmq4S5E=w612-h610-no');
INSERT INTO PRODUCT VALUES('003','P3','F4','C2',120,'https://lh3.googleusercontent.com/5RB1dg7i081a734Nkm9O8yhQ0G5rmgprqV-bLSKBh2DPOidL7YWC05Bu39UBzZzmwErNBmCvFgfLlUs7v1HlxFoOnUTHMrE06NrnA-8lFbXOIpeWje2nw3teJ64RG_wJhxqal-OS_xHjNTX_ZFYkAq9ajlmFO9-wWeSHQJ_N3cmb6FqP3HAXQgev6BxN1pGIcKxquDp7Rzjw4z6pRRKIGvzm88IeEBpBacDLU1s4jZczNkBcQsPi4T2sHoayPHazkMnYx6IpT9ENZxmPdyU2SHgALdbls1AMluUsUum1hPkB1VZFDZAkIxsvA_9xUljNpHtVEDlx59ERCf2bCbctcBnELm6lrME1GqArL0gYOu-LA5gPvITdBIbrCceTPAEG1mipLNmc4z0U9cX7RqErsiddKXqKG6-W2a41ZAulO8G6q6T7xd0mCHVYoZFr5JerrQWx-EKOIUe2rouBo-06teTLVec__WZfCvE5ANWF2bUATn0z14Kt6BMjt2dZ5gkvrvdDhaqIa9IaVeLMWXQ2pdZm0VB0BgQzyipiKIa_2BcjElIdNPDmOwpp_aoQWpZXmlhx0sm7YwHle-SEYfrVFZm5BScofWL8uPHrymKH2sIfdI8Uz2c=w614-h612-no');
INSERT INTO PRODUCT VALUES('004','P4','F1','C7',200,'https://lh3.googleusercontent.com/M7m9o0mMlXAndI-FbxSSRu28_a68d0sG85hV5lmEAfBHlEMQkFXF8P62Zq0NItRhDWDO4bzL3zr-HBuiWgCXf8NU3_aSTqLTBBKhYqwD-zIL5u1vtbH3oMq3kfG87CI10CF5kfsWkfhubj8fbvJigL2-zCgw3ofFHq88R7sIb4qvtEh4uFjdUz2Kd5L5IYYLsEbwJwfG2G6y_z367_GyXy24wnpHIF7tWtkk2QUo-BdoD3eaZtKEDUKg1ThCpwHNkkXnUeY2hM6vQxRA6GZ8XQ_Fbtcyj4ZEOXQF_an0VGe-h2495l23PQcvoHHRWDdYkcEQg_cN545vrPFi06fuwhxLqTTjwnWnrKAMnBXt_ZWClht1goUb8GJhILJBZHLwktU5qh4iy9AXxfvL9o1Dy5rJLCFf820xx1Kv6X4qQtlguhQqj9B3IZydino9LRN8eNSFdOfC-Ls6KcbJsRX0dAzJjFKD2BkayjnWUd0G-htoFhg_SWFAXRSrT3CAvjc0p9pzh1O6RRs8vcv-MXFQrRKmt9L3PhtDnWe0cEyNfRU0sVeOGTw6HP9bED5PQRjq6BSeDVdA5SxSOdoi8_cddQOMjofbSuE7fnOSVmTM1bRe7rw17kg=s612-no');
INSERT INTO PRODUCT VALUES('005','P5','F1','C2',300,'https://lh3.googleusercontent.com/EQk6dKQ3U4shGV26sdKnKPiW-Y1sY6U_xT_DWZNvs9KptLgOyjlKAkpBOCtPJz4Pck9PNu15yob-mxqwWJZru3ZZpourJEHpyaVn6UMWuEkcfyhlbNoxej2WSx7jpz1l2w3eVHM2h7vtPQN6GyNE7WbO1966qtP3e318SSvpoV9vwFegqQcTd3UAc6i4q_wuRxrzhYmXLqelWb7yMu1tYhnw_1RMV14cDt2vbkVrZdzhPaJnLJhVEXKvNqbHhAEgOjqLUQPRdg6yBrXJkNZ3p4k-wSgPP_QGKg5Q5h9vxno3W20CC734SaSVtOGN-K0gB6l1osSrxhfMiXdvS3uNGJctk01Gt94o-_ERQDn4XsbsKJdXD5EscU8_PsDqHRWf6wMKRR1fCZh-bZcsClS1Q4M3iIColGYM8LVtOnkebq9Ge-u6ANQhW_bH_JVx-wNBaiWCPrg2CxBWF6amL_CtPa3QUNWcI6gLwQTPmb-WIQf-garMqaRXjHAlWoCcKuWshYhwMzNjcNBy-VdQ6iiT36kVvnI6TynLv2oEtqn057Ag0gYLCelP0C9_XpxGN4nsMGj3c3AwnNfwrR58n94pgM1f_QmXPOOIsOjeD8YcP3_a935-lE8=w612-h610-no');
INSERT INTO PRODUCT VALUES('006','P4','F1','C4',900,'https://lh3.googleusercontent.com/8D7QLdugEhopt-grPGagI55YAWceUB74_BbsTjvnwgE63AK7s9P0M9-JrDgDS-ZlgaWLclaqplNO_oceVV99bAWU7gp29MZHW4cnJp0rJ8c8yvL0UYk2fc4TCfGq2qH2XDj69o7pOpwynA1KqUSBKojkp7VIWGfgc2iK4orVufPO-JaBm_BXiLHftWv5ZtKfWYhEwNrh5Q5rbCNTaKhuFHu0cGsgQzoYeFBha5VCLek-MuNKCl-Vn6pZPXqjGKW1zMNtfwUlIqSrgrwIP7N02sWBEcBlCG-_qFkaSuZ84efJt0sDz-LV0Ef98hqQA5v9pWGmU0xDabl-gosbt9GIHUMuvxx6-oebC0CnRUmKpzU3MOZ75Geli6mlSZt7OpwJpM8OQCgzXqBPu82LlQX9_dwz1owARA1U0eWVZvsZyuTfLNxsiSkHoc5jBhEnQVLTbHbuS7ojaOxlh3Q-1juQ8CfUQoS90_g3ZSN8lLF1__5lrEQc7ye0GIv_v4Hcjc43QKZ1jQYZDQeKC2wZgMiAQqBc0UHRzuSM5jMv4rhxIY2S90WIMOYlTL-bGKNvHEl3jGAqVRmTG5GuIk0vsvy4G3FW8xizZk8U4UnbRFlmyUBbO_X34Xsu8wE=w616-h618-no');
INSERT INTO PRODUCT VALUES('007','P4','F6','C1',500,'https://lh3.googleusercontent.com/VcgEOWEitLsWF6TSSIsuTB5FgGMVgHV4aztgbsWtPdY0UvDZnRfKbiVOCvScKOlFbMKFz4T0BzLcfdQDmktMUI9ey-g4VNaVhPCpy5neiN3xXvPDAcm-xScb7uZ_unlL-hppYVOlCJdWlUlsmgjR33535XtC2-_7TuUcL-SaQ3wU2GM14hjrksR5_Lt1PGSdoT746XDcsytav7kiy8uIrmY7sycQFCg6AY2dZPwa4W8czBc-F3axv_3UkhJB1A9qFnALbUstS1AwXmfdcXEq28IAMPpvaA77vyutTgTVjhXCy4JrFkt61527HEXcPGEMbsvg430wpycfTNSHiLycokCeZMyRqorgPKNM42Y-qMw2UFmnmCJuSKbCEgFHY9dHpdn37wIhpp5aHQX4EV0Aj8Sp2HPa6eIOiqgNE-mKwF0gGEzsZarrCeZRd1YpylKc-vFUSaR6_ervsAxrTpp6_IBogHFOlXoddefU7OnE805XLmdu3NkL4SfKlBOTnhGj4n4Ye5TeiknrdWBKd8wXdj0AYnbVFY1DiF9_keg4qnkLOmBVw9MyVvV5TmseqZ8ofVX4iIuBCPzPVRMnNYrOhVeM_UpjizEphzcQsHiM2rnT-9A90bJCWY8=w618-h614-no');
INSERT INTO PRODUCT VALUES('008','P2','F2','C9',300,'https://lh3.googleusercontent.com/5atQqDGsxxxyT2J9fHF040mdSo2yr2JfsYOlYJbQzIf71Gv3_4jt14pVLSVAxqtkUxJp-Z9fOlacg_bUaqvxk-JMyrthPKaASmHPtX-uZiRwro8lZjPLmYGLvbD0FwsOMCNoKMlLqmERN3GPFVxsZI56E9hdKg4IZ0X7wA-or_eYpGX0YmX7yLSHPW1FncDnCYEqDf84wDWjexVvDPPoOonVecVKuXMgIt8rfhSJCRwfp8TLV572USRFYRe2xazZp8hSGeNzrA194MA8VDCqQTrx3wj4sKb_JT6i9mKJgDj_fsOi55q5TUN5qAfGqoub8W5NmIFw0qJoJZ9L51I-uBSwnMTicA5YiQtSoeXfTLFSHpXH9aD7lX689mZH0F965OB0owB9CMWt5wRZmhz1d1aPXEJfCH8I9_6KHZvQVovxcyAZTJXQAfnrFknhgOeaRDu07O-rAcskyrvhYeH02wkQC5ziTaiQnawpumHaznaaMEeXS_60LWLSIVACsogFN4yI2gwoQMUIuSeuvAzbVnQ_H0xxgm1ShlbQoNFfcQCrMCLmeuYcJOzk7Fn6RHqUriqdCd1UornOgkrMAd6PAExEI33HAdpp50tuQJPJNGmWG3oInmq4S5E=w612-h610-no');
INSERT INTO PRODUCT VALUES('009','P4','F1','C6',200,'https://lh3.googleusercontent.com/i_qFcCqbMw7CB3kn7AqTHcbMTKRj4Q_WKnrfRr5QqySjWVAF0GfPaNaPMsPObyjpBiC0GiSde8PEDa_oNTnxuhq5IJ8Icv6qvTKP4VJ3XEKx3BEHl02utUwe6bqItuQclxD0B-u_E1B4T8_3B3zwT0jGQwd2L1Fn_P6iYl2uBkOfDqiadoz1sr611aB_vkAP_W2RyAhxv34wHN5QWWRpdYK1GPErj4gbgbKQtgw8lLj3g0dQ--YLQaAUpOwwqwTQFiK2aqjyI0NMS7USM3bM8Su9k9_cc7NBRTqVeYFoTI9NEUUVcSLd2wSuTku1i98SVkZ7YRgQ0Y20qX0-SiYJvk0WAb5uYTmSAoxIZ6CNma4u6j-LgrtLuasUWY6YWMuunC10hcGyz8MPb-g4jheWlxThM6bpNfp_qMIkeQpp4iuBqTbIzjmyvryh5SPEY2kQ5I8J6QEjqhrNvOWmPp9RJfkPf2a2UDck15IOrbi3oBEKgMXbMI4W8CJm1nfjOn0gjZ_gomrzH6ZjHB6a1Mf05UvyMrf7YR5h_ku7nHZhAVClSv_AcBk-ooAfHDCbRGH2iIxJs4tuEgajp4Wp--AWEJjU2bfxJS1DhdADblepDVv2mKcLNj8=s612-no');
INSERT INTO PRODUCT VALUES('010','P3','F4','C3',100,'https://lh3.googleusercontent.com/5RB1dg7i081a734Nkm9O8yhQ0G5rmgprqV-bLSKBh2DPOidL7YWC05Bu39UBzZzmwErNBmCvFgfLlUs7v1HlxFoOnUTHMrE06NrnA-8lFbXOIpeWje2nw3teJ64RG_wJhxqal-OS_xHjNTX_ZFYkAq9ajlmFO9-wWeSHQJ_N3cmb6FqP3HAXQgev6BxN1pGIcKxquDp7Rzjw4z6pRRKIGvzm88IeEBpBacDLU1s4jZczNkBcQsPi4T2sHoayPHazkMnYx6IpT9ENZxmPdyU2SHgALdbls1AMluUsUum1hPkB1VZFDZAkIxsvA_9xUljNpHtVEDlx59ERCf2bCbctcBnELm6lrME1GqArL0gYOu-LA5gPvITdBIbrCceTPAEG1mipLNmc4z0U9cX7RqErsiddKXqKG6-W2a41ZAulO8G6q6T7xd0mCHVYoZFr5JerrQWx-EKOIUe2rouBo-06teTLVec__WZfCvE5ANWF2bUATn0z14Kt6BMjt2dZ5gkvrvdDhaqIa9IaVeLMWXQ2pdZm0VB0BgQzyipiKIa_2BcjElIdNPDmOwpp_aoQWpZXmlhx0sm7YwHle-SEYfrVFZm5BScofWL8uPHrymKH2sIfdI8Uz2c=w614-h612-no');
INSERT INTO PRODUCT VALUES('011','P11','F6','C1',300,'https://lh3.googleusercontent.com/hxzc-mvP87pc0JdjrSPous8y8oqkUC3SJdaZwXbK-byJXUg7MjDYB2B1PjiuOVSwLLty9kgU9UmXvP3v0iJyBRvNVUrC3hfL3hogLSoXDy91ybC7pC1D7QzAfa7UUn7OTeeUg_uDlG7ZQhZMpA4fd8ODTvpH8w2Qb393rPgsT3dSGuiTDHQZ5d1doHzkTAycdjyv-dQTbwGoKRFUQ_-4xnYRXEkx622_9xjd4KiliI9ncdL_xVu7fGmn1xd1cZ9CrGYmQvdG7ivWQV5ZDpeXjhC8qyqFxs1YMEqE5dE6a_bkZgsgiN8rRfVajHfUxymatQtF7b_onic8fzkGePA5m9-6lMjG4gtytzukkcT6VdDeiP2ZkDWd6LXdeGQfD10STFplcsP9-DuLOyqOTbx2WsA9I1rhVOamXtYOghtck_B3allOB1pbDYtAXWY8AWJIotB1oq5panzdRnTy1RthPJwrPp9eO13mrNvLxjHVA1uQfUWf0_Qu1s1zf4NpNORl49j-tfBj9MFKRMRJKrYENBEstU-Hz6BbGmg_pX5FFUrv01RV8txCqrxY_PPUHFu07L8tsUGOrSJ6bITPNAEf9CwKFNlBzYV0dgPvjAGzZ-8OJptfnrE=s618-no');
INSERT INTO PRODUCT VALUES('012','P12','F6','C1',300,'https://lh3.googleusercontent.com/jMLtRIXRGIQbxfpan8uiUpd-KVmRy5flCiLaUUcWQucQ5cMpjeVYW3j28ZZlW47EfN6SpQqzldbHGWz0KGhlbPOlaiqTDzgV_l9f7-wZJt9N5H80UyxT97NFraQ3EtiN3hcslOIZylaqvDlc1ght3M0k5gw1PheN5VcVRMZ1YiMgqJ9IwXWd6HytIWfqj7whKtBjpJz9JDmuMHCb7sN_AytymFbscJZVuCV7L-DHsQu2CPzUtQDLJVnMPRRUQ93FaonjPdnR5M1ohgDJxz6IEWimiSC38aPN-cEnZNbb_6SDyRlUdamJR0upLss0XEy_1jsWRTLkD2QdzpikSCDYChcPOHK9AkbwGik9M6fHN3LiwxxDvHWBm75Xi8tJTEVJz3HbHznHJc7mwUW_RsxW2C-mDEZipZneDXJDG_uQzxT7qb8741IWgECtUg_5wsJ6YWDtE64sas-GdWpu1RViZNngJwaA_0EvzPSMxJtm-SBkmiHYFtOO_d54F-hJ_v7ehC5S7DFq75-QUWV0-MBi4al7x_F2KaFj8y4MT3ZA6zlTE7Ki4RdglPvjFUCkzEJX5aiVa-Y9Gjbr1stbB5--cpvSK-w5UJa9tscxaxGnt9zmNP_ppE8=w602-h616-no');
