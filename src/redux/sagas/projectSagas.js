import { put, takeLatest } from 'redux-saga/effects';

function* fetchProject() {
    try {
        const response = yield fetch('/api/project');
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const project = yield response.json();
        yield put({ type: 'SET_PROJECT', payload: project });
    }catch (error) {
        console.log('User get request failed', error);
      }
}

function* projectSagas(){
    yield takeLatest('FETCH_PROJECT', fetchProject);
}

export default projectSagas;