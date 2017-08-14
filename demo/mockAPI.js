import PropTypes from 'prop-types';

export const testAPI1 = {
  name: '按情况查询',
  url: '/searchWithConditions',
  method: 'post',
  pathParam: PropTypes.string.isRequired,
  query: {
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  },
  body: {
    department: PropTypes.string,
    age: PropTypes.number,
    entitle: PropTypes.string,
    location: PropTypes.string,
  }
}