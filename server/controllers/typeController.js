const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res,next) {
        try {
        const { name } = req.body;
         let  type = await Type.create({ name });
         return res.json(type);
        } catch (e) {
            if(e.name === "SequelizeUniqueConstraintError") {
               return  next(ApiError.internal('Такой тип уже добавлен'));
            }
            next(e);
        }
   }
    async getAll(req, res,next) {
        try {
           let types = await Type.findAll();
           return res.json(types);
        } catch (e) {
           next(e);
        }
    }
}
module.exports = new TypeController();
