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
        let project = yield response.json();
        console.log('projectId', project.id); // this should be the id of the new project
        for (let image of action.imageList) {
            console.log('Uploading image', image.fileName)
            // upload each image, passsing image data AND projectId
            const formData = new FormData();
            formData.append('image', image.data);
            let postUrl = `/api/aws?imageName=${image.fileName}&imageType=${image.fileType}&projectId=${project.id}`;
            yield fetch(postUrl,{
                method: 'POST',
                body: formData,
            });
        }
        yield put({ type: 'FETCH_PROJECTS'});
    }catch (error) {
        console.log('Adding a project failed:', error);
    }
}

function* editProjectSaga(action){
    try{
        const response = yield fetch(`/api/projects/${action.payload.id}`,{
            method: 'PUT',
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

function* deleteProjectSaga(action){
    try{
        const response = yield fetch(`/api/projects/${action.payload}`,{
            method: 'DELETE'
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
    yield takeEvery('ADD_PROJECT',addProjectSaga);
    yield takeEvery('EDIT_PROJECT', editProjectSaga);
    yield takeEvery('DELETE_PROJECT', deleteProjectSaga);
}

export default projectsSagas;

