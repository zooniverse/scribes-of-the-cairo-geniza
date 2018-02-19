import { request } from 'graphql-request';
import PropTypes from 'prop-types';
import { config } from '../config';

//Action types
const FETCH_AGGREGATIONS = 'FETCH_AGGREGATIONS';
const FETCH_AGGREGATIONS_SUCCESS = 'FETCH_AGGREGATIONS_SUCCESS';
const FETCH_AGGREGATIONS_ERROR = 'FETCH_AGGREGATIONS_ERROR';

//Possible states of the Aggregations fetch attempt.
const AGGREGATIONS_STATUS = {
  IDLE: 'aggregations_status_idle',
  FETCHING: 'aggregations_status_fetching',
  SUCCESS: 'aggregations_status_success',
  ERROR: 'aggregations_status_error'
};

//Initial state for the Aggregations data.
//PRO TIP! Import this straight into the React components that use Aggregations.
const AGGREGATIONS_INITIAL_STATE = {
  aggData: null,
  aggStatus: AGGREGATIONS_STATUS.IDLE
};

const AGGREGATIONS_PROP_TYPES = {
  aggData: PropTypes.object,  //TODO: Check this?
  aggStatus: PropTypes.string,
};

const aggregationsReducer = (state = AGGREGATIONS_INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_AGGREGATIONS:
      return Object.assign({}, state, {
        status: AGGREGATIONS_STATUS.FETCHING
      });

    case FETCH_AGGREGATIONS_SUCCESS:
      return Object.assign({}, state, {
        aggData: action.data,
        status: AGGREGATIONS_STATUS.SUCCESS
      });

    case FETCH_AGGREGATIONS_ERROR:
      return Object.assign({}, state, {
        status: AGGREGATIONS_STATUS.ERROR
      });

    default:
      return state;
  }
};

