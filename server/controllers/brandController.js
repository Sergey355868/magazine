const { Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res,next) {
        try {
         const { name } = req.body;
         let  brand  = await Brand.create({name});
         return res.json(brand) ;
        } catch (e) {
            if(e.name === "SequelizeUniqueConstraintError") {
                return  next(ApiError.internal('Такой бренд уже добавлен'));
            }
           next(e);
        }
    }
    async getAll(req, res,next) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands)
        } catch (e) {
          next(e);
        }
    }
}
module.exports = new BrandController()
