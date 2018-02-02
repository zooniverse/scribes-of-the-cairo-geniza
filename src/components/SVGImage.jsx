import React from 'react';
import PropTypes from 'prop-types';
import SubjectLoading from './SubjectLoading';

const FILTER = "url('#svg-invert-filter')"

export default class SVGImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false
    };

    this.image = new Image();
    this.image.onload = () => {
      if (this.props.onLoad) this.props.onLoad(this.image);
      this.setState({
        loaded: true
      });
    };
    this.image.onerror = (err) => {
      if (this.props.onError) this.props.onError(err);
      this.setState({
        error: true
      });
    };

    if (this.props.src) {
      this.image.src = this.props.src;
    } else {
      this.state.loaded = false;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.image.src) {
      this.image.src = nextProps.src;
    }
  }

  render() {
    const invertFilter = this.props.contrast ? { filter: FILTER } : {};

    if (this.state.loaded) {
      return (
        <image className="svg-image"
          style={invertFilter}
          xlinkHref={this.image.src}
          width={this.image.width}
          height={this.image.height}
          x={(this.image.width * -0.5) + 'px'}
          y={(this.image.height * -0.5) + 'px'}
        />
      );
    }
    return <SubjectLoading loaded={this.state.loaded} />;
  }
}

SVGImage.propTypes = {
  contrast: PropTypes.bool,
  src: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

SVGImage.defaultProps = {
  contrast: false,
  src: null,
  onLoad: null,
  onError: null
};
