import { put, takeEvery } from 'redux-saga/effects';

// function* fetchImages(action) {
//     try {
//         console.log('heree',action.payload)
//         const response = yield fetch(`/api/images`,{
//             method: 'POST',
//             body: JSON.stringify({id:action.payload}),
//             headers: { 'Content-Type': 'application/json' }
//         });
//         if (!response.ok) {
//             throw new Error("Network response was not OK");
//         }
//         const image = yield response.json();
//         yield put({ type: 'SET_IMAGES', payload: image });
//     }catch (error) {
//         console.log('User get request failed', error);
//       }
// }

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
    
// function* addImagesSaga(action){
//     try{
//         const response =yield fetch('/api/images',{
//             method: 'POST',
//             body: JSON.stringify(action.payload),
//             headers: { 'Content-Type': 'application/json' }
//         });
//         if (!response.ok) {
//             throw new Error("Network response was not OK");
//         }
//         yield put({ type: 'FETCH_IMAGES'});
//     }catch (error) {
//         console.log('Adding a image failed:', error);
//     }
// }

function* imagesSaga(){
    yield takeEvery('FETCH_IMAGES', fetchImages);
    // yield takeEvery('FETCH_IMAGES2', fetchImages2);
    // yield takeEvery('ADD_IMAGES', addImagesSaga);
}

export default imagesSaga;

