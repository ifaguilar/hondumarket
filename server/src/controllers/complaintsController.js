import db from "../database/db.js";

const getComplaintsCategories = async (req, res) => {
    try {
        const categories = await db.query(
            "SELECT * FROM complaintcategories"
        );

        res.status(200).json({
            ok: true,
            data: categories.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
}

const getComplaints = async (req, res) => {
    try {

        const { filter } = req.query;
        const dbQuery = `
            SELECT 
                c.*,
                p.first_name,
                p.last_name,
                p.avatar,
                cc.nombre_category
            FROM Complaints as c
                JOIN Person as p
                    on p.id = c.person_id
                JOIN complaintCategories as cc
                    on c.cod_complaintcategories = cc.cod_complaintcategories
                ${filter && filter != "all" ? `WHERE cc.nombre_category='${filter}'` : ""}
                ORDER BY id ASC
        `;

        const complaints = await db.query(dbQuery);

        res.status(200).json(complaints.rows);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}

const changeComplaintStatus = async (req, res) => {
    try {

        const { isActive, userID, sellerID } = req.body;
        console.log(req.body);
        const resDB = await db.query(`
        UPDATE complaints 
          SET is_active = $1
          WHERE person_id = $2 and reviewer_id = $3
      `, [isActive, sellerID, userID]
        );

        if (resDB.rowCount < 1)
            throw new Error("Algo salio mal y no se pudo actualizar el estado de la denuncia");

        res.status(200).json({
            ok: true,
            isChanged: true,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
}

export {
    getComplaints,
    getComplaintsCategories,
    changeComplaintStatus
}