import { STILL } from 'hkufui/src/constants/loadStatus';
import { BLAND } from 'hkufui/src/constants/expandStatus';

export default {
  location: {
    /* comp4801 */
    courseId: '',
    /* COMP4801 */
    courseTitle: '',
    /* [{id: engg, title: engineering}] */
    breadcrumb: []
  },
  posts: {
    /* refer to mock/../posts */
    posts: [],
    /* OK, FAIL, LOADING, STILL */
    status: STILL,
    /* BLAND, EXPANDING, HALT */
    subStatus: BLAND,
    /* index from /post/:courseId/:index */
    index: 1,
    /* timeframe for locking select in backend */
    timeframe: null,
  },
  /* user login credential */
  credential: null
}
