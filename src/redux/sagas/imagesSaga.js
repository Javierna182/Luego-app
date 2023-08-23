import { put, takeEvery } from 'redux-saga/effects';

function*fetchImages(action){
    try{
        const response = yield fetch(`/api/aws/details/${action.payload}`);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const image = yield response.json();
        yield put({ type: 'SET_IMAGES', payload: image });
    }catch (error) {
        console.log('User get request failed', error);
      }
    }
    

function* imagesSaga(){
    yield takeEvery('FETCH_IMAGES', fetchImages);
}

export default imagesSaga;

