import {atom, selector} from 'recoil';

const count=atom({
    key:'counterState',
    default:0
})

export default count;


export const even=selector({
    key:'isEven',
    get:function (args){
        console.log('args: ',args);
        const {get}=args;
        const countState=get(count);
        return countState%2==0;
    }
})

