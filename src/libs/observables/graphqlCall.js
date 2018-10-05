import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const graphqlCall = (body = null) => {
  const options = {
    body: JSON.stringify(body),
    crossDomain: true,
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    responseType: 'json',
    // TODO: move graphql endpoint to environment variable
    url: `/graphql`,
  };

  return ajax(options).pipe(map(x => x.response));
};

export default graphqlCall;
