/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mahout;

import java.io.File;
import java.util.List;

import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
//import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.GenericUserPreferenceArray;
import org.apache.mahout.cf.taste.impl.model.PlusAnonymousConcurrentUserDataModel;
import org.apache.mahout.cf.taste.model.PreferenceArray;
import org.apache.mahout.cf.taste.recommender.UserBasedRecommender;

/**
 *
 * @author Clarissa Poedjiono
 */
public class Recommender {

    private static final String SERVER_NAME = "localhost";
    private static final String USER_NAME = "root";
    private static final String PASSWORD = "";
    private static final String DATABASE = "mydb";

    private static final int NEIGHBOR_HOOD_SIZE = 5;

//    public static UserBasedRecommender getRecommender() throws Exception {
//
//        MysqlDataSource dataSource = new MysqlDataSource();
//        dataSource.setServerName(SERVER_NAME);
//        dataSource.setUser(USER_NAME);
//        dataSource.setPassword(PASSWORD);
//        dataSource.setDatabaseName(DATABASE);
//
//        /* 
//         constructor MySQLJDBCDataModel(dataSource, [tablename], [userid column name], 
//         [itemid column name], [preference value column name], [timestamp column name, can be null])
//         */
//        DataModel model = new MySQLJDBCDataModel(dataSource,
//                "user_preferences", "user_id", "product_id", "preference", null);
//
//        // Build anonymous data model with previous datamodel for guest
//        PlusAnonymousConcurrentUserDataModel anonymousDataModel = new PlusAnonymousConcurrentUserDataModel(model, 100);
//
//        /* Get Pearson correlation instance from given model */
//        UserSimilarity similarity = new PearsonCorrelationSimilarity(model);
//        /*
//            * Computes a neighborhood consisting of the nearest n users to a given
//            * user.
//         */
//        UserNeighborhood neighborhood = new NearestNUserNeighborhood(NEIGHBOR_HOOD_SIZE, similarity, model);
//
//        /* Get Recommender */
//        UserBasedRecommender recommender = new GenericUserBasedRecommender(anonymousDataModel, neighborhood, similarity);
//
//        return recommender;
//    }
    public static List<RecommendedItem> getRecommendations(int custId, int noOfRecommendations) throws TasteException {
        MysqlDataSource dataSource = new MysqlDataSource();
        dataSource.setServerName(SERVER_NAME);
        dataSource.setUser(USER_NAME);
        dataSource.setPassword(PASSWORD);
        dataSource.setDatabaseName(DATABASE);

        /* 
         constructor MySQLJDBCDataModel(dataSource, [tablename], [userid column name], 
         [itemid column name], [preference value column name], [timestamp column name, can be null])
         */
        DataModel model = new MySQLJDBCDataModel(dataSource,
                "user_preferences", "user_id", "product_id", "preference", null);

        // Build anonymous data model with previous datamodel for guest
        PlusAnonymousConcurrentUserDataModel anonymousDataModel = new PlusAnonymousConcurrentUserDataModel(model, 10);

        /* Get Pearson correlation instance from given model */
        UserSimilarity similarity = new PearsonCorrelationSimilarity(model);
        /*
            * Computes a neighborhood consisting of the nearest n users to a given
            * user.
         */
        UserNeighborhood neighborhood = new NearestNUserNeighborhood(NEIGHBOR_HOOD_SIZE, similarity, model);

        /* Get Recommender */
        UserBasedRecommender recommender = new GenericUserBasedRecommender(anonymousDataModel, neighborhood, similarity);

        if (custId == 0) {
            //guest recommender

            //create temporary user id for guest
            long tempUserId = anonymousDataModel.takeAvailableUser();
            System.out.println("tempID: " + tempUserId);

            //create a list of preferences based on 5 bestsellers AND 1 to 5 latest collection products
            Map<Long, Float> GuestUserPreferences = new HashMap<Long, Float>();
//            for (the  5  best  {
//                sellers
//            }
//            
//                ) {
            GuestUserPreferences.put(3L, 3F);
            GuestUserPreferences.put(2L, 4F);
            GuestUserPreferences.put(1L, 5F);
            GuestUserPreferences.put(5L, 2F);
            GuestUserPreferences.put(6L, 3F);

//            }
//
//            for (the latest  collection , biggest  {
//                collection 
//            }id, min 1, max 
//                5) {
//                GuestUserPreferences.put("productId", 1);
//            }
            // fill a Mahout data structure with the user's preferences
            List<RecommendedItem> listOfRecommendations = new ArrayList<RecommendedItem>();
            try {
                PreferenceArray tempPrefs = new GenericUserPreferenceArray(GuestUserPreferences.size());
                int i = 0;
                for (Map.Entry<Long, Float> entry : GuestUserPreferences.entrySet()) {
                    long key = entry.getKey();
                    float value = entry.getValue();

                    tempPrefs.setUserID(i, tempUserId);
                    tempPrefs.setItemID(i, key);
                    tempPrefs.setValue(i, value);

                    System.out.println("itemid in hashmap: " + key);
                    System.out.println("itemid in tempref: " + tempPrefs.getItemID(i));
                    System.out.println("value in tempref: " + tempPrefs.getValue(i));

                    System.out.println("size: " + tempPrefs.length());
                    i++;

                }

                // Add the temporaly preferences to model
                anonymousDataModel.setTempPrefs(tempPrefs, tempUserId);
                try {
                    return recommender.recommend(tempUserId, noOfRecommendations);
                } catch (TasteException ex) {
//                    Logger.getLogger(Recommender.class.getName()).log(Level.SEVERE, null, ex);
                    System.out.println("ERROR: " + ex.getMessage());
                }
                return listOfRecommendations;

            } finally {

                anonymousDataModel.releaseUser(tempUserId);

            }

        } else {
            try {
                //normal recommender for logged in user
                return recommender.recommend(custId, noOfRecommendations);
            } catch (TasteException ex) {
                System.out.println("ERROR: " + ex.getMessage());
            }
        }
        return new ArrayList<RecommendedItem>();
    }

    public static void displayRecommendations(int custId, List<RecommendedItem> recommendations) {

        System.out.println("Recommendations for customer " + custId + " are:");
        System.out.println("*************************************************");

        for (RecommendedItem recommendation : recommendations) {
            int productId = (int) recommendation.getItemID();
            System.out.println(productId + " " + "some method pattern name and color");
        }

        System.out.println("*************************************************");
    }

    public static void main(String args[]) throws Exception {

//        Recommender recommender = getRecommender();
        List<RecommendedItem> recommendations;

        //getting 5 recommendations for custid = 1
        recommendations = getRecommendations(1, 5);
        displayRecommendations(1, recommendations);

        //getting 5 recommendations for custid = 2
        recommendations = getRecommendations(2, 5);
        displayRecommendations(2, recommendations);

        //getting 5 recommendations for guestid, which is always 0
        int guestid = 0;
        recommendations = getRecommendations(guestid, 5);
        displayRecommendations(guestid, recommendations);
    }
}
