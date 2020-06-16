const baseURL = 'http://localhost:5000/graphql';

const checkAllFields = (fields = []) => fields.every(field => field.toString().trim());

export {
  baseURL,
  checkAllFields,
}