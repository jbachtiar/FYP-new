/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

/**
 *
 * @author Huiyan
 */
import database.ConnectionManager;
import entity.Tag;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.SQLException;

public class TagDAO {

    public Tag[] getTagsByDesignId(int designId) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Tag t = null;
        ArrayList<Tag> tags = new ArrayList<Tag>();

        String sql = "SELECT * FROM design_tag dt, tag t where t.tag_id=dt.tag_id and dt.design_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, designId);
            rs = stmt.executeQuery();

            while (rs.next()) {

                int tagId = rs.getInt("TAG_ID");
                String tagName = rs.getString("TAG_NAME");
                t = new Tag(tagId, tagName);
                tags.add(t);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return tags.toArray(new Tag[tags.size()]);

    }

}
