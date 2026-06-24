import { logger } from "../utils/logger.js";
import { prisma_Connector } from "../../index.js";

export async function createRoleOnPage_Master(req, res, next) {
    const COMPCODE = String(req?.headers?.compcode).toUpperCase()


    try {
        // Prepare to insert each page's permissions
        const data = req?.body?.data
        var crete_page = await prisma_Connector?.role?.create({ data: { ...data, COMPCODE } })

        if (crete_page?.id) {
            return res.json({ status: 1, data: crete_page });
        } else {
            return res.json({ status: 0, data: {} });
        }

    } catch (error) {
        logger.info(error);

        return res.json({ statusCode: 500, message: 'An error occurred while creating the user' });
    }
}



export async function get_all_Role_name(req, res, next) {
    // const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const where = req?.query?.where




    try {
        const result = await prisma_Connector.role.findMany({ where: { AND: { COMPCODE: { in: where?.split(",") } } }, include: { RoleOnPage: true } })
        res.json({ status: 1, data: result })
    }
    catch (err) {
        res.json({ status: 0, data: {} })
        logger.info(err);

    }
}