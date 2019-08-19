import { combineReducers } from 'redux'
import annotatingSingleTable1 from './annotatingSingleTable1'
import annotatingDoubleTable1 from './annotatingDoubleTable1'
import annotatingMetaData from './annotatingMetaData';
import annotationList from './annotationList'


export default combineReducers({
    annotatingSingleTable1: annotatingSingleTable1,
    annotatingDoubleTable1: annotatingDoubleTable1,
    annotatingMetaData: annotatingMetaData,
    annotationList,
})