const fetchAggregations = (subjectId) => {
  return (dispatch) => {
    /*SOMEBODY CHANGE ME*/
    const workflowId = '3156';
    const reducerKey = 'hebrew_word';
    const caesarHost = 'https://caesar-staging.zooniverse.org/graphql';
    
    dispatch({ type: FETCH_AGGREGATIONS });
    
    
    //Caesar-staging's being a big baby at the moment, so we'll have to fake the data fetch.
    //--------------------------------
    const rawData = {"data":{"workflow":{"reductions":[{"T0_tool0_rec_x":[771.7243041992188, 1520.0875244140625, 1028.542724609375, 778.7951049804688, 1525.0408935546875, 1032.594482421875, 782.5831298828125, 1521.2528076171875, 1036.3824462890625, 767.5689697265625, 1515.9322509765625, 1021.6258544921875, 773.4276733398438, 1509.29150390625, 1032.6957397460938, 778.1953125], "T0_tool0_rec_y":[531.3552856445312, 1224.48876953125, 1517.20654296875, 539.7970581054688, 1214.0699462890625, 1517.1138916015625, 532.220947265625, 1225.43408203125, 1520.9019775390625, 517.895751953125, 1202.744873046875, 1500.985595703125, 531.880859375, 1202.9276123046875, 1511.76171875, 529.30908203125], "T0_tool1_rec_x":[525.9518432617188, 540.14794921875, 524.9957885742188, 527.3194580078125, 525.597900390625, 536.4024658203125], "T0_tool1_rec_y":[724.6594848632812, 714.04736328125, 740.563720703125, 705.6769409179688, 718.7063598632812, 731.1842041015625], "T0_tool2_rec_x":[768.9628295898438, 778.7951049804688, 759.8548583984375, 773.0919799804688, 758.1765747070312], "T0_tool2_rec_y":[1133.3597412109375, 1130.7327880859375, 1142.096923828125, 1125.4232177734375, 1130.485107421875], "T0_tool3_rec_x":[752.3939208984375, 759.8548583984375, 744.70263671875, 756.5230102539062, 750.5510864257812], "T0_tool3_rec_y":[1398.4625244140625, 1407.260498046875, 1395.896240234375, 1390.526123046875, 1393.5660400390625], "T0_tool4_rec_x":[542.520751953125, 551.5121459960938, 555.3001708984375, 530.0809326171875, 533.223388671875, 545.3319091796875, 536.5887451171875, 514.6302490234375], "T0_tool4_rec_y":[1133.3597412109375, 1126.9447021484375, 1153.4610595703125, 1125.423095703125, 1122.859619140625, 1133.8951416015625, 1139.6834716796875, 1130.341796875], "T0_tool0_rec_width":[198.8271484375, 185.019775390625, 207.111572265625, 196.97857666015625, 185.6143798828125, 204.5545654296875, 181.826416015625, 174.250244140625, 181.826416015625, 212.63458251953125, 196.065673828125, 218.1575927734375, 209.70208740234375, 198.263671875, 186.82550048828125, 184.3839111328125], "T0_tool1_rec_width":[231.96502685546875, 219.7069091796875, 227.282958984375, 243.010986328125, 240.2042236328125, 221.35107421875], "T0_tool2_rec_width":[596.4813842773438, 590.9357299804688, 617.4520263671875, 596.4813842773438, 613.8552856445312], "T0_tool3_rec_width":[433.5535888671875, 443.2017822265625, 431.837646484375, 425.26910400390625, 442.28082275390625], "T0_tool4_rec_width":[212.6346435546875, 204.55462646484375, 193.1905517578125, 240.24951171875, 224.95318603515625, 221.98614501953125, 209.81622314453125, 243.123291015625], "T0_tool0_clusters_x":[775.3824157714844, 1518.32099609375, 1030.3682495117187], "T0_tool0_clusters_y":[530.4098307291666, 1213.933056640625, 1513.5939453125], "T0_tool0_rec_height":[91.12908935546875, 99.41357421875, 88.36767578125, 87.1251220703125, 113.6414794921875, 87.1251220703125, 75.760986328125, 94.701171875, 71.972900390625, 118.74395751953125, 121.50537109375, 102.175048828125, 102.944580078125, 110.5703125, 87.6937255859375, 98.550048828125], "T0_tool1_clusters_x":[530.0692342122396], "T0_tool1_clusters_y":[722.4730122884115], "T0_tool1_rec_height":[107.697998046875, 121.21759033203125, 90.91314697265625, 129.7899169921875, 122.008544921875, 90.7176513671875], "T0_tool2_clusters_x":[767.77626953125], "T0_tool2_clusters_y":[1132.4195556640625], "T0_tool2_rec_height":[102.175048828125, 117.4295654296875, 83.337158203125, 115.982421875, 118.19580078125], "T0_tool3_clusters_x":[752.8051025390625], "T0_tool3_clusters_y":[1397.14228515625], "T0_tool3_rec_height":[110.4595947265625, 98.4892578125, 113.6414794921875, 132.55126953125, 133.44677734375], "T0_tool4_clusters_x":[538.6485366821289], "T0_tool4_clusters_y":[1133.246078491211], "T0_tool4_rec_height":[96.6519775390625, 109.853515625, 60.60888671875, 110.4595947265625, 110.5701904296875, 95.857666015625, 89.012939453125, 101.603759765625], "T0_tool0_cluster_labels":[0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0], "T0_tool0_clusters_count":[6, 5, 5], "T0_tool0_clusters_width":[197.39212036132812, 187.8427490234375, 199.69512939453125], "T0_tool1_cluster_labels":[0, 0, 0, 0, 0, 0], "T0_tool1_clusters_count":[6], "T0_tool1_clusters_width":[230.58686319986978], "T0_tool2_cluster_labels":[0, 0, 0, 0, 0], "T0_tool2_clusters_count":[5], "T0_tool2_clusters_width":[603.041162109375], "T0_tool3_cluster_labels":[0, 0, 0, 0, 0], "T0_tool3_clusters_count":[5], "T0_tool3_clusters_width":[435.2285888671875], "T0_tool4_cluster_labels":[0, 0, 0, 0, 0, 0, 0, 0], "T0_tool4_clusters_count":[8], "T0_tool4_clusters_width":[218.8135223388672], "T0_tool0_clusters_height":[95.70896402994792, 107.9663818359375, 87.46689453125], "T0_tool1_clusters_height":[110.39080810546875], "T0_tool2_clusters_height":[107.4239990234375], "T0_tool3_clusters_height":[117.71767578125], "T0_tool4_clusters_height":[96.82731628417969]}]}}}
    const data = rawData.data.workflow.reductions[0];
    dispatch({ type: FETCH_AGGREGATIONS_SUCCESS, data });
    //--------------------------------

    /*
    const query = `{
      workflow(id: ${workflowId}) {
        reductions(subjectId: ${subjectId}, reducerKey:"${reducerKey}") {
          data
        }
      }
    }`;
    
    request(caesarHost, query)
    .then((data) => {
      dispatch({ type: FETCH_ANNOTATIONS_SUCCESS, data });
    })
    .catch((err) => {
      console.error('ducks/aggregations.js fetchAggregations() error: ', err);
      dispatch({ type: FETCH_ANNOTATIONS_ERROR });
    });
    */
  }
}

export default aggregationsReducer;

export {
  fetchAggregations,
  AGGREGATIONS_INITIAL_STATE,
  AGGREGATIONS_STATUS,
  AGGREGATIONS_PROP_TYPES
};