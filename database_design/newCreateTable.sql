-- MySQL Script generated by MySQL Workbench
-- 09/08/17 08:06:18
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`BEDDING_SIZE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`BEDDING_SIZE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`BEDDING_SIZE` (
  `SIZE_NAME` VARCHAR(45) NOT NULL,
  `DIMENSIONS` VARCHAR(500) NOT NULL,
  `SIZE_PRICE` DOUBLE NOT NULL,
  PRIMARY KEY (`SIZE_NAME`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`BEDDING`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`BEDDING` ;

CREATE TABLE IF NOT EXISTS `mydb`.`BEDDING` (
  `PRODUCT_ID` INT NOT NULL,
  `SIZE_NAME` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PRODUCT_ID`),
  CONSTRAINT `fk_BEDDING_BEDDING_SIZE1`
    FOREIGN KEY (`SIZE_NAME`)
    REFERENCES `mydb`.`BEDDING_SIZE` (`SIZE_NAME`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_BEDDING_BEDDING_SIZE1_idx` ON `mydb`.`BEDDING` (`SIZE_NAME` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`COLLECTION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`COLLECTION` ;

CREATE TABLE IF NOT EXISTS `mydb`.`COLLECTION` (
  `COLLECTION_ID` INT NOT NULL,
  `COLLECTION_NAME` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`COLLECTION_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PATTERN`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`PATTERN` ;

CREATE TABLE IF NOT EXISTS `mydb`.`PATTERN` (
  `PATTERN_ID` INT NOT NULL,
  `PATTERN_NAME` VARCHAR(45) NOT NULL,
  `PATTERN_DESC` VARCHAR(500) NOT NULL,
  `PATTERN_PRICE` DOUBLE NOT NULL,
  `DELETED` VARCHAR(1) NOT NULL,
  `COLLECTION_ID` INT NOT NULL,
  PRIMARY KEY (`PATTERN_ID`),
  CONSTRAINT `fk_DESIGN_COLLECTION1`
    FOREIGN KEY (`COLLECTION_ID`)
    REFERENCES `mydb`.`COLLECTION` (`COLLECTION_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_DESIGN_COLLECTION1_idx` ON `mydb`.`PATTERN` (`COLLECTION_ID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`COLOUR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`COLOUR` ;

CREATE TABLE IF NOT EXISTS `mydb`.`COLOUR` (
  `COLOUR_ID` INT NOT NULL,
  `COLOUR_NAME` VARCHAR(45) NOT NULL,
  `DELETED` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`COLOUR_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FABRIC`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`FABRIC` ;

CREATE TABLE IF NOT EXISTS `mydb`.`FABRIC` (
  `FABRIC_ID` INT NOT NULL,
  `FABRIC_NAME` VARCHAR(45) NOT NULL,
  `FABRIC_DESC` VARCHAR(500) NOT NULL,
  `FABRIC_PRICE` DOUBLE NOT NULL,
  `DELETED` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`FABRIC_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PRODUCT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`PRODUCT` ;

CREATE TABLE IF NOT EXISTS `mydb`.`PRODUCT` (
  `PRODUCT_ID` INT NOT NULL,
  `PRODUCT_TYPE` VARCHAR(45) NOT NULL,
  `PATTERN_ID` INT NOT NULL,
  `COLOUR_ID` INT NOT NULL,
  `DELETED` VARCHAR(1) NOT NULL,
  `FABRIC_ID` INT NOT NULL,
  PRIMARY KEY (`PRODUCT_ID`),
  CONSTRAINT `fk_PRODUCT_BEDDING1`
    FOREIGN KEY (`PRODUCT_ID`)
    REFERENCES `mydb`.`BEDDING` (`PRODUCT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCT_DESIGN1`
    FOREIGN KEY (`PATTERN_ID`)
    REFERENCES `mydb`.`PATTERN` (`PATTERN_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCT_COLOUR1`
    FOREIGN KEY (`COLOUR_ID`)
    REFERENCES `mydb`.`COLOUR` (`COLOUR_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCT_FABRIC1`
    FOREIGN KEY (`FABRIC_ID`)
    REFERENCES `mydb`.`FABRIC` (`FABRIC_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_PRODUCT_BEDDING1_idx` ON `mydb`.`PRODUCT` (`PRODUCT_ID` ASC);

CREATE INDEX `fk_PRODUCT_DESIGN1_idx` ON `mydb`.`PRODUCT` (`PATTERN_ID` ASC);

CREATE INDEX `fk_PRODUCT_COLOUR1_idx` ON `mydb`.`PRODUCT` (`COLOUR_ID` ASC);

CREATE INDEX `fk_PRODUCT_FABRIC1_idx` ON `mydb`.`PRODUCT` (`FABRIC_ID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`PRODUCT_IMAGE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`PRODUCT_IMAGE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`PRODUCT_IMAGE` (
  `PRODUCT_ID` INT NOT NULL,
  `IMAGE_ID` INT NOT NULL,
  `IMAGE_URL` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`PRODUCT_ID`, `IMAGE_ID`),
  CONSTRAINT `fk_table1_PRODUCT1`
    FOREIGN KEY (`PRODUCT_ID`)
    REFERENCES `mydb`.`PRODUCT` (`PRODUCT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TAG`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`TAG` ;

CREATE TABLE IF NOT EXISTS `mydb`.`TAG` (
  `TAG_ID` INT NOT NULL,
  `TAG_NAME` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`TAG_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PROMO_CODE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`PROMO_CODE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`PROMO_CODE` (
  `PROMO_CODE_ID` INT NOT NULL,
  `PROMO_CODE` VARCHAR(20) NOT NULL,
  `PROMO_NAME` VARCHAR(100) NOT NULL,
  `PROMO_TYPE` VARCHAR(45) NOT NULL,
  `PROMO_VALUE` DOUBLE NOT NULL,
  `MIN_PURCHASE` DOUBLE NOT NULL,
  `MAX_DISCOUNT` DOUBLE NOT NULL,
  `QUOTA` INT NOT NULL,
  `COUNTER` INT NOT NULL,
  `START_DATE` DATE NOT NULL,
  `END_DATE` DATE NOT NULL,
  `DELETED` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`PROMO_CODE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CUSTOMER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CUSTOMER` ;

CREATE TABLE IF NOT EXISTS `mydb`.`CUSTOMER` (
  `EMAIL` VARCHAR(200) NOT NULL,
  `FIRST_NAME` VARCHAR(45) NOT NULL,
  `LAST_NAME` VARCHAR(45) NOT NULL,
  `PHONE_NO` VARCHAR(8) NOT NULL,
  `PASSWORD` VARCHAR(120) NOT NULL,
  `VERIFIED` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`EMAIL`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CUSTOMER_ADDRESS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CUSTOMER_ADDRESS` ;

CREATE TABLE IF NOT EXISTS `mydb`.`CUSTOMER_ADDRESS` (
  `ADDRESS_ID` INT NOT NULL,
  `EMAIL` VARCHAR(200) NOT NULL,
  `RECIPIENT_NAME` VARCHAR(90) NOT NULL,
  `PHONE_NO` VARCHAR(8) NOT NULL,
  `ADDRESS_LINE` VARCHAR(200) NOT NULL,
  `CITY` VARCHAR(45) NOT NULL,
  `COUNTRY` VARCHAR(45) NOT NULL,
  `POSTAL_CODE` VARCHAR(6) NOT NULL,
  `ISDEFAULT` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`ADDRESS_ID`, `EMAIL`),
  CONSTRAINT `fk_CUSTOMER_ADDRESS_CUSTOMER1`
    FOREIGN KEY (`EMAIL`)
    REFERENCES `mydb`.`CUSTOMER` (`EMAIL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`STAFF_ROLE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`STAFF_ROLE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`STAFF_ROLE` (
  `ROLE_ID` INT NOT NULL,
  `ROLE_NAME` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ROLE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`STAFF`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`STAFF` ;

CREATE TABLE IF NOT EXISTS `mydb`.`STAFF` (
  `EMAIL` VARCHAR(200) NOT NULL,
  `FIRST_NAME` VARCHAR(45) NOT NULL,
  `LAST_NAME` VARCHAR(45) NOT NULL,
  `PHONE_NO` VARCHAR(8) NOT NULL,
  `PASSWORD` VARCHAR(120) NOT NULL,
  `ROLE_ID` INT NOT NULL,
  PRIMARY KEY (`EMAIL`),
  CONSTRAINT `fk_STAFF_STAFF_ROLE1`
    FOREIGN KEY (`ROLE_ID`)
    REFERENCES `mydb`.`STAFF_ROLE` (`ROLE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_STAFF_STAFF_ROLE1_idx` ON `mydb`.`STAFF` (`ROLE_ID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`COURIER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`COURIER` ;

CREATE TABLE IF NOT EXISTS `mydb`.`COURIER` (
  `COURIER_NAME` VARCHAR(100) NOT NULL,
  `TRACKING_URL` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`COURIER_NAME`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CUSTOMER_ORDER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CUSTOMER_ORDER` ;

CREATE TABLE IF NOT EXISTS `mydb`.`CUSTOMER_ORDER` (
  `ORDER_ID` INT NOT NULL,
  `ORDER_DATE` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NET_AMT` DOUBLE NOT NULL,
  `PROMO_DISC_AMT` DOUBLE NOT NULL,
  `RECIPIENT_NAME` VARCHAR(90) NOT NULL,
  `PHONE_NO` VARCHAR(8) NOT NULL,
  `ADDRESS_LINE` VARCHAR(200) NOT NULL,
  `CITY` VARCHAR(45) NOT NULL,
  `COUNTRY` VARCHAR(45) NOT NULL,
  `POSTAL_CODE` VARCHAR(6) NOT NULL,
  `STRIPE_CHARGE_ID` VARCHAR(120) NOT NULL,
  `EMAIL` VARCHAR(200) NOT NULL,
  `PROMO_CODE_ID` INT NOT NULL,
  `COURIER_NAME` VARCHAR(100) NOT NULL,
  `ORDER_TRACKING_NO` VARCHAR(120) NULL,
  PRIMARY KEY (`ORDER_ID`),
  CONSTRAINT `fk_ORDER_PROMO_CODE1`
    FOREIGN KEY (`PROMO_CODE_ID`)
    REFERENCES `mydb`.`PROMO_CODE` (`PROMO_CODE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDER_CUSTOMER1`
    FOREIGN KEY (`EMAIL`)
    REFERENCES `mydb`.`CUSTOMER` (`EMAIL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDER_COURIER1`
    FOREIGN KEY (`COURIER_NAME`)
    REFERENCES `mydb`.`COURIER` (`COURIER_NAME`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_ORDER_PROMO_CODE1_idx` ON `mydb`.`CUSTOMER_ORDER` (`PROMO_CODE_ID` ASC);

CREATE INDEX `fk_ORDER_CUSTOMER1_idx` ON `mydb`.`CUSTOMER_ORDER` (`EMAIL` ASC);

CREATE INDEX `fk_ORDER_COURIER1_idx` ON `mydb`.`CUSTOMER_ORDER` (`COURIER_NAME` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`ORDER_ITEM`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ORDER_ITEM` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ORDER_ITEM` (
  `ORDER_ID` INT NOT NULL,
  `PRODUCT_ID` INT NOT NULL,
  `QUANTITY` INT NOT NULL,
  `UNIT_PRICE` DOUBLE NOT NULL,
  `ITEM_STATUS` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ORDER_ID`, `PRODUCT_ID`),
  CONSTRAINT `fk_ORDER_DETAILS_ORDER1`
    FOREIGN KEY (`ORDER_ID`)
    REFERENCES `mydb`.`CUSTOMER_ORDER` (`ORDER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDER_DETAILS_PRODUCT1`
    FOREIGN KEY (`PRODUCT_ID`)
    REFERENCES `mydb`.`PRODUCT` (`PRODUCT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_ORDER_DETAILS_PRODUCT1_idx` ON `mydb`.`ORDER_ITEM` (`PRODUCT_ID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`ORDER_STATUS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ORDER_STATUS` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ORDER_STATUS` (
  `STATUS_ID` INT NOT NULL,
  `STATUS_NAME` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`STATUS_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ORDER_STATUS_LOG`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ORDER_STATUS_LOG` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ORDER_STATUS_LOG` (
  `ORDER_ID` INT NOT NULL,
  `STATUS_ID` INT NOT NULL,
  `START_TIMESTAMP` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `END_TIMESTAMP` TIMESTAMP,
  `DURATION_HOURS` DOUBLE NULL,
  PRIMARY KEY (`ORDER_ID`, `STATUS_ID`, `START_TIMESTAMP`),
  CONSTRAINT `fk_ORDER_STATUS_LOG_ORDER_STATUS1`
    FOREIGN KEY (`STATUS_ID`)
    REFERENCES `mydb`.`ORDER_STATUS` (`STATUS_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDER_STATUS_LOG_ORDER1`
    FOREIGN KEY (`ORDER_ID`)
    REFERENCES `mydb`.`CUSTOMER_ORDER` (`ORDER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_ORDER_STATUS_LOG_ORDER_STATUS1_idx` ON `mydb`.`ORDER_STATUS_LOG` (`STATUS_ID` ASC);

CREATE INDEX `fk_ORDER_STATUS_LOG_ORDER1_idx` ON `mydb`.`ORDER_STATUS_LOG` (`ORDER_ID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`PATTERN_TAG`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`PATTERN_TAG` ;

CREATE TABLE IF NOT EXISTS `mydb`.`PATTERN_TAG` (
  `PATTERN_ID` INT NOT NULL,
  `TAG_ID` INT NOT NULL,
  PRIMARY KEY (`PATTERN_ID`, `TAG_ID`),
  CONSTRAINT `fk_DESIGN_has_TAG_DESIGN1`
    FOREIGN KEY (`PATTERN_ID`)
    REFERENCES `mydb`.`PATTERN` (`PATTERN_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DESIGN_has_TAG_TAG1`
    FOREIGN KEY (`TAG_ID`)
    REFERENCES `mydb`.`TAG` (`TAG_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_DESIGN_has_TAG_TAG1_idx` ON `mydb`.`PATTERN_TAG` (`TAG_ID` ASC);

CREATE INDEX `fk_DESIGN_has_TAG_DESIGN1_idx` ON `mydb`.`PATTERN_TAG` (`PATTERN_ID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`LAMP`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`LAMP` ;

CREATE TABLE IF NOT EXISTS `mydb`.`LAMP` (
  `PRODUCT_ID` INT NOT NULL,
  `LAMP_TYPE` VARCHAR(45) NOT NULL,
  `LAMP_PRICE` DOUBLE NOT NULL,
  PRIMARY KEY (`PRODUCT_ID`),
  CONSTRAINT `fk_LAMP_PRODUCT1`
    FOREIGN KEY (`PRODUCT_ID`)
    REFERENCES `mydb`.`PRODUCT` (`PRODUCT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_LAMP_PRODUCT1_idx` ON `mydb`.`LAMP` (`PRODUCT_ID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`CART`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CART` ;

CREATE TABLE IF NOT EXISTS `mydb`.`CART` (
  `CART_ID` INT NOT NULL,
  `CART_PRICE` DOUBLE NOT NULL,
  `EMAIL` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`CART_ID`),
  CONSTRAINT `fk_SHOPPING_CART_CUSTOMER1`
    FOREIGN KEY (`EMAIL`)
    REFERENCES `mydb`.`CUSTOMER` (`EMAIL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_SHOPPING_CART_CUSTOMER1_idx` ON `mydb`.`CART` (`EMAIL` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`CART_ITEM`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CART_ITEM` ;

CREATE TABLE IF NOT EXISTS `mydb`.`CART_ITEM` (
  `CART_ID` INT NOT NULL,
  `PRODUCT_ID` INT NOT NULL,
  `QUANTITY` INT NOT NULL,
  `UNIT_PRICE` DOUBLE NOT NULL,
  PRIMARY KEY (`CART_ID`, `PRODUCT_ID`),
  CONSTRAINT `fk_CART_DETAILS_SHOPPING_CART1`
    FOREIGN KEY (`CART_ID`)
    REFERENCES `mydb`.`CART` (`CART_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CART_DETAILS_PRODUCT1`
    FOREIGN KEY (`PRODUCT_ID`)
    REFERENCES `mydb`.`PRODUCT` (`PRODUCT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_CART_DETAILS_PRODUCT1_idx` ON `mydb`.`CART_ITEM` (`PRODUCT_ID` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
