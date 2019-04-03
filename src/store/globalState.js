import { STILL } from 'hkufui/src/constants/loadStatus';
import { BLAND } from 'hkufui/src/constants/expandStatus';
import { TIMESTAMP } from 'hkufui/src/constants/filterStatus';

export default {
  location: {
    /* comp4801 */
    courseId: '',
    /* COMP4801 */
    courseTitle: '',
    /* [{id: engg, title: engineering}] */
    breadcrumb: [],
    /* native id hash / mod000000 */
    recentTopic: '',
  },
  posts: {
    /* refer to mock/../posts */
    posts: [],
    /* OK, FAIL, LOADING, STILL */
    status: STILL,
    /* BLAND, EXPANDING, HALT */
    subStatus: BLAND,
    /* MOODLE, TIMESTAMP, REPLIES, TEMPERATURE */
    filter: TIMESTAMP,
    /* string to be searched */
    query: null,
    /* { primary: xxx, secondary: yyy } */
    hashtag: null,
    /* index from /post/:courseId/:index */
    index: 1,
    /* timeframe for locking select in backend */
    timeframe: null,
  },
  replies: {
    /* posts(replies) of a topic */
    replies: null,
    /* OK, LOADING, STILL */
    status: STILL,
    /* Possible topic payload retrieved from /view/:topicId */
    topicInfo: { title: '', subtitle: null, native: null, solved: null, owned: null, subscribed: false }
  },
  /* user login credential */
  credential: null,
  profile: {
    /* User temperature in number */
    temperature: null,
  },
  compose: {
    /* compose status of new post, LOADING or STILL */
    status: STILL
  }
}
