import axios from 'axios';
import asyncToken from './asyncTokenUtils';
class DatabaseInterface {
  async checkIfBaseEntityAttributeValueExists(
    baseEntity,
    attributeCode,
    expectedValue,
    valueKey = 'valueString'
  ) {
    const token = await asyncToken();
    // insert the tokens

    const resp = await axios({
      method: 'GET',
      url:
        'http://api-internmatch.outcome-hub.com/qwanda/baseentitys/PRJ_INTERNMATCH',
      headers: { Authorization: `Bearer ${token.access_token}` }
    });

    const { data } = resp;

    const x = data.baseEntityAttributes.find(
      aa => aa.attributeCode === attributeCode
    );

    const value = x[valueKey];
    const returnData =
      value === expectedValue
        ? Promise.resolve()
        : Promise.reject(
            ` Provided value ${expectedValue} Value doesnot equals to value in database ${value}`
          );
    return returnData;
  }

  async getBaseEntityFromEmail( email ) {
    const token = await asyncToken();
    const resp = await axios({
      method: 'GET',
      url: `http://api-internmatch.outcome-hub.com/utils/baseentitycode/${email}`,
      headers: { Authorization: `Bearer ${token.access_token}` }
    });
    const { data } = resp;
    if ( data ) {
      return data;
    } else {
      Promise.reject( `No BE with passed argument ${email}  found` );
    }
  }

  async deleteBaseEntityUsingCode( code ) {
    const token = await asyncToken();
    const resp = await axios({
      method: 'GET',
      url: `http://api-internmatch.outcome-hub.com/qwanda/baseentitys/${code}`,
      headers: { Authorization: `Bearer ${token.access_token}` }
    });
    console.log( resp );
  }

  // Delete Base Entity Using the API
  deleteBaseEntity() {
    console.log( ' Delete base entity' );
  }
}

// abc@test.com
export default DatabaseInterface;
