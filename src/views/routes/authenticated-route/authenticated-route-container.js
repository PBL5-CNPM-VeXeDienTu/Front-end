import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrentUser } from 'Admin/state/modules/auth';
import AuthenticatedRoute from './authenticated-route';

const mapStateToProps = (state) => ({
    user: getCurrentUser(state),
});

export default withRouter(connect(mapStateToProps)(AuthenticatedRoute));
