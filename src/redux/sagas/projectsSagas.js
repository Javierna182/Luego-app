import { put, takeEvery } from 'redux-saga/effects';

function* fetchProjects() {
    try {
        const response = yield fetch('/api/project');
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const project = yield response.json();
        yield put({ type: 'SET_PROJECTS', payload: project });
    }catch (error) {
        console.log('User get request failed', error);
      }
}

function* projectsSagas(){
    yield takeEvery('FETCH_PROJECTS', fetchProjects);
}

export default projectsSagas;