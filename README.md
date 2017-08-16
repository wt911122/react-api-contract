# react-api-contract

If you are tired of the strange errors that are generated when invoke other's API, then this is your best choice. This tool create an aspect before and after invoking API, which used to check the incoming and received parameters' format. The check method based on prop-types of react.

## Installing
```sh
npm install react-api-contract
```

## Usage
### Step1 Create API Specifications
```javascript
import PropTypes from 'react-props';

const getUserAPI = {
  name: 'GetAllUsers',
  url: '/api/getUsers',
  method: 'get',
  response: {
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      entitle: PropTypes.string.isRequired,
      department:PropTypes.string.isRequired,
      age:PropTypes.number.isRequired,
    })),
  }
}
const addUserAPI = {
  name: 'Add new User',
  url: '/api/addUser',
  method: 'post',
  body: {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    department: PropTypes.string.isRequired,
    entitle: PropTypes.string.isRequired,
  },
  response: PropTypes.string,
}
```

### Step2 Combine APIs to Store
```javascript
const store = combineAPI([
  getUserAPI,
  addUserAPI,
])
```

### Step3 Regist Store to APIProvider
```javascript
 <APIProvider pool={store}>
  //childrens
 </APIProvider>
```

### Step4 Connect Store with APIConnect
```javascript
class ChildComp extends Component{
  // ...
}

const mapAPIToProps = (api) => {
  return {
    getUsers: api.getUsers,
  }
}
APIconnect(mapAPIToProps)(ChildComp);
```

### Step5 Call API with Props
```javascript
class ChildComp extends Component{
  // ...
  componentDidMount() {
    this.props.getUsers.fetch().then((data) => {
      this.setState({
        list: data.list,
      })
    })
  }
  // ...
}
```

