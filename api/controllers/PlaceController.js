/**
 * PlaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // add place

  addPlace: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { place, unprocessTicket,prefix } = req.body;
      //create place
      const newPlace = await Place.create({
        place,
        unprocessTicket,
        prefix,
      }).fetch();
      return res.status(201).send({
        message: sails.__('addData', lang),
        newPlace: newPlace,
      });
    } catch (error) {
      return res.status(500).send({
        error:error,
        message: sails.__('notAdded', lang),
      });
    }
  },

  //delete place

  deletePlace: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { id } = req.params;
      //find place
      const place = await Place.find({ id: id });
      //check place find or not
      if (place) {
        //delete place with id
        const deleted = await Place.destroyOne({ id: id });
        return res.status(200).json({
          message: sails.__('deleteData', lang),
          deleted:deleted
        });
      } else {
        return res.status(500).json({
          message: sails.__('notDeleted', lang),
        });
      }
    } catch (error) {
      return res.status(500).json({
        error:error,
        message: sails.__('notDeleted', lang),
      });
    }
  },

  //Update place

  updatePlace: async (req, res) => {
    const lang = req.getLocale();

    try {
      const { id } = req.params;
      const {place,prefix,unprocessTicket}=req.body;
      //find place
      const places = await Place.findOne(id);
      //check place find or not
      if (places) {
        //update place
        const updateplace = await Place.updateOne({ id: id }).set({place,prefix,unprocessTicket});
        return res.status(200).json({
          message: sails.__('updateData', lang),
          updateplace: updateplace,
        });
      } else {
        return res.status(404).json({
          message: sails.__('notUpdated', lang),
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__('notUpdated', lang),
      });
    }
  },

  //get all place

  getPlace: async (req, res) => {
    const lang = req.getLocale();
    try {
      //find place
      const places = await Place.find();
      return res.status(200).json({
        message: sails.__('getData', lang),
        placeData: places,
      });
    } catch (error) {
      return res.status(500).json({
        error:error,
        message: sails.__('notGet', lang),
      });
    }
  },
};
