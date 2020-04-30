import React from 'react';
import { withRouter } from 'react-router-dom';

class Category extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {

        // let categoryId;
        // if (this.props.match !== null) {
        //     categoryId = this.props.match.params.id;
        // } else {
        //     categoryId = 'Unknown';
        // }

        const categoryId = this.props.match !== null ? this.props.match.params.id : 'Unknown';

        return (
            <div>
                {`Category page for ${ this.props.match !== null ? this.props.match.params.id : 'Unknown' }`}
            </div>
        )
    }
}

export default withRouter(Category);