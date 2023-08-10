import { put, takeEvery } from 'redux-saga/effects';

function* fetchProjects() {
    try {
        const response = yield fetch('/api/projects');
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const project = yield response.json();
        yield put({ type: 'SET_PROJECTS', payload: project });
    }catch (error) {
        console.log('User get request failed', error);
      }
}


function* addProjectSaga(action){
    try{
        const response = yield fetch('/api/projects',{
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        yield put({ type: 'FETCH_PROJECTS'});
    }catch (error) {
        console.log('Adding a project failed:', error);
    }
}

function* projectsSagas(){
    yield takeEvery('FETCH_PROJECTS', fetchProjects);
    yield takeEvery('ADD_PROJECT',addProjectSaga)
}

export default projectsSagas;


// function* addProjectSaga(action){
//     try{
//         yield fetch('/api/projects',{
//             method: 'POST',
//             body: JSON.stringify(action.payload),
//             headers: { 'Content-Type': 'application/json' }
//         });
//         if (!response.ok) {
//             throw new Error("Network response was not OK");
//         }
//     }catch (error) {
//         console.log('Adding a project failed:', error);
//       }
// }

// function* addProjectSaga(action){
//     try{
//         const response = yield fetch('/api/projects',{
//             method: 'POST',
//             body: JSON.stringify(action.payload),
//             headers: { 'Content-Type': 'application/json' }
//         });
//         if (!response.ok) {
//             throw new Error("Network response was not OK");
//         }
//         const project = yield response.json();
//         yield put({ type: 'ADD_PROJECTS',payload: project})
//     }catch (error) {
//         console.log('Adding a project failed:', error);
//       }
// }
