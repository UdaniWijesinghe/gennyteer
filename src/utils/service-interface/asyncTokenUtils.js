import axios from 'axios';
import queryString from 'querystring';

const tokenURL = global.token_url;

/* request parameters to be sent */
const requsetParams = {
  grant_type: global.grant_type,
  client_id: global.client_id,
  username: global.username,
  password: global.password,
  client_secret: global.client_secret
};

const getTokenUtils = async () => {
  console.debug( 'Testing for console debug ** reached get token **' );
  try {
    const response = await axios.post(
      tokenURL,
      queryString.stringify( requsetParams )
    );
    console.log( response.data );
    return response.data;
  } catch ( err ) {
    console.log( err );
  }
};

export default getTokenUtils;
