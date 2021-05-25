import axios from 'axios'

export const initialState = {
    serials: [],
    userid: '',
    statusCode: 0,
};

export const getBasketTotal = (basket) =>
 basket?.reduce((amount, item) => item.price + amount, 0);

 const onLogin = async(state, userid, password) => {
    await axios.post(
        'http://localhost:8000/api/login',
        {
            'userid': userid,
            'password': password
        }
    ).then(res => {
        state.userid = userid;
        state.statusCode = res.status;
        localStorage.setItem('token', res.data.token);

    }).catch(error => state.statusCode = error.response.status)
}

const reducer = (state, action)=>{
    switch(action.type){
        case "SEND_CREDENTIAL":
            onLogin(state, action.userid, action.password);
            console.log('code: ',state.statusCode)
            return {
                ...state,
                statusCode: state.statusCode
            };


        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket];
            if(index >= 0){
                newBasket.splice(index, 1);

            }else console.warn(`Can't remove product (id: ${action.id}) as it is not in basket`);

            return {
                ...state,
                basket: newBasket
            };
        
        default: return state;
    }
};

export default reducer