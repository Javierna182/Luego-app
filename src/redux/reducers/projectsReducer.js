// import { combineReducers } from 'redux';
// Used to store projects returned from the server
function projectsReducer(state = [], action){
    switch (action.type) {
        case 'SET_PROJECTS':
            return action.payload;
        default:
            return state;    
    }
}

// function addProjectsReducer(state = [], action){
//     switch (action.type) {
//         case 'ADD_PROJECT':
//             return action.payload;
//         default:
//             return state;    
//     }
// }

export default projectsReducer;

// export default combineReducers({
//     projectsReducer,
//     // addProjectsReducer,
// });