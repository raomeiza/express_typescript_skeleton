import { convertMobileToInternational } from '../validations/common.validations';

/**
 * @param thisQuery - mongoose query object to be updated
 * @returns {void} - no return value. just modified query object:
 * the mobile number before handling -- 070XXXXXXX -- is converted to -- +2340XXXXXXX --
 * 
 * Handle the case where the mobile cane be accessed directly from the query parameter e.g findOne({mobile: '070XXXXXXX'})
 *   or from the query object e.g findOne({$or: [{mobile: '070XXXXXXX'}, {mobile: '070XXXXXXX'}]})
  **/
const handleConvertMobileToInternationalFromMongooseQuery = (thisQuery: any) => {
  let mobile;
  if (thisQuery.getQuery().$or && thisQuery.getQuery().$or.length > 0) {
    let or = thisQuery.getQuery().$or;
    let superThis = thisQuery;
    or.forEach(function (item: any, index: number) {
      if (item.mobile) {

        mobile = item.mobile;
        superThis.getQuery().$or[index].mobile = convertMobileToInternational(mobile);
        // stop loop
        return false;
      }
    }.bind(thisQuery));
  } else {
    mobile = thisQuery.getQuery().mobile;
    mobile ? thisQuery.getQuery().mobile = convertMobileToInternational(mobile) : null;
  }
  return thisQuery;
}

export default handleConvertMobileToInternationalFromMongooseQuery;