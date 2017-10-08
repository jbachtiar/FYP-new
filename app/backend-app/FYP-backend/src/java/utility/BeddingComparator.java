/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utility;

import dao.ProductDAO;
import entity.Bedding;
import java.sql.SQLException;
import java.util.Comparator;

/**
 *
 * @author Ong Yi Xuan
 */
public class BeddingComparator implements Comparator<Bedding>{
    
    // Overriding the compare method to sort the age 
    @Override
    public int compare(Bedding b1, Bedding b2) {
        ProductDAO productDao = new ProductDAO();
      
        try{
          
            return (int) Math.round(productDao.getLowestCombinationPriceByPatternId(b1.getPattern().getPatternId()) - productDao.getLowestCombinationPriceByPatternId(b2.getPattern().getPatternId()));
   
        }catch(SQLException e){
            
            System.out.println("compare exception");
            return 0;
        }
        
    }
}
