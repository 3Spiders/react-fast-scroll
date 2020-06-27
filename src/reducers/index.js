import {
    combineReducers,
} from 'redux';

// Tab1的内容
export function contentTab1(state = '这里是tab1的默认内容（redux）', action) {
    switch (action.type) {
        case 'changeTab1':
            return action.data;
        default:
            return state;
    }
}

// Tab2的内容
export function contentTab2(state = '这里是tab2的默认内容（redux）', action) {
    switch (action.type) {
        case 'changeTab2':
            return action.data;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    contentTab1,
    contentTab2,
});

export default rootReducer;

