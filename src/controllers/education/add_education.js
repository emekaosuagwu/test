import moment from 'moment';
import { errorResponseWithStatus } from '../../utils/Helpers';
import EducationModel from '../../models/education';

export default (req, res) => {
  const errors = [];

  const {
    course,
    end_date,
    start_date,
    certificate_type,
    institution_name,
    institution_location,
  } = req.body;

  const eduInfoObj = {
    course,
    end_date,
    start_date,
    certificate_type,
    institution_name,
    institution_location,
  };

  Object.keys(eduInfoObj).map(field => {

    if (field === 'end_date' || field === 'start_date') {
      const dateValue = moment(eduInfoObj[field]);
      if (dateValue.isValid() !== false) {
        const error = { status: 404, details: `${field} is not valid` };
        errors.push(error);
      }
    }
    if (typeof field !== 'string' ) {
      const error = { status: 404, details: `${field} is not a valid string` };
      errors.push(error);
    }
  });

  if (errors.length === 0) {

    /**
     * res.locals.userID contains user ID that is passed into handler function
     * from validate-request.js middleware.
     */
    eduInfoObj.user_id = res.locals.userID;
    const Education = new EducationModel({...eduInfoObj});
    Education.save((err, eduInfo) => {
      if (err) {
        return errorResponseWithStatus(res, 500, 'Error, cannot save education data');
      }

      const payload = {};
      payload.data = { success: true, message: 'Education history saved successfully' };
      res.status(200).json(payload);
    })


  } else {
    const payload = { error: errors };
    res.status(404).json(payload);
  }
};